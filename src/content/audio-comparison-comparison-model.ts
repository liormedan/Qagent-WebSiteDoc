import type { DocPageContent } from "@/lib/docs";

export const audioComparisonModelContent: DocPageContent = {
  slug: "audio-comparison/comparison-model",
  title: "Audio Comparison Model",
  description: "Canonical comparison object for pairing two versions and storing evaluation context.",
  sections: [
    {
      title: "AudioComparison Contract",
      body: [
        "A comparison references two existing versions: a base and a compared candidate.",
        "The comparison object is immutable evidence for playback, diffing, and decisions.",
      ],
      code: `interface AudioComparison {
  id: string
  baseVersionId: string
  comparedVersionId: string
  createdAt: number
  differences: AudioDifference[]
  summary: {
    totalDifferences: number
    highImpactCount: number
    overallRisk: 'safe' | 'moderate' | 'risky'
    recommendedAction: 'accept' | 'revert' | 'review'
  }
}`,
    },
    {
      title: "Model Constraints",
      body: [
        "Both version IDs must exist in the same version graph.",
        "Base and compared IDs must be different.",
        "Comparisons can be created across sibling branches for decision support.",
        "Summary fields must be derived from the attached AudioDifference list.",
      ],
    },
  ],
};
