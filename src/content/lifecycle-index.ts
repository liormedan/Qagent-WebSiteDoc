import type { DocPageContent } from "@/lib/docs";

export const lifecycleIndexContent: DocPageContent = {
  slug: "lifecycle",
  title: "Lifecycle",
  description: "Section index for session lifecycle, interaction loops, version lifecycle, events, and end states.",
  sections: [
    {
      title: "Section Scope",
      body: [
        "Lifecycle defines temporal continuity around orchestration and runtime execution.",
        "It specifies how sessions start, evolve, repeat, and end with persistent traceability.",
      ],
      code: `Read next:
1) /docs/lifecycle/overview
2) /docs/lifecycle/session-model
3) /docs/lifecycle/interaction-loop
4) /docs/lifecycle/version-lifecycle
5) /docs/lifecycle/system-events
6) /docs/lifecycle/end-states

Cross-links:
- /docs/orchestration
- /docs/execution-runtime
- /docs/audio-memory
- /docs/audio-comparison`,
    },
  ],
};

