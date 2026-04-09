export const API_SERVER_CANONICAL_NAME = "API Server Layer";

export const API_SERVER_ALLOWED_ALIASES: string[] = ["API Server"];

export const API_SERVER_FORBIDDEN_TERMS: string[] = ["Execution OS", "Backend"];

export const API_SERVER_CANONICAL_FLOW =
  "QAgent (approved execution request) -> API Gateway (/run) -> Request Handling (Validation, Authentication/Authorization, Rate/Load Handling, Request Routing) -> Job Orchestration (Queue Manager, Job Manager, Worker Manager, Status Tracker) -> Execution Layer (Execution Engine, Plan Interpreter, Action Dispatcher, Result Collector) -> /jobs status/result surface -> QAgent consumes status/output.";

export const JOB_ORCHESTRATION_CANONICAL_FLOW =
  "Decision System emits execution decision output -> Queue Manager enqueues immutable Job Definition -> Job Manager materializes immutable execution intent -> Worker Manager assigns immutable job to available worker (assignment only) -> Execution Layer executes decision output exactly as provided -> Status Tracker is the single source of truth for status/progress lifecycle -> /jobs exposes tracker-backed status and result.";

export const EXECUTION_LAYER_CANONICAL_FLOW =
  "Runnable Job Context (immutable decision output and executable plan intent) -> Plan Interpreter derives executable action sequence without changing semantics -> Action Dispatcher routes executable actions to runtime/worker executors -> Execution Engine coordinates execution progression and runtime acknowledgements -> Result Collector gathers outputs, artifacts, errors, and execution trace summary -> Execution Result Package emitted to Versioning and /jobs status surface.";

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

export const JOB_ORCHESTRATION_AUTHORITY_MODEL = {
  noDecisionLogic:
    "Job Orchestration executes Decision System output only. It must not change priority, alter retry behavior, or reinterpret decision output.",
  immutableJobDefinition:
    "Job Definition is immutable after creation. No mutation is allowed to plan, decision output, or execution intent.",
  workerManagerRole:
    "Worker Manager owns worker assignment only. It must not make execution decisions or modify job logic.",
  statusTrackerAuthority:
    "Status Tracker is the single source of truth for job status and progress. No duplication is allowed across modules.",
} as const;

export const EXECUTION_LAYER_AUTHORITY_MODEL = {
  subsystemDefinition:
    "Execution Layer is the structural subsystem that converts already-approved and already-orchestrated runnable job context into concrete runtime execution activity and one canonical result package.",
  purpose:
    "Execute approved work deterministically and collect a complete execution result without changing decision or planning meaning.",
  role:
    "Runtime execution coordination boundary between Job Orchestration input and Versioning/output publication.",
  nonOwnership:
    "Execution Layer does not decide intent, does not create or re-plan executable content, does not modify decision policy, and does not own global job lifecycle state.",
} as const;

export const EXECUTION_LAYER_MODULE_DEFINITIONS = {
  executionEngine: {
    purpose: "Coordinate execution progression of a runnable job through runtime execution stages.",
    responsibility: "Maintain execution-local runtime coordination state and advance action execution according to dispatcher outcomes.",
    controls: "Execution progression pacing, runtime coordination checkpoints, and completion handoff to result collection.",
    mustNotDo: "Must not alter plan semantics, decision policy, business meaning, or canonical job lifecycle ownership.",
  },
  planInterpreter: {
    purpose: "Translate immutable executable plan content into runtime-executable action structure.",
    responsibility: "Normalize plan structure into deterministic action sequence and execution metadata.",
    receives: "Runnable Job Context containing immutable decision output and executable plan intent.",
    emits: "Executable action sequence and runtime invocation metadata for dispatch.",
    mustNotDo: "Must not reinterpret intent, re-plan logic, or mutate decision output.",
  },
  actionDispatcher: {
    purpose: "Route executable actions to runtime and worker executors.",
    responsibility: "Issue runtime invocations, collect invocation acknowledgements, and return execution events to the engine.",
    routesTo: "Runtime executors, worker execution surfaces, and execution adapters.",
    mustNotDo: "Must not create new plan logic, mutate action semantics, or apply policy decisions.",
  },
  resultCollector: {
    purpose: "Consolidate execution outputs into the single canonical outward package.",
    responsibility: "Gather final outputs, produced artifacts, execution errors, and execution trace/progress summary.",
    gathers: "Execution outcomes, produced artifacts/results, runtime errors, and execution trace/progress events.",
    emits: "Execution Result Package (single outward output of Execution Layer).",
    mustNotDo: "Must not rewrite execution meaning, own lifecycle policy, or emit competing canonical outputs.",
  },
} as const;

export const EXECUTION_RESULT_PACKAGE_DEFINITION = {
  name: "Execution Result Package",
  rule: "This is the only outward output of Execution Layer.",
  conceptualContents: [
    "execution outcome",
    "produced artifacts and results",
    "execution errors (if any)",
    "execution trace and progress summary",
  ],
} as const;

export const EXECUTION_LAYER_BOUNDARY_RULES = {
  jobOrchestrationToExecution:
    "Job Orchestration provides runnable immutable job context; Execution Layer performs execution only and does not own orchestration policy.",
  executionToRuntimeWorkers:
    "Execution Layer dispatches runtime actions and receives execution signals; runtime/worker executors perform concrete action work.",
  executionToVersioning:
    "Execution Layer emits only the Execution Result Package; Versioning owns result version lifecycle and publication lineage.",
  executionToDecisionSystem:
    "Decision System owns admission/policy/retry decisions; Execution Layer must execute provided decisions without policy mutation.",
  prohibited:
    "Execution Layer must not re-plan, change business meaning, modify decision policy, or become canonical owner of job lifecycle state.",
} as const;

export const EXECUTION_LAYER_ERROR_BOUNDARY = {
  ownedByExecutionLayer: [
    "execution action failure",
    "runtime invocation failure",
    "result collection failure",
  ],
  ownedElsewhere: [
    "admission, policy, or retry decisions (Decision System)",
    "job lifecycle failure state ownership (Job Orchestration / Status Tracker)",
  ],
} as const;

export const EXECUTION_LAYER_STATE_OWNERSHIP = {
  executionLocalState:
    "Execution-local coordination state, action-level progression markers, runtime invocation acknowledgements, and transient aggregation buffers.",
  transientState:
    "In-flight action progression and temporary result/error aggregation buffers are transient and scoped to execution processing.",
  outwardEmission:
    "Only the Execution Result Package is emitted outward from this subsystem.",
  notOwned:
    "Global job lifecycle status/progress authority is not owned here and remains under Status Tracker.",
} as const;

export const EXECUTION_LAYER_PURITY_RULES = [
  "Execution Layer does not mutate decision output.",
  "Execution Layer does not reinterpret intent.",
  "Execution Layer does not alter plan semantics.",
  "Execution Layer only translates executable structure into runtime actions and result packaging.",
] as const;

export const EXECUTION_REQUEST_ENVELOPE = {
  name: "Execution Request Envelope",
  represents: "The single canonical request entity sent from QAgent to API Server Layer after approval.",
  requiredConceptualFields: [
    "request_id",
    "session_id",
    "workspace_id",
    "approved_plan",
    "execution_context",
    "requested_outputs",
    "trace_context",
  ],
  relationToQAgent: "Produced by QAgent as the execution handoff artifact. API Server Layer accepts this envelope as its only /run input contract.",
} as const;

export const QAGENT_API_HANDOFF_BRIDGE = {
  purpose:
    "Canonical bridge between QAgent-approved execution artifacts and API Server /run Execution Request Envelope.",
  fieldMapping: [
    "request_id <- QCore request_id",
    "session_id <- QCore session_id",
    "workspace_id <- QAgent workspace scope identifier",
    "approved_plan <- DAL plan_id + approved plan payload fingerprint",
    "execution_context <- DAgent execution bridge context",
    "requested_outputs <- QAgent requested output contract",
    "trace_context <- QAgent lineage context (correlation_id and related trace metadata)",
  ],
  rule:
    "API Server receives only this normalized envelope contract at /run; QAgent must not bypass or mutate envelope semantics after approval handoff.",
} as const;

export const QAGENT_API_JOB_STATUS_BRIDGE = {
  purpose:
    "Canonical bridge between API /jobs status entities and QAgent lineage identifiers.",
  mapping: [
    "job identity links to request_id and session_id from QAgent lineage",
    "status/progress authority is owned by Status Tracker and surfaced via /jobs",
    "execution result references map to execution_id and version_id lineage references consumed by QAgent",
  ],
  rule:
    "No competing status owner is allowed; QAgent consumes API status/output projections without redefining lifecycle authority.",
} as const;

export const API_SERVER_DOC_SOURCE_OF_TRUTH = {
  canonicalLocation: "/docs/api",
  rule:
    "Definitions in /docs/api are authoritative for API Server Layer definition, execution flow, Execution Request Envelope, and endpoint surface (/run, /jobs, /files, /health). Secondary pages may reference but must not redefine these semantics.",
} as const;

export const JOB_ORCHESTRATION_DOC_SOURCE_OF_TRUTH = {
  canonicalLocation: "/docs/api/job-orchestration",
  rule:
    "Definitions in /docs/api/job-orchestration are authoritative for orchestration execution semantics, authority boundaries, immutability constraints, and canonical job flow. Secondary pages may reference but must not redefine these rules.",
} as const;

export const EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH = {
  canonicalLocation: "/docs/api/execution",
  rule:
    "Definitions in /docs/api/execution are authoritative for Execution Layer subsystem structure, module boundaries, canonical execution flow, and execution result packaging. Secondary pages may reference but must not redefine these rules.",
} as const;
