import type { DocPageContent } from "@/lib/docs";

export const developmentPhasesContent: DocPageContent = {
  slug: "development-phases",
  title: "Development Phases",
  description:
    "Recommended engineering sequence for implementing Q runtime from the existing spec.",
  sections: [
    {
      title: "Phase Plan",
      body: [
        "Each phase has explicit goal, dependencies, and definition of done.",
      ],
      code: `Phase 1 - Intent Detection
Goal: stable detectIntent()
Build: intent parser + confidence scoring
Dependencies: contracts
Definition of done: deterministic outputs for baseline phrases

Phase 2 - Planning
Goal: buildPlan() from intent
Build: plan step templates + confidence aggregation
Dependencies: phase 1
Definition of done: valid QPlan for clear intents

Phase 3 - DAL Builder
Goal: buildDALFromPlan()
Build: action mapping + metadata
Dependencies: phase 2
Definition of done: valid AudioDAL for each plan path

Phase 4 - Reasoning Loop
Goal: runReasoningLoop()
Build: bounded reasoning iterations + refinement
Dependencies: phases 1-3
Definition of done: unresolved intents transition correctly

Phase 5 - Clarification Flow
Goal: user question loop
Build: clarification question builder + response merge
Dependencies: phase 4
Definition of done: waiting_for_user and refine flow complete

Phase 6 - Validation + Safety
Goal: policy and contract gates
Build: shouldRequireApproval() + validators
Dependencies: phases 2-5
Definition of done: invalid outputs blocked, approvals enforced

Phase 7 - Runtime Integration
Goal: orchestrate full pipeline
Build: state manager + flow controller
Dependencies: all phases
Definition of done: full flow passes scenario tests`,
    },
  ],
};