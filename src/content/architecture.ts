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
        "Orchestration Layer: control plane that coordinates specialized agents and shared state.",
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
        "Q delegates coordination to Orchestration Layer for deterministic multi-agent sequencing.",
        "Orchestration routes analysis requests to Audio Sandbox and related intelligence services.",
        "Orchestration routes execution-approved processing requests to DAL generation path.",
      ],
      code: `Q
  -> Orchestration Layer
      |- Agents (reasoning / query / comparison / recommendation)
      |- Shared state + aggregation
      |- DAL (execution contract / handoff)`,
    },
    {
      title: "Data Flow",
      body: ["Deterministic flow from user intent to query response or execution-ready contract."],
      code: `Chat -> Q -> Orchestration Layer -> Agents -> DAL -> D Agent -> Canvas -> Export`,
    },
  ],
};
