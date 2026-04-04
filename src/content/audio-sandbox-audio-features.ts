import type { DocPageContent } from "@/lib/docs";

export const audioSandboxAudioFeaturesContent: DocPageContent = {
  slug: "audio-sandbox/audio-features",
  title: "Audio Features",
  description: "Acoustic features persisted in sandbox to support reasoning and query decisions.",
  sections: [
    {
      title: "Feature Contract",
      body: [
        "Features provide compact summary signals for Q decision making.",
      ],
      code: `interface AudioFeatures {
  lufs?: number;
  peakDb?: number;
  noiseLevel?: "none" | "low" | "medium" | "high";
  hasClipping?: boolean;
  hasReverb?: boolean;
  speechDetected?: boolean;
  musicDetected?: boolean;
}`,
    },
    {
      title: "Why Features Matter",
      body: [
        "Enable quick pre-checks before expensive scans.",
        "Improve intent refinement for audio analysis and processing requests.",
        "Support deterministic routing rules in decision layer.",
      ],
    },
    {
      title: "AudioFeatures To ComparisonDifferences Mapping",
      body: [
        "Sandbox feature signals map directly into typed comparison differences for consistent decision logic.",
        "Mapping uses deterministic rules so UI and reasoning consume the same change semantics.",
      ],
      code: `AudioFeatures -> ComparisonDifferences
noiseLevel: "high" -> difference.type = "noise", impact = "high"
hasClipping: true -> difference.change = "repair difference", impact = "high"
lufs delta > 3dB -> difference.type = "loudness", impact = "high"
hasReverb change -> difference.type = "tone"`,
    },
  ],
};
