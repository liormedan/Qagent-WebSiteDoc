import type { DocPageContent } from "@/lib/docs";

export const runtimeFlowDesignContent: DocPageContent = {
  slug: "runtime-flow-design",
  title: "Runtime Flow Design",
  description:
    "Future runtime flow branches for direct, reasoning, clarification, and approval paths.",
  sections: [
    {
      title: "Full Runtime Flow",
      body: [
        "Flow stops at waiting_for_user when clarification is required.",
        "Flow stops at awaiting_approval when policy requires explicit approval.",
        "DAL generation allowed only after resolved intent + plan + known approval status.",
      ],
      code: `Input -> Parse -> (Reason or Plan)
Reason -> (Clarify or Finalize)
Finalize -> Plan -> Safety -> (Await Approval or Generate DAL)
Generate DAL -> Validate -> Handoff`,
    },
    {
      title: "Mermaid Diagram",
      body: [
        "Diagram source for flow visualization (can be rendered by Mermaid-capable markdown pipeline).",
      ],
      code: `flowchart TD
  A[Input] --> B[Parse]
  B -->|high confidence| C[Planning]
  B -->|ambiguous| D[Reasoning]
  D -->|unresolved| E[Waiting for User]
  E --> D
  D -->|resolved| C
  C --> F[Safety Gate]
  F -->|approval required| G[Awaiting Approval]
  G -->|approved| H[Generate DAL]
  F -->|no approval| H
  H --> I[Validate]
  I --> J[Execution Handoff]`,
    },
    {
      title: "Scenario 1: Direct Intent",
      body: ["Request: remove background noise."],
      code: `detectIntent: remove_noise (0.93)
runReasoningLoop: skip
buildPlan: created
approval: not required
buildDALFromPlan: allowed
handoff: ready_for_execution`,
    },
    {
      title: "Scenario 2: Ambiguous Intent",
      body: ["Request: make it better."],
      code: `detectIntent: unknown (0.42)
runReasoningLoop: medium confidence candidates
clarification: "Do you want noise removal or tone enhancement?"
state: waiting_for_user
DAL generation: blocked until user response`,
    },
    {
      title: "Scenario 3: Approval Required",
      body: ["Request: reset everything."],
      code: `detectIntent: destructive reset-like action
buildPlan: destructive=true
shouldRequireApproval: true
state: awaiting_approval
if approved -> generate DAL
if rejected -> status=rejected`,
    },
  ],
};