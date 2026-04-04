import type { DocPageContent } from "@/lib/docs";

export const orchestrationSharedStateContent: DocPageContent = {
  slug: "orchestration/shared-state",
  title: "Orchestration Shared State",
  description: "Shared audio state contract used across all orchestrated agents and services.",
  sections: [
    {
      title: "SharedAudioState Contract",
      body: [
        "Shared state is the coordination boundary between services.",
        "All role-specific decisions must reference current shared state snapshot.",
        "Shared state includes flow-level tracing metadata for cross-agent observability.",
      ],
      code: `interface SharedAudioState {
  version: '1.0'
  flowId: string
  traceId: string
  activeFileId: string
  currentVersionId: string
  audioFeatures?: AudioFeatures
  lastComparison?: AudioComparison
  recommendations?: AudioRecommendation[]
}`,
    },
  ],
};
