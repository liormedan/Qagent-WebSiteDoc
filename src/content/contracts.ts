import type { DocPageContent } from "@/lib/docs";

export const contractsContent: DocPageContent = {
  slug: "contracts",
  title: "Contracts",
  description:
    "Typed contracts for reasoning, clarification, planning, DAL generation, and execution handoff.",
  sections: [
    {
      title: "Contract Lifecycle",
      body: [
        "QInput enters parsing and reasoning.",
        "ReasoningResult resolves intent or asks clarification.",
        "QPlan and AudioDAL are created only after resolution is sufficient.",
      ],
    },
    {
      title: "Contracts Used by Runtime Modules",
      body: [
        "Intent Detector reads QInput and emits QIntent.",
        "Reasoning Engine consumes QInput + QIntent and emits ReasoningResult.",
        "Clarification Manager consumes ReasoningResult.clarificationQuestion.",
        "Planner consumes refined QIntent and emits QPlan.",
        "DAL Builder consumes QPlan and emits AudioDAL.",
        "Validation Layer consumes QOutput and DAL validation payloads.",
      ],
      code: `type ModuleContractMap = {
  detectIntent: { input: QInput; output: QIntent };
  runReasoningLoop: { input: { qInput: QInput; baseIntent: QIntent }; output: ReasoningResult };
  buildPlan: { input: QIntent; output: QPlan };
  buildDALFromPlan: { input: QPlan; output: AudioDAL };
  validateQOutput: { input: QOutput; output: { ok: boolean; issues: string[] } };
};`,
    },
    {
      title: "Core Types",
      body: ["Shared types for runtime modules."],
      code: `export type QIntentType =
  | "enhance_voice"
  | "remove_noise"
  | "master_track"
  | "normalize_loudness"
  | "trim_silence"
  | "unknown";

export type QTargetScope = "full_track" | "selected_region";

export type QReasoningState =
  | "initial"
  | "reasoning"
  | "waiting_for_user"
  | "refining"
  | "finalized";`,
    },
    {
      title: "Runtime Interfaces",
      body: ["Key runtime-facing interfaces."],
      code: `export interface ClarificationQuestion {
  id: string;
  question: string;
  reason: string;
  options?: string[];
}

export interface ReasoningStep {
  id: string;
  question: string;
  answer: string;
  confidence: number;
  source: "internal_model" | "user";
}

export interface ReasoningResult {
  state: QReasoningState;
  steps: ReasoningStep[];
  refinedIntent?: QIntent;
  requiresUserClarification: boolean;
  clarificationQuestion?: ClarificationQuestion;
}`,
    },
    {
      title: "QOutput",
      body: [
        "Terminal response object used by orchestration and UI layers.",
      ],
      code: `export type QStatus = "waiting_for_user" | "planned" | "needs_approval" | "rejected";

export interface QOutput {
  requestId: string;
  initialIntent: QIntent;
  refinedIntent?: QIntent;
  reasoningSummary: string;
  reasoning?: ReasoningResult;
  clarificationRequest?: ClarificationQuestion;
  plan?: QPlan;
  approvalRequest?: ApprovalRequest;
  status: QStatus;
  explanation: string;
}`,
    },
  ],
};