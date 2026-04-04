import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeExecutionContractsContent: DocPageContent = {
  slug: "execution-runtime/execution-contracts",
  title: "Execution Contracts",
  description: "Typed request, progress, and result contracts for runtime execution operations.",
  sections: [
    {
      title: "Runtime Contracts",
      body: [
        "ExecutionRequest is created by orchestration after approved decision and valid DAL.",
        "ExecutionProgress is produced by runtime while execution is active.",
        "ExecutionResult is produced by runtime when status changes or finalizes.",
      ],
      code: `interface ExecutionRequest {
  version: '1.0'
  requestId: string
  traceId: string
  flowId: string
  dal: AudioDAL
  targetVersionId: string
  initiatedBy: 'user' | 'system'
}

interface ExecutionProgress {
  stage: string
  progress: number
  message?: string
}

interface ExecutionResult {
  version: '1.0'
  requestId: string
  traceId: string
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
  progress?: ExecutionProgress
  outputVersionId?: string
  warnings?: string[]
  error?: AgentError
}`,
    },
    {
      title: "Producer And Consumer Responsibilities",
      body: [
        "ExecutionRequest producer: Orchestration Runtime Gateway; consumer: Execution Runtime.",
        "ExecutionProgress producer: Execution Runtime; consumers: Chat status, Canvas status, Orchestration monitor.",
        "ExecutionResult producer: Execution Runtime; consumers: Memory, Comparison trigger, Decision UI, Session lifecycle.",
      ],
    },
    {
      title: "Partial Success Rule",
      body: [
        "If execution partially succeeds, result status remains failed or cancelled with explicit warnings and no silent overwrite.",
        "Any partial output must be represented as non-active candidate and require explicit review before continuation.",
      ],
    },
  ],
};

