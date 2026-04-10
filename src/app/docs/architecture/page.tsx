import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { QAGENT_DOC_SOURCE_OF_TRUTH } from "@/lib/qagent-canonical";

const moduleChapters = [
  {
    title: "QCore",
    subtitle: "Core orchestrator",
    purpose: "Controls ordered module execution and enforces deterministic system rules.",
    defines: ["State-aware runtime control.", "Deterministic routing and transition guardrails.", "Cross-module orchestration authority."],
    href: "/docs/qcore",
  },
  {
    title: "Files Handler",
    subtitle: "Input gateway",
    purpose: "Loads, validates, and indexes user-provided files for downstream interpretation.",
    defines: ["Input normalization.", "File integrity and compatibility checks.", "Structured file references for Analyzer."],
    href: "/docs/architecture/modules/files-handler",
  },
  {
    title: "Analyzer",
    subtitle: "Signal interpretation",
    purpose: "Extracts structured evidence and signal-level features for reasoning layers.",
    defines: ["Feature extraction outputs.", "Evidence structure for intent resolution.", "Confidence and analysis metadata."],
    href: "/docs/architecture/modules/analyzer",
  },
  {
    title: "Intent + Clarification",
    subtitle: "Ambiguity control",
    purpose: "Resolves ambiguity before planning and prevents unclear execution intent.",
    defines: ["Intent validation.", "Clarification gating.", "Execution-readiness constraints."],
    href: "/docs/architecture/modules/intent-clarification",
  },
  {
    title: "DAL",
    subtitle: "Planning engine",
    purpose: "Builds executable action plans from validated intent and constraints.",
    defines: ["Plan graph construction.", "Execution payload preparation.", "UI-plan bridge context."],
    href: "/docs/architecture/modules/dal",
  },
  {
    title: "UAgent",
    subtitle: "UI mediation",
    purpose: "Converts plan context into user-facing interaction and approval prompts.",
    defines: ["UI-ready plan rendering.", "Approval prompt shaping.", "User feedback bridging."],
    href: "/docs/architecture/modules/uagent",
  },
  {
    title: "Approval",
    subtitle: "Authorization gate",
    purpose: "Blocks execution until explicit approval is validated and enforced.",
    defines: ["Approval requirement checks.", "Approval signal validation.", "Execution gating state."],
    href: "/docs/architecture/modules/approval",
  },
  {
    title: "DAgent",
    subtitle: "Execution bridge",
    purpose: "Builds API-ready execution handoff from approved planning artifacts.",
    defines: ["Execution request envelope composition.", "Execution lineage bridge metadata.", "Runtime handoff boundary."],
    href: "/docs/architecture/modules/dagent",
  },
  {
    title: "Versioning",
    subtitle: "Lineage persistence",
    purpose: "Maintains version references and lifecycle traceability for execution outputs.",
    defines: ["Version snapshot references.", "Lineage continuity.", "Restore/compare linkage boundaries."],
    href: "/docs/architecture/modules/versioning",
  },
] as const;

export default function ArchitecturePage() {
  return (
    <DocsTemplatePage
      title="Architecture"
      description="QAgent runs an ordered modular flow for audio requests with deterministic routing, UI-gated approval, and versioned outputs."
      sectionPath={["QAgent", "Architecture", "Overview"]}
      covers="QAgent module architecture, module roles, and ordered handoff model."
      doesNotCover="API runtime internals, client UI runtime ownership, and DSP execution implementation."
      overviewIntro="This page is the architectural map of QAgent modules and the ordered module sequence used for deterministic request handling."
      overviewAreasTitle="Architecture concerns"
      overviewAreas={[
        "Ordered module flow from intake to versioning.",
        "Module responsibilities and handoff boundaries.",
        "Deterministic control and approval-gated execution.",
      ]}
      outOfScope="Module-level implementation internals and non-QAgent subsystem ownership."
      relatedBoundaries={[
        "Architecture page = module map authority.",
        "QAgent page = layer boundary authority.",
        "Contracts pages = inter-module payload authority.",
        "Policies pages = control governance authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Architecture scope and purpose.", href: "#overview" },
        { title: "Architecture Diagram", subtitle: "QAgent module topology.", href: "#diagram" },
        { title: "Architecture Details", subtitle: "Module-by-module definitions.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Architecture Diagram"
      diagram={{
        mode: "structure",
        root: "QAgent Architecture",
        groups: [
          { title: "Core Modules", items: ["QCore", "Files Handler", "Analyzer", "Intent + Clarification", "DAL"] },
          { title: "Control Modules", items: ["UAgent", "Approval", "DAgent"] },
          { title: "State Modules", items: ["Versioning", "Lineage", "Session Continuity"] },
        ],
      }}
      detailsTitle="Architecture Details"
      detailsItems={moduleChapters.map((m) => ({
        id: m.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: m.title,
        subtitle: m.subtitle,
        purpose: m.purpose,
        defines: [...m.defines],
        doesNotDefine: "Cross-layer ownership outside QAgent.",
        href: m.href,
        linkLabel: "Related section",
      }))}
      relatedDocs={[
        "Architecture = module map authority.",
        "QAgent Layer page = layer authority.",
        "Schema Registry = contract authority.",
        "Control Policy Matrix = control ownership authority.",
        `Source of truth: ${QAGENT_DOC_SOURCE_OF_TRUTH.canonicalLocation}.`,
      ]}
    />
  );
}
