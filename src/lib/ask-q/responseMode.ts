/** Values returned by POST /api/ask-q (and client-only paths). */
export type AskQResponseMode =
  | "greeting"
  | "low_signal"
  | "gemini"
  | "retrieval"
  | "retrieval_fallback"
  | "daily_limit"
  | "client_fallback";

export function isAskQResponseMode(v: unknown): v is AskQResponseMode {
  return (
    v === "greeting" ||
    v === "low_signal" ||
    v === "gemini" ||
    v === "retrieval" ||
    v === "retrieval_fallback" ||
    v === "daily_limit" ||
    v === "client_fallback"
  );
}
