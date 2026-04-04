import type { DocPageContent } from "@/lib/docs";

export const orchestrationFailureHandlingContent: DocPageContent = {
  slug: "orchestration/failure-handling",
  title: "Orchestration Failure Handling",
  description: "Failure behavior and fallback actions for subsystem errors during orchestration.",
  sections: [
    {
      title: "Failure Matrix",
      body: [
        "sandbox fail: retry read path, then ask user for re-index or fallback to limited mode.",
        "comparison fail: continue with non-comparative recommendation flagged as lower confidence.",
        "DAL fail: block execution and expose validation errors to user-facing decision step.",
        "query fail: return partial context and request narrower question or rerun.",
      ],
      code: `onFailure(type)
  sandbox -> retry_or_reindex
  comparison -> degrade_recommendation_confidence
  dal -> block_execution
  query -> partial_answer_and_refine`,
    },
    {
      title: "Agent Execution Policy",
      body: [
        "Timeout and retry must be deterministic per agent.",
      ],
      code: `interface AgentExecutionPolicy {
  version: '1.0'
  timeoutMs: number
  retryCount: number
  retryBackoffMs?: number
}

const executionPolicies: Record<'sandbox' | 'intelligence' | 'comparison' | 'recommendation', AgentExecutionPolicy> = {
  sandbox: { version: '1.0', timeoutMs: 2500, retryCount: 2, retryBackoffMs: 300 },
  intelligence: { version: '1.0', timeoutMs: 4500, retryCount: 1, retryBackoffMs: 400 },
  comparison: { version: '1.0', timeoutMs: 4500, retryCount: 1, retryBackoffMs: 400 },
  recommendation: { version: '1.0', timeoutMs: 2500, retryCount: 0 },
}`,
    },
    {
      title: "Unified Error Envelope",
      body: [
        "All failures must return one envelope structure.",
      ],
      code: `interface AgentError {
  code: string
  message: string
  retryable: boolean
}

interface ErrorEnvelope {
  error: AgentError
  source: string
  timestamp: number
}`,
    },
  ],
};
