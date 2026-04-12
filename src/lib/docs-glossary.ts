/**
 * Canonical glossary entries for docs term-linking and future search/suggestions.
 * Each entry has one authoritative href; aliases are alternate surface forms only.
 */

export type GlossaryKind = "cross-layer" | "layer" | "flow" | "contract" | "artifact" | "other";

export type GlossaryScope = "end-to-end" | "system" | "client" | "contracts" | "qagent" | "other";

export type GlossaryEntry = {
  id: string;
  label: string;
  href: string;
  aliases?: readonly string[];
  kind: GlossaryKind;
  /**
   * When set, this entry participates only in autolink passes that request one of these scopes.
   * Omit for entries that should be eligible for every future scope (none yet).
   */
  scopes?: readonly GlossaryScope[];
  /** Supplementary doc paths or in-page anchors (not primary authority). */
  relatedHrefs?: readonly string[];
  /**
   * Pages or anchors where the term is defined, explained, or evidenced (for RAG / provenance).
   * May overlap canonical `href` sections; never replace the single autolink target in `href`.
   */
  sourceHrefs?: readonly string[];
  /** One-line summary for search cards; autolinking ignores this field. */
  description?: string;
  /** Internal keywords for glossary search only; never used by AutoLinkedText. */
  tags?: readonly string[];
};

/** Shared cross-page scopes for global structure terms. */
const E2E_SYSTEM: readonly GlossaryScope[] = ["end-to-end", "system"];

/** Contracts Layer pilot: terminology + autolink on /docs/contracts and architecture/contracts pages. */
const CONTRACTS_LAYER: readonly GlossaryScope[] = ["contracts"];

export const GLOSSARY_ENTRIES: readonly GlossaryEntry[] = [
  {
    id: "system-overview",
    label: "System overview",
    aliases: ["WaveQ system", "system docs"],
    href: "/docs/system",
    kind: "cross-layer",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/end-to-end#overview", "/docs/system-runtime#runtime-spine", "/docs/authority-map#authority-table", "/docs/terminology"],
    sourceHrefs: ["/docs/system#overview", "/docs/system#system-structure-diagram", "/docs/system#layer-details"],
    description: "Layer map and system-facing entry: how WaveQ is decomposed and where to read next.",
    tags: ["system", "layers", "overview", "map"],
  },
  {
    id: "system-runtime",
    label: "System runtime",
    aliases: ["system-runtime", "runtime spine", "R01–R12 spine", "R01-R12 spine"],
    href: "/docs/system-runtime",
    kind: "flow",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: [
      "/docs/events-map#events-table",
      "/docs/auth-security/system-flow#api-request-spine",
      "/docs/authority-map#canonical-vs-supplement",
    ],
    sourceHrefs: [
      "/docs/system-runtime#overview",
      "/docs/system-runtime#runtime-spine",
      "/docs/end-to-end/runtime-truth#runtime-pointers",
      "/docs/system-flow#overview",
      "/docs/system-flow#details",
    ],
    description: "System-wide R01–R12 spine describing how numbered runtime phases align across layers.",
    tags: ["runtime", "flow", "events", "cross-layer", "spine"],
  },
  {
    id: "authority-map",
    label: "Authority map",
    aliases: ["canonical href map", "href authority map"],
    href: "/docs/authority-map",
    kind: "artifact",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/contracts#contract-traceability", "/docs/system-runtime#runtime-spine", "/docs/events-map", "/docs/terminology"],
    sourceHrefs: [
      "/docs/authority-map#overview",
      "/docs/authority-map#must-use",
      "/docs/authority-map#canonical-vs-supplement",
      "/docs/authority-map#authority-table",
    ],
    description: "Single table of canonical /docs hrefs versus supplement pages to avoid dual authority.",
    tags: ["authority", "href", "routing", "canonical", "registry"],
  },
  {
    id: "contracts-hub",
    label: "Contracts hub",
    aliases: ["Contracts Layer hub", "contracts registry", "contract registry"],
    href: "/docs/contracts",
    kind: "contract",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: [
      "/docs/architecture/contracts/schema-registry",
      "/docs/events-map#events-table",
      "/docs/authority-map#authority-table",
      "/docs/end-to-end/integration-points",
    ],
    description: "Registry-level view of contract families, traceability, and validation posture.",
    tags: ["contracts", "schemas", "registry", "events", "traceability"],
  },
  {
    id: "events-map",
    label: "Events map",
    aliases: ["event map"],
    href: "/docs/events-map",
    kind: "artifact",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: [
      "/docs/system-runtime#runtime-spine",
      "/docs/contracts#event-contracts",
      "/docs/auth-security/system-flow#bootstrap-spine",
    ],
    sourceHrefs: ["/docs/events-map#overview", "/docs/events-map#events-table"],
    description: "E01–E12 phase grid aligned to the product spine and cross-layer event posture.",
    tags: ["events", "phases", "spine", "telemetry", "flow"],
  },
  {
    id: "terminology",
    label: "Terminology",
    href: "/docs/terminology",
    kind: "cross-layer",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/authority-map", "/docs/system-runtime", "/docs/contracts"],
    description: "Glossary index: labels, aliases, scopes, and canonical targets from DOCS_GLOSSARY.",
    tags: ["glossary", "terms", "definitions", "index"],
  },
  {
    id: "system-flow",
    label: "System flow",
    href: "/docs/system-flow",
    kind: "flow",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/system-runtime#runtime-spine", "/docs/auth-security/system-flow", "/docs/system/end-to-end-flow"],
    sourceHrefs: ["/docs/system-flow#overview", "/docs/system-flow#diagram", "/docs/system-flow#details"],
    description: "Narrative end-to-end sequence and ownership handoffs; numbered R ordering stays on system runtime.",
    tags: ["flow", "handoff", "sequence", "cross-layer"],
  },
  {
    id: "auth-system-flow",
    label: "Auth system flow",
    aliases: ["auth spine", "S/B spine", "SB spine"],
    href: "/docs/auth-security/system-flow",
    kind: "flow",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: [
      "/docs/system-runtime",
      "/docs/auth-security#details",
      "/docs/events-map",
    ],
    sourceHrefs: [
      "/docs/auth-security/system-flow#overview",
      "/docs/auth-security/system-flow#api-request-spine",
      "/docs/auth-security/system-flow#bootstrap-spine",
    ],
    description: "HTTP-facing S/B control order: protected routes, session mint, and bootstrap spine.",
    tags: ["auth", "security", "http", "session", "flow"],
  },
  {
    id: "auth-security",
    label: "Auth & security",
    aliases: ["auth-security", "Auth & Security Layer"],
    href: "/docs/auth-security",
    kind: "layer",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/auth-security/system-flow#overview", "/docs/system-runtime", "/docs/data-layer"],
    sourceHrefs: ["/docs/auth-security#overview", "/docs/auth-security#auth-security-chapters", "/docs/auth-security#details"],
    description: "Layer hub for identity, sessions, authorization, and how security binds to workspaces.",
    tags: ["auth", "security", "layer", "identity", "session"],
  },
  {
    id: "schema-registry",
    label: "Schema Registry",
    aliases: ["schema registry"],
    href: "/docs/architecture/contracts/schema-registry",
    kind: "contract",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/contracts", "/docs/q-agent", "/docs/architecture/contracts/lineage-model"],
    sourceHrefs: [
      "/docs/architecture/contracts/schema-registry#overview",
      "/docs/architecture/contracts/schema-registry#diagram",
      "/docs/architecture/contracts/schema-registry#details",
    ],
    description: "Handoff-oriented JSON schemas between QCore, handlers, intent, DAL, and UI plan stages.",
    tags: ["schema", "json", "contracts", "handoff", "registry"],
  },
  {
    id: "json-schema",
    label: "JSON Schema",
    aliases: ["JSON schema"],
    href: "/docs/architecture/contracts/schema-registry",
    kind: "artifact",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/contracts#validation-strategy", "/docs/contracts#versioning-rules"],
    sourceHrefs: [
      "/docs/contracts#validation-strategy",
      "/docs/architecture/contracts/schema-registry#details",
      "/docs/architecture/contracts/schema-registry#overview",
    ],
    description: "Schema artifacts and validation surfaces backing the architecture contract registry.",
    tags: ["json", "schema", "validation", "contracts"],
  },
  {
    id: "client-layer",
    label: "Client Layer",
    aliases: ["Client layer", "client docs"],
    href: "/docs/client",
    kind: "layer",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/system-flow", "/docs/end-to-end/runtime-truth"],
    sourceHrefs: ["/docs/client#overview", "/docs/client#layer-structure-diagram", "/docs/client#layer-details"],
    description: "UI and workspace-facing layer: surfaces, runtime ownership, and client-local contracts.",
    tags: ["client", "ui", "workspace", "layer"],
  },
  {
    id: "qagent-layer",
    label: "QAgent Layer",
    aliases: ["QAgent layer", "qagent docs"],
    href: "/docs/q-agent",
    kind: "layer",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/contracts", "/docs/orchestration", "/docs/architecture/contracts/schema-registry"],
    sourceHrefs: ["/docs/q-agent#overview", "/docs/q-agent#qagent-structure-diagram", "/docs/q-agent#qagent-details"],
    description: "Planning, orchestration touchpoints, and Q-side contracts that sit above execution tiers.",
    tags: ["qagent", "planning", "orchestration", "layer"],
  },
  {
    id: "api-server-layer",
    label: "API Server Layer",
    aliases: ["API Server layer", "api server", "API layer"],
    href: "/docs/api",
    kind: "layer",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/api-server-layer/core", "/docs/execution-runtime", "/docs/system-flow"],
    sourceHrefs: ["/docs/api#overview", "/docs/api#api-structure-diagram", "/docs/api#api-details"],
    description: "Execution-facing API tier: lifecycle, tiers, and integration with downstream runtimes.",
    tags: ["api", "server", "execution", "layer"],
  },
  {
    id: "data-layer",
    label: "Data layer",
    aliases: ["Data Layer", "data docs"],
    href: "/docs/data-layer",
    kind: "layer",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/data-layer/data-ownership", "/docs/auth-security/data-security", "/docs/system/data-layer"],
    sourceHrefs: ["/docs/data-layer#overview", "/docs/data-layer#data-layer-details", "/docs/data-layer#data-layer-chapters"],
    description: "Persistence, canonical data shapes, and how storage lines up with sessions and workspaces.",
    tags: ["data", "persistence", "dal", "layer"],
  },
  {
    id: "dsp-layer",
    label: "DSP layer",
    aliases: ["DSP / Processing Layer", "dsp docs"],
    href: "/docs/dsp-layer",
    kind: "layer",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/dsp-layer/contracts", "/docs/dsp-layer/core-specification", "/docs/api"],
    sourceHrefs: ["/docs/dsp-layer#overview", "/docs/dsp-layer#dsp-structure-diagram", "/docs/dsp-layer#dsp-details"],
    description: "Processing contracts and DSP engine abstraction feeding execution and comparison flows.",
    tags: ["dsp", "processing", "audio", "layer"],
  },
  {
    id: "infrastructure-layer",
    label: "Infrastructure Layer",
    aliases: ["Infrastructure layer"],
    href: "/docs/infrastructure-layer",
    kind: "layer",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/infrastructure-layer/core", "/docs/api", "/docs/auth-security"],
    sourceHrefs: [
      "/docs/infrastructure-layer#overview",
      "/docs/infrastructure-layer#infrastructure-layer-structure-diagram",
      "/docs/infrastructure-layer#details",
    ],
    description: "Hosting, scaling, and platform primitives shared across services and environments.",
    tags: ["infra", "platform", "ops", "layer"],
  },
  {
    id: "r-spine",
    label: "R spine",
    aliases: ["R01–R12", "R01-R12"],
    href: "/docs/system-runtime",
    kind: "cross-layer",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/events-map"],
    description: "Shorthand for the numbered product runtime spine documented on the system runtime page.",
    tags: ["runtime", "spine", "R01", "cross-layer"],
  },
  {
    id: "sb-spine",
    label: "S/B spine",
    aliases: ["S/B"],
    href: "/docs/auth-security/system-flow",
    kind: "flow",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/system-runtime", "/docs/auth-security"],
    sourceHrefs: [
      "/docs/auth-security/system-flow#overview",
      "/docs/auth-security/system-flow#api-request-spine",
      "/docs/auth-security/system-flow#bootstrap-spine",
    ],
    description: "Session and bootstrap oriented control chain complementing the R runtime spine.",
    tags: ["auth", "spine", "session", "flow"],
  },
  {
    id: "api-server-layer-spec",
    label: "API Server Layer (structural spec)",
    aliases: ["API Server structural spec", "api-server-layer tree", "api server layer spec"],
    href: "/docs/api-server-layer",
    kind: "artifact",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/api", "/docs/api-server-layer/core", "/docs/execution-runtime"],
    sourceHrefs: [
      "/docs/api-server-layer#overview",
      "/docs/api-server-layer#api-layer-structure-diagram",
      "/docs/api-server-layer#details",
    ],
    description: "Canonical structural spec tree for the API Server layer; narrative /docs/api defers here for conflicts.",
    tags: ["api", "spec", "structure", "server"],
  },
  {
    id: "event-envelope",
    label: "Event envelope (Client)",
    aliases: ["Event envelope", "client event envelope", "client bus JSON"],
    href: "/docs/client/event-contract",
    kind: "contract",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/contracts", "/docs/client", "/docs/events-map"],
    sourceHrefs: [
      "/docs/client/event-contract#overview",
      "/docs/client/event-contract#event-contract-canonical-shape",
      "/docs/client/event-contract#event-contract-details",
    ],
    description: "Client bus JSON envelope (eventId, eventType, correlationId, sessionId, sequence, timestamp, payload, version).",
    tags: ["client", "events", "envelope", "json", "contract"],
  },
  {
    id: "failure-flow",
    label: "Failure flow",
    href: "/docs/end-to-end/failure-flow",
    kind: "flow",
    scopes: ["end-to-end"],
    relatedHrefs: ["/docs/contracts", "/docs/auth-security/error-contracts", "/docs/end-to-end/runtime-truth"],
    sourceHrefs: ["/docs/end-to-end/failure-flow#failure-posture"],
    description: "End-to-end failure posture: envelope ownership and validation rejection boundaries.",
    tags: ["failure", "errors", "e2e", "validation"],
  },
  {
    id: "invariants",
    label: "Invariants",
    href: "/docs/end-to-end/invariants",
    kind: "artifact",
    scopes: ["end-to-end"],
    relatedHrefs: ["/docs/authority-map", "/docs/contracts", "/docs/end-to-end/runtime-truth"],
    sourceHrefs: ["/docs/end-to-end/invariants#invariants-list", "/docs/end-to-end/invariants#machine-export"],
    description: "Global system rules (E2E-INV) with one authority href each plus machine export JSON.",
    tags: ["invariants", "rules", "e2e", "export"],
  },
  {
    id: "integration-points",
    label: "Integration points",
    href: "/docs/end-to-end/integration-points",
    kind: "cross-layer",
    scopes: ["end-to-end"],
    relatedHrefs: ["/docs/contracts", "/docs/authority-map", "/docs/system-runtime"],
    sourceHrefs: ["/docs/end-to-end/integration-points#integration-table"],
    description: "Named integration cuts linking registry rows to layer authority hrefs.",
    tags: ["integration", "contracts", "e2e", "traceability"],
  },
  {
    id: "lineage-model",
    label: "Lineage model",
    aliases: ["Lineage reference", "lineage reference"],
    href: "/docs/architecture/contracts/lineage-model",
    kind: "contract",
    scopes: [...E2E_SYSTEM],
    relatedHrefs: ["/docs/contracts", "/docs/architecture/contracts/schema-registry"],
    sourceHrefs: [
      "/docs/architecture/contracts/lineage-model#overview",
      "/docs/architecture/contracts/lineage-model#diagram",
      "/docs/architecture/contracts/lineage-model#details",
    ],
    description: "Lineage identifiers binding execution, versions, and restore flows across modules.",
    tags: ["lineage", "ids", "contracts", "traceability"],
  },
  {
    id: "runtime-truth",
    label: "Runtime truth",
    href: "/docs/end-to-end/runtime-truth",
    kind: "cross-layer",
    scopes: ["end-to-end"],
    relatedHrefs: ["/docs/system-runtime", "/docs/events-map", "/docs/auth-security/system-flow"],
    sourceHrefs: ["/docs/end-to-end/runtime-truth#runtime-pointers"],
    description: "E2E pointers to the sole R, E, and S/B ordering authorities without duplicating step text.",
    tags: ["runtime", "e2e", "spine", "pointers"],
  },
  {
    id: "contract-payloads",
    label: "contract payloads",
    aliases: ["Contract payloads"],
    href: "/docs/contracts",
    kind: "contract",
    scopes: ["end-to-end"],
    relatedHrefs: ["/docs/architecture/contracts/schema-registry"],
    sourceHrefs: [
      "/docs/contracts#contract-types",
      "/docs/end-to-end/integration-points#integration-table",
      "/docs/end-to-end#end-to-end-details",
    ],
    description: "End-to-end emphasis on payload shapes carried on the contracts hub and integration seams.",
    tags: ["contracts", "payloads", "integration", "e2e"],
  },
  {
    id: "placement-diagram",
    label: "placement diagram",
    aliases: ["Placement diagram", "placement diagrams", "Placement diagrams"],
    href: "/docs/system/end-to-end-flow",
    kind: "artifact",
    scopes: ["end-to-end"],
    relatedHrefs: ["/docs/end-to-end/system-placement", "/docs/system-flow", "/docs/system-runtime"],
    sourceHrefs: [
      "/docs/system/end-to-end-flow#overview",
      "/docs/system/end-to-end-flow#layer-structure-diagram",
      "/docs/system/end-to-end-flow#layer-details",
    ],
    description: "Visual placement of layers in the canonical flow; pairs with system placement chapters.",
    tags: ["diagram", "placement", "flow", "layers"],
  },
  {
    id: "system-placement",
    label: "System placement",
    href: "/docs/end-to-end/system-placement",
    kind: "other",
    scopes: ["end-to-end"],
    relatedHrefs: ["/docs/system/end-to-end-flow", "/docs/end-to-end/runtime-truth", "/docs/system"],
    sourceHrefs: ["/docs/end-to-end/system-placement#overview", "/docs/end-to-end/system-placement#related-docs"],
    description: "End-to-end chapter for where the system sits relative to pilots and cross-layer invariants.",
    tags: ["placement", "e2e", "system", "architecture"],
  },
  {
    id: "contracts-allowed-direction-values",
    label: "allowed_direction_values",
    aliases: ["allowed direction values", "event plane enum", "direction enum"],
    href: "/docs/contracts#event-contracts",
    kind: "contract",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/events-map", "/docs/client/event-contract", "/docs/contracts#overview"],
    sourceHrefs: ["/docs/contracts#event-contracts", "/docs/contracts#overview"],
    description: "Closed set from the contracts registry describing event-plane boundary alignment for E-phase rows.",
    tags: ["contracts", "events", "envelope", "registry", "enum"],
  },
  {
    id: "contracts-client-event-contract",
    label: "Client event contract (envelope authority)",
    aliases: ["event envelope client", "client bus envelope spec"],
    href: "/docs/client/event-contract",
    kind: "contract",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/contracts#event-contracts", "/docs/contracts", "/docs/events-map"],
    sourceHrefs: [
      "/docs/client/event-contract#overview",
      "/docs/client/event-contract#event-contract-canonical-shape",
      "/docs/contracts#event-contracts",
    ],
    description: "Normative client envelope fields; contracts hub pins the JSON schema block consumed by validators.",
    tags: ["contracts", "client", "envelope", "event", "schema"],
  },
  {
    id: "contracts-ingress-validation-gates",
    label: "Ingress validation gates",
    aliases: ["validation gates", "ingress gates", "V01–V05", "V01-V05"],
    href: "/docs/contracts#validation-strategy",
    kind: "flow",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/system-runtime", "/docs/auth-security/system-flow", "/docs/contracts#contract-types"],
    sourceHrefs: ["/docs/contracts#validation-strategy", "/docs/contracts#overview"],
    description: "Ordered parse → schema → registry → auth bind → transport chain from CONTRACTS_VALIDATION_STRATEGY JSON.",
    tags: ["contracts", "validation", "ingress", "V01", "gates"],
  },
  {
    id: "contracts-layer-spec-version",
    label: "CONTRACTS_LAYER_SPEC_VERSION",
    aliases: ["contracts spec version", "contracts layer spec version"],
    href: "/docs/contracts#contract-types",
    kind: "artifact",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/authority-map", "/docs/architecture/contracts/schema-registry"],
    sourceHrefs: ["/docs/contracts#contract-types", "/docs/contracts#overview"],
    description: "Monotonic registry marker; bump when contract JSON drifts so tooling can detect stale bundles.",
    tags: ["contracts", "version", "registry", "tooling", "schema"],
  },
  {
    id: "contracts-lineage-model",
    label: "Lineage model (contracts context)",
    aliases: ["lineage identifiers", "lineage propagation"],
    href: "/docs/architecture/contracts/lineage-model",
    kind: "contract",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/contracts#contract-traceability", "/docs/contracts", "/docs/architecture/contracts/schema-registry"],
    sourceHrefs: [
      "/docs/architecture/contracts/lineage-model#overview",
      "/docs/architecture/contracts/lineage-model#diagram",
      "/docs/contracts#contract-traceability",
    ],
    description: "Identifier propagation rules referenced by registry rows and trace matrices on the contracts hub.",
    tags: ["contracts", "lineage", "ids", "traceability", "schema"],
  },
  {
    id: "contracts-registry-authority-href",
    label: "Registry authority_href",
    aliases: ["authority_href per contract", "registry row authority"],
    href: "/docs/contracts#contract-types",
    kind: "artifact",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/authority-map#authority-table", "/docs/contracts#contract-traceability"],
    sourceHrefs: ["/docs/contracts#contract-types", "/docs/contracts#overview"],
    description: "Each contract_id row lists the sole normative doc target; semantics are not redefined on the hub.",
    tags: ["contracts", "registry", "authority", "href", "canonical"],
  },
  {
    id: "contracts-registry-drift",
    label: "Registry drift governance",
    aliases: ["contract registry drift", "spec bump policy"],
    href: "/docs/contracts#overview",
    kind: "cross-layer",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/authority-map", "/docs/contracts#contract-types", "/docs/end-to-end/integration-points"],
    sourceHrefs: ["/docs/contracts#overview", "/docs/contracts#contract-types"],
    description: "Hub owns JSON artifacts and trace tables; layer pages own payloads—resolve conflicts via authority map.",
    tags: ["contracts", "governance", "registry", "drift", "authority"],
  },
  {
    id: "contracts-runtime-trace",
    label: "Contract runtime trace",
    aliases: ["contract_id to R to V", "runtime trace matrix", "contract runtime trace export"],
    href: "/docs/contracts#contract-traceability",
    kind: "artifact",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/system-runtime#runtime-spine", "/docs/contracts#validation-strategy", "/docs/events-map"],
    sourceHrefs: ["/docs/contracts#contract-traceability", "/docs/contracts#contract-types"],
    description: "Machine table mapping each contract_id to R steps and validation stages for cross-layer audits.",
    tags: ["contracts", "trace", "registry", "runtime", "validation"],
  },
  {
    id: "contracts-schema-registry",
    label: "Schema Registry (contracts touchpoint)",
    aliases: ["global.schema_registry_ref", "artifact types registry"],
    href: "/docs/architecture/contracts/schema-registry",
    kind: "contract",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/contracts#contract-types", "/docs/contracts#validation-strategy", "/docs/q-agent"],
    sourceHrefs: [
      "/docs/architecture/contracts/schema-registry#overview",
      "/docs/architecture/contracts/schema-registry#details",
      "/docs/contracts#contract-types",
    ],
    description: "Registered inner payload types referenced by envelope rules and R steps that carry schema refs.",
    tags: ["contracts", "schema", "registry", "json", "validation"],
  },
  {
    id: "contracts-types-registry-json",
    label: "Contract types registry (JSON)",
    aliases: ["CONTRACTS_TYPES_REGISTRY", "types registry", "contract_id table"],
    href: "/docs/contracts#contract-types",
    kind: "artifact",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/end-to-end/integration-points", "/docs/authority-map", "/docs/architecture/contracts/lineage-model"],
    sourceHrefs: ["/docs/contracts#contract-types", "/docs/contracts#overview"],
    description: "Machine JSON enumerating contract_id keys, authority_href targets, and hints for validators.",
    tags: ["contracts", "registry", "json", "contract_id", "types"],
  },
  {
    id: "contracts-event-envelope-schema",
    label: "Event envelope schema (Contracts JSON)",
    aliases: ["CONTRACTS_EVENT_ENVELOPE_SCHEMA", "event envelope json", "event envelope contracts"],
    href: "/docs/contracts#event-contracts",
    kind: "contract",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/client/event-contract", "/docs/events-map", "/docs/contracts#versioning-rules"],
    sourceHrefs: ["/docs/contracts#event-contracts", "/docs/contracts#overview"],
    description: "Pinned envelope JSON consumed by validation and Client event-contract pages; not a duplicate Client spec.",
    tags: ["contracts", "event", "envelope", "schema", "json"],
  },
  {
    id: "contracts-event-plane-registry",
    label: "Event plane (registry)",
    aliases: ["Event plane", "event plane contracts"],
    href: "/docs/contracts#event-contracts",
    kind: "contract",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/contracts", "/docs/events-map#events-table"],
    sourceHrefs: ["/docs/contracts#event-contracts"],
    description: "Registry-facing name for the closed direction enum and envelope constraints tied to E phases.",
    tags: ["contracts", "event", "plane", "registry", "envelope"],
  },
  {
    id: "contracts-hub-overview-contracts",
    label: "Contracts hub overview",
    aliases: ["Contracts Layer hub overview", "contracts cross-layer index"],
    href: "/docs/contracts#overview",
    kind: "cross-layer",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/system-runtime", "/docs/authority-map", "/docs/end-to-end/integration-points"],
    sourceHrefs: ["/docs/contracts#overview", "/docs/contracts#in-this-page"],
    description: "Explains registry-only posture: JSON artifacts, trace export, and deferral to authority_href targets.",
    tags: ["contracts", "overview", "hub", "registry", "cross-layer"],
  },
  {
    id: "contracts-versioning-json",
    label: "Contract versioning rules (JSON)",
    aliases: ["CONTRACTS_VERSIONING_RULES", "envelope compatibility json"],
    href: "/docs/contracts#versioning-rules",
    kind: "contract",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/contracts#event-contracts", "/docs/client/event-contract", "/docs/architecture/contracts/schema-registry"],
    sourceHrefs: ["/docs/contracts#versioning-rules", "/docs/contracts#event-contracts"],
    description: "Compatibility and version bump rules for envelope artifacts listed on the contracts hub.",
    tags: ["contracts", "versioning", "json", "compatibility", "schema"],
  },
  {
    id: "contracts-dsp-contracts-touchpoint",
    label: "DSP contracts (registry touchpoint)",
    aliases: ["api.dsp.execution_handoff", "dsp.api.result_artifact"],
    href: "/docs/dsp-layer/contracts",
    kind: "contract",
    scopes: [...CONTRACTS_LAYER],
    relatedHrefs: ["/docs/contracts#contract-types", "/docs/api", "/docs/dsp-layer"],
    sourceHrefs: ["/docs/dsp-layer/contracts", "/docs/contracts#contract-traceability"],
    description: "DSP handoff and result payloads referenced from the types registry and trace matrix.",
    tags: ["contracts", "dsp", "handoff", "registry", "payload"],
  },
];

/** Alias for tooling / docs that refer to the registry as `DOCS_GLOSSARY`. */
export const DOCS_GLOSSARY: readonly GlossaryEntry[] = GLOSSARY_ENTRIES;

export type GlossaryEntryId = (typeof GLOSSARY_ENTRIES)[number]["id"];

export function getGlossaryEntryById(id: string): GlossaryEntry | undefined {
  return GLOSSARY_ENTRIES.find((e) => e.id === id);
}

/** Entries eligible for autolink / suggestions for a given pilot or page scope. */
export function glossaryEntriesForScope(scope: string | undefined): readonly GlossaryEntry[] {
  if (!scope) return GLOSSARY_ENTRIES;
  return GLOSSARY_ENTRIES.filter((e) => !e.scopes || e.scopes.includes(scope as GlossaryScope));
}

/** Flat surface forms for future client search / command palette (no ranking). */
export function glossaryPhrasesForScope(scope: string | undefined): { phrase: string; entryId: string; href: string }[] {
  const rows: { phrase: string; entryId: string; href: string }[] = [];
  for (const e of glossaryEntriesForScope(scope)) {
    rows.push({ phrase: e.label, entryId: e.id, href: e.href });
    for (const a of e.aliases ?? []) {
      rows.push({ phrase: a, entryId: e.id, href: e.href });
    }
  }
  return rows;
}

const byLabel = (a: GlossaryEntry, b: GlossaryEntry) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" });

/** `/docs/terminology` — System-level section: any entry that participates in the system pilot. */
export function terminologySystemEntries(): readonly GlossaryEntry[] {
  return [...DOCS_GLOSSARY].filter((e) => e.scopes?.includes("system")).sort(byLabel);
}

/** `/docs/terminology` — End-to-end layer section: E2E-only rows (not shared global/system pilot entries). */
export function terminologyEndToEndLayerEntries(): readonly GlossaryEntry[] {
  return [...DOCS_GLOSSARY]
    .filter((e) => e.scopes?.includes("end-to-end") && !e.scopes?.includes("system"))
    .sort(byLabel);
}

/** Other scope strips on the terminology page (client, contracts, qagent, other). */
export function terminologyEntriesForScopeSection(scope: Exclude<GlossaryScope, "system" | "end-to-end">): readonly GlossaryEntry[] {
  return [...DOCS_GLOSSARY].filter((e) => e.scopes?.includes(scope)).sort(byLabel);
}
