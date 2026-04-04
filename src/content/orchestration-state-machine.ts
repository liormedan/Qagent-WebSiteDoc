import type { DocPageContent } from "@/lib/docs";

export const orchestrationStateMachineContent: DocPageContent = {
  slug: "orchestration/state-machine",
  title: "Orchestration State Machine",
  description: "State model for orchestration lifecycle transitions and control boundaries.",
  sections: [
    {
      title: "Orchestration States",
      body: [
        "State machine constrains transitions across analysis, recommendation, comparison, and execution phases.",
      ],
      code: `type OrchestrationState =
  | 'idle'
  | 'analyzing'
  | 'querying'
  | 'reasoning'
  | 'recommending'
  | 'comparing'
  | 'waiting_for_user'
  | 'executing'
  | 'completed'
  | 'error'`,
    },
  ],
};
