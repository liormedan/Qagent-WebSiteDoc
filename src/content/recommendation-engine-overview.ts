import type { DocPageContent } from "@/lib/docs";

export const recommendationEngineOverviewContent: DocPageContent = {
  slug: "recommendation-engine/overview",
  title: "Recommendation Engine Overview",
  description: "Why proactive recommendations matter and how they integrate with Q decision behavior.",
  sections: [
    {
      title: "Why Recommendations Matter",
      body: [
        "Recommendations turn analysis output into concrete next-step guidance for the user.",
        "They reduce decision friction by surfacing likely beneficial actions before execution.",
        "They make Q proactive rather than purely reactive.",
        "In audio workflows, recommendation quality is critical because processing actions have audible tradeoffs.",
      ],
    },
    {
      title: "Response Vs Recommendation",
      body: [
        "Response answers the current question in text.",
        "Recommendation proposes one or more actions with expected impact and tradeoffs.",
        "Recommendations are decision artifacts, not only conversational outputs.",
        "Q can respond and Q can recommend; these are related but separate outputs.",
      ],
      code: `response -> informational output
recommendation -> action-oriented proposal + confidence`,
    },
    {
      title: "How It Integrates With Q",
      body: [
        "Q collects audio signals, comparison evidence, and intent context before suggesting actions.",
        "The recommendation layer feeds decision-with-user flow and waits for explicit approval.",
        "Recommendation does not bypass user approval, and recommendation is proactive, not only reactive.",
      ],
      code: `Related docs:
- /docs/reasoning-system
- /docs/decision-with-user
- /docs/audio-comparison`,
    },
  ],
};
