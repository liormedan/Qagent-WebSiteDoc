import type { DocPageContent } from "@/lib/docs";

export const recommendationEngineIndexContent: DocPageContent = {
  slug: "recommendation-engine",
  title: "Recommendation Engine",
  description: "Section index for proactive audio recommendations, tradeoffs, confidence, and user-facing justification.",
  sections: [
    {
      title: "Section Scope",
      body: [
        "This section defines how Q generates and explains audio recommendations before execution.",
        "It focuses on recommendation quality and decision support, not runtime DSP implementation.",
        "Recommendation engine participates as a service inside orchestration flow, alongside comparison and reasoning.",
        "Recommendation may occur before execution.",
        "Recommendation may also occur after execution result review.",
      ],
      code: `Read next:
1) /docs/recommendation-engine/overview
2) /docs/recommendation-engine/recommendation-model
3) /docs/recommendation-engine/recommendation-sources
4) /docs/recommendation-engine/tradeoffs
5) /docs/recommendation-engine/recommendation-flow
6) /docs/recommendation-engine/integration-with-comparison
7) /docs/recommendation-engine/ux-presentation

Cross-links:
- /docs/audio-comparison
- /docs/reasoning-system
- /docs/decision-with-user
- /docs/audio-memory
- /docs/orchestration/orchestration-flow
- /docs/execution-runtime/runtime-integration`,
    },
  ],
};
