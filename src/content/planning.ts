import type { DocPageContent } from "@/lib/docs";

export const planningContent: DocPageContent = {
  slug: "planning",
  title: "Planning",
  description:
    "Planner rules for decomposing user requests into deterministic QPlan steps and DAL-ready outputs.",
  sections: [
    {
      title: "How Q Builds A Plan",
      body: [
        "Planner input: QInput + classified QIntent + policy context.",
        "Planner output: QPlan with ordered QPlanStep entries and confidence metrics.",
        "Each step must be explicit, typed, and target-scoped so DAL mapping is deterministic.",
      ],
      code: `interface QPlan {
  goal: string;
  steps: QPlanStep[];
  overallConfidence: number;
}`,
    },
    {
      title: "Step Creation Logic",
      body: [
        "Step count depends on intent complexity and target scope.",
        "Simple single-transform intents produce 2-3 steps (analyze -> transform -> validate).",
        "Multi-objective requests produce longer plans with explicit dependencies.",
      ],
      code: `function createSteps(intent: QIntent): QPlanStep[] {
  if (intent.type === "remove_noise") {
    return [
      { id: "step_1", type: "analyze", target: intent.target ?? "full_track", confidence: 0.95, destructive: false, description: "Estimate noise profile" },
      { id: "step_2", type: "transform", target: intent.target ?? "full_track", confidence: 0.9, destructive: true, description: "Apply denoise", dependsOn: ["step_1"] },
      { id: "step_3", type: "validate", target: intent.target ?? "full_track", confidence: 0.88, destructive: false, description: "Check speech preservation", dependsOn: ["step_2"] },
    ];
  }
  return [];
}`,
    },
    {
      title: "Confidence Logic",
      body: [
        "overallConfidence is computed from intent confidence, step confidence distribution, and policy penalties.",
        "Low confidence or conflicting evidence should reduce confidence and can force approval or fallback intent.",
      ],
      code: `function computeOverallConfidence(intent: QIntent, steps: QPlanStep[]): number {
  const meanStep = steps.reduce((sum, step) => sum + step.confidence, 0) / Math.max(steps.length, 1);
  const weighted = 0.6 * intent.confidence + 0.4 * meanStep;
  return Math.max(0, Math.min(1, Number(weighted.toFixed(2))));
}`,
    },
    {
      title: "Approval Rules",
      body: [
        "Approval is required when any destructive step touches user data without safe auto-revert guarantee.",
        "Approval is also required when confidence is below policy threshold (recommended < 0.75).",
      ],
      code: `function requiresApproval(plan: QPlan): boolean {
  const hasDestructive = plan.steps.some((step) => step.destructive);
  const lowConfidence = plan.overallConfidence < 0.75;
  return hasDestructive || lowConfidence;
}`,
    },
    {
      title: "Plan To DAL Relationship",
      body: [
        "Plan is explainable intent-level logic; DAL is executable deterministic contract.",
        "Every executable step must map to exactly one DAL action in order.",
      ],
      code: `// Deterministic mapping rule:
// QPlanStep[i] -> AudioDAL.actions[i]`,
    },
    {
      title: "End-To-End Example",
      body: [
        "Input: User says \"clean background noise\".",
        "Output chain must include Intent -> Plan -> DAL with no hidden steps.",
      ],
      code: `// Intent
const intent: QIntent = {
  type: "remove_noise",
  target: "full_track",
  confidence: 0.9,
  rationale: "Clear denoise request",
  evidence: ["clean", "background noise"],
};

// Plan
const plan: QPlan = {
  planId: "plan_001",
  goal: "Reduce background noise across track while preserving speech",
  steps: [
    { id: "step_1", type: "analyze", description: "Estimate noise floor", target: "full_track", confidence: 0.94, destructive: false },
    { id: "step_2", type: "transform", description: "Apply denoise", target: "full_track", params: { strength: 0.4 }, confidence: 0.89, destructive: true, dependsOn: ["step_1"] },
    { id: "step_3", type: "validate", description: "Validate voice clarity", target: "full_track", confidence: 0.86, destructive: false, dependsOn: ["step_2"] },
  ],
  overallConfidence: 0.9,
  requiresApproval: true,
};

// DAL
const dal: AudioDAL = {
  version: "1.0.0",
  actions: [
    { id: "act_1", type: "analyze_noise_profile", target: "full_track" },
    { id: "act_2", type: "apply_denoise", target: "full_track", params: { strength: 0.4 } },
    { id: "act_3", type: "validate_voice_preservation", target: "full_track" },
  ],
  metadata: {
    createdBy: "Q",
    intent: intent.type,
    confidence: plan.overallConfidence,
    requestId: "req_001",
    planId: plan.planId,
    createdAt: "2026-04-04T10:45:00.000Z",
  },
  safety: { requiresApproval: true, destructive: true },
};`,
    },
  ],
};