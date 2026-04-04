import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeIndexContent: DocPageContent = {
  slug: "execution-runtime",
  title: "Execution Runtime",
  description: "Section index for runtime execution contracts, states, progress, output versioning, and failure controls.",
  sections: [
    {
      title: "Section Scope",
      body: [
        "This section defines execution runtime behavior after approved decisions and DAL generation.",
        "It specifies contracts, states, lifecycle integration, and feedback only, without runtime DSP implementation.",
      ],
      code: `Read next:
1) /docs/execution-runtime/overview
2) /docs/execution-runtime/execution-contracts
3) /docs/execution-runtime/runtime-states
4) /docs/execution-runtime/progress-feedback
5) /docs/execution-runtime/output-versioning
6) /docs/execution-runtime/runtime-integration
7) /docs/execution-runtime/error-handling
8) /docs/execution-runtime/cancellation-and-retry

Cross-links:
- /docs/orchestration
- /docs/decision-with-user
- /docs/audio-memory
- /docs/audio-comparison
- /docs/lifecycle/overview`,
    },
  ],
};

