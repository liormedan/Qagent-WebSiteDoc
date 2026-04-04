import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeCancellationRetryContent: DocPageContent = {
  slug: "execution-runtime/cancellation-and-retry",
  title: "Cancellation And Retry",
  description: "Deterministic cancel/retry behavior for runtime operations.",
  sections: [
    {
      title: "Cancellation Rules",
      body: [
        "Cancellation can be triggered by user or system guard logic.",
        "Cancellation is allowed in queued, preparing, and running states.",
        "Cancellation does not create a ready output version by default.",
      ],
    },
    {
      title: "Retry Rules",
      body: [
        "Retry is allowed for retryable failures and cancelled flows when policy permits.",
        "Retry may reuse DAL only when failure cause is runtime/transient and DAL remains valid.",
        "Retry requires DAL regeneration when failure cause is invalid DAL or incompatible context state.",
      ],
    },
  ],
};

