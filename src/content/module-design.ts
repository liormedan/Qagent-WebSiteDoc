import type { DocPageContent } from "@/lib/docs";

export const moduleDesignContent: DocPageContent = {
  slug: "module-design",
  title: "Module Design",
  description:
    "Future Q runtime module responsibilities, IO boundaries, dependencies, and failure points.",
  sections: [
    {
      title: "Module Catalog",
      body: [
        "Intent Detector",
        "Reasoning Engine",
        "Clarification Manager",
        "Planner",
        "Safety Gate",
        "DAL Builder",
        "Validation Layer",
        "State Manager",
      ],
    },
    {
      title: "Module Contracts",
      body: ["Runtime module IO and risks."],
      code: `type ModuleSpec = {
  name: string;
  role: string;
  input: string;
  output: string;
  dependencies: string[];
  failurePoints: string[];
};

const modules: ModuleSpec[] = [
  {
    name: "Intent Detector",
    role: "Initial intent classification",
    input: "QInput",
    output: "QIntent",
    dependencies: ["contracts"],
    failurePoints: ["low confidence", "ambiguous phrase mapping"],
  },
  {
    name: "Reasoning Engine",
    role: "Resolve ambiguity with bounded internal passes",
    input: "QInput + QIntent",
    output: "ReasoningResult",
    dependencies: ["intent detector", "reasoning policy"],
    failurePoints: ["iteration limit reached", "unresolved conflict"],
  },
  {
    name: "Clarification Manager",
    role: "Generate targeted clarification question",
    input: "ReasoningResult",
    output: "ClarificationQuestion",
    dependencies: ["reasoning engine"],
    failurePoints: ["question too broad", "missing options"],
  },
  {
    name: "Planner",
    role: "Build deterministic plan from refined intent",
    input: "QIntent",
    output: "QPlan",
    dependencies: ["reasoning result"],
    failurePoints: ["invalid step ordering", "missing target"],
  },
  {
    name: "Safety Gate",
    role: "Determine approval requirement",
    input: "QPlan",
    output: "requiresApproval boolean",
    dependencies: ["policy config"],
    failurePoints: ["policy mismatch", "false negatives"],
  },
  {
    name: "DAL Builder",
    role: "Map plan to AudioDAL",
    input: "QPlan + approval status",
    output: "AudioDAL",
    dependencies: ["planner", "safety gate"],
    failurePoints: ["invalid action mapping", "missing metadata"],
  },
  {
    name: "Validation Layer",
    role: "Validate output and DAL before handoff",
    input: "QOutput + AudioDAL",
    output: "validation report",
    dependencies: ["contract schemas"],
    failurePoints: ["schema mismatch", "blocked handoff"],
  },
  {
    name: "State Manager",
    role: "Control allowed state transitions",
    input: "current state + event",
    output: "next state",
    dependencies: ["state machine rules"],
    failurePoints: ["illegal transition", "stuck state"],
  },
];`,
    },
  ],
};