import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeStatesContent: DocPageContent = {
  slug: "execution-runtime/runtime-states",
  title: "Runtime States",
  description: "Finite state machine authority for runtime transitions.",
  sections: [
    {
      title: "States",
      body: [
        "queued, running, retrying, cancelled, completed, failed, timed_out.",
      ],
    },
    {
      title: "Legal Transitions",
      body: [
        "queued -> running (start).",
        "running -> completed (success).",
        "running -> retrying (error_retryable).",
        "retrying -> running (retry_dispatch).",
        "running -> failed (error_non_retryable).",
        "running -> cancelled (cancel).",
        "running -> timed_out (timeout).",
        "timed_out -> running (retry_dispatch).",
      ],
    },
    {
      title: "Terminal States",
      body: [
        "completed, failed, cancelled are terminal.",
        "timed_out is non-terminal only when retry policy allows retry_dispatch.",
      ],
    },
    {
      title: "Transition Guards",
      body: [
        "Retry transitions require retry budget > 0.",
        "Cancel is accepted only from running.",
        "Output publish is allowed only from completed or failed.",
      ],
    },
  ],
};


