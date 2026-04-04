import type { DocPageContent } from "@/lib/docs";

export const audioComparisonVersioningContent: DocPageContent = {
  slug: "audio-comparison/versioning",
  title: "Audio Versioning",
  description: "Version contract and lineage graph model for every audio transformation step.",
  sections: [
    {
      title: "AudioVersion Contract",
      body: [
        "Each saved state is represented as a first-class version object.",
        "Version metadata tracks source, derivation, and creation time for deterministic history.",
      ],
      code: `interface AudioVersion {
  id: string
  source: 'original' | 'processed'
  createdFrom?: string
  createdAt: number
  description?: string
}`,
    },
    {
      title: "Versioning Rules",
      body: [
        "Every user or system processing action creates a new version.",
        "Original upload is always the root version.",
        "Reprocessing from older nodes creates branches, not overwrites.",
      ],
      code: `Action -> New AudioVersion
Upload -> root
Noise removal -> child
EQ refinement -> child of latest or selected base`,
    },
    {
      title: "Version Graph (Not Only A List)",
      body: [
        "Versions are modeled as a directed graph using createdFrom edges.",
        "Graph traversal enables branch comparison, rollback, and lineage-aware recommendations.",
        "Timeline view is a projection of the graph, not the source of truth.",
      ],
      code: `type VersionGraph = {
  nodes: AudioVersion[]
  edges: Array<{ from: string; to: string }>
}`,
    },
  ],
};
