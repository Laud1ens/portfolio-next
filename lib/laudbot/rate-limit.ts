/**
 * Per-visitor limits on a public endpoint that spends someone else's money.
 *
 * Gemini's free tier is roughly a thousand requests a day. Laudbot is reachable
 * by anyone with the URL, and without a limit a single bored visitor holding
 * down enter, or one crawler that finds the endpoint, exhausts the day's quota
 * and the bot is dead for every recruiter who arrives after them. That is the
 * failure this prevents.
 *
 * KNOWN LIMITATION, stated rather than hidden: this is in-process memory. It
 * resets on every deploy and it does not coordinate across instances. For one
 * container serving a personal site that is the right trade, because the
 * alternative is provisioning Redis for a portfolio. If this ever runs on more
 * than one instance, this file is a lie and needs replacing with something
 * shared, not tuning.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_IN_WINDOW = 15;

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_IN_DAY = 60;

/** Stops the map growing without bound on a long-lived process. Anything with
 *  no activity for a day cannot affect either limit, so it can go. */
const PRUNE_EVERY_MS = 60 * 60 * 1000;

const hits = new Map<string, number[]>();
let lastPrune = 0;

function prune(now: number) {
  if (now - lastPrune < PRUNE_EVERY_MS) return;
  lastPrune = now;
  for (const [key, times] of hits) {
    const live = times.filter((t) => now - t < DAY_MS);
    if (live.length === 0) hits.delete(key);
    else hits.set(key, live);
  }
}

export interface RateVerdict {
  allowed: boolean;
  /** Seconds until the visitor may try again. Only meaningful when blocked. */
  retryAfter: number;
  /** What the visitor is told. Kept in character rather than reading like a
   *  502, because the person hitting this is far more likely to be curious
   *  than malicious. */
  message?: string;
}

export function checkRateLimit(ip: string, now = Date.now()): RateVerdict {
  prune(now);

  const times = (hits.get(ip) ?? []).filter((t) => now - t < DAY_MS);

  const inWindow = times.filter((t) => now - t < WINDOW_MS);
  if (inWindow.length >= MAX_IN_WINDOW) {
    const oldest = Math.min(...inWindow);
    return {
      allowed: false,
      retryAfter: Math.ceil((WINDOW_MS - (now - oldest)) / 1000),
      message:
        "You've asked me a lot in a short stretch, which I like, but I need a breather. Try me again in a few minutes. If you'd rather not wait, asantelaud@gmail.com reaches Laud directly.",
    };
  }

  if (times.length >= MAX_IN_DAY) {
    const oldest = Math.min(...times);
    return {
      allowed: false,
      retryAfter: Math.ceil((DAY_MS - (now - oldest)) / 1000),
      message:
        "That's my limit for today from this connection. Laud is at asantelaud@gmail.com if you want to carry on the conversation properly.",
    };
  }

  times.push(now);
  hits.set(ip, times);
  return { allowed: true, retryAfter: 0 };
}

/** Best guess at who is calling.
 *
 *  Behind Railway's proxy the socket address is the proxy, so the forwarded
 *  header is the only thing that distinguishes visitors. It is trivially
 *  spoofable, which matters less than it sounds: this limit exists to stop
 *  accidental quota exhaustion, not a determined attacker, and someone willing
 *  to rotate the header was never going to be stopped by an in-memory counter.
 *  Falling back to a shared bucket is deliberate. If the header is missing,
 *  everyone shares one limit, which fails closed rather than open. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip")?.trim() || "unknown-shared-bucket";
}
