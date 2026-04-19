import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeErrorHandlingContent: DocPageContent = {
  slug: "execution-runtime/error-handling",
  title: "Runtime Error Handling",
  description: "Deterministic runtime error handling, classification, and state outcomes.",
  sections: [
    {
      title: "Error Classes",
      body: [
        "retryable_error",
        "non_retryable_error",
        "timeout_error",
        "cancellation_error",
      ],
    },
    {
      title: "Error-to-State Mapping",
      body: [
        "retryable_error -> retrying.",
        "non_retryable_error -> failed.",
        "timeout_error -> timed_out.",
        "cancellation_error -> cancelled.",
      ],
    },
    {
      title: "Error Payload Rules",
      body: [
        "Error payload includes runtime_job_id, error_code, error_message, timestamp.",
        "Optional diagnostics_ref may be attached.",
      ],
    },
    {
      title: "Recovery Rules",
      body: [
        "Only retryable_error and timeout_error can re-enter running via retry_dispatch.",
        "failed and cancelled are terminal and cannot auto-resume.",
      ],
    },
  ],
};


