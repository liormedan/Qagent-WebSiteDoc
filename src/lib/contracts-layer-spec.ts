/** Cross-layer contract registry and JSON artifacts for /docs/contracts. */

export const CONTRACTS_LAYER_SPEC_VERSION = "1.0.0" as const;

/** Closed set: every `contracts[].direction` MUST equal one of these values. */
export const CONTRACT_DIRECTION_ENUM = [
  "client_to_qagent",
  "qagent_to_api",
  "api_to_dsp",
  "dsp_to_api",
  "client_internal_bus",
  "all_layers",
  "client_qagent",
] as const;

export type ContractDirection = (typeof CONTRACT_DIRECTION_ENUM)[number];

export const CONTRACTS_TYPES_REGISTRY = {
  $id: "https://waveq.dev/docs/contracts/types-registry-v1.json",
  version: CONTRACTS_LAYER_SPEC_VERSION,
  allowed_direction_values: [...CONTRACT_DIRECTION_ENUM],
  contracts: [
    {
      contract_id: "client.qagent.intent_envelope",
      direction: "client_to_qagent",
      media_type: "application/json",
      authority_href: "/docs/q-agent",
      authority_section: "overview",
    },
    {
      contract_id: "qagent.api.execution_request",
      direction: "qagent_to_api",
      media_type: "application/json",
      authority_href: "/docs/api",
      authority_section: "overview",
    },
    {
      contract_id: "api.dsp.execution_handoff",
      direction: "api_to_dsp",
      media_type: "application/json",
      authority_href: "/docs/dsp-layer/contracts",
      authority_section: "execution_handoff_semantics",
    },
    {
      contract_id: "dsp.api.result_artifact",
      direction: "dsp_to_api",
      media_type: "application/json",
      authority_href: "/docs/dsp-layer/contracts",
      authority_section: "result_artifact_semantics",
    },
    {
      contract_id: "client.runtime.event_envelope",
      direction: "client_internal_bus",
      media_type: "application/json",
      authority_href: "/docs/client/event-contract",
      authority_section: "canonical_envelope_fields",
    },
    {
      contract_id: "global.schema_registry_ref",
      direction: "all_layers",
      media_type: "application/json",
      authority_href: "/docs/architecture/contracts/schema-registry",
      authority_section: "registry_root",
    },
    {
      contract_id: "global.lineage_ref",
      direction: "all_layers",
      media_type: "application/json",
      authority_href: "/docs/architecture/contracts/lineage-model",
      authority_section: "lineage_root",
    },
    {
      contract_id: "global.client_qagent_id_map",
      direction: "client_qagent",
      media_type: "application/json",
      authority_href: "/docs/architecture/contracts/client-qagent-id-mapping",
      authority_section: "mapping_root",
    },
  ],
} as const;

/** Closed union of `contract_id` values in `CONTRACTS_TYPES_REGISTRY.contracts`. */
export type ContractsRegistryContractId = (typeof CONTRACTS_TYPES_REGISTRY.contracts)[number]["contract_id"];

export const CONTRACTS_EVENT_ENVELOPE_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://waveq.dev/docs/contracts/event-envelope-v1.json",
  title: "waveq.event_envelope.v1",
  type: "object",
  additionalProperties: false,
  required: ["eventId", "eventType", "correlationId", "sessionId", "sequence", "timestamp", "payload", "version"],
  properties: {
    eventId: { type: "string", minLength: 1 },
    eventType: { type: "string", minLength: 1 },
    correlationId: { type: "string", minLength: 1 },
    sessionId: { type: "string", minLength: 1 },
    sequence: { type: "integer", minimum: 0 },
    timestamp: { type: "integer", minimum: 0 },
    payload: {
      type: "object",
      minProperties: 1,
      "$comment":
        "Inner JSON MUST be governed only by types registered under Schema Registry authority_href /docs/architecture/contracts/schema-registry; this envelope does not embed or duplicate registered payload schemas.",
    },
    version: { type: "string", pattern: "^\\d+\\.\\d+\\.\\d+$" },
  },
} as const;

export const CONTRACTS_VERSIONING_RULES = {
  $id: "https://waveq.dev/docs/contracts/versioning-v1.json",
  version: CONTRACTS_LAYER_SPEC_VERSION,
  envelope_version_field: "version",
  semver: { pattern: "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$", example: "1.0.0" },
  compatibility: {
    MAJOR: { allows: [], breaking: ["required_field_added", "field_removed", "type_changed", "additionalProperties_tightened"] },
    MINOR: { allows: ["optional_field_added", "enum_extended"], breaking: [] },
    PATCH: { allows: ["documentation_only"], breaking: [] },
  },
  payload_versioning: {
    authority_href: "/docs/architecture/contracts/schema-registry",
    binding: "payload.$schema_or_type_key_registered",
  },
  cross_layer_refs: {
    must_resolve: ["contract_id", "authority_href"],
    registry_file_version: {
      field: "version",
      location: "types registry root",
      rule: "Single semver for the registry JSON artifact; bump on registry row or envelope schema doc change.",
    },
    envelope_document_version: {
      field: "version",
      location: "event envelope root",
      rule: "Semver for envelope shape only; independent from payload types bound via schema registry.",
    },
  },
} as const;

export const CONTRACTS_VALIDATION_STRATEGY = {
  $id: "https://waveq.dev/docs/contracts/validation-strategy-v1.json",
  version: CONTRACTS_LAYER_SPEC_VERSION,
  stages: [
    { id: "V01", gate: "syntax_parse", input: "octets", output: "json_value" },
    { id: "V02", gate: "json_schema_validate", input: "json_value", output: "validated_document" },
    { id: "V03", gate: "registry_resolve", input: "validated_document", output: "bound_schema_ref" },
    { id: "V04", gate: "auth_context_bind", input: "validated_document", output: "scoped_document" },
    { id: "V05", gate: "transport_accept", input: "scoped_document", output: "handoff_ok" },
  ],
  rejection_codes: [
    { code: "CONTRACT_MALFORMED", http: 400, stage: "V01" },
    { code: "CONTRACT_SCHEMA_FAIL", http: 422, stage: "V02" },
    { code: "CONTRACT_UNKNOWN_TYPE", http: 422, stage: "V03" },
    { code: "CONTRACT_SCOPE_FAIL", http: 403, stage: "V04" },
  ],
  surfaces: {
    client: { href: "/docs/client/system-validation", role: "pre_render_gate" },
    qagent: { href: "/docs/q-agent", role: "planning_ingress_contract_gate" },
    api: { href: "/docs/api", role: "ingress_gate" },
    dsp: { href: "/docs/dsp-layer/contracts", role: "execution_ingress_gate" },
  },
} as const;
