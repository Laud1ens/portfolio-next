import type { SensitiveCategory } from "@/lib/laudbot/sensitive";

/**
 * Getting a flagged question to Laud.
 *
 * The thing that must never happen here is a visitor being told "he'll be in
 * touch" when nothing was sent. A recruiter who asks about salary, is promised
 * a reply, and never gets one is worse off than one who was told plainly that
 * the form was not working and here is his email address.
 *
 * So this function reports honestly whether it delivered, the route passes
 * that through, and the UI shows a direct mail link on failure instead of a
 * success message. There is no code path where a submission is accepted and
 * quietly dropped.
 *
 * Every flagged question is also written to the server log before any network
 * call, so even total email failure leaves a record Laud can go and read.
 */

const ENDPOINT = "https://api.resend.com/emails";

export interface FlaggedQuestion {
  question: string;
  category: SensitiveCategory;
  visitorEmail?: string;
  /** Anything the visitor added when leaving their address. */
  note?: string;
  /** The few turns before this, for context. */
  recentTurns?: string[];
}

export interface DeliveryResult {
  delivered: boolean;
  /** Present only on failure, and written for Laud reading logs, not for the
   *  visitor. The visitor gets a fallback, never this string. */
  reason?: string;
}

export async function notifyLaud(flagged: FlaggedQuestion): Promise<DeliveryResult> {
  // Log first, unconditionally. If Resend is down, misconfigured, or the
  // request times out, this line is still in the Railway logs.
  console.info(
    "[laudbot:flagged]",
    JSON.stringify({
      category: flagged.category,
      question: flagged.question,
      visitorEmail: flagged.visitorEmail ?? null,
      note: flagged.note ?? null,
    }),
  );

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { delivered: false, reason: "RESEND_API_KEY is not set on this service." };
  }

  const to = process.env.LAUDBOT_NOTIFY_TO || "asantelaud@gmail.com";
  // Resend's shared onboarding sender works without a verified domain, but it
  // will only deliver to the address that owns the Resend account. That is
  // exactly the case here, since the only recipient is Laud, so it is a usable
  // default rather than a placeholder.
  const from = process.env.LAUDBOT_FROM || "Laudbot <onboarding@resend.dev>";

  const body = [
    `Someone asked Laudbot a ${flagged.category} question on the portfolio.`,
    "",
    "THEIR QUESTION",
    flagged.question,
    "",
    flagged.visitorEmail ? `REPLY TO: ${flagged.visitorEmail}` : "They did not leave an email address.",
    flagged.note ? `\nTHEIR NOTE\n${flagged.note}` : "",
    flagged.recentTurns?.length
      ? `\nEARLIER IN THE CONVERSATION\n${flagged.recentTurns.join("\n")}`
      : "",
    "",
    "Laudbot did not attempt to answer this. It told them you would reply directly.",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    // A slow mail provider must not hold a visitor's chat request open. Eight
    // seconds is far longer than Resend normally needs and short enough that a
    // hung call still ends in an honest fallback rather than a spinner.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // No em-dash, and specific enough to find in a busy inbox.
        subject: `Laudbot flagged a ${flagged.category} question`,
        text: body,
        ...(flagged.visitorEmail ? { reply_to: flagged.visitorEmail } : {}),
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[laudbot:notify-failed]", res.status, detail);
      return { delivered: false, reason: `Resend returned ${res.status}.` };
    }
    return { delivered: true };
  } catch (err) {
    console.error("[laudbot:notify-error]", err);
    return {
      delivered: false,
      reason: err instanceof Error ? err.message : "Unknown error sending mail.",
    };
  }
}
