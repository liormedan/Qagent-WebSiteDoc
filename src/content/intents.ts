import type { DocPageContent } from "@/lib/docs";

export const intentsContent: DocPageContent = {
  slug: "intents",
  title: "Intents",
  description:
    "Initial intent catalog, classification rules, fallback behavior, and confidence policy for Q v1.",
  sections: [
    {
      title: "Intent Type Catalog",
      body: [
        "Created by intent classifier before planning.",
        "Consumed by planner strategy selection and DAL action mapping.",
      ],
      code: `export type QIntentType =
  | "enhance_voice"
  | "remove_noise"
  | "master_track"
  | "normalize_loudness"
  | "trim_silence"
  | "unknown";`,
    },
    {
      title: "Detection Rules",
      body: [
        "enhance_voice: detected from phrases like 'make voice clearer', 'boost speech presence'.",
        "remove_noise: detected from 'clean noise', 'remove hiss', 'reduce hum'.",
        "master_track: detected from 'finalize', 'master this track'.",
        "normalize_loudness: detected from LUFS/volume balancing requests.",
        "trim_silence: detected from silence cleanup and dead-air removal phrases.",
      ],
    },
    {
      title: "Fallback To Unknown",
      body: [
        "Use unknown when intent evidence is weak, contradictory, or out-of-domain.",
        "unknown should trigger clarify-first behavior instead of speculative planning.",
      ],
      code: `function shouldFallbackToUnknown(input: { score: number; evidence: string[]; contradictory: boolean }): boolean {
  return input.score < 0.6 || input.evidence.length === 0 || input.contradictory;
}`,
    },
    {
      title: "Confidence Logic",
      body: [
        "Confidence is scored in range 0..1 based on lexical signal strength + context match.",
        "Recommended policy: >0.85 high confidence, 0.6-0.85 medium, <0.6 unknown fallback.",
      ],
      code: `interface IntentScore {
  type: QIntentType;
  confidence: number;
  evidence: string[];
}

function chooseIntent(scores: IntentScore[]): IntentScore {
  const sorted = [...scores].sort((a, b) => b.confidence - a.confidence);
  const top = sorted[0] ?? { type: "unknown", confidence: 0, evidence: [] };
  if (top.confidence < 0.6) {
    return { type: "unknown", confidence: top.confidence, evidence: top.evidence };
  }
  return top;
}`,
    },
    {
      title: "Examples",
      body: [
        "Examples for deterministic classification behavior.",
      ],
      code: `const examples = [
  { text: "clean background noise", intent: "remove_noise", confidence: 0.9 },
  { text: "make my vocals more present", intent: "enhance_voice", confidence: 0.88 },
  { text: "final polish for release", intent: "master_track", confidence: 0.83 },
  { text: "do something nice", intent: "unknown", confidence: 0.34 },
] as const;`,
    },
  ],
};