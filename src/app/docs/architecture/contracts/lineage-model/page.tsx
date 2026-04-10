import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";

const lineageDetails = [
  {
    id: "request-session-ids",
    title: "Request and Session IDs",
    subtitle: "Root lineage identifiers",
    purpose: "Define base identifiers that anchor all downstream lineage.",
    defines: [
      "request_id created at QCore intake.",
      "session_id scoped to active session lifecycle.",
      "Both IDs propagate across all critical boundaries.",
    ],
    doesNotDefine: "Module-specific internal telemetry identifiers.",
    href: "/docs/architecture/contracts/lineage-model",
  },
  {
    id: "decision-plan-approval-ids",
    title: "Decision, Plan, and Approval IDs",
    subtitle: "Planning lineage identifiers",
    purpose: "Define planning-stage identifiers and their reference constraints.",
    defines: [
      "decision_id produced by intent validation stage.",
      "plan_id produced by DAL and tied to decision lineage.",
      "approval_id produced at approval gate with plan fingerprint linkage.",
    ],
    doesNotDefine: "Execution/runtime status ownership.",
    href: "/docs/architecture/contracts/lineage-model",
  },
  {
    id: "execution-version-restore-ids",
    title: "Execution, Version, and Restore IDs",
    subtitle: "Runtime and persistence lineage",
    purpose: "Define runtime and version identifiers after execution handoff.",
    defines: [
      "execution_id created by DAgent at runtime start.",
      "version_id created by Versioning and tied to execution lineage.",
      "restore_id created for restore workflows referencing prior lineage.",
    ],
    doesNotDefine: "Job orchestration authority, owned by API.",
    href: "/docs/architecture/contracts/lineage-model",
  },
  {
    id: "linkage-rules",
    title: "Linkage Rules",
    subtitle: "Reference constraints",
    purpose: "Define mandatory parent-child lineage relationships.",
    defines: [
      "decision_id references request_id.",
      "plan_id references decision_id/request_id.",
      "execution_id references plan_id.",
      "version_id references execution_id.",
    ],
    doesNotDefine: "Alternative lineage graphs outside canonical rules.",
    href: "/docs/architecture/contracts/lineage-model",
  },
] as const;

export default function LineageModelPage() {
  return (
    <DocsTemplatePage
      title="End-to-End Lineage Model"
      description="Authoritative correlation model that tracks each request across all architecture layers."
      sectionPath={["QAgent", "Contracts", "Lineage Model"]}
      covers="ID ownership, creation stages, propagation constraints, and linkage rules."
      doesNotCover="module behavior logic and cross-layer orchestration policy."
      overviewIntro="The lineage model defines the canonical identifier graph that preserves traceability from request intake through execution and versioning."
      overviewAreasTitle="Lineage concerns"
      overviewAreas={[
        "Root lineage IDs for request/session continuity.",
        "Planning-stage IDs for intent and approval traceability.",
        "Runtime/persistence IDs for execution and version lifecycle.",
      ]}
      outOfScope="Behavioral implementation details in individual modules."
      relatedBoundaries={[
        "Lineage Model = ID lifecycle authority.",
        "Schema Registry = payload contract authority.",
        "ID Mapping page = client bridge authority.",
        "Versioning pages = persistence lifecycle authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Lineage model scope.", href: "#overview" },
        { title: "Lineage Diagram", subtitle: "ID hierarchy and propagation.", href: "#diagram" },
        { title: "Lineage Details", subtitle: "ID rules and constraints.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Lineage Diagram"
      diagram={{
        mode: "flow",
        steps: ["request_id", "decision_id", "plan_id", "approval_id", "execution_id", "version_id", "restore_id"],
      }}
      detailsTitle="Lineage Details"
      detailsItems={lineageDetails.map((d) => ({
        ...d,
        linkLabel: "Canonical page",
      }))}
      relatedDocs={[
        "Lineage Model = ID lifecycle authority.",
        "Schema Registry = contract payload authority.",
        "Client-QAgent ID Mapping = cross-layer ID mapping authority.",
        "Versioning = version lineage persistence authority.",
      ]}
    />
  );
}
