import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeCancellationRetryContent: DocPageContent = {
  slug: "execution-runtime/cancellation-and-retry",
  title: "Cancellation And Retry",
  description: "Canonical runtime control rules for cancellation, retry budgets, and timeout recovery.",
  sections: [
    {
      title: "Cancellation Rules",
      body: [
        "Cancel command is valid only in running state.",
        "Cancel transition: running -> cancelled.",
        "Cancelled state is terminal.",
      ],
    },
    {
      title: "Retry Rules",
      body: [
        "Retry is allowed only for retryable_error or timeout_error.",
        "Retry transition path: running -> retrying -> running.",
        "Retry budget decrements on each retry_dispatch.",
      ],
    },
    {
      title: "Timeout Rules",
      body: [
        "Timeout transition path: running -> timed_out.",
        "Timed_out may transition to running only via retry_dispatch and budget > 0.",
      ],
    },
    {
      title: "Control Guardrails",
      body: [
        "No retry is allowed from cancelled.",
        "No cancel is allowed from queued, completed, failed, or timed_out.",
        "State transition requests violating guards are rejected.",
      ],
    },
  ],
};


