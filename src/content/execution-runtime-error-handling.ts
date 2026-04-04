import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeErrorHandlingContent: DocPageContent = {
  slug: "execution-runtime/error-handling",
  title: "Runtime Error Handling",
  description: "Failure semantics, user visibility, persistence rules, and retry/rollback constraints.",
  sections: [
    {
      title: "Failure Types",
      body: [
        "invalid DAL",
        "execution timeout",
        "runtime failure",
        "partial output",
        "cancelled execution",
      ],
    },
    {
      title: "Handling Rules",
      body: [
        "invalid DAL: block start, store validation error, allow retry only after DAL regeneration.",
        "execution timeout: mark failed, store timeout event, allow retry per execution policy.",
        "runtime failure: mark failed, persist error envelope, require explicit retry decision.",
        "partial output: store as failed/draft candidate, block auto-comparison until reviewed.",
        "cancelled execution: keep audit trail, no active version switch.",
      ],
    },
    {
      title: "User And System Effects",
      body: [
        "User sees status, reason, and allowed next actions.",
        "System stores trace-linked error and event timeline updates.",
        "Rollback is required when active baseline was tentatively switched before failure finalization.",
        "Comparison is blocked when output version status is failed and no ready output exists.",
      ],
    },
  ],
};

