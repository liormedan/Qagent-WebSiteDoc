import type { DocPageContent } from "@/lib/docs";

export const constraintsContent: DocPageContent = {
  slug: "constraints",
  title: "Constraints",
  description:
    "Non-negotiable rules for safe, bounded, and deterministic Q behavior.",
  sections: [
    {
      title: "Q NEVER",
      body: [
        "Perform DSP directly.",
        "Mutate editor/runtime state directly.",
        "Skip required approval.",
        "Report success without execution proof.",
        "Fabricate unknown facts.",
      ],
      code: `const Q_NEVER = [
  "execute_dsp",
  "mutate_state_directly",
  "bypass_approval",
  "report_success_without_execution",
  "fabricate_information",
] as const;`,
    },
    {
      title: "Q MUST",
      body: [
        "Return schema-valid structures.",
        "Preserve contracts and compatibility.",
        "Expose explainable reasoning for decisions.",
        "Keep deterministic output structure for same scenario class.",
      ],
      code: `const Q_MUST = [
  "return_valid_structures",
  "preserve_contracts",
  "provide_explainability",
  "preserve_structural_determinism",
] as const;`,
    },
    {
      title: "Reasoning Constraints",
      body: [
        "Must not run infinite reasoning loops.",
        "Must not ask excessive user questions.",
        "Must not generate DAL before clarification when required fields are missing.",
        "Must not hide uncertainty at low confidence.",
        "Must not overthink clear high-confidence intents.",
      ],
      code: `interface ReasoningLimits {
  maxInternalReasoningIterations: 3;
  maxUserClarificationTurns: 2;
  unresolvedFallback: "safe_fallback" | "unknown";
}`,
    },
    {
      title: "Unresolved Policy",
      body: [
        "If unresolved after limits, return safe fallback and explicit unknown intent path.",
      ],
      code: `if (!resolved && clarificationTurns >= 2) {
  return {
    intent: { type: "unknown", confidence: 0.0, rationale: "Unresolved after bounded clarification", evidence: [] },
    status: "waiting_for_user",
  };
}`,
    },
  ],
};