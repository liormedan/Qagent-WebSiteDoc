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
        "Comparison outputs feed recommendation quality through a feedback loop from measured differences to suggested actions.",
        "Execution output is eligible for automatic comparison.",
        "Comparison can be triggered after execution completion.",
      ],
      code: `Read next:
1) /docs/audio-comparison/overview
2) /docs/audio-comparison/versioning
3) /docs/audio-comparison/comparison-model
4) /docs/audio-comparison/difference-model
5) /docs/audio-comparison/playback-modes
6) /docs/audio-comparison/canvas-ui
7) /docs/audio-comparison/user-flow
8) feedback: comparison -> recommendation-engine
9) runtime trigger: /docs/execution-runtime/output-versioning`,
    },
    {
      title: "Comparison To Recommendation Feedback Loop",
      body: [
        "Comparison evidence can strengthen recommendation confidence when improvements are clear and high-impact.",
        "Comparison evidence can weaken recommendation confidence when regressions or risky tradeoffs are detected.",
        "Recommendation layer should reference comparison IDs and marker evidence when suggesting accept/revert/iterate.",
      ],
      code: `comparison_evidence -> recommendation_confidence
positive verified deltas -> confidence up
negative or mixed deltas -> confidence down`,
    },
  ],
};
