export const SYSTEM_DOC_SOURCE_OF_TRUTH = {
  canonicalLocation: "/docs/system",
  rule:
    "Definitions in /docs/system are authoritative for system-level edge case handling, error ownership, and runtime lifecycle. Secondary pages may reference but must not redefine these rules.",
} as const;

export const SYSTEM_RUNTIME_LIFECYCLE =
  "Request -> Accepted -> Job Created -> Executing -> Result Produced -> Version Stored -> Output Returned.";

export const SYSTEM_EDGE_CASE_HANDLING = [
  {
    edgeCase: "Empty request",
    handlingLayer: "Request Handling",
    systemBehavior: "Reject at ingress validation, emit request error classification, return non-executable response.",
  },
  {
    edgeCase: "Invalid request",
    handlingLayer: "Request Handling",
    systemBehavior: "Reject malformed or contract-invalid payload at ingress and return validation failure without job creation.",
  },
  {
    edgeCase: "Repeated request",
    handlingLayer: "Request Handling + Job Orchestration",
    systemBehavior: "Detect duplicate request identity and prevent duplicate lifecycle creation; reuse or return existing job lineage projection.",
  },
  {
    edgeCase: "Partial execution failure",
    handlingLayer: "Execution Layer + Job Orchestration",
    systemBehavior: "Capture execution failure details, preserve tracker-backed job state, and emit partial/failed outcome in status and result surfaces.",
  },
  {
    edgeCase: "Interrupted execution",
    handlingLayer: "Execution Layer + Job Orchestration",
    systemBehavior: "Mark execution as interrupted/cancelled in Status Tracker authority and emit interruption outcome for downstream version/status handling.",
  },
] as const;

export const SYSTEM_ERROR_OWNERSHIP_MODEL = [
  { errorType: "Request Error", owningLayer: "Request Handling" },
  { errorType: "Policy Error", owningLayer: "Decision System" },
  { errorType: "Job Error", owningLayer: "Job Orchestration" },
  { errorType: "Execution Error", owningLayer: "Execution Layer" },
  { errorType: "Versioning Error", owningLayer: "Versioning" },
] as const;
