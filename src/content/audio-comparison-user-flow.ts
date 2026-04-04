import type { DocPageContent } from "@/lib/docs";

export const audioComparisonUserFlowContent: DocPageContent = {
  slug: "audio-comparison/user-flow",
  title: "Audio Comparison User Flow",
  description: "End-to-end decision flow from upload to accepted version using comparison evidence.",
  sections: [
    {
      title: "Core Flow",
      body: [
        "Upload -> Process -> New Version -> Compare -> Decide",
        "Each stage emits artifacts that feed the next stage and preserve decision traceability.",
      ],
      code: `flow UploadToDecision {
  upload
  process
  create_version
  compare
  decide(accept | revert)
}`,
    },
    {
      title: "Scenario 1: Noise Cleanup",
      body: [
        "User uploads interview audio and runs noise removal.",
        "System creates processed version and auto-generates differences in noisy regions.",
        "User loops high-impact markers and accepts the processed version.",
      ],
    },
    {
      title: "Scenario 2: Tone Adjustment Review",
      body: [
        "User applies EQ curve that may affect speech clarity.",
        "A/B synced playback reveals improved tone but slight loudness increase.",
        "User keeps the version after validating impact is acceptable.",
      ],
    },
    {
      title: "Scenario 3: Revert Decision",
      body: [
        "User compares a strongly compressed version against baseline.",
        "Difference markers show high dynamic impact across key passages.",
        "User rejects candidate and reverts to previous accepted version.",
      ],
    },
  ],
};
