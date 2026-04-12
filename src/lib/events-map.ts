import type { ContractDirection } from "@/lib/contracts-layer-spec";
import { SYSTEM_RUNTIME_SPINE } from "@/lib/system-runtime-spine";

/** Primary contract `direction` enum value for event posture at each R step (must match CONTRACT_DIRECTION_ENUM). */
const RUNTIME_STEP_EVENT_PLANE: Record<(typeof SYSTEM_RUNTIME_SPINE)[number]["id"], ContractDirection> = {
  R01: "client_internal_bus",
  R02: "client_to_qagent",
  R03: "client_to_qagent",
  R04: "all_layers",
  R05: "qagent_to_api",
  R06: "qagent_to_api",
  R07: "api_to_dsp",
  R08: "dsp_to_api",
  R09: "all_layers",
  R10: "all_layers",
  R11: "dsp_to_api",
  R12: "client_internal_bus",
};

export type EventsMapPhaseRow = {
  readonly phase: string;
  readonly runtime_step: string;
  readonly event_plane: ContractDirection;
  readonly contract_ids: readonly string[];
  readonly authority_href: string;
  readonly narrative_href: string;
};

function narrativeForStep(runtimeId: string, order: number): string {
  if (runtimeId === "R12" || order <= 3) return "/docs/client/event-flow";
  return "/docs/system-flow";
}

export const EVENTS_MAP_PHASES: readonly EventsMapPhaseRow[] = SYSTEM_RUNTIME_SPINE.map((s) => ({
  phase: `E${String(s.order).padStart(2, "0")}`,
  runtime_step: s.id,
  event_plane: RUNTIME_STEP_EVENT_PLANE[s.id],
  contract_ids: s.contract_ids,
  authority_href: s.authority_href,
  narrative_href: narrativeForStep(s.id, s.order),
}));

export const EVENTS_MAP_EXPORT = {
  spec: "waveq.events_map",
  version: "1.0.0",
  runtime_spine_authority: "/docs/system-runtime",
  event_envelope_authority: "/docs/client/event-contract",
  phases: EVENTS_MAP_PHASES,
} as const;
