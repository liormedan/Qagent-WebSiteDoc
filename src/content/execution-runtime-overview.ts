import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeOverviewContent: DocPageContent = {
  slug: "execution-runtime/overview",
  title: "Execution Runtime Overview",
  description: "Execution runtime role and boundaries inside the end-to-end Q system.",
  sections: [
    {
      title: "What Execution Runtime Is",
      body: [
        "Execution Runtime is the subsystem that performs approved audio operations defined by AudioDAL.",
        "It is downstream from decision and orchestration, and upstream from version creation and review.",
      ],
    },
    {
      title: "Why It Is Required",
      body: [
        "It converts approved plans into operational state transitions and output artifacts.",
        "It provides deterministic progress, status, and failure semantics for user-visible continuity.",
      ],
    },
    {
      title: "Boundary Vs Other Layers",
      body: [
        "Q decides.",
        "DAL defines.",
        "Runtime executes.",
        "Runtime returns results back into system state.",
      ],
      code: `Decision -> DAL -> Runtime -> Result -> New Version -> Comparison / Memory / Continue`,
    },
  ],
};

