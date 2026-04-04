import type { DocPageContent } from "@/lib/docs";

export const recommendationEngineFlowContent: DocPageContent = {
  slug: "recommendation-engine/recommendation-flow",
  title: "Recommendation Flow",
  description: "Stage flow from analysis to user approval and final execution handoff.",
  sections: [
    {
      title: "Flow Stages",
      body: [
        "Audio Analysis -> Detection -> Recommendation -> User Confirmation -> Execution",
        "Recommendation stage consolidates sources and emits ranked options with confidence.",
      ],
      code: `Audio Analysis
  -> Detection
  -> Recommendation
  -> User Confirmation
  -> Execution`,
    },
    {
      title: "Flow Branches",
      body: [
        "Recommendation before execution when analysis indicates actionable improvement.",
        "Recommendation after comparison when measured deltas clarify better/worse outcomes.",
        "Recommendation after failed result to propose safer or narrower alternatives.",
        "Recommendation after explicit user prompt such as \"what do you suggest?\".",
      ],
    },
    {
      title: "Blocking Rules",
      body: [
        "No execution without user confirmation when recommendation implies processing.",
        "No recommendation without evidence from at least one valid source.",
        "No high-certainty recommendation when confidence is low; present framed suggestion options instead.",
      ],
      code: `if recommendation.impliesProcessing and !userConfirmed:
  blockExecution()

if recommendation.evidence.length == 0:
  doNotRecommend()

if recommendation.confidence < 0.6:
  presentSuggestionOptions()`,
    },
  ],
};
