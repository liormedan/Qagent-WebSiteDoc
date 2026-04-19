export const WAVEQ_CANONICAL_FLOW =
  "User Input -> QCore -> Files Handler -> Analyzer -> Intent + Clarification -> DAL -> UAgent -> Approval (UI-triggered, Core-enforced) -> DAgent -> Runtime -> Output -> Versioning.";

export const WAVEQ_CANONICAL_FLOW_STEPS = [
  "User Input",
  "QCore",
  "Files Handler",
  "Analyzer",
  "Intent + Clarification",
  "DAL",
  "UAgent",
  "Approval (UI-triggered, Core-enforced)",
  "DAgent",
  "Runtime",
  "Output",
  "Versioning",
] as const;

export const WAVEQ_FLOW_BOUNDARY_CONTRACTS = [
  {
    boundary: "User Input -> QCore",
    input_schema: {
      message: "string",
      files: "array",
      locale: "string",
    },
    output_schema: {
      request_id: "string",
      session_id: "string",
      normalized_input: "object",
    },
    required_fields: ["message", "request_id", "session_id"],
    optional_fields: ["files", "locale"],
    version: "v1.0",
  },
  {
    boundary: "QCore -> Files Handler",
    input_schema: {
      request_id: "string",
      session_id: "string",
      normalized_input: "object",
    },
    output_schema: {
      file_refs: "array",
      normalization_report: "object",
    },
    required_fields: ["request_id", "session_id", "normalized_input"],
    optional_fields: ["normalization_report"],
    version: "v1.0",
  },
  {
    boundary: "Files Handler -> Analyzer",
    input_schema: {
      file_refs: "array",
      source_metadata: "object",
    },
    output_schema: {
      analysis_id: "string",
      signal_features: "object",
      ambiguity_hints: "array",
    },
    required_fields: ["file_refs", "analysis_id", "signal_features"],
    optional_fields: ["source_metadata", "ambiguity_hints"],
    version: "v1.0",
  },
  {
    boundary: "Analyzer -> Intent + Clarification",
    input_schema: {
      analysis_id: "string",
      signal_features: "object",
      ambiguity_hints: "array",
    },
    output_schema: {
      intent_id: "string",
      intent_payload: "object",
      clarification_required: "boolean",
    },
    required_fields: ["analysis_id", "signal_features", "intent_id", "intent_payload", "clarification_required"],
    optional_fields: ["ambiguity_hints"],
    version: "v1.0",
  },
  {
    boundary: "Intent + Clarification -> DAL",
    input_schema: {
      intent_id: "string",
      intent_payload: "object",
      clarification_required: "boolean",
    },
    output_schema: {
      plan_id: "string",
      plan_graph: "object",
      ui_plan: "object",
    },
    required_fields: ["intent_id", "intent_payload", "clarification_required", "plan_id", "plan_graph"],
    optional_fields: ["ui_plan"],
    version: "v1.0",
  },
  {
    boundary: "DAL -> UAgent",
    input_schema: {
      plan_id: "string",
      plan_graph: "object",
      ui_plan: "object",
    },
    output_schema: {
      interaction_payload: "object",
      approval_required: "boolean",
    },
    required_fields: ["plan_id", "plan_graph", "interaction_payload", "approval_required"],
    optional_fields: ["ui_plan"],
    version: "v1.0",
  },
  {
    boundary: "UAgent -> Approval",
    input_schema: {
      plan_id: "string",
      interaction_payload: "object",
      user_decision: "string",
    },
    output_schema: {
      approval_id: "string",
      approval_state: "approved | rejected | modify",
      approved_plan_fingerprint: "string",
    },
    required_fields: ["plan_id", "user_decision", "approval_id", "approval_state"],
    optional_fields: ["approved_plan_fingerprint"],
    version: "v1.0",
  },
  {
    boundary: "Approval -> DAgent",
    input_schema: {
      approval_id: "string",
      approval_state: "approved | rejected | modify",
      approved_plan_fingerprint: "string",
    },
    output_schema: {
      execution_id: "string",
      operation_payload: "object",
    },
    required_fields: ["approval_id", "approval_state", "execution_id"],
    optional_fields: ["approved_plan_fingerprint", "operation_payload"],
    version: "v1.0",
  },
  {
    boundary: "DAgent -> Runtime",
    input_schema: {
      execution_id: "string",
      operation_payload: "object",
    },
    output_schema: {
      runtime_job_id: "string",
      runtime_state: "queued | running | completed | failed | cancelled",
      progress: "number",
    },
    required_fields: ["execution_id", "runtime_job_id", "runtime_state"],
    optional_fields: ["operation_payload", "progress"],
    version: "v1.0",
  },
  {
    boundary: "Runtime -> Output",
    input_schema: {
      runtime_job_id: "string",
      runtime_state: "queued | running | completed | failed | cancelled",
      progress: "number",
    },
    output_schema: {
      output_id: "string",
      output_artifact_ref: "string",
      output_metadata: "object",
    },
    required_fields: ["runtime_job_id", "runtime_state", "output_id", "output_artifact_ref"],
    optional_fields: ["progress", "output_metadata"],
    version: "v1.0",
  },
  {
    boundary: "Output -> Versioning",
    input_schema: {
      output_id: "string",
      output_artifact_ref: "string",
      output_metadata: "object",
    },
    output_schema: {
      version_id: "string",
      lineage_ref: "object",
      version_state: "stored | published",
    },
    required_fields: ["output_id", "output_artifact_ref", "version_id", "lineage_ref", "version_state"],
    optional_fields: ["output_metadata"],
    version: "v1.0",
  },
] as const;

export const WAVEQ_STATE_OWNERSHIP_MATRIX = [
  { state: "request_context", source_of_truth: "QCore", writers: ["QCore"], readers: ["Files Handler", "Analyzer", "DAL"] },
  { state: "file_artifacts", source_of_truth: "Files Handler", writers: ["Files Handler"], readers: ["Analyzer", "QCore"] },
  { state: "analysis_context", source_of_truth: "Analyzer", writers: ["Analyzer"], readers: ["Intent + Clarification", "DAL"] },
  { state: "intent_state", source_of_truth: "Intent + Clarification", writers: ["Intent + Clarification"], readers: ["DAL", "QCore"] },
  { state: "plan_state", source_of_truth: "DAL", writers: ["DAL"], readers: ["UAgent", "Approval", "DAgent"] },
  { state: "approval_state", source_of_truth: "Approval", writers: ["Approval"], readers: ["QCore", "DAgent"] },
  { state: "runtime_state", source_of_truth: "Runtime", writers: ["Runtime"], readers: ["Output", "UAgent"] },
  { state: "output_state", source_of_truth: "Output", writers: ["Output"], readers: ["Versioning"] },
  { state: "version_state", source_of_truth: "Versioning", writers: ["Versioning"], readers: ["QCore", "UAgent"] },
] as const;

export const WAVEQ_STATE_TRANSITION_MATRIX = [
  { from: "received", event: "intake_validated", to: "planned", owner: "QCore" },
  { from: "planned", event: "analysis_ready", to: "intent_ready", owner: "Analyzer" },
  { from: "intent_ready", event: "plan_generated", to: "plan_ready", owner: "DAL" },
  { from: "plan_ready", event: "user_approval_requested", to: "approval_pending", owner: "UAgent" },
  { from: "approval_pending", event: "approved", to: "approved_for_runtime", owner: "Approval" },
  { from: "approved_for_runtime", event: "runtime_started", to: "running", owner: "Runtime" },
  { from: "running", event: "runtime_completed", to: "output_ready", owner: "Output" },
  { from: "output_ready", event: "version_persisted", to: "versioned", owner: "Versioning" },
] as const;

export const WAVEQ_STATE_FAILURE_MATRIX = [
  { failure: "invalid_input", detected_by: "QCore", recovery: "reject_and_request_new_input", next_state: "received" },
  { failure: "file_normalization_failed", detected_by: "Files Handler", recovery: "request_supported_file_or_retry", next_state: "received" },
  { failure: "analysis_failed", detected_by: "Analyzer", recovery: "retry_analysis_once_then_escalate", next_state: "planned" },
  { failure: "intent_unresolved", detected_by: "Intent + Clarification", recovery: "clarification_loop", next_state: "intent_ready" },
  { failure: "approval_rejected", detected_by: "Approval", recovery: "return_to_dal_for_modify", next_state: "plan_ready" },
  { failure: "runtime_timeout", detected_by: "Runtime", recovery: "timeout_then_retry_policy", next_state: "approved_for_runtime" },
  { failure: "runtime_failed", detected_by: "Runtime", recovery: "emit_failed_output_record", next_state: "output_ready" },
  { failure: "version_persist_failed", detected_by: "Versioning", recovery: "retry_persist_until_budget_exhausted", next_state: "output_ready" },
] as const;

export const RUNTIME_FSM_STATES = ["queued", "running", "retrying", "cancelled", "completed", "failed", "timed_out"] as const;

export const RUNTIME_FSM_TRANSITIONS = [
  { from: "queued", event: "start", to: "running" },
  { from: "running", event: "success", to: "completed" },
  { from: "running", event: "error_retryable", to: "retrying" },
  { from: "retrying", event: "retry_dispatch", to: "running" },
  { from: "running", event: "error_non_retryable", to: "failed" },
  { from: "running", event: "cancel", to: "cancelled" },
  { from: "running", event: "timeout", to: "timed_out" },
  { from: "timed_out", event: "retry_dispatch", to: "running" },
] as const;

