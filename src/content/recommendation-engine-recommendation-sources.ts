import type { DocPageContent } from "@/lib/docs";

export const recommendationEngineSourcesContent: DocPageContent = {
  slug: "recommendation-engine/recommendation-sources",
  title: "Recommendation Sources",
  description: "Input sources that drive recommendation generation and confidence scoring.",
  sections: [
    {
      title: "Primary Sources",
      body: [
        "AudioFeatures: baseline quality signals (noise, clipping, loudness, etc.).",
        "Comparison results: measured differences and risk summaries between versions.",
        "User intent: declared goal and constraints.",
        "History: prior accepted/rejected decisions and user preferences.",
      ],
      code: `type RecommendationSource =
  | 'audio_features'
  | 'comparison_results'
  | 'user_intent'
  | 'history'`,
    },
    {
      title: "Source Fusion Logic Examples",
      body: [
        "If medium noise is detected and user intent is clarity, recommend gentle noise reduction.",
        "If prior comparison improved clarity but reduced warmth, recommend refinement instead of automatic accept.",
        "If an action was already tried without improvement, do not suggest it again without explicit explanation.",
      ],
      code: `example rules
if noiseLevel in ['medium','high'] and intent == 'clarity':
  recommend('gentle_noise_reduction')

if comparison.clarityImproved and comparison.warmthReduced:
  recommend('refine_processing')

if history.actionTried and !history.improved:
  suppressRepeat(action) unless explanationProvided == true`,
    },
  ],
};
