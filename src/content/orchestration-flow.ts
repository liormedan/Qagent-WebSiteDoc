import type { DocPageContent } from "@/lib/docs";

export const orchestrationFlowContent: DocPageContent = {
  slug: "orchestration/orchestration-flow",
  title: "Orchestration Flow",
  description: "Full orchestration flow from user input through agent coordination and decision/output.",
  sections: [
    {
      title: "End-To-End Flow",
      body: [
        "User Input -> Q detects intent -> Routing -> Relevant agents -> Aggregation -> Decision -> User interaction / execution",
        "Aggregation step merges outputs into one coherent decision packet.",
      ],
      code: `User Input
  -> Q detects intent
  -> Routing
  -> Relevant agents
  -> Aggregation
  -> Decision
  -> User interaction / execution`,
    },
    {
      title: "DecisionPacket Hardening",
      body: [
        "DecisionPacket is the mandatory decision artifact produced by orchestration aggregation.",
        "It must include state, source, timestamp, and confidence breakdown.",
      ],
      code: `interface DecisionPacket {
  version: '1.0'
  flowId: string
  traceId: string

  decision: string

  confidence: number

  confidenceBreakdown?: {
    audio: number
    comparison: number
    history: number
    intent: number
  }

  state: OrchestrationState

  source: 'sandbox' | 'comparison' | 'recommendation' | 'user'

  createdAt: number
}`,
    },
    {
      title: "Build Rules",
      body: [
        "Built after routing and relevant agent responses complete.",
        "If partial evidence exists, DecisionPacket still forms only when decision can be justified and state is explicit.",
        "Execution remains blocked when packet state indicates waiting_for_user or error.",
      ],
    },
  ],
};
