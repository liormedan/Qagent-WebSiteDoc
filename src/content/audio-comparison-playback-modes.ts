import type { DocPageContent } from "@/lib/docs";

export const audioComparisonPlaybackModesContent: DocPageContent = {
  slug: "audio-comparison/playback-modes",
  title: "Playback Modes",
  description: "Comparison-oriented playback behaviors for rapid and reliable auditory decision making.",
  sections: [
    {
      title: "Normalization Requirement",
      body: [
        "All A/B playback must apply LUFS normalization before switching or synced playback.",
        "Normalization prevents level bias and keeps perceived loudness fair during comparisons.",
      ],
      code: `interface ComparisonPlaybackPolicy {
  lufsNormalizationRequired: true
}`,
    },
    {
      title: "A/B Toggle",
      body: [
        "User toggles between base and compared versions while preserving current playback position.",
        "Useful for broad subjective evaluation across the full track.",
      ],
    },
    {
      title: "Instant Switching",
      body: [
        "Switching must be immediate to preserve auditory memory and expose subtle changes.",
        "No timeline reset is applied when switching versions.",
      ],
    },
    {
      title: "Synced Playback",
      body: [
        "Both versions share a synchronized transport position.",
        "Any seek, pause, or resume action affects the active comparison context consistently.",
      ],
    },
    {
      title: "Loop Comparison",
      body: [
        "User can loop a selected region containing one or more differences.",
        "Looping is optimized for repeated micro-evaluation before accept or revert.",
      ],
      code: `interface LoopRange {
  start: number
  end: number
  comparisonId: string
}`,
    },
  ],
};
