/**
 * Authoritative QAgent layer pipeline string. Do not paraphrase or shorten.
 * All documentation that states this flow must use this export verbatim.
 */
export const QAGENT_CANONICAL_FLOW =
  "User Input (handoff complete) -> QCore -> Files Handler -> Analyzer -> Intent + Clarification -> DAL -> UAgent -> Approval (UI-triggered, enforced by QCore) -> DAgent (execution bridge) -> Execution Request Envelope -> API Server Layer (/run -> Job Orchestration -> Execution Layer -> /jobs) -> Versioned Result Reference.";

export const QAGENT_DOC_SOURCE_OF_TRUTH = {
  canonicalLocation: "/docs/architecture",
  rule:
    "Definitions in /docs/architecture are authoritative for QAgent layer module boundaries, lineage ownership, and QAgent-side flow semantics. Secondary pages may reference but must not redefine these rules.",
} as const;

