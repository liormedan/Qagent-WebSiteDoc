import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";

const schemaItems = [
  {
    title: "QCore -> Files Handler",
    subtitle: "Intake handoff schema",
    purpose: "Define post-intake handoff contract from QCore to Files Handler.",
    defines: ["request/session/correlation lineage IDs.", "handoff completion signal.", "file artifact reference envelope."],
    href: "/docs/architecture/contracts/schema-registry",
  },
  {
    title: "Files Handler -> Analyzer",
    subtitle: "Analysis input schema",
    purpose: "Define validated normalized file contract for Analyzer.",
    defines: ["file identity and normalized format.", "metadata and source type.", "optional preprocessing hints."],
    href: "/docs/architecture/contracts/schema-registry",
  },
  {
    title: "Analyzer -> Intent + Clarification",
    subtitle: "Intent signal schema",
    purpose: "Define structured interpretation contract used by intent resolution.",
    defines: ["entities/features structure.", "analysis ID and lineage references.", "optional confidence/ambiguity signals."],
    href: "/docs/architecture/contracts/schema-registry",
  },
  {
    title: "Intent -> DAL",
    subtitle: "Planning input schema",
    purpose: "Define validated intent contract used for deterministic planning.",
    defines: ["goal and required parameters.", "decision linkage IDs.", "clarification context."],
    href: "/docs/architecture/contracts/schema-registry",
  },
  {
    title: "DAL -> UAgent",
    subtitle: "UI plan schema",
    purpose: "Define UI-renderable plan payload contract.",
    defines: ["execution graph reference.", "ui blocks and controls.", "approval_required boundary."],
    href: "/docs/architecture/contracts/schema-registry",
  },
  {
    title: "DAL -> Approval",
    subtitle: "Approval request schema",
    purpose: "Define approval gate payload with deterministic fingerprint.",
    defines: ["approval/plan/request linkage.", "action summary payload.", "risk and preview hints."],
    href: "/docs/architecture/contracts/schema-registry",
  },
  {
    title: "DAL -> DAgent",
    subtitle: "Execution plan schema",
    purpose: "Define executable graph contract for runtime bridge.",
    defines: ["execution ID and mapping.", "dsp chain contract.", "optional fallback chain."],
    href: "/docs/architecture/contracts/schema-registry",
  },
  {
    title: "DAgent -> Versioning",
    subtitle: "Version input schema",
    purpose: "Define execution result payload for version lifecycle persistence.",
    defines: ["execution/version/request IDs.", "artifact references.", "applied parameters and chain metadata."],
    href: "/docs/architecture/contracts/schema-registry",
  },
  {
    title: "Versioning -> Restore",
    subtitle: "Restore request schema",
    purpose: "Define contract for restoring a prior version into active context.",
    defines: ["restore/session/version IDs.", "requester and scope boundaries.", "optional comparison context."],
    href: "/docs/architecture/contracts/schema-registry",
  },
] as const;

export default function SchemaRegistryPage() {
  return (
    <DocsTemplatePage
      title="Global Schema Registry"
      description="Canonical contract registry for major inter-module transitions in QAgent architecture."
      sectionPath={["QAgent", "Contracts", "Schema Registry"]}
      covers="producer/consumer schema contracts, required lineage fields, and handoff version identifiers."
      doesNotCover="module business logic, execution policy, and cross-layer runtime orchestration."
      overviewIntro="Schema Registry is the authoritative source for QAgent inter-module payload contracts."
      overviewAreasTitle="Schema concerns"
      overviewAreas={[
        "Producer -> consumer handoff schemas.",
        "Required lineage and correlation fields.",
        "Versioned schema identifiers and validation intent.",
      ]}
      outOfScope="Behavioral module logic and implementation specifics outside contract definitions."
      relatedBoundaries={[
        "Schema Registry = contract payload authority.",
        "Architecture page = module role authority.",
        "Lineage Model = ID propagation authority.",
        "Control Policy = governance authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Contract registry scope.", href: "#overview" },
        { title: "Schema Diagram", subtitle: "Producer/registry/consumer structure.", href: "#diagram" },
        { title: "Schema Details", subtitle: "Per-transition schema definitions.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Schema Diagram"
      diagram={{
        mode: "structure",
        root: "Schema Registry",
        groups: [
          { title: "Producers", items: ["QCore", "Files Handler", "Analyzer", "Intent", "DAL", "DAgent", "Versioning"] },
          { title: "Registry Rules", items: ["Required fields", "Optional fields", "Validation rules", "Schema version IDs"] },
          { title: "Consumers", items: ["Files Handler", "Analyzer", "DAL", "UAgent", "Approval", "DAgent", "Versioning", "Restore"] },
        ],
      }}
      detailsTitle="Schema Details"
      detailsItems={schemaItems.map((s) => ({
        id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: s.title,
        subtitle: s.subtitle,
        purpose: s.purpose,
        defines: [...s.defines],
        doesNotDefine: "Execution/runtime behavior outside schema boundary.",
        href: s.href,
        linkLabel: "Canonical page",
      }))}
      relatedDocs={[
        "Schema Registry = inter-module payload authority.",
        "Client-QAgent ID Mapping = cross-layer ID mapping authority.",
        "Lineage Model = ID creation/propagation authority.",
        "QAgent Layer page = parent layer authority.",
      ]}
    />
  );
}
