import type { DocPageContent } from "@/lib/docs";

export const roadmapContent: DocPageContent = {
  slug: "roadmap",
  title: "Roadmap",
  description: "Planned delivery phases for Q Agent and audio.dal documentation and contracts.",
  sections: [
    {
      title: "Phase 1: Q Core",
      body: [
        "Define planner behavior and orchestration rules.",
      ],
    },
    {
      title: "Phase 2: DAL Spec",
      body: [
        "Stabilize schema, validation, and deterministic payload structure.",
      ],
    },
    {
      title: "Phase 3: Execution Contracts",
      body: [
        "Bind DAL outputs to D Agent runtime guarantees.",
      ],
    },
    {
      title: "Phase 4: History / Traceability",
      body: [
        "Track action lineage, replayability, and hash history.",
      ],
    },
    {
      title: "Phase 5: Docs Expansion",
      body: [
        "Add richer technical references, diagrams, and integration recipes.",
      ],
    },
  ],
};