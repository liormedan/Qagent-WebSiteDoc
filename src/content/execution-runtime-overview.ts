import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeOverviewContent: DocPageContent = {
  slug: "execution-runtime/overview",
  title: "Execution Runtime Overview",
  description: "Deterministic runtime execution lifecycle from dispatch to output and versioning.",
  sections: [
    {
      title: "Runtime Scope",
      body: [
        "Runtime accepts execution-ready payloads from DAgent and controls job lifecycle transitions.",
        "Runtime owns operational states only: queued, running, retrying, cancelled, completed, failed, timed_out.",
      ],
    },
    {
      title: "Execution Entry Conditions",
      body: [
        "Entry requires approved handoff, execution_id, runtime_job_id, and validated operation payload.",
        "Invalid or incomplete payload is rejected before queued state materialization.",
      ],
    },
    {
      title: "Execution Stages",
      body: [
        "queued -> running -> terminal_state.",
        "terminal_state is one of completed, failed, cancelled, timed_out.",
        "retrying is an intermediate state that can return to running.",
      ],
    },
    {
      title: "Execution Outputs and Status",
      body: [
        "Runtime emits authoritative runtime_state and progress updates.",
        "Output publication occurs only after terminal state transition.",
      ],
    },
  ],
};


