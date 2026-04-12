import type { ContractsRegistryContractId } from "@/lib/contracts-layer-spec";

/** Numbered cross-layer product runtime spine (documentation authority). */

export const SYSTEM_RUNTIME_SPINE_VERSION = "1.1.0" as const;

export type SystemRuntimeSpineStep = {
  readonly id: string;
  readonly order: number;
  readonly anchor: string;
  /** Normative doc target for semantics of this step (single href). */
  readonly authority_href: string;
  /** Registry `contract_id` values exercised at this step; full definitions at /docs/contracts and each row’s authority_href. */
  readonly contract_ids: readonly ContractsRegistryContractId[];
};

/** R01–R12: cross-layer lifecycle only; no per-step prose. */
export const SYSTEM_RUNTIME_SPINE: readonly SystemRuntimeSpineStep[] = [
  {
    id: "R01",
    order: 1,
    anchor: "User input at Client surfaces",
    authority_href: "/docs/client",
    contract_ids: ["client.runtime.event_envelope", "global.client_qagent_id_map"],
  },
  {
    id: "R02",
    order: 2,
    anchor: "Client outbound structured handoff to QAgent",
    authority_href: "/docs/q-agent",
    contract_ids: ["client.qagent.intent_envelope", "global.client_qagent_id_map", "global.schema_registry_ref"],
  },
  {
    id: "R03",
    order: 3,
    anchor: "QAgent intake and planning scope",
    authority_href: "/docs/q-agent",
    contract_ids: ["client.qagent.intent_envelope", "global.schema_registry_ref"],
  },
  {
    id: "R04",
    order: 4,
    anchor: "QAgent approval gate before API",
    authority_href: "/docs/architecture/modules/approval",
    contract_ids: ["global.schema_registry_ref"],
  },
  {
    id: "R05",
    order: 5,
    anchor: "Execution request envelope to API",
    authority_href: "/docs/api",
    contract_ids: ["qagent.api.execution_request", "global.lineage_ref", "global.schema_registry_ref"],
  },
  {
    id: "R06",
    order: 6,
    anchor: "API admission and job materialization",
    authority_href: "/docs/api/job-orchestration",
    contract_ids: ["qagent.api.execution_request", "global.schema_registry_ref"],
  },
  {
    id: "R07",
    order: 7,
    anchor: "Execution dispatch into DSP path",
    authority_href: "/docs/api/execution",
    contract_ids: ["api.dsp.execution_handoff"],
  },
  {
    id: "R08",
    order: 8,
    anchor: "DSP processing completion boundary",
    authority_href: "/docs/dsp-layer/contracts",
    contract_ids: ["dsp.api.result_artifact"],
  },
  {
    id: "R09",
    order: 9,
    anchor: "Artifact persistence and workspace scope",
    authority_href: "/docs/data-layer",
    contract_ids: ["dsp.api.result_artifact", "global.lineage_ref"],
  },
  {
    id: "R10",
    order: 10,
    anchor: "Versioning and immutable reference bind",
    authority_href: "/docs/api/versioning",
    contract_ids: ["global.lineage_ref", "global.schema_registry_ref"],
  },
  {
    id: "R11",
    order: 11,
    anchor: "Status and result projection toward Client",
    authority_href: "/docs/api",
    contract_ids: ["dsp.api.result_artifact", "qagent.api.execution_request"],
  },
  {
    id: "R12",
    order: 12,
    anchor: "Client projection and event surfaces",
    authority_href: "/docs/client/event-contract",
    contract_ids: ["client.runtime.event_envelope", "global.schema_registry_ref"],
  },
] as const satisfies readonly SystemRuntimeSpineStep[];

export const SYSTEM_RUNTIME_SPINE_EXPORT = {
  spec: "waveq.system_runtime_spine",
  version: SYSTEM_RUNTIME_SPINE_VERSION,
  contracts_hub: "/docs/contracts",
  contract_traceability: "/docs/contracts#contract-traceability",
  parallel_invariant: {
    id: "AUTH_HTTP_SPINE",
    href: "/docs/auth-security/system-flow",
    applies_when: "protected_http_to_api",
  },
  steps: [...SYSTEM_RUNTIME_SPINE],
} as const;
