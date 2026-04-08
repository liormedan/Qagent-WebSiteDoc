export const API_SERVER_CANONICAL_NAME = "API Server Layer";

export const API_SERVER_ALLOWED_ALIASES: string[] = ["API Server"];

export const API_SERVER_FORBIDDEN_TERMS: string[] = ["Execution OS", "Backend"];

export const API_SERVER_CANONICAL_FLOW =
  "QAgent (approved execution request) -> API Gateway (/run) -> Request Handling (Validation, Authentication/Authorization, Rate/Load Handling, Request Routing) -> Job Orchestration (Queue Manager, Job Manager, Worker Manager, Status Tracker) -> Execution Layer (Execution Engine, Plan Interpreter, Action Dispatcher, Result Collector) -> /jobs status/result surface -> QAgent consumes status/output.";

export const API_SERVER_FLOW_SEGMENTS = [
  {
    stage: "Intake",
    modules: ["API Gateway Layer", "/run"],
  },
  {
    stage: "Validation",
    modules: ["Validation", "Authentication / Authorization", "Rate / Load Handling"],
  },
  {
    stage: "Orchestration",
    modules: ["Request Routing", "Queue Manager", "Job Manager", "Worker Manager", "Status Tracker"],
  },
  {
    stage: "Execution",
    modules: ["Execution Engine", "Plan Interpreter", "Action Dispatcher"],
  },
  {
    stage: "Result",
    modules: ["Result Collector"],
  },
  {
    stage: "Status",
    modules: ["/jobs"],
  },
] as const;

export const API_GATEWAY_CANONICAL_FLOW =
  "Incoming Request (HTTP/gRPC) -> Gateway -> Input Normalization -> Structural Validation -> Route Identification -> Context Normalization -> Internal Forward to Request Handling";

export const API_GATEWAY_STRICT_ROLE = {
  mustOnly: ["Validate Structure", "Normalize Input", "Route Request"],
  mustNot: ["Interpret Plan", "Infer Intent", "Modify Execution Semantics"],
} as const;

export const API_GATEWAY_HANDOFF_CONTRACT = {
  name: "Normalized Request Context",
  characteristics: ["Immutable after creation", "Fully defined at Gateway exit", "No downstream mutation"],
  represents: "The authoritative internal context passed from Gateway to Request Handling after initial structural validation.",
} as const;

export const REQUEST_HANDLING_CANONICAL_FLOW =
  "Incoming Request Context -> Validation -> Authentication -> Rate / Load Handling -> Request Routing -> Forward to Decision System";

export const REQUEST_HANDLING_STRICT_ROLE = {
  mustOnly: ["Technical Gatekeeping", "Deterministic Validation", "Identity Verification", "Structural Routing"],
  mustNot: ["Decision Logic", "Apply Policy", "Assign Priority", "Control Retry"],
} as const;

export const REQUEST_HANDLING_OUTPUT_CONTEXT = {
  name: "Request Handling Output Context",
  characteristics: ["Validated", "Authenticated", "Normalized", "Decision-Ready"],
  represents: "The final technical handoff context passed to the Decision System after all technical gates are cleared.",
} as const;

export const EXECUTION_REQUEST_ENVELOPE = {
  name: "Execution Request Envelope",
  represents: "The single canonical request entity sent from QAgent to API Server Layer after approval.",
  gatewayResponsibility: "Validate structure and presence of required fields only. Do NOT interpret internal plan content.",
  requiredConceptualFields: [
    "request_id",
    "session_id",
    "workspace_id",
    "approved_plan",
    "execution_context",
    "requested_outputs",
    "trace_context",
  ],
  relationToQAgent: "Produced by QAgent as the execution handoff artifact. Gateway accepts this envelope as its only /run input contract.",
} as const;


export const API_SERVER_DOC_SOURCE_OF_TRUTH = {
  canonicalLocation: "/docs/api",
  rule:
    "Definitions in /docs/api are authoritative. Secondary pages may reference but must not redefine canonical name, canonical flow, execution request envelope, or stage mapping.",
} as const;
