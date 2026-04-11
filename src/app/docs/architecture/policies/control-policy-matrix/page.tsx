import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { QAGENT_ARCH_HUB_LINKS } from "@/lib/docs-scope-links";

const controlRows = [
  {
    title: "File Intake Control",
    subtitle: "QCore -> Files Handler stage",
    purpose: "Define control ownership for file intake and validation boundary.",
    defines: ["Trigger: QCore.", "Validate: Files Handler.", "Enforce/Block: QCore.", "Execute: Files Handler."],
    doesNotDefine: "Downstream analysis policy semantics.",
  },
  {
    title: "Intent and Planning Control",
    subtitle: "Intent + DAL stages",
    purpose: "Define ownership for intent resolution and deterministic planning progression.",
    defines: ["Intent trigger/validation ownership.", "DAL planning enforcement path.", "Block conditions for ambiguity and constraints."],
    doesNotDefine: "Runtime execution scheduling.",
  },
  {
    title: "Approval and Execution Control",
    subtitle: "Approval -> DAgent stages",
    purpose: "Define approval gate and execution transition authority.",
    defines: ["Approval trigger and enforcement.", "Execution preflight control.", "QCore/Flow Controller block authority."],
    doesNotDefine: "API job lifecycle ownership.",
  },
  {
    title: "Versioning and Restore Control",
    subtitle: "Post-execution lifecycle",
    purpose: "Define control ownership for version persistence and restore transitions.",
    defines: ["Versioning trigger and validation.", "Restore trigger and guardrails.", "Integrity block conditions."],
    doesNotDefine: "Cross-layer status projections outside QAgent.",
  },
] as const;

export default function ControlPolicyMatrixPage() {
  return (
    <DocsTemplatePage
      title="Control Policy Matrix"
      description="Authoritative matrix defining trigger, validate, enforce, block, and execute ownership per QAgent stage."
      sectionPath={["QAgent", "Policies", "Control Policy Matrix"]}
      scopeLinks={QAGENT_ARCH_HUB_LINKS}
      overviewIntro="Control Policy Matrix enforces deterministic authority boundaries so every stage has explicit control ownership."
      overviewAreasTitle="Policy concerns"
      overviewAreas={[
        "Trigger/validate/enforce/block/execute ownership.",
        "Deterministic control transitions.",
        "Boundary-safe execution gating.",
      ]}
      outOfScope="Detailed module implementation and external runtime orchestration."
      relatedBoundaries={[
        "Control Policy Matrix = control ownership authority.",
        "Failure Policy = failure/retry authority.",
        "Session Isolation = multi-tenant isolation authority.",
        "QAgent Layer page = parent boundary authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Policy scope and purpose.", href: "#overview" },
        { title: "Policy Diagram", subtitle: "Control ownership model.", href: "#diagram" },
        { title: "Policy Details", subtitle: "Stage-by-stage matrix blocks.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Policy Diagram"
      diagram={{
        mode: "structure",
        root: "Control Policy Matrix",
        groups: [
          { title: "Control Axes", items: ["Trigger", "Validate", "Enforce", "Block", "Execute"] },
          { title: "Planning Stages", items: ["File Intake", "Analysis", "Intent", "Planning", "Approval"] },
          { title: "Runtime Stages", items: ["Execution", "Versioning", "Restore"] },
        ],
      }}
      detailsTitle="Policy Details"
      detailsItems={controlRows.map((r) => ({
        id: r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: r.title,
        subtitle: r.subtitle,
        purpose: r.purpose,
        defines: [...r.defines],
        doesNotDefine: r.doesNotDefine,
        href: "/docs/architecture/policies/control-policy-matrix",
        linkLabel: "Canonical page",
      }))}
      relatedDocs={[
        "Control Policy Matrix = control authority map.",
        "Failure Policy = failure ownership map.",
        "Session Isolation = isolation ownership map.",
        "QAgent Architecture = module sequence authority.",
      ]}
    />
  );
}
