import type { DocPageContent } from "@/lib/docs";

export const functionContractsContent: DocPageContent = {
  slug: "function-contracts",
  title: "Function Contracts",
  description:
    "Core future function signatures with logical responsibilities and no runtime implementation.",
  sections: [
    {
      title: "Core Signatures",
      body: [
        "Signatures only. Implementation will be added in runtime phase.",
        "Cross-reference /docs/contracts for shared types.",
      ],
      code: `/** Classify initial intent from raw user input. */
export declare function detectIntent(input: QInput): QIntent;

/** Run bounded reasoning loop and optional clarification decision. */
export declare function runReasoningLoop(
  input: QInput,
  baseIntent: QIntent,
): ReasoningResult;

/** Build one targeted question when clarification is required. */
export declare function buildClarificationQuestion(
  intent: QIntent,
): ClarificationQuestion;

/** Build deterministic plan from resolved intent and context. */
export declare function buildPlan(
  intent: QIntent,
  context: QInput["context"],
): QPlan;

/** Evaluate policy for approval requirement before DAL generation. */
export declare function shouldRequireApproval(plan: QPlan): boolean;

/** Build AudioDAL from approved plan. */
export declare function buildDALFromPlan(plan: QPlan): AudioDAL;

/** Validate terminal Q output contract. */
export declare function validateQOutput(output: QOutput): {
  ok: boolean;
  issues: string[];
};`,
    },
    {
      title: "Function Order",
      body: ["Expected invocation sequence for orchestrator."],
      code: `detectIntent -> runReasoningLoop -> buildPlan -> shouldRequireApproval -> buildDALFromPlan -> validateQOutput`,
    },
  ],
};