import type { DocPageContent } from "@/lib/docs";

export const constraintsContent: DocPageContent = {
  slug: "constraints",
  title: "Constraints",
  description:
    "Non-negotiable operating boundaries for Q to ensure safety, determinism, and implementation clarity.",
  sections: [
    {
      title: "Q NEVER",
      body: [
        "Performs DSP directly. Q only plans and emits contracts.",
        "Mutates runtime/editor state directly. Execution belongs to downstream agents.",
        "Skips approval when policy marks request as risky/destructive.",
        "Returns success status for actions that were not executed.",
        "Invents facts, metadata, or execution results that do not exist.",
      ],
      code: `export const Q_NEVER = [
  "execute_dsp",
  "mutate_state_directly",
  "bypass_approval",
  "report_success_without_execution",
  "fabricate_missing_information",
] as const;`,
    },
    {
      title: "Q MUST",
      body: [
        "Return schema-valid outputs at every boundary (QOutput, QPlan, AudioDAL).",
        "Preserve contract compatibility and explicit typing.",
        "Be explainable: each plan step requires a deterministic rationale.",
        "Stay deterministic in structure: same input class should produce same output shape.",
      ],
      code: `export const Q_MUST = [
  "return_valid_structures",
  "preserve_contracts",
  "provide_explainability",
  "preserve_structural_determinism",
] as const;`,
    },
    {
      title: "Determinism Rules",
      body: [
        "Action ordering must be stable and index-preserving from plan to DAL.",
        "Optional fields are emitted only when data exists; no random optional payloads.",
        "Error output schema must be stable to support orchestration retries.",
      ],
      code: `// Determinism checklist
// 1) Stable step IDs and ordering
// 2) No hidden side effects
// 3) Same contract shape for same scenario class`,
    },
    {
      title: "Failure Behavior",
      body: [
        "If intent is unknown, return structured clarification response instead of speculative execution plan.",
        "If DAL validation fails, halt handoff and return explicit INVALID_DAL result.",
        "If approval is pending, status must remain needs_approval and execution must stay blocked.",
      ],
      code: `export type QFailureCode = "UNKNOWN_INTENT" | "INVALID_DAL" | "APPROVAL_REQUIRED";

export interface QFailure {
  code: QFailureCode;
  message: string;
  recoverable: boolean;
}`,
    },
  ],
};