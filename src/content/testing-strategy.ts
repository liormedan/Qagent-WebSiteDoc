import type { DocPageContent } from "@/lib/docs";

export const testingStrategyContent: DocPageContent = {
  slug: "testing-strategy",
  title: "Testing Strategy",
  description:
    "Test plan for future Q runtime: unit, flow, ambiguity, clarification, approval, and DAL validity tests.",
  sections: [
    {
      title: "Test Categories",
      body: [
        "unit tests: per function contract behavior",
        "flow tests: full orchestrator transitions",
        "ambiguity tests: uncertain phrasing handling",
        "clarification tests: question generation and response merge",
        "approval tests: destructive flow gating",
        "DAL validity tests: schema and precondition enforcement",
      ],
    },
    {
      title: "Example Cases",
      body: ["Baseline scenario set for CI."],
      code: `// direct pass
"remove background noise" -> detectIntent high -> plan -> DAL -> pass

// clarification required
"make it better" -> low confidence -> waiting_for_user -> question required

// approval required
"reset everything" -> destructive plan -> awaiting_approval -> no execution without approval`,
    },
    {
      title: "Test Matrix Skeleton",
      body: ["Minimal matrix for deterministic verification."],
      code: `type TestCase = {
  input: string;
  expectedStatePath: QAgentState[];
  expectClarification: boolean;
  expectApproval: boolean;
  expectDal: boolean;
};

const cases: TestCase[] = [
  {
    input: "remove background noise",
    expectedStatePath: ["parsing", "planning", "generating_dal", "ready_for_execution"],
    expectClarification: false,
    expectApproval: false,
    expectDal: true,
  },
  {
    input: "make it better",
    expectedStatePath: ["parsing", "reasoning", "waiting_for_user"],
    expectClarification: true,
    expectApproval: false,
    expectDal: false,
  },
  {
    input: "reset everything",
    expectedStatePath: ["parsing", "planning", "awaiting_approval"],
    expectClarification: false,
    expectApproval: true,
    expectDal: false,
  },
];`,
    },
  ],
};