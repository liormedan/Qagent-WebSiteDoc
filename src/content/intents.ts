import type { DocPageContent } from "@/lib/docs";

export const intentsContent: DocPageContent = {
  slug: "intents",
  title: "Intents",
  description:
    "Intent resolution strategy combining rule-based parsing, model-assisted refinement, and bounded clarification.",
  sections: [
    {
      title: "Intent Categories",
      body: [
        "audio_query: asks about audio content/state (timestamps, words, silence, noise presence).",
        "audio_analysis: asks to inspect or evaluate audio before action.",
        "audio_processing: asks to change audio (requires planning and possibly DAL).",
      ],
      code: `type QRequestIntentCategory = "audio_query" | "audio_analysis" | "audio_processing";`,
    },
    {
      title: "Intent Type Catalog",
      body: [
        "Intent type definitions are canonical in /docs/contracts.",
        "This page focuses on resolution strategy and decision policy.",
      ],
      code: `// Canonical source: /docs/contracts
// type QIntentType = "enhance_voice" | "remove_noise" | ... | "unknown";`,
    },
    {
      title: "Intent Resolution Strategy",
      body: [
        "Step 1: rule-based detection from user text and explicit keywords.",
        "Step 2: model-assisted refinement when confidence is not high.",
        "Step 3: fallback to unknown or clarification when ambiguity remains.",
      ],
      code: `interface IntentResolutionPolicy {
  high: 0.85;
  medium: 0.6;
}

// Decision ladder
// confidence >= high   -> continue
// medium <= confidence < high -> internal reasoning
// confidence < medium  -> ask user`,
    },
    {
      title: "Clarification Triggers",
      body: [
        "Ask user when candidate intents have similar scores.",
        "Ask user when intent is execution-critical but under medium threshold.",
        "Do not ask when intent is already high-confidence and specific.",
      ],
      code: `function shouldAskClarification(input: {
  topConfidence: number;
  secondConfidence: number;
  isExecutionCritical: boolean;
}): boolean {
  const ambiguous = Math.abs(input.topConfidence - input.secondConfidence) < 0.12;
  return input.topConfidence < 0.6 || (ambiguous && input.isExecutionCritical);
}`,
    },
    {
      title: "Examples",
      body: [
        "Each case below demonstrates which branch of the resolution ladder is selected.",
      ],
      code: `const examples = [
  { text: "remove background noise", result: "audio_processing:remove_noise" },
  { text: "where did they say hello", result: "audio_query:text_lookup" },
  { text: "check if this has noise", result: "audio_analysis:noise_presence" },
  { text: "make it better", result: "ambiguous -> reasoning" },
] as const;`,
    },
  ],
};