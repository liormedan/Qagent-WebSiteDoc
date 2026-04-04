import type { DocPageContent } from "@/lib/docs";

export const dalIntegrationContent: DocPageContent = {
  slug: "dal-integration",
  title: "DAL Integration",
  description:
    "How Q transforms plans into deterministic AudioDAL contracts and why DAL is a mandatory boundary.",
  sections: [
    {
      title: "Why DAL Is Mandatory",
      body: [
        "Q outputs natural-language reasoning, but execution systems require deterministic payloads.",
        "DAL is the strict boundary that prevents implicit behavior and enforces stable contracts between Q and D Agent.",
        "Without DAL, execution becomes ambiguous and non-auditable.",
      ],
    },
    {
      title: "AudioDAL v1 Spec",
      body: [
        "Created immediately after a valid QPlan is available.",
        "Consumed by D Agent/execution runtime only, never by free-form prompt parsing.",
      ],
      code: `export interface AudioDAL {
  /** Contract version for compatibility checks. */
  version: "1.0.0";
  /** Ordered deterministic actions derived from plan steps. */
  actions: DALAction[];
  /** Provenance metadata from planner stage. */
  metadata: {
    createdBy: "Q";
    intent: string;
    confidence: number;
    requestId: string;
    planId: string;
    createdAt: string;
  };
  /** Execution safety flags used by orchestrator policy. */
  safety: {
    requiresApproval: boolean;
    destructive: boolean;
  };
  /** Reserved field for deterministic contract hash in future phases. */
  hashBase?: string;
}

export interface DALAction {
  /** Stable action ID for logs and retries. */
  id: string;
  /** Canonical action operation key. */
  type: string;
  /** Scope for execution target. */
  target: "full_track" | "selected_region";
  /** Typed params payload passed to executor. */
  params?: Record<string, unknown>;
}`,
    },
    {
      title: "Plan -> DAL Transformation",
      body: [
        "Q maps each executable QPlanStep into one DALAction in stable order.",
        "Non-executable or explanatory steps are filtered out before DAL emission.",
        "Safety flags are aggregated from all steps and policy outcomes.",
      ],
      code: `function buildDalFromPlan(input: {
  requestId: string;
  intent: string;
  plan: QPlan;
  nowIso: string;
}): AudioDAL {
  const actions: DALAction[] = input.plan.steps.map((step, index) => ({
    id: "act_" + String(index + 1),
    type: mapStepTypeToDalAction(step.type),
    target: step.target,
    params: step.params,
  }));

  return {
    version: "1.0.0",
    actions,
    metadata: {
      createdBy: "Q",
      intent: input.intent,
      confidence: input.plan.overallConfidence,
      requestId: input.requestId,
      planId: input.plan.planId,
      createdAt: input.nowIso,
    },
    safety: {
      requiresApproval: input.plan.requiresApproval,
      destructive: input.plan.steps.some((step) => step.destructive),
    },
  };
}`,
    },
    {
      title: "Invalid DAL Handling",
      body: [
        "If DAL fails schema validation, Q must return a structured failure state and block execution handoff.",
        "No partial execution is allowed when DAL is invalid.",
      ],
      code: `interface DalValidationError {
  code: "INVALID_DAL";
  requestId: string;
  issues: string[];
}

// Policy: do not send to D Agent when issues.length > 0.`,
    },
    {
      title: "Hash Direction (Design Only)",
      body: [
        "Hashing is not implemented in Phase 1, but DAL should already be shaped for deterministic serialization.",
        "Future hash should be computed over canonicalized DAL JSON to support replay and traceability.",
      ],
      code: `// Future direction only
// dalHash = sha256(canonicalJsonSerialize(audioDal))`,
    },
    {
      title: "Example: Plan To DAL",
      body: [
        "End-to-end example for remove-noise request.",
      ],
      code: `const dal: AudioDAL = {
  version: "1.0.0",
  actions: [
    {
      id: "act_1",
      type: "analyze_noise_profile",
      target: "selected_region",
    },
    {
      id: "act_2",
      type: "apply_denoise",
      target: "selected_region",
      params: { strength: 0.45, preserveVoice: true },
    },
  ],
  metadata: {
    createdBy: "Q",
    intent: "remove_noise",
    confidence: 0.92,
    requestId: "req_01JQ8N3QY3",
    planId: "plan_01JQ8N4H9A",
    createdAt: "2026-04-04T10:30:00.000Z",
  },
  safety: {
    requiresApproval: true,
    destructive: true,
  },
};`,
    },
  ],
};
