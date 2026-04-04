import type { DocPageContent } from "@/lib/docs";

export const audioMemoryContent: DocPageContent = {
  slug: "audio-memory",
  title: "Audio Memory",
  description: "Persistent memory model for version lineage and timeline-linked audio context.",
  sections: [
    {
      title: "Version Graph In Memory",
      body: [
        "Audio memory stores versions as a graph with explicit parent-child edges.",
        "Graph structure preserves branch history and enables non-linear comparison paths.",
      ],
      code: `interface AudioMemoryVersionNode {
  versionId: string
  createdAt: number
  createdFrom?: string
}`,
    },
    {
      title: "Timeline Linking",
      body: [
        "Every version is linked to timeline annotations and difference regions.",
        "Timeline is queryable by version ID to reconstruct why a version was accepted or rejected.",
      ],
      code: `interface VersionTimelineLink {
  versionId: string
  markers: Array<{ start: number; end: number; reason: string }>
}`,
    },
  ],
};
