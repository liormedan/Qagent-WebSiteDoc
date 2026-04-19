import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeIndexContent: DocPageContent = {
  slug: "execution-runtime",
  title: "Execution Runtime",
  description: "Canonical runtime authority for state machine, retry/cancel/timeout policy, and output publication.",
  sections: [
    {
      title: "Finite State Machine",
      body: [
        "States: queued, running, retrying, cancelled, completed, failed, timed_out.",
        "Transitions: queued->running(start), running->completed(success), running->retrying(error_retryable), retrying->running(retry_dispatch), running->failed(error_non_retryable), running->cancelled(cancel), running->timed_out(timeout), timed_out->running(retry_dispatch).",
      ],
    },
    {
      title: "Retry / Cancel / Timeout Rules",
      body: [
        "Retry is allowed only for retryable errors and bounded by retry budget.",
        "Cancel is terminal and blocks further dispatch.",
        "Timeout transitions to timed_out and may re-enter running only by retry_dispatch.",
      ],
    },
    {
      title: "Output Publishing Rules",
      body: [
        "Output is published only after completed or failed terminal state.",
        "Each output publish includes output_id, output_artifact_ref, runtime_job_id, and execution lineage.",
        "Versioning persists immutable version records after output publication.",
      ],
    },
    {
      title: "Authority Boundaries",
      body: [
        "Runtime owns runtime_state transitions and retry/cancel/timeout enforcement.",
        "Output owns output artifact publication.",
        "Versioning owns immutable version persistence and lineage closure.",
      ],
    },
  ],
};


