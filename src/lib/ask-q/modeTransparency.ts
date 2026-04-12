import type { AskQResponseMode } from "@/lib/ask-q/responseMode";

/**
 * Short user-facing lines: how this reply was produced (expectations / trust model).
 */
export const ASK_Q_MODE_TRANSPARENCY: Partial<Record<AskQResponseMode, string>> = {
  gemini: "Model answer grounded in glossary, terminology registry, and docs index excerpts.",
  retrieval: "Catalog-only reply (no generative model for this turn).",
  retrieval_fallback: "Catalog fallback after the model path failed.",
  match_gate: "Catalog-only — match strength was below the model threshold.",
  output_guard: "Catalog fallback — the draft reply did not pass output checks.",
  daily_limit: "Catalog answer with quota notice — model daily limit reached.",
  client_fallback: "Local catalog summary — the server reply was unavailable.",
};

export function transparencyLineForMode(mode: AskQResponseMode | undefined): string | undefined {
  if (!mode) return undefined;
  return ASK_Q_MODE_TRANSPARENCY[mode];
}
