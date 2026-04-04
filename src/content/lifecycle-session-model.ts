import type { DocPageContent } from "@/lib/docs";

export const lifecycleSessionModelContent: DocPageContent = {
  slug: "lifecycle/session-model",
  title: "Session Model",
  description: "Audio session contract and lifecycle state semantics.",
  sections: [
    {
      title: "AudioSession Contract",
      body: [
        "Session is opened by orchestration when audio context is initiated.",
        "Session state changes on load, investigation, user gating, execution, review, and termination events.",
      ],
      code: `interface AudioSession {
  id: string
  fileId: string
  startedAt: number
  currentVersionId: string
  state: SessionLifecycleState
  activeFlowId?: string
}

type SessionLifecycleState =
  | 'created'
  | 'loading_audio'
  | 'ready'
  | 'investigating'
  | 'waiting_for_user'
  | 'executing'
  | 'reviewing'
  | 'completed'
  | 'abandoned'
  | 'error'`,
    },
    {
      title: "Persistence Rules",
      body: [
        "Session preserves active version, recent decisions, and flow references between state transitions.",
        "State changes must be event-backed and traceable through system events.",
      ],
    },
  ],
};

