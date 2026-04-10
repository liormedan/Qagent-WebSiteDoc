/**
 * Authoritative QAgent layer pipeline string. Do not paraphrase or shorten.
 * All documentation that states this flow must use this export verbatim.
 */
export const QAGENT_CANONICAL_FLOW =
  "User Input (handoff complete) -> QCore -> Files Handler -> Analyzer -> Intent + Clarification -> DAL -> UAgent -> Approval (UI-triggered, enforced by QCore) -> DAgent (execution bridge) -> Execution Request Envelope -> API Server Layer (/run -> Job Orchestration -> Execution Layer -> /jobs) -> Versioned Result Reference.";

export const QAGENT_DOC_SOURCE_OF_TRUTH = {
  canonicalLocation: "/docs/q-agent",
  rule:
    "Definitions in /docs/q-agent are authoritative for QAgent layer role, boundaries, and canonical flow semantics. Module pages are child specifications and must not redefine these layer rules.",
} as const;

