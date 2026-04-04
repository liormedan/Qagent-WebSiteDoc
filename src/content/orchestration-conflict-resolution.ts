import type { DocPageContent } from "@/lib/docs";

export const orchestrationConflictResolutionContent: DocPageContent = {
  slug: "orchestration/conflict-resolution",
  title: "Orchestration Conflict Resolution",
  description: "Resolution policy when system signals, recommendations, and user preference are misaligned.",
  sections: [
    {
      title: "Conflict Cases",
      body: [
        "recommendation != comparison: prioritize measured evidence and lower recommendation confidence.",
        "user request != system suggestion: preserve user intent while exposing safety and quality tradeoffs.",
        "low confidence: avoid direct action and request clarification or present conservative options.",
      ],
      code: `conflict policy
if recommendation_conflicts_with_comparison -> downrank recommendation
if user_preference_conflicts_with_system -> show tradeoffs, keep user control
if confidence_low -> ask/offer alternatives`,
    },
  ],
};
