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
        "Execution results create timeline events.",
      ],
      code: `interface VersionTimelineLink {
  versionId: string
  markers: Array<{ start: number; end: number; reason: string }>
}`,
    },
    {
      title: "Recommendation Memory Influence",
      body: [
        "Previously accepted and rejected recommendations should influence future suggestion ranking.",
        "History-informed ranking reduces repeated low-value proposals and improves personalization consistency.",
      ],
      code: `interface RecommendationHistoryEntry {
  recommendationId: string
  decision: 'accepted' | 'rejected' | 'refined'
  relatedVersionId?: string
  createdAt: number
}`,
    },
    {
      title: "Runtime Output Integration",
      body: [
        "New output versions integrate into memory graph with execution request linkage.",
        "Execution completion updates session timeline and comparison candidacy markers.",
      ],
    },
  ],
};
