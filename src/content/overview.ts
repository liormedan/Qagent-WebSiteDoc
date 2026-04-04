import type { DocPageContent } from "@/lib/docs";

export const overviewContent: DocPageContent = {
  slug: "overview",
  title: "Overview",
  description:
    "Q is a planner + reasoner + clarification manager + DAL generator with deterministic output boundaries.",
  sections: [
    {
      title: "Q System Role",
      body: [
        "Q is a reasoning layer, clarification layer, and decision layer before execution handoff.",
        "Q must resolve ambiguity before creating plan and DAL payloads.",
      ],
    },
    {
      title: "Q Operational Flow",
      body: [
        "Operational flow is deterministic at structure level.",
      ],
      code: `User Input
-> Context Assembly
-> Initial Intent Detection
-> Internal Reasoning Loop
-> User Clarification Loop (if needed)
-> Refined Intent
-> Planning
-> Safety / Approval
-> DAL Generation
-> Validation
-> Execution Handoff
-> UI / Feedback`,
    },
    {
      title: "From Spec to Implementation",
      body: [
        "The docs now include conceptual spec + operational design + implementation mapping.",
        "Read /docs/implementation-map and /docs/module-design after this page to move from contracts to build plan.",
        "Use /docs/function-contracts and /docs/runtime-flow-design as runtime implementation references.",
      ],
      code: `// Recommended read order
// 1) /docs/contracts
// 2) /docs/reasoning-system
// 3) /docs/state-machine
// 4) /docs/implementation-map
// 5) /docs/function-contracts`,
    },
  ],
};