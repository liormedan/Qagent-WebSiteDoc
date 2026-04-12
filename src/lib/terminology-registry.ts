/** Single glossary for cross-layer docs; definitions defer to authority_href (no duplicate spec text). */

export const TERMINOLOGY_REGISTRY_VERSION = "1.1.0" as const;

export type TerminologyEntry = {
  readonly term: string;
  readonly definition: string;
  readonly authority_href: string;
  /** Optional link target on /docs/terminology#term-{id} when aligned with DOCS_GLOSSARY. */
  readonly glossaryEntryId?: string;
};

export const TERMINOLOGY_ENTRIES: readonly TerminologyEntry[] = [
  {
    term: "R step (R01–R12)",
    definition: "Numbered product runtime spine step; ordering authority for cross-layer lifecycle.",
    authority_href: "/docs/system-runtime",
    glossaryEntryId: "system-runtime",
  },
  {
    term: "AUTH_HTTP_SPINE (S/B)",
    definition: "Parallel ordering authority for protected HTTP and bootstrap; does not replace R ordering.",
    authority_href: "/docs/auth-security/system-flow",
    glossaryEntryId: "auth-system-flow",
  },
  {
    term: "canonical_href",
    definition: "Per-domain sole normative documentation URL in the authority map.",
    authority_href: "/docs/authority-map",
    glossaryEntryId: "authority-map",
  },
  {
    term: "supplement (authority map)",
    definition: "Supporting href subordinate to canonical_href; must not contradict it.",
    authority_href: "/docs/authority-map",
    glossaryEntryId: "authority-map",
  },
  {
    term: "contract_id",
    definition: "Stable registry key for a cross-layer interface; payload shape lives at the row’s authority_href.",
    authority_href: "/docs/contracts",
    glossaryEntryId: "contracts-hub",
  },
  {
    term: "authority_href (registry row)",
    definition: "Per-contract normative doc target listed in the Contracts types registry JSON.",
    authority_href: "/docs/contracts",
    glossaryEntryId: "contracts-hub",
  },
  {
    term: "authority_href (runtime step)",
    definition: "Per–R-step normative doc target in the system-runtime spine.",
    authority_href: "/docs/system-runtime",
    glossaryEntryId: "system-runtime",
  },
  {
    term: "Event envelope",
    definition: "Client bus JSON shape (eventId, eventType, correlationId, sessionId, sequence, timestamp, payload, version).",
    authority_href: "/docs/client/event-contract",
    glossaryEntryId: "event-envelope",
  },
  {
    term: "Event plane",
    definition: "Closed `direction` enum value from the contracts registry describing boundary alignment for an E phase row.",
    authority_href: "/docs/contracts",
    glossaryEntryId: "contracts-hub",
  },
  {
    term: "E phase (E01–E12)",
    definition: "Events-map row aligned to the same ordering cuts as R01–R12; does not introduce an alternate spine.",
    authority_href: "/docs/events-map",
    glossaryEntryId: "events-map",
  },
  {
    term: "Validation stage (V01–V05)",
    definition: "Ordered ingress gate chain (parse → schema → registry → auth bind → transport) from the validation strategy JSON.",
    authority_href: "/docs/contracts",
    glossaryEntryId: "contracts-hub",
  },
  {
    term: "Schema Registry",
    definition: "Registered artifact types for governed inner payloads; referenced by envelope rules and R steps touching global.schema_registry_ref.",
    authority_href: "/docs/architecture/contracts/schema-registry",
    glossaryEntryId: "schema-registry",
  },
  {
    term: "Lineage reference",
    definition: "Cross-cutting lineage identifiers binding execution and versions; authority at lineage-model.",
    authority_href: "/docs/architecture/contracts/lineage-model",
    glossaryEntryId: "lineage-model",
  },
  {
    term: "Intent envelope (Client → QAgent)",
    definition: "Structured client outbound payload into QAgent per client.qagent.intent_envelope.",
    authority_href: "/docs/q-agent",
    glossaryEntryId: "qagent-layer",
  },
  {
    term: "Execution request (QAgent → API)",
    definition: "Approved execution handoff payload per qagent.api.execution_request.",
    authority_href: "/docs/api",
    glossaryEntryId: "api-server-layer",
  },
  {
    term: "DSP execution handoff (API → DSP)",
    definition: "Processing dispatch payload per api.dsp.execution_handoff.",
    authority_href: "/docs/dsp-layer",
    glossaryEntryId: "dsp-layer",
  },
  {
    term: "DSP result artifact (DSP → API)",
    definition: "Completion / artifact return payload per dsp.api.result_artifact.",
    authority_href: "/docs/dsp-layer",
    glossaryEntryId: "dsp-layer",
  },
  {
    term: "API Server Layer (structural spec)",
    definition: "Canonical structural spec tree for the API server layer; narrative execution docs supplement it.",
    authority_href: "/docs/api-server-layer",
    glossaryEntryId: "api-server-layer-spec",
  },
  {
    term: "API Server Layer (narrative)",
    definition: "Execution-oriented narrative; must defer to api-server-layer spec for structural conflicts.",
    authority_href: "/docs/api",
    glossaryEntryId: "api-server-layer",
  },
] as const;

export const TERMINOLOGY_REGISTRY_EXPORT = {
  spec: "waveq.terminology_registry",
  version: TERMINOLOGY_REGISTRY_VERSION,
  authority: "/docs/terminology",
  entries: TERMINOLOGY_ENTRIES,
} as const;
