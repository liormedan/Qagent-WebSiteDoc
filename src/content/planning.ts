import type { DocPageContent } from "@/lib/docs";

export const planningContent: DocPageContent = {
  slug: "planning",
  title: "Planning",
  description:
    "Planner behavior after intent resolution, including approval gating and deterministic DAL mapping.",
  sections: [
    {
      title: "Planning After Resolution",
      body: [
        "Plan is built from refinedIntent, not always from raw input.",
        "Planning starts only when intent confidence is sufficient or clarification completed.",
        "Reasoning output can inject context that changes target scope and action type.",
      ],
      code: `function canStartPlanning(result: ReasoningResult): boolean {
  return result.state === "finalized" && Boolean(result.refinedIntent);
}`,
    },
    {
      title: "Step Construction",
      body: [
        "Planner creates ordered QPlanStep list with explicit dependencies.",
        "Step count grows with complexity, but structure remains deterministic.",
      ],
      code: `function buildPlanFromRefinedIntent(intent: QIntent): QPlan {
  // deterministic strategy by intent.type
  return {} as QPlan;
}`,
    },
    {
      title: "Approval Decision",
      body: [
        "Approval is evaluated after plan creation and before DAL generation.",
        "Destructive operations or low plan confidence must trigger approval.",
      ],
      code: `function shouldRequireApproval(plan: QPlan): boolean {
  return plan.steps.some((step) => step.destructive) || plan.overallConfidence < 0.75;
}`,
    },
    {
      title: "End-To-End Example",
      body: [
        "Example: planning after clarification for ambiguous request.",
      ],
      code: `User: "make it cleaner"
-> Initial Intent: unknown (0.48)
-> Reasoning: possible remove_noise | enhance_voice
-> Clarification Question: "Do you want noise reduction or vocal presence boost?"
-> User Answer: "remove room noise"
-> Refined Intent: remove_noise (0.90)
-> Plan: analyze_noise -> apply_denoise -> validate
-> DAL: analyze_noise_profile, apply_denoise, validate_voice_preservation`,
    },
  ],
};