import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null | undefined;

/** The client, or null when GEMINI_API_KEY is not configured.
 *
 *  Null rather than a thrown error, because an unconfigured key is a normal
 *  state for this site: it deploys before the variable is set, and the right
 *  behaviour then is a chat widget that says it is not switched on yet, not a
 *  500 on every page that renders it. */
export function getGeminiClient(): GoogleGenAI | null {
  if (client !== undefined) return client;
  const apiKey = process.env.GEMINI_API_KEY;
  client = apiKey ? new GoogleGenAI({ apiKey }) : null;
  return client;
}

/**
 * gemini-2.5-flash was retired for newly issued API keys and returns a hard
 * 404 ("no longer available to new users"), which is what broke the two chat
 * agents on Laud's other project. gemini-3.6-flash is the replacement and is
 * confirmed working against his key.
 *
 * Overridable so the next retirement is an environment variable rather than a
 * code change and a deploy. Newer Flash generations have shipped since; they
 * are worth trying here by setting GEMINI_MODEL, not by editing this default,
 * because the default is the one that has actually been run.
 */
export const CHAT_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
