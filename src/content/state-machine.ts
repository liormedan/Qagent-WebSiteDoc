import type { DocPageContent } from "@/lib/docs";

export const stateMachineContent: DocPageContent = {
  slug: "state-machine",
  title: "State Machine",
  description:
    "Runtime states, allowed transitions, and owning module per transition.",
  sections: [
    {
      title: "QAgentState",
      body: ["State model for runtime orchestration."],
      code: `type QAgentState =
  | "idle"
  | "parsing"
  | "reasoning"
  | "waiting_for_user"
  | "planning"
  | "awaiting_approval"
  | "generating_dal"
  | "ready_for_execution"
  | "executing"
  | "completed"
  | "failed";`,
    },
    {
      title: "Allowed Transitions Only",
      body: [
        "Only these transitions are valid.",
      ],
      code: `idle -> parsing
parsing -> planning
parsing -> reasoning
reasoning -> planning
reasoning -> waiting_for_user
waiting_for_user -> reasoning
planning -> awaiting_approval
planning -> generating_dal
awaiting_approval -> generating_dal
generating_dal -> ready_for_execution
ready_for_execution -> executing
executing -> completed
* -> failed`,
    },
    {
      title: "Transition Ownership",
      body: [
        "Intent Detector owns idle->parsing and parsing outputs.",
        "Reasoning Engine owns parsing->reasoning and reasoning refinement transitions.",
        "Clarification Manager owns reasoning<->waiting_for_user loop.",
        "Planner owns reasoning/parsing->planning.",
        "Safety Gate owns planning->awaiting_approval or planning->generating_dal decision.",
        "DAL Builder owns awaiting_approval->generating_dal and generating_dal output.",
        "Validation Layer owns generating_dal->ready_for_execution gate.",
      ],
      code: `type TransitionOwner = {
  from: QAgentState;
  to: QAgentState;
  module:
    | "IntentDetector"
    | "ReasoningEngine"
    | "ClarificationManager"
    | "Planner"
    | "SafetyGate"
    | "DALBuilder"
    | "ValidationLayer";
};`,
    },
    {
      title: "Forbidden Progression",
      body: [
        "No transition to generating_dal while state is waiting_for_user.",
        "No transition to ready_for_execution without DAL validation success.",
      ],
      code: `if (state === "waiting_for_user") {
  assert(next !== "generating_dal");
}`,
    },
  ],
};