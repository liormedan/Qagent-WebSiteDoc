import type { DocPageContent } from "@/lib/docs";

export const orchestrationIndexContent: DocPageContent = {
  slug: "orchestration",
  title: "Orchestration",
  description: "Section index for Q orchestration layer, agent coordination, shared state, and system-level control flow.",
  sections: [
    {
      title: "Section Scope",
      body: [
        "This section defines how Q components operate as one orchestrated system.",
        "It specifies coordination contracts and control flow only, with no runtime DSP implementation.",
        "Runtime is downstream of approved orchestrated decisions.",
        "Lifecycle is the temporal frame around orchestration.",
      ],
      code: `Read next:
1) /docs/orchestration/overview
2) /docs/orchestration/agent-roles
3) /docs/orchestration/communication-model
4) /docs/orchestration/routing-logic
5) /docs/orchestration/shared-state
6) /docs/orchestration/orchestration-flow
7) /docs/orchestration/state-machine
8) /docs/orchestration/conflict-resolution
9) /docs/orchestration/failure-handling
10) /docs/orchestration/ui-reflection

Cross-links:
- /docs/architecture
- /docs/reasoning-system
- /docs/recommendation-engine
- /docs/audio-sandbox
- /docs/execution-runtime/overview
- /docs/lifecycle/overview`,
    },
  ],
};
