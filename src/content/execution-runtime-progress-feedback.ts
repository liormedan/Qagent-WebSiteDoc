import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeProgressFeedbackContent: DocPageContent = {
  slug: "execution-runtime/progress-feedback",
  title: "Progress And Feedback",
  description: "Runtime progress emission and user-visible feedback rules.",
  sections: [
    {
      title: "Progress Signal Model",
      body: [
        "Runtime emits monotonic progress from 0.0 to 1.0 while running.",
        "Progress is optional for queued and terminal states.",
      ],
    },
    {
      title: "Feedback Timing",
      body: [
        "State change events are emitted immediately on transition commit.",
        "Progress heartbeat is emitted on runtime-defined interval while running.",
      ],
    },
    {
      title: "User-Visible Rules",
      body: [
        "UI must represent runtime_state exactly as emitted.",
        "No synthetic success state is allowed before terminal transition.",
      ],
    },
    {
      title: "Consistency Checks",
      body: [
        "Duplicate state events with same sequence are ignored.",
        "Out-of-order state sequence is rejected and logged as contract violation.",
      ],
    },
  ],
};


