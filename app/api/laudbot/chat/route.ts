import { NextRequest } from "next/server";
import { CHAT_MODEL, getGeminiClient } from "@/lib/laudbot/gemini";
import { systemPrompt } from "@/lib/laudbot/prompt";
import { classifySensitive } from "@/lib/laudbot/sensitive";
import { checkRateLimit, clientKey } from "@/lib/laudbot/rate-limit";
import { notifyLaud } from "@/lib/laudbot/notify";

/** Node, not edge. The corpus is built from a module import and the notify
 *  path uses a plain fetch with an abort timer; neither needs edge, and Node
 *  keeps the rate-limit map in one process rather than one per isolate. */
export const runtime = "nodejs";

/** Caps that exist to bound cost, not to be tidy.
 *
 *  The system prompt already carries the whole corpus on every call, so the
 *  variable part of the bill is history. Eight turns is enough for a real
 *  conversation and stops a visitor pasting a novel into the context. */
const MAX_TURNS = 8;
const MAX_CHARS_PER_MESSAGE = 1200;

type Turn = { role: "user" | "model"; text: string };

/** NDJSON, one JSON object per line.
 *
 *  A plain text stream cannot carry "this was a sensitive question, show the
 *  email form" alongside the words. Two endpoints could, at the cost of the
 *  client deciding which to call before it knows the answer. One stream of
 *  typed events keeps the decision on the server, where the classifier is. */
function line(obj: unknown): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(obj) + "\n");
}

function singleShot(obj: unknown): Response {
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(line(obj));
        controller.enqueue(line({ type: "done" }));
        controller.close();
      },
    }),
    { headers: { "Content-Type": "application/x-ndjson; charset=utf-8" } },
  );
}

export async function POST(req: NextRequest) {
  let body: { messages?: Turn[] };
  try {
    body = await req.json();
  } catch {
    return singleShot({ type: "error", text: "I couldn't read that. Try sending it again." });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const latest = [...messages].reverse().find((m) => m.role === "user");
  const question = (latest?.text ?? "").trim();

  if (!question) {
    return singleShot({ type: "error", text: "Ask me something and I'll do my best." });
  }
  if (question.length > MAX_CHARS_PER_MESSAGE) {
    return singleShot({
      type: "error",
      text: "That's longer than I can take in one go. Could you trim it down a bit?",
    });
  }

  const rate = checkRateLimit(clientKey(req.headers));
  if (!rate.allowed) {
    return singleShot({ type: "error", text: rate.message, retryAfter: rate.retryAfter });
  }

  // The classifier runs BEFORE the model sees anything. On a hit the question
  // never reaches Gemini at all, which is what makes the rule impossible to
  // talk past: there is no model in the loop to persuade.
  const sensitive = classifySensitive(question);
  if (sensitive) {
    if (sensitive.offerEmail) {
      // Fire the notification now, with no visitor address yet, so Laud sees
      // the question even if they never fill the form in. A second, richer
      // notification follows from /api/laudbot/flag if they do.
      void notifyLaud({
        question,
        category: sensitive.category,
        recentTurns: messages.slice(-4).map((m) => `${m.role}: ${m.text}`),
      });
    }
    console.info("[laudbot:q]", JSON.stringify({ sensitive: sensitive.category, question }));
    return singleShot({
      type: "sensitive",
      category: sensitive.category,
      text: sensitive.reply,
      offerEmail: sensitive.offerEmail,
    });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return singleShot({
      type: "error",
      text: "I'm not switched on yet: Laud hasn't plugged my API key in. The page has everything I'd tell you anyway, and he's at asantelaud@gmail.com.",
    });
  }

  // Useful analytics, and deliberately just the question. No address, no
  // identifier, nothing a visitor did not type into a public box.
  console.info("[laudbot:q]", JSON.stringify({ sensitive: null, question }));

  const history = messages
    .slice(-MAX_TURNS)
    .filter((m) => typeof m.text === "string" && m.text.trim().length > 0)
    .map((m) => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: m.text.slice(0, MAX_CHARS_PER_MESSAGE) }],
    }));

  try {
    const stream = await ai.models.generateContentStream({
      model: CHAT_MODEL,
      contents: history,
      config: {
        systemInstruction: systemPrompt(),
        // Warm enough to have a voice, cool enough not to start embellishing
        // facts about someone's career.
        temperature: 0.6,
        maxOutputTokens: 700,
      },
    });

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = chunk.text;
              if (text) controller.enqueue(line({ type: "text", delta: text }));
            }
          } catch (err) {
            // A mid-stream failure has already sent the visitor some words, so
            // the honest move is to finish the sentence with an admission
            // rather than leave it hanging.
            console.error("[laudbot:stream-error]", err);
            controller.enqueue(
              line({ type: "text", delta: "\n\nSomething went wrong on my end there. Ask me again?" }),
            );
          }
          controller.enqueue(line({ type: "done" }));
          controller.close();
        },
      }),
      { headers: { "Content-Type": "application/x-ndjson; charset=utf-8" } },
    );
  } catch (err) {
    console.error("[laudbot:call-failed]", err);
    return singleShot({
      type: "error",
      text: "I couldn't reach my brain just then. Give it a moment and try again, or email Laud at asantelaud@gmail.com.",
    });
  }
}
