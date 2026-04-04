import type { DocPageContent } from "@/lib/docs";

export const orchestrationUiReflectionContent: DocPageContent = {
  slug: "orchestration/ui-reflection",
  title: "Orchestration UI Reflection",
  description: "How orchestration state and transitions are represented in user-facing UI.",
  sections: [
    {
      title: "Visible Vs Hidden",
      body: [
        "User sees current stage, key evidence, recommendation/confidence, and required action.",
        "User does not see internal low-level transport messages between services.",
      ],
    },
    {
      title: "System State Presentation",
      body: [
        "UI should display active orchestration state and recent transitions clearly.",
        "Transitions to waiting_for_user and error must be explicit and actionable.",
      ],
      code: `interface OrchestrationUiState {
  state: OrchestrationState
  lastTransitionAt: number
  visibleSteps: string[]
  userActionRequired?: string
}`,
    },
  ],
};
