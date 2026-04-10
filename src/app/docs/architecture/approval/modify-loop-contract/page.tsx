import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";

const details = [
  {
    id: "modify-trigger",
    title: "Modify Trigger",
    subtitle: "Approval loopback entry",
    purpose: "Define what happens when user chooses Modify in approval stage.",
    defines: ["Modify as controlled loopback action.", "Immediate invalidation of prior approval state.", "Return path to DAL regeneration."],
    doesNotDefine: "Partial patching of previously approved plan.",
    href: "/docs/architecture/approval/modify-loop-contract",
  },
  {
    id: "invalidation-rules",
    title: "Invalidation Rules",
    subtitle: "Approval context reset",
    purpose: "Define required invalidation behavior for previous approval artifacts.",
    defines: ["Previous approval marked superseded.", "Fingerprint regeneration required.", "No reuse of prior approval signatures."],
    doesNotDefine: "Execution continuation without re-approval.",
    href: "/docs/architecture/approval/modify-loop-contract",
  },
  {
    id: "regeneration-flow",
    title: "Regeneration Flow",
    subtitle: "Deterministic re-entry sequence",
    purpose: "Define deterministic sequence after modify signal is accepted.",
    defines: ["Return to DAL planning stage.", "Regenerate plan and UI artifacts.", "Issue new approval request before execution."],
    doesNotDefine: "Alternative bypass flow around approval gate.",
    href: "/docs/architecture/approval/modify-loop-contract",
  },
] as const;

export default function ApprovalModifyLoopContractPage() {
  return (
    <DocsTemplatePage
      title="Approval Modify Loop Contract"
      description="Standard contract defining deterministic behavior when user selects Modify during approval."
      sectionPath={["QAgent", "Contracts", "Approval Modify Contract"]}
      covers="modify trigger semantics, invalidation rules, and deterministic regeneration sequence."
      doesNotCover="execution runtime internals and non-approval orchestration policy."
      overviewIntro="Modify is a controlled loopback path. It invalidates prior approval context and requires a full re-approval cycle."
      overviewAreasTitle="Contract concerns"
      overviewAreas={[
        "Modify trigger semantics.",
        "Approval invalidation rules.",
        "DAL/UI regeneration and re-approval sequence.",
      ]}
      outOfScope="Runtime execution handling outside approval loop contract."
      relatedBoundaries={[
        "Modify Loop Contract = approval loopback authority.",
        "Approval module page = approval behavior authority.",
        "DAL page = plan regeneration authority.",
        "Control policy pages = governance authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Contract scope and purpose.", href: "#overview" },
        { title: "Contract Diagram", subtitle: "Modify loop sequence.", href: "#diagram" },
        { title: "Contract Details", subtitle: "Rules and constraints.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Contract Diagram"
      diagram={{
        mode: "flow",
        steps: ["Approval", "Modify", "Return to DAL", "Regenerate Plan", "Regenerate UI", "New Approval"],
      }}
      detailsTitle="Contract Details"
      detailsItems={details.map((d) => ({ ...d, linkLabel: "Canonical page" }))}
      relatedDocs={[
        "Modify Loop Contract = approval loopback authority.",
        "Approval policy pages = gate enforcement authority.",
        "DAL = plan regeneration authority.",
        "QAgent Layer page = parent boundary authority.",
      ]}
    />
  );
}
