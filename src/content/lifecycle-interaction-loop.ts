import type { DocPageContent } from "@/lib/docs";

export const lifecycleInteractionLoopContent: DocPageContent = {
  slug: "lifecycle/interaction-loop",
  title: "Interaction Loop",
  description: "User-system iterative loop across analysis, recommendations, decisions, and repeated executions.",
  sections: [
    {
      title: "Loop Rules",
      body: [
        "User may ask.",
        "System may analyze.",
        "System may recommend.",
        "User may approve/reject/refine.",
        "Multiple cycles may happen before execution.",
        "Multiple executions may happen in one session.",
      ],
    },
    {
      title: "Example Loop",
      body: [
        "Upload -> Ask -> Analyze -> Recommend -> Execute -> Compare -> Refine -> Execute Again",
      ],
    },
  ],
};

