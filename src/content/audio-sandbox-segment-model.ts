import type { DocPageContent } from "@/lib/docs";

export const audioSandboxSegmentModelContent: DocPageContent = {
  slug: "audio-sandbox/segment-model",
  title: "Audio Segment Model",
  description: "How sandbox splits audio into searchable and analyzable segments.",
  sections: [
    {
      title: "Segment Contract",
      body: [
        "Segments represent bounded regions for targeted scans and region-based reasoning.",
      ],
      code: `interface AudioSegment {
  id: string;
  startSec: number;
  endSec: number;
  label?: string;
  kind?: "speech" | "music" | "silence" | "noise" | "mixed";
}`,
    },
    {
      title: "Segmentation Goals",
      body: [
        "Allow targeted scans instead of full-file scanning.",
        "Support region-level intent refinement.",
        "Provide deterministic references for query matches.",
      ],
    },
  ],
};