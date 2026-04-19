import { WAVEQ_CANONICAL_FLOW } from "@/lib/waveq-authority";

/**
 * Authoritative QAgent layer pipeline string. Do not paraphrase or shorten.
 * All documentation that states this flow must use this export verbatim.
 */
export const QAGENT_CANONICAL_FLOW = WAVEQ_CANONICAL_FLOW;

export const QAGENT_DOC_SOURCE_OF_TRUTH = {
  canonicalLocation: "/docs/q-agent",
  rule:
    "Definitions in /docs/q-agent are authoritative for QAgent layer role, boundaries, and canonical flow semantics. Module pages are child specifications and must not redefine these layer rules.",
} as const;

