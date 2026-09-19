"use client";

import { useState } from "react";

/**
 * Where a question Laudbot refused actually goes.
 *
 * The one rule this component exists to enforce: never tell someone their
 * message was sent when it was not. The endpoint reports delivery honestly,
 * and a failure renders a pre-filled compose link with a plain explanation
 * rather than a success tick. A recruiter who is told "he'll be in touch" and
 * then hears nothing is worse off than one who was handed his email address.
 */

type State =
  | { phase: "idle" }
  | { phase: "sending" }
  | { phase: "sent"; message: string }
  | { phase: "failed"; message: string; fallbackUrl?: string };

export function FlagForm({ category, question }: { category: string; question: string }) {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<State>({ phase: "idle" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState({ phase: "sending" });
    try {
      const res = await fetch("/api/laudbot/flag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, question, email, note }),
      });
      const data = await res.json();
      setState(
        data.delivered
          ? { phase: "sent", message: data.message }
          : { phase: "failed", message: data.message, fallbackUrl: data.fallbackUrl },
      );
    } catch {
      setState({
        phase: "failed",
        message:
          "That didn't go through, and I won't pretend otherwise. Email him directly at asantelaud@gmail.com.",
      });
    }
  }

  if (state.phase === "sent") {
    return (
      <p className="mt-2 rounded-lg border-l-2 border-rust bg-cream px-3 py-2 text-[0.82rem] leading-relaxed text-brown">
        {state.message}
      </p>
    );
  }

  if (state.phase === "failed") {
    return (
      <div className="mt-2 rounded-lg border-l-2 border-rust bg-cream px-3 py-2 text-[0.82rem] leading-relaxed text-brown">
        <p>{state.message}</p>
        <a
          href={state.fallbackUrl ?? "mailto:asantelaud@gmail.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-block font-label font-medium text-rust hover:underline"
        >
          Open that email ↗
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-2 space-y-2 rounded-lg border border-rust/30 bg-cream p-3">
      <label htmlFor={`flag-email-${category}`} className="sr-only">
        Your email address
      </label>
      <input
        id={`flag-email-${category}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full rounded-md border border-brown-deep/15 bg-white px-2.5 py-2 text-[0.82rem] text-brown placeholder:text-brown/40 focus:border-rust/50 focus:outline-none"
      />
      <label htmlFor={`flag-note-${category}`} className="sr-only">
        Anything else Laud should know
      </label>
      <textarea
        id={`flag-note-${category}`}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        placeholder="The role, or anything else worth knowing (optional)"
        className="w-full resize-none rounded-md border border-brown-deep/15 bg-white px-2.5 py-2 text-[0.82rem] text-brown placeholder:text-brown/40 focus:border-rust/50 focus:outline-none"
      />
      <button
        type="submit"
        disabled={state.phase === "sending"}
        className="w-full rounded-md bg-brown-deep px-3 py-2 font-label text-[0.8rem] font-medium text-paper transition-opacity disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
      >
        {state.phase === "sending" ? "Passing it on..." : "Send this to Laud"}
      </button>
    </form>
  );
}
