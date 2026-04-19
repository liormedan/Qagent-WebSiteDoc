import type { DocPageContent } from "@/lib/docs";

export const executionRuntimeExecutionContractsContent: DocPageContent = {
  slug: "execution-runtime/execution-contracts",
  title: "Execution Contracts",
  description: "Canonical runtime contracts for execution control, status projection, and output publication.",
  sections: [
    {
      title: "Runtime Start Contract",
      body: [
        "Required fields: execution_id, runtime_job_id, operation_payload, request_id, session_id.",
        "Optional fields: priority, timeout_ms, retry_budget.",
      ],
    },
    {
      title: "Runtime Status Contract",
      body: [
        "Required fields: runtime_job_id, runtime_state, timestamp.",
        "Optional fields: progress, message, last_error_code.",
      ],
    },
    {
      title: "Output Publish Contract",
      body: [
        "Required fields: output_id, output_artifact_ref, runtime_job_id, execution_id.",
        "Optional fields: output_metadata, diagnostics_ref.",
      ],
    },
    {
      title: "Validation and Enforcement",
      body: [
        "Runtime rejects contracts missing required fields.",
        "State-specific contract rules are enforced before transition commit.",
      ],
    },
  ],
};


