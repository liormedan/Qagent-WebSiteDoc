import type { DocPageContent } from "@/lib/docs";

export const dalIntegrationContent: DocPageContent = {
  slug: "dal-integration",
  title: "DAL Integration",
  description:
    "DAL generation pipeline from resolved intent and plan, with strict preconditions and validation gates.",
  sections: [
    {
      title: "Source Of DAL",
      body: [
        "DAL is generated from Resolved Intent + QPlan, not directly from raw user text.",
        "Reasoning and clarification must complete before final DAL emission.",
      ],
    },
    {
      title: "DAL Generation Preconditions",
      body: [
        "Intent is sufficiently clear (finalized state).",
        "QPlan exists and passes structural validation.",
        "Safety checks are completed.",
        "Approval status is known.",
      ],
      code: `function canGenerateFinalDal(input: {
  reasoning: ReasoningResult;
  plan?: QPlan;
  approvalKnown: boolean;
  safetyChecked: boolean;
}): boolean {
  return (
    input.reasoning.state === "finalized" &&
    Boolean(input.plan) &&
    input.approvalKnown &&
    input.safetyChecked
  );
}`,
    },
    {
      title: "Hard Guard",
      body: [
        "If state is waiting_for_user, Q must not generate final DAL.",
      ],
      code: `if (reasoning.state === "waiting_for_user") {
  throw new Error("DAL_GENERATION_BLOCKED_WAITING_FOR_USER");
}`,
    },
    {
      title: "AudioDAL v1",
      body: [
        "Deterministic execution contract consumed by executor runtime.",
      ],
      code: `interface AudioDAL {
  version: "1.0.0";
  actions: DALAction[];
  metadata: {
    createdBy: "Q";
    intent: string;
    confidence: number;
    requestId: string;
    planId: string;
    createdAt: string;
  };
  safety: {
    requiresApproval: boolean;
    destructive: boolean;
  };
  hashBase?: string;
}

interface DALAction {
  id: string;
  type: string;
  target: "full_track" | "selected_region";
  params?: DALActionParams;
}`,
    },
    {
      title: "DALAction Typed Params",
      body: [
        "Action params are typed per action family to remove untyped payload decisions during implementation.",
      ],
      code: `interface RemoveNoiseParams {
  strength: number;
  profile?: "mild" | "balanced" | "aggressive";
}

interface NormalizeLoudnessParams {
  targetLufs: number;
}

interface EqRefineParams {
  preset: string;
  gainDb?: number;
}

type DALActionParams = RemoveNoiseParams | NormalizeLoudnessParams | EqRefineParams;`,
    },
    {
      title: "Invalid DAL Handling",
      body: [
        "Invalid DAL blocks execution handoff and returns deterministic error payload.",
      ],
      code: `interface DalValidationError {
  code: "INVALID_DAL";
  requestId: string;
  issues: string[];
}`,
    },
  ],
};
