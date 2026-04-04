import type { DocPageContent } from "@/lib/docs";

export const orchestrationOverviewContent: DocPageContent = {
  slug: "orchestration/overview",
  title: "Orchestration Overview",
  description: "Why orchestration is required and how Q subsystems behave as one cohesive unit.",
  sections: [
    {
      title: "What Orchestration Is",
      body: [
        "Orchestration is the control layer that coordinates specialized agents, state, and user interaction across one request lifecycle.",
        "It determines sequencing, dependencies, and handoff rules between analysis, comparison, recommendation, and execution paths.",
      ],
    },
    {
      title: "Why It Is Needed",
      body: [
        "Without orchestration, components behave as isolated tools and produce inconsistent outcomes.",
        "With orchestration, Q can preserve state continuity, deterministic routing, and explicit user approval gates.",
      ],
    },
    {
      title: "System Without Orchestration",
      body: [
        "Conflicting suggestions are unresolved.",
        "Agent outputs are not synchronized to the same version context.",
        "Execution can be requested before evidence aggregation is complete.",
      ],
    },
    {
      title: "System As One Unit",
      body: [
        "Q detects intent, routes to relevant services, aggregates evidence, and produces a single decision-ready outcome.",
        "User-facing outputs remain coherent because orchestration governs transitions and state ownership.",
      ],
    },
  ],
};
