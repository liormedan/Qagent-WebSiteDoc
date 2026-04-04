import type { DocPageContent } from "@/lib/docs";

export const lifecycleEndStatesContent: DocPageContent = {
  slug: "lifecycle/end-states",
  title: "End States",
  description: "Session termination outcomes, persistence rules, and resumability.",
  sections: [
    {
      title: "End Cases",
      body: [
        "completed successfully",
        "user stopped",
        "abandoned",
        "execution failed",
        "unresolved state",
      ],
    },
    {
      title: "Persistence And Return Rules",
      body: [
        "What gets saved: versions, decisions, events, latest recommendation/comparison context.",
        "What remains active: last accepted version and resumable session metadata when not fully completed.",
        "User can return later to reviewing/resuming states when session is abandoned or unresolved.",
      ],
    },
  ],
};

