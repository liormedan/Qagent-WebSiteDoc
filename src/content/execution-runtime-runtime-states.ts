import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeStatesContent: DocPageContent = {
  slug: "execution-runtime/runtime-states",
  title: "Runtime States",
  description: "Execution runtime state machine, transitions, and UI reflection rules.",
  sections: [
    {
      title: "ExecutionRuntimeState Contract",
      body: [
        "Runtime state controls allowed operations and feedback behavior.",
      ],
      code: `type ExecutionRuntimeState =
  | 'idle'
  | 'queued'
  | 'preparing'
  | 'running'
  | 'generating_output'
  | 'completed'
  | 'failed'
  | 'cancelled'`,
    },
    {
      title: "Allowed Transitions",
      body: [
        "idle -> queued (trigger: approved ExecutionRequest)",
        "queued -> preparing (trigger: runtime starts prechecks)",
        "preparing -> running (trigger: runtime starts action execution)",
        "running -> generating_output (trigger: processing steps completed)",
        "generating_output -> completed (trigger: output version ready)",
        "queued|preparing|running -> cancelled (trigger: cancellation command)",
        "preparing|running|generating_output -> failed (trigger: execution/runtime errors)",
      ],
    },
    {
      title: "Forbidden Transitions",
      body: [
        "idle -> completed is forbidden.",
        "failed -> running is forbidden without new ExecutionRequest.",
        "cancelled -> running is forbidden without new ExecutionRequest.",
      ],
      code: `forbidden
idle -> completed
failed -> running
cancelled -> running`,
    },
    {
      title: "System And UI Behavior Per State",
      body: [
        "queued/preparing: user can see pending status, cancellation may be allowed.",
        "running/generating_output: user sees progress updates and blocking indication for active execution target.",
        "completed: user sees output version creation and next-step actions.",
        "failed/cancelled: user sees clear reason and retry/review options.",
      ],
    },
  ],
};

