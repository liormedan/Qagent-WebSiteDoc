import type { DocPageContent } from "@/lib/docs";

export const architectureContent: DocPageContent = {
  slug: "architecture",
  title: "Architecture",
  description: "High-level system map including sandbox analysis and DAL execution contracts.",
  sections: [
    {
      title: "Core Components",
      body: [
        "Chat: user interaction surface.",
        "Q: reasoning, clarification, planning, and routing engine.",
        "Audio Sandbox: isolated query/analysis/indexing workspace.",
        "audio.dal: deterministic execution contract.",
        "D Agent: deterministic execution runtime.",
        "Canvas: visual operational surface.",
        "Export Flow: serialization and delivery pipeline.",
      ],
    },
    {
      title: "Q Internal Split",
      body: [
        "Q routes analysis requests to Audio Sandbox.",
        "Q routes processing requests to Planning + DAL generation path.",
      ],
      code: `Q
  |- Audio Sandbox (query / analysis / indexing)
  |- DAL (processing / execution handoff)`,
    },
    {
      title: "Data Flow",
      body: ["Deterministic flow from user intent to query response or execution-ready contract."],
      code: `Chat -> Q -> (Audio Sandbox query OR Planning -> audio.dal) -> D Agent -> Canvas -> Export`,
    },
  ],
};