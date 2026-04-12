/** Canonical documentation authority per domain (single source of truth pointers). */

export const AUTHORITY_MAP_VERSION = "1.1.0" as const;

/** Non-optional rules for readers and implementers when using this map (no per-domain duplication). */
export const AUTHORITY_MAP_MUST_USE = {
  resolve_canonical_first:
    "Before implementing or reviewing behavior in a domain, locate its row and load canonical_href; only then read supplements for context.",
  supplements_subordinate:
    "supplements[].href MUST NOT introduce normative requirements absent from canonical_href; if text conflicts, canonical_href wins and the supplement is incorrect until revised.",
  global_ordering:
    "Cross-layer product order is R01–R12 on /docs/system-runtime. Protected HTTP and bootstrap order is S/B on /docs/auth-security/system-flow. Layer pages and supplements MUST NOT override R or S/B ordering.",
} as const;

export const AUTHORITY_MAP_CANONICAL_VS_SUPPLEMENT = {
  canonical_href: "Single normative documentation URL for the domain: owns definitions, names, ordering, and payload rules for that domain’s scope.",
  supplement_href:
    "Supporting material (diagrams, module maps, narrative execution paths). Elaborates or cross-links; never competes with canonical_href on the same claim.",
  overlap_policy: "On overlap, trace the claim to canonical_href; if not present there, the claim is not normative for the domain.",
} as const;

export const AUTHORITY_MAP_ENTRIES = [
  {
    domain: "cross_layer_runtime_numbered",
    canonical_href: "/docs/system-runtime",
    supplements: [],
  },
  {
    domain: "cross_layer_flow_narrative",
    canonical_href: "/docs/system-flow",
    supplements: [{ href: "/docs/orchestration/orchestration-flow", role: "orchestration_detail_not_spine" }],
  },
  {
    domain: "protected_http_and_bootstrap_security",
    canonical_href: "/docs/auth-security/system-flow",
    supplements: [
      { href: "/docs/auth-security/session-spec", role: "jwt_shape" },
      { href: "/docs/auth-security/error-contracts", role: "auth_error_envelope" },
    ],
  },
  {
    domain: "cross_layer_contract_registry",
    canonical_href: "/docs/contracts",
    supplements: [{ href: "/docs/architecture/contracts/schema-registry", role: "registered_payload_types" }],
  },
  {
    domain: "client_layer",
    canonical_href: "/docs/client",
    supplements: [{ href: "/docs/client/event-contract", role: "client_event_envelope" }],
  },
  {
    domain: "qagent_layer",
    canonical_href: "/docs/q-agent",
    supplements: [{ href: "/docs/architecture", role: "module_map" }],
  },
  {
    domain: "api_server_layer_narrative",
    canonical_href: "/docs/api",
    supplements: [],
  },
  {
    domain: "api_server_layer_structural_spec",
    canonical_href: "/docs/api-server-layer",
    supplements: [{ href: "/docs/api", role: "execution_narrative_not_duplicate_of_spec_tree" }],
  },
  {
    domain: "dsp_layer",
    canonical_href: "/docs/dsp-layer",
    supplements: [{ href: "/docs/dsp-layer/contracts", role: "processing_contracts" }],
  },
  {
    domain: "data_layer",
    canonical_href: "/docs/data-layer",
    supplements: [{ href: "/docs/system/data-layer", role: "system_placement_stub" }],
  },
  {
    domain: "infrastructure_layer",
    canonical_href: "/docs/infrastructure-layer",
    supplements: [],
  },
  {
    domain: "auth_security_layer",
    canonical_href: "/docs/auth-security",
    supplements: [{ href: "/docs/auth-security/system-flow", role: "ordering_when_http" }],
  },
] as const;

export const AUTHORITY_MAP_EXPORT = {
  $id: "https://waveq.dev/docs/authority-map-v1.json",
  version: AUTHORITY_MAP_VERSION,
  rule: "When two hrefs appear, canonical_href is sole normative authority; supplements are supporting context only.",
  must_use: AUTHORITY_MAP_MUST_USE,
  canonical_vs_supplement: AUTHORITY_MAP_CANONICAL_VS_SUPPLEMENT,
  entries: [...AUTHORITY_MAP_ENTRIES],
} as const;
