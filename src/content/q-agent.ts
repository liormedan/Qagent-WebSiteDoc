import type { DocPageContent } from "@/lib/docs";

export const qAgentContent: DocPageContent = {
  slug: "q-agent",
  title: "Q Agent",
  description:
    "Q Agent is the planning and orchestration layer that translates user intent into deterministic execution steps.",
  sections: [
    {
      title: "What Is Q Agent",
      body: [
        "Q Agent receives conversational intent and transforms it into structured plans.",
        "It separates strategy from execution so downstream systems can remain deterministic.",
      ],
    },
    {
      title: "Role In The System",
      body: [
        "Q operates as a planner and orchestrator.",
        "It resolves context, determines action boundaries, and emits contracts that can be executed safely.",
      ],
    },
    {
      title: "Core Flow",
      body: [
        "The first implementation flow is intentionally minimal and traceable.",
      ],
      code: "User -> Q -> DAL -> D",
    },
  ],
  infoCards: [
    {
      title: "Planner",
      description: "Converts fuzzy intent into concrete and auditable action steps.",
    },
    {
      title: "Orchestrator",
      description: "Coordinates data, contract creation, and execution handoff.",
    },
  ],
};