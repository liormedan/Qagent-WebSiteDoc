import type { DocPageContent } from "@/lib/docs";

export const lifecycleOverviewContent: DocPageContent = {
  slug: "lifecycle/overview",
  title: "Lifecycle Overview",
  description: "End-to-end session lifecycle across load, analysis, decision, execution, and continuation.",
  sections: [
    {
      title: "Session Lifecycle Flow",
      body: [
        "Session Start -> Audio Load -> Sandbox Ready -> Analysis / Query / Recommendation -> Decision -> Execution -> New Version -> Comparison / Review -> Continue / End Session",
      ],
      code: `Session Start
  -> Audio Load
  -> Sandbox Ready
  -> Analysis / Query / Recommendation
  -> Decision
  -> Execution
  -> New Version
  -> Comparison / Review
  -> Continue / End Session`,
    },
    {
      title: "Lifecycle Meaning",
      body: [
        "A session is the temporal container for repeated user-system interaction over one audio context.",
        "One session can include multiple investigation cycles, multiple recommendations, and multiple executions.",
      ],
    },
  ],
};

