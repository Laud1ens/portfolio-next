"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FlagForm } from "@/components/laudbot/flag-form";

/**
 * Laudbot, the chat widget.
 *
 * Deliberately a plain fixed panel rather than a modal. A recruiter reading a
 * case study and asking "what does that number mean" should be able to see
 * both at once, so this never takes the page over on desktop and never locks
 * the body scroll. On a phone there is no room for that, so it goes
 * full-height, which is the one place a takeover is the right answer.
 *
 * The transport is NDJSON rather than plain text streaming, because a reply
 * can carry more than words: a sensitive question comes back flagged, and the
 * widget has to render an email form instead of an answer. One typed stream
 * keeps that decision on the server next to the classifier.
 */

type Role = "user" | "model";
interface Message {
  role: Role;
  text: string;
  /** Set when the server refused to answer and offered to pass it on. */
  flagged?: { category: string; question: string };
}

/** The first thing anyone reads, so it does the introducing rather than
 *  waiting to be asked.
 *
 *  It is one message, not three. An assistant that opens with a wall is one
 *  people close, and the 24/7 line has to earn its place by being short: the
 *  useful fact is that nobody is waiting on Laud's inbox to get an answer
 *  about his work, not that the server has uptime. */
const GREETING =
  "Hi, I'm Laudbot. Think of me as Laud with the sleep schedule taken out: I'm here at 3am, on a Sunday, whenever you happen to be reading this. I know his work about as well as he does, because he's the one who wrote all of it into me. What can I help you with?";

const SUGGESTIONS = [
  "Explain a project like I'm not technical",
  "What's he building right now?",
  "Has he used Docker or Kubernetes?",
  "Why Isolation Forest over Random Forest?",
];

/** The LB monogram, used on the launcher and in the panel header.
 *
 *  Same mark in both places on purpose. The launcher is what someone clicks
 *  and the header is what they see for the rest of the conversation, so a
 *  different treatment in each would read as two different things. */
function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-xl bg-rust font-display font-semibold leading-none tracking-tight text-paper ${className}`}
    >
      LB
    </span>
  );
}

export function Laudbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "model", text: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view as it streams in.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || busy) return;

      setInput("");
      setBusy(true);

      const history: Message[] = [...messages, { role: "user", text: trimmed }];
      setMessages(history);

      try {
        const res = await fetch("/api/laudbot/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map((m) => ({ role: m.role, text: m.text })),
          }),
        });

        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let started = false;

        // Read line-delimited JSON. A chunk can split a line anywhere, so the
        // tail stays in the buffer until its newline arrives.
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const raw of lines) {
            if (!raw.trim()) continue;
            let evt: {
              type: string;
              text?: string;
              delta?: string;
              category?: string;
              offerEmail?: boolean;
            };
            try {
              evt = JSON.parse(raw);
            } catch {
              continue;
            }

            if (evt.type === "text" && evt.delta) {
              const delta = evt.delta;
              setMessages((prev) => {
                if (!started) {
                  started = true;
                  return [...prev, { role: "model", text: delta }];
                }
                const copy = [...prev];
                copy[copy.length - 1] = {
                  ...copy[copy.length - 1],
                  text: copy[copy.length - 1].text + delta,
                };
                return copy;
              });
            } else if (evt.type === "sensitive") {
              setMessages((prev) => [
                ...prev,
                {
                  role: "model",
                  text: evt.text ?? "",
                  flagged: evt.offerEmail
                    ? { category: evt.category ?? "feedback", question: trimmed }
                    : undefined,
                },
              ]);
            } else if (evt.type === "error") {
              setMessages((prev) => [...prev, { role: "model", text: evt.text ?? "Something went wrong." }]);
            }
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "I lost the connection there. Try again, or email Laud at asantelaud@gmail.com.",
          },
        ]);
      } finally {
        setBusy(false);
      }
    },
    [busy, messages],
  );

  return (
    <>
      {/* Launcher. Hidden while the panel is open so it cannot sit on top of
          its own close button on a small screen.

          A horizontal card rather than the usual circular bubble. A bare
          circle has to be recognised before it can be clicked, and a mark
          nobody has seen before is not recognisable, so it gets ignored as
          decoration. Putting the monogram next to words that say what it does
          means the first read is free. */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Laudbot, the chat assistant for this portfolio. Available any time."
          className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-2xl border border-paper/10 bg-brown-deep py-2.5 pl-2.5 pr-4 text-left shadow-[0_12px_34px_-10px_rgba(58,42,29,0.6)] transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust motion-reduce:transition-none"
        >
          <Monogram className="h-9 w-9 text-[0.95rem]" />
          <span className="min-w-0">
            <span className="block font-label text-sm font-medium text-paper">Ask Laudbot</span>
            <span className="mt-0.5 flex items-center gap-1.5 font-label text-[0.66rem] uppercase tracking-wider text-paper/60">
              <span aria-hidden className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rust opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rust" />
              </span>
              Awake 24/7
            </span>
          </span>
        </button>
      )}

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Laudbot"
          aria-modal="false"
          className="fixed inset-0 z-50 flex flex-col bg-paper shadow-2xl sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(620px,calc(100vh-2.5rem))] sm:w-[400px] sm:rounded-2xl sm:border sm:border-brown-deep/15"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-brown-deep/10 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <Monogram className="h-8 w-8 text-[0.85rem]" />
              <div className="min-w-0">
                <p className="font-display text-base font-semibold leading-tight text-brown-deep">
                  Laudbot
                </p>
                <p className="truncate font-label text-[0.68rem] uppercase tracking-wider text-brown/60">
                  Awake 24/7 · Answers from Laud&apos;s work only
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Laudbot"
              className="rounded-lg px-2.5 py-1.5 text-xl leading-none text-brown/70 transition-colors hover:bg-cream hover:text-brown-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            >
              ×
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brown-deep px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-paper"
                      : "max-w-[92%] rounded-2xl rounded-bl-sm bg-cream px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-brown whitespace-pre-wrap"
                  }
                >
                  {m.text}
                </div>
                {m.flagged && (
                  <FlagForm category={m.flagged.category} question={m.flagged.question} />
                )}
              </div>
            ))}

            {busy && (
              <div className="flex w-fit gap-1 rounded-2xl rounded-bl-sm bg-cream px-3.5 py-3">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-brown/45 motion-reduce:animate-none"
                    style={{ animationDelay: `${d * 0.12}s` }}
                  />
                ))}
                <span className="sr-only">Laudbot is typing</span>
              </div>
            )}

            {/* Only while the conversation is still empty. Once someone is
                actually talking, chips are clutter. */}
            {messages.length === 1 && !busy && (
              <ul className="space-y-1.5 pt-1">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => send(s)}
                      className="w-full rounded-lg border border-brown-deep/15 bg-white px-3 py-2 text-left text-[0.82rem] text-brown transition-colors hover:border-rust/50 hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex shrink-0 items-center gap-2 border-t border-brown-deep/10 px-3 py-3"
          >
            <label htmlFor="laudbot-input" className="sr-only">
              Ask Laudbot a question
            </label>
            <input
              id="laudbot-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any project..."
              maxLength={1200}
              autoComplete="off"
              className="min-w-0 flex-1 rounded-lg border border-brown-deep/15 bg-white px-3 py-2.5 text-[0.9rem] text-brown placeholder:text-brown/40 focus:border-rust/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="shrink-0 rounded-lg bg-rust px-4 py-2.5 font-label text-sm font-medium text-paper transition-opacity disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
