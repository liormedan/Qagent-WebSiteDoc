import type { DocPageContent } from "@/lib/docs";

export const audioComparisonDifferenceModelContent: DocPageContent = {
  slug: "audio-comparison/difference-model",
  title: "Audio Difference Model",
  description: "Structured representation of detected audio changes and their user-facing impact.",
  sections: [
    {
      title: "AudioDifference Contract",
      body: [
        "Each difference captures change type, time region, semantic summary, and impact level.",
        "Differences are generated per comparison and used by playback and canvas visualization.",
      ],
      code: `interface AudioDifference {
  type: 'loudness' | 'noise' | 'tone' | 'dynamic'
  region: { start: number; end: number }
  change: string
  impact: 'low' | 'medium' | 'high'
  confidence: number
  frequencyBand?: 'sub' | 'low' | 'mid' | 'high' | 'air'
}`,
    },
    {
      title: "How Changes Are Detected",
      body: [
        "Detection compares aligned windows between base and compared versions.",
        "Feature deltas are mapped to typed differences (for example noise floor drop -> noise).",
        "Thresholding and confidence scoring prevent low-signal false highlights.",
      ],
      code: `Detection pipeline
1) align(base, compared)
2) compute feature deltas
3) classify type
4) assign impact
5) assign confidence`,
    },
    {
      title: "Impact Thresholds",
      body: [
        "Impact is assigned from measurable loudness delta bands for consistency.",
        "Thresholding is deterministic and shared across comparison and recommendation layers.",
      ],
      code: `impact thresholds
low = <1dB
medium = 1-3dB
high = >3dB`,
    },
    {
      title: "How Changes Are Presented",
      body: [
        "Differences are shown as highlighted timeline regions and canvas markers.",
        "Each marker includes type, short change text, and impact badge.",
        "Playback controls can jump directly to each region for fast evaluation.",
      ],
    },
  ],
};
