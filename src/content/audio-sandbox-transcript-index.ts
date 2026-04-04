import type { DocPageContent } from "@/lib/docs";

export const audioSandboxTranscriptIndexContent: DocPageContent = {
  slug: "audio-sandbox/transcript-index",
  title: "Transcript Index",
  description: "Word-level transcript index for searchable spoken content.",
  sections: [
    {
      title: "Transcript Contract",
      body: [
        "Word-level index enables deterministic lookup by time range.",
      ],
      code: `interface TranscriptWord {
  word: string;
  startSec: number;
  endSec: number;
  confidence: number;
  speakerId?: string;
}`,
    },
    {
      title: "Query Capabilities",
      body: [
        "Word-level search: locate a specific token.",
        "Phrase search: contiguous multi-word lookup.",
        "Speaker-aware search: filter by speakerId when available.",
      ],
    },
    {
      title: "Limitations",
      body: [
        "ASR confidence can be low in heavy noise/music overlap.",
        "Speaker separation depends on diarization quality.",
      ],
    },
  ],
};