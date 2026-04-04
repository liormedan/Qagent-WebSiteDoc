import type { DocPageContent } from "@/lib/docs";

export const audioComparisonIndexContent: DocPageContent = {
  slug: "audio-comparison",
  title: "Audio Comparison",
  description: "Section index for audio A/B comparison, version lineage, differences, playback, and canvas decision UX.",
  sections: [
    {
      title: "Section Scope",
      body: [
        "This section defines comparison-oriented data models and UI contracts for user-facing decisions.",
        "It documents analysis and representation only, without runtime DSP implementation.",
      ],
      code: `Read next:
1) /docs/audio-comparison/overview
2) /docs/audio-comparison/versioning
3) /docs/audio-comparison/comparison-model
4) /docs/audio-comparison/difference-model
5) /docs/audio-comparison/playback-modes
6) /docs/audio-comparison/canvas-ui
7) /docs/audio-comparison/user-flow`,
    },
  ],
};
