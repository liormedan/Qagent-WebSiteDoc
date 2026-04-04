import type { DocPageContent } from "@/lib/docs";

export const audioIntelligenceContent: DocPageContent = {
  slug: "audio-intelligence",
  title: "Audio Intelligence",
  description: "High-level intelligence layer for interpreting audio context before processing decisions.",
  sections: [
    {
      title: "Operational Environment",
      body: [
        "Audio intelligence runs on top of Audio Sandbox indexes and features.",
        "Use /docs/audio-sandbox/overview as entry point for operational boundaries.",
        "Use /docs/audio-sandbox/query-operations for query contracts.",
      ],
    },
  ],
};