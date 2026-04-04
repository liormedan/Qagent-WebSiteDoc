import type { DocPageContent } from "@/lib/docs";

export const roadmapContent: DocPageContent = {
  slug: "roadmap",
  title: "Roadmap",
  description: "Delivery roadmap with status and target dates.",
  sections: [
    {
      title: "Phase 1: Q Core",
      body: ["Define planner behavior and orchestration rules.", "Status: completed", "Target Date: 2026-03-20"],
    },
    {
      title: "Phase 2: DAL Spec",
      body: ["Stabilize schema, validation, and deterministic payload structure.", "Status: in-progress", "Target Date: 2026-04-20"],
    },
    {
      title: "Phase 3: Execution Contracts",
      body: ["Bind DAL outputs to D Agent runtime guarantees.", "Status: planned", "Target Date: 2026-05-15"],
    },
    {
      title: "Phase 4: History / Traceability",
      body: ["Track action lineage, replayability, and hash history.", "Status: planned", "Target Date: 2026-06-10"],
    },
    {
      title: "Phase 5: Docs Expansion",
      body: ["Add richer technical references, diagrams, and integration recipes.", "Status: planned", "Target Date: 2026-06-30"],
    },
    {
      title: "Status Model",
      body: ["Use consistent status values in planning reviews."],
      code: `type RoadmapStatus = "completed" | "in-progress" | "planned";`,
    },
  ],
};