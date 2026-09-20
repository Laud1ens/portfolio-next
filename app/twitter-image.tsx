/**
 * Twitter and X read `twitter:image`, and Next.js only emits that tag from a
 * `twitter-image` file. Without this, the Open Graph card above covers
 * LinkedIn, Facebook, Slack and iMessage, and X alone falls back to no image.
 *
 * Re-exported rather than duplicated so the two can never drift apart.
 */
export { default, alt, size, contentType } from "./opengraph-image";
