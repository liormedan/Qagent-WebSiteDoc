import type { DocPageContent } from "@/lib/docs";

export const lifecycleSystemEventsContent: DocPageContent = {
  slug: "lifecycle/system-events",
  title: "System Events",
  description: "Canonical lifecycle events, producers, consumers, and traceability value.",
  sections: [
    {
      title: "SystemEvent Contract",
      body: [
        "Events anchor traceability and deterministic state progression across lifecycle and orchestration.",
      ],
      code: `type SystemEvent =
  | 'SESSION_CREATED'
  | 'AUDIO_LOADED'
  | 'SANDBOX_READY'
  | 'QUERY_COMPLETED'
  | 'RECOMMENDATION_CREATED'
  | 'DECISION_APPROVED'
  | 'EXECUTION_STARTED'
  | 'EXECUTION_COMPLETED'
  | 'VERSION_CREATED'
  | 'COMPARISON_READY'
  | 'SESSION_COMPLETED'`,
    },
    {
      title: "Event Producers And Consumers",
      body: [
        "Producers: Q, Orchestration, Sandbox, Recommendation, Runtime, Memory, Comparison.",
        "Consumers: Session state manager, UI status surfaces, audit/trace logs, continuation logic.",
        "Traceability value: each state/decision transition is explainable by event chain.",
      ],
    },
  ],
};

