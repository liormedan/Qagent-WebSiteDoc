import type { DocPageContent } from "@/lib/docs";

export const reasoningSystemContent: DocPageContent = {
  slug: "reasoning-system",
  title: "Reasoning System",
  description:
    "Internal reasoning and clarification mechanics that resolve ambiguous requests before planning and DAL generation.",
  sections: [
    {
      title: "What Internal Reasoning Is",
      body: [
        "Internal reasoning is a bounded analysis loop where Q evaluates candidate intents, target scope, and action risks.",
        "It is activated when initial intent confidence is medium or when user wording is ambiguous.",
      ],
      code: `type QReasoningState =
  | "initial"
  | "reasoning"
  | "waiting_for_user"
  | "refining"
  | "finalized";`,
    },
    {
      title: "Internal Reasoning Vs User Clarification",
      body: [
        "Internal reasoning uses model and context signals without asking the user.",
        "User clarification is triggered only when internal resolution cannot reach confidence threshold.",
        "Clarification questions must be focused, minimal, and directly tied to missing execution-critical data.",
      ],
    },
    {
      title: "Stopping Conditions And Thresholds",
      body: [
        "Stop internal loop when confidence is high enough or max iterations reached.",
        "If confidence remains low after bounded iterations, transition to waiting_for_user.",
      ],
      code: `interface ReasoningPolicy {
  highConfidenceThreshold: 0.85;
  mediumConfidenceThreshold: 0.6;
  maxInternalIterations: 3;
  maxClarificationTurns: 2;
}`,
    },
    {
      title: "Refinement Loop",
      body: [
        "Reasoning loop updates intent type, target, and rationale evidence after each iteration.",
        "User clarification response is merged into context and triggers one final refinement pass.",
      ],
      code: `function runReasoningLoop(input: QInput): ReasoningResult {
  // 1) initial detection
  // 2) bounded internal reasoning
  // 3) optional clarification
  // 4) refinement
  // 5) finalized intent for planning
  return {} as ReasoningResult;
}`,
    },
    {
      title: "Impact On Intent And Plan",
      body: [
        "Reasoning can change intent type (for example unknown -> remove_noise).",
        "Reasoning can refine target scope and parameters that later affect plan and DAL.",
        "Reasoning can consume A/B comparison results and recommend follow-up actions before final execution.",
      ],
      code: `// Example impact
// initialIntent.type = "unknown"
// refinedIntent.type = "remove_noise"
// plan.goal changes accordingly
// comparison summary may trigger: suggest_accept | suggest_revert`,
    },
    {
      title: "Comparison-Aware Recommendations",
      body: [
        "Q can use comparison evidence (difference type, region, and impact) to rank recommended next actions.",
        "High-impact regressions should trigger safer alternatives such as revert or narrower processing scope.",
        "Recommendations must stay explainable through structured difference references and confidence.",
      ],
      code: `interface ComparisonRecommendation {
  action: 'accept' | 'revert' | 'iterate'
  basedOnDifferences: string[]
  confidence: number
}`,
    },
    {
      title: "Reasoning Does Not",
      body: [
        "Execute DSP.",
        "Generate execution handoff directly without planning and DAL validation.",
        "Bypass safety approvals.",
      ],
    },
    {
      title: "State Machine Example",
      body: [
        "Example for ambiguous user request \"make it cleaner\".",
      ],
      code: `Input: "make it cleaner"
state: initial
-> reasoning (possible intents: remove_noise | enhance_voice)
-> waiting_for_user ("Do you want noise removal or voice clarity boost?")
-> refining (user: "remove room noise")
-> finalized (refinedIntent: remove_noise)
-> planning
-> dal_generation`,
    },
  ],
};
