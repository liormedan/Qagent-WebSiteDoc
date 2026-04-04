import type { DocPageContent } from "@/lib/docs";

export const decisionWithUserContent: DocPageContent = {
  slug: "decision-with-user",
  title: "Decision With User",
  description: "Shared decision protocol where Q recommends options and the user confirms final action.",
  sections: [
    {
      title: "Comparison Before Final Execution",
      body: [
        "Q should recommend creating an A/B comparison before final execution when multiple viable versions exist.",
        "Recommendation should include expected benefit, risk areas, and highlighted regions to review.",
        "Final execution remains blocked until user accepts a target version.",
      ],
      code: `if (hasMultipleCandidateVersions) {
  suggest("Run comparison before final execution")
}`,
    },
    {
      title: "Decision View Contract",
      body: [
        "User decision UI must include summary, differences, recommendation, and recommendation confidence.",
        "The same contract is shown before accept/revert/iterate actions to keep decisions auditable.",
      ],
      code: `interface DecisionWithUserView {
  summary: {
    totalDifferences: number
    highImpactCount: number
    overallRisk: 'safe' | 'moderate' | 'risky'
  }
  differences: AudioDifference[]
  recommendation: 'accept' | 'revert' | 'review'
  confidence: number
}`,
    },
    {
      title: "Edge Flows",
      body: [
        "Reject without revert: user can reject the candidate and keep current accepted version unchanged.",
        "Timeout: if user does not decide in time, execution stays blocked and state becomes pending_user_decision.",
        "No previous version: when revert is unavailable, system limits actions to accept or review/iterate.",
      ],
      code: `type DecisionEdgeFlow =
  | 'reject_without_revert'
  | 'timeout'
  | 'no_previous_version'`,
    },
    {
      title: "Recommendation Approval Flow",
      body: [
        "Q presents recommendation cards with confidence, expected impact, and tradeoffs for approval.",
        "User can accept, reject, or ask for an alternative recommendation.",
        "User can request comparison before approving recommendation.",
        "Decision approval is the gate before execution runtime starts.",
        "Approval is recorded as explicit decision evidence before execution.",
      ],
      code: `recommendation approval flow
recommendation proposed
  -> user accept | user reject | user ask_alternative | user request_comparison
  -> approved action only then eligible for execution`,
    },
  ],
};
