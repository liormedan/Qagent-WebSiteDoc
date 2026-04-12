import { CONTRACTS_VALIDATION_STRATEGY } from "@/lib/contracts-layer-spec";
import { SYSTEM_RUNTIME_SPINE } from "@/lib/system-runtime-spine";

const VALIDATION_STAGE_IDS = CONTRACTS_VALIDATION_STRATEGY.stages.map((s) => s.id) as readonly string[];

/** Stable fragment id for `/docs/contracts#…` rows (HTML id cannot use raw dots reliably). */
export function contractTraceDomId(contractId: string): string {
  return `trace-${contractId.replace(/\./g, "-")}`;
}

export type ContractRuntimeTraceRow = {
  readonly contract_id: string;
  readonly runtime_steps: readonly string[];
  readonly validation_stages: readonly string[];
};

function buildContractRuntimeTraceRows(): readonly ContractRuntimeTraceRow[] {
  const m = new Map<string, Set<string>>();
  for (const step of SYSTEM_RUNTIME_SPINE) {
    for (const cid of step.contract_ids) {
      if (!m.has(cid)) m.set(cid, new Set());
      m.get(cid)!.add(step.id);
    }
  }
  return [...m.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([contract_id, set]) => ({
      contract_id,
      runtime_steps: Object.freeze([...set].sort((x, y) => x.localeCompare(y))),
      validation_stages: VALIDATION_STAGE_IDS,
    }));
}

export const CONTRACT_RUNTIME_TRACE_ROWS: readonly ContractRuntimeTraceRow[] = buildContractRuntimeTraceRows();

export const CONTRACT_RUNTIME_TRACE_EXPORT = {
  spec: "waveq.contract_runtime_trace",
  version: "1.0.0",
  runtime_spine_authority: "/docs/system-runtime",
  validation_strategy_authority: "/docs/contracts#validation-strategy",
  validation_stage_definitions: CONTRACTS_VALIDATION_STRATEGY.stages.map((s) => ({ id: s.id, gate: s.gate })),
  rows: CONTRACT_RUNTIME_TRACE_ROWS,
} as const;
