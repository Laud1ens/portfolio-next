import { NextRequest, NextResponse } from "next/server";
import { notifyLaud } from "@/lib/laudbot/notify";
import { checkRateLimit, clientKey } from "@/lib/laudbot/rate-limit";
import type { SensitiveCategory } from "@/lib/laudbot/sensitive";

export const runtime = "nodejs";

const CATEGORIES: SensitiveCategory[] = [
  "compensation",
  "availability",
  "immigration",
  "references",
  "negotiation",
  "feedback",
  "personal",
];

/** Where the visitor is sent when the mail provider is unavailable.
 *
 *  This is the whole point of the endpoint returning `delivered` honestly. A
 *  form that accepts a recruiter's question, says "he'll be in touch", and
 *  drops it because an API key is missing is worse than having no form: the
 *  visitor stops chasing and never finds out. So a failure hands back a
 *  pre-filled compose link and the UI tells them plainly to use it. */
function composeFallback(question: string, email?: string) {
  const body = [
    "Hi Laud,",
    "",
    "I asked Laudbot this on your portfolio and it passed me over to you:",
    "",
    question,
    "",
    email ? `You can reply to me at ${email}.` : "",
    "",
    "Thanks",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    "https://mail.google.com/mail/?view=cm&fs=1&to=asantelaud%40gmail.com&su=" +
    encodeURIComponent("A question from your portfolio") +
    "&body=" +
    encodeURIComponent(body)
  );
}

export async function POST(req: NextRequest) {
  const rate = checkRateLimit(clientKey(req.headers));
  if (!rate.allowed) {
    return NextResponse.json(
      { delivered: false, message: rate.message },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  let body: { question?: string; category?: string; email?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ delivered: false, message: "Malformed request." }, { status: 400 });
  }

  const question = (body.question ?? "").trim().slice(0, 1200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const note = (body.note ?? "").trim().slice(0, 1200);
  const category = CATEGORIES.includes(body.category as SensitiveCategory)
    ? (body.category as SensitiveCategory)
    : "feedback";

  if (!question) {
    return NextResponse.json(
      { delivered: false, message: "There was no question to pass on." },
      { status: 400 },
    );
  }

  // Deliberately loose. This is a "did they fat-finger it" check, not
  // validation: rejecting an unusual but valid address costs Laud a lead,
  // while letting a malformed one through costs him nothing, because the
  // question itself still arrives in his inbox either way.
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { delivered: false, message: "That email address doesn't look right. Mind checking it?" },
      { status: 400 },
    );
  }

  const result = await notifyLaud({ question, category, visitorEmail: email || undefined, note: note || undefined });

  if (!result.delivered) {
    return NextResponse.json({
      delivered: false,
      message:
        "I couldn't get that to his inbox, and I'd rather say so than pretend. This link opens an email with your question already in it.",
      fallbackUrl: composeFallback(question, email || undefined),
    });
  }

  return NextResponse.json({
    delivered: true,
    message: email
      ? "Sent. He's got your question and your address, and he answers these himself."
      : "Sent. He's got your question. Add an email next time if you want a reply back.",
  });
}
