import type { DocPageContent } from "@/lib/docs";

export const implementationMapContent: DocPageContent = {
  slug: "implementation-map",
  title: "Implementation Map",
  description:
    "Mapping from Q spec concepts to future runtime modules and file structure.",
  sections: [
    {
      title: "Concept -> Module Mapping",
      body: [
        "Intent resolution maps to Intent Detector + Reasoning Engine + Clarification Manager.",
        "Execution planning maps to Planner + Safety Gate + DAL Builder + Validation Layer.",
        "Cross-reference spec: /docs/contracts, /docs/reasoning-system, /docs/planning, /docs/dal-integration.",
      ],
      code: `QInput
-> detectIntent()
-> runReasoningLoop()
-> buildPlan()
-> shouldRequireApproval()
-> buildDALFromPlan()
-> validateQOutput()`,
    },
    {
      title: "Layered Breakdown",
      body: [
        "intent: detect base intent and confidence",
        "reasoning: resolve ambiguity with bounded internal loop",
        "clarification: ask user only when unresolved",
        "planning: generate deterministic steps from refined intent",
        "approvals: enforce policy before DAL finalization",
        "DAL generation: map plan steps to DAL actions",
        "validation: verify output and DAL shape before handoff",
      ],
    },
    {
      title: "Future Folder Structure",
      body: [
        "Reference architecture for implementation phase.",
      ],
      code: `src/runtime/q/
  contracts/
    q.types.ts
  intent/
    detectIntent.ts
  reasoning/
    runReasoningLoop.ts
    reasoningPolicy.ts
  clarification/
    buildClarificationQuestion.ts
  planning/
    buildPlan.ts
  safety/
    shouldRequireApproval.ts
  dal/
    buildDALFromPlan.ts
    validateDal.ts
  validation/
    validateQOutput.ts
  state/
    stateMachine.ts
  orchestrator/
    runQPipeline.ts`,
    },
  ],
};