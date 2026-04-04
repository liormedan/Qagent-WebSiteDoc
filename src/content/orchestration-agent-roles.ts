import type { DocPageContent } from "@/lib/docs";

export const orchestrationAgentRolesContent: DocPageContent = {
  slug: "orchestration/agent-roles",
  title: "Orchestration Agent Roles",
  description: "Deterministic role definitions for every participating agent/service in Q orchestration.",
  sections: [
    {
      title: "Q Agent",
      body: [
        "reasoning: resolves ambiguity and establishes candidate intent.",
        "clarification: requests missing critical inputs from user when needed.",
        "decision: combines evidence into next-step recommendation or execution gate.",
        "routing: dispatches tasks to the appropriate subsystem.",
      ],
    },
    {
      title: "Specialized Services",
      body: [
        "Audio Intelligence: audio understanding and feature analysis.",
        "Audio Sandbox: storage, indexing, and query execution.",
        "Audio Query: answering questions about audio content.",
        "Comparison System: difference extraction and A/B evaluation.",
        "Recommendation Engine: actionable suggestions and tradeoff explanation.",
        "DAL: execution contract generation and validation before runtime handoff.",
      ],
    },
  ],
};
