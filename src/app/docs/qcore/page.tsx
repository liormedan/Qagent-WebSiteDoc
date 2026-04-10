import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";

const detailsItems = [
  {
    id: "qcore-runtime",
    title: "QCore Runtime",
    subtitle: "Outer runtime envelope",
    purpose:
      "QCore Runtime is the outer orchestration envelope of QAgent. It defines the authoritative runtime boundary that controls stage progression, coordination rules, and handoff readiness across internal components.",
    defines: [
      "It establishes deterministic runtime sequencing across intake, planning, approval, and handoff checkpoints.",
      "It contains and governs the internal QCore Engine while keeping orchestration authority inside QAgent.",
      "It enforces runtime-level boundaries so connected services cannot bypass control gates.",
    ],
    doesNotDefine: "provider internals, DSP internals, or API job lifecycle behavior.",
    href: "/docs/qcore",
    linkLabel: "Canonical page",
  },
  {
    id: "qcore-engine",
    title: "QCore Engine",
    subtitle: "Internal control kernel",
    purpose:
      "QCore Engine is the internal control kernel nested inside QCore Runtime. It evaluates decisions, validates transitions, and drives the next valid internal control action.",
    defines: [
      "It executes internal decision coordination without transferring ownership to external interfaces.",
      "It enforces transition validity between intent clarification, planning, and approval stages.",
      "It controls gate outcomes that determine whether a downstream handoff path is allowed.",
    ],
    doesNotDefine: "external provider API implementation details.",
    href: "/docs/architecture/modules/qagent-core",
    linkLabel: "Related section",
  },
  {
    id: "internal-control-units",
    title: "Internal Control Units",
    subtitle: "Flow Controller, State Manager, Runtime Loop",
    purpose:
      "Internal control units operate under QCore Engine and provide deterministic runtime behavior. Together they implement transition control, runtime state continuity, and iterative loop execution.",
    defines: [
      "Flow Controller validates transition sequencing and blocks invalid progression paths.",
      "State Manager maintains runtime continuity and applies validated state updates after each step.",
      "Runtime Loop executes the iterative cycle from input context to validated next transition.",
    ],
    doesNotDefine: "cross-layer execution ownership after API handoff.",
    href: "/docs/system-flow",
    linkLabel: "Related section",
  },
  {
    id: "connected-interfaces",
    title: "Connected Interfaces",
    subtitle: "LLM Interface, Model Provider Registry, Tool System",
    purpose:
      "Connected interfaces provide reasoning and execution capabilities to QCore without taking orchestration ownership. QCore Runtime and QCore Engine remain the control authorities while interfaces execute bounded responsibilities.",
    defines: [
      "LLM Interface provides controlled reasoning invocation and normalized decision output.",
      "Model Provider Registry abstracts provider/model selection under runtime constraints.",
      "Tool System executes validated actions through the runtime-controlled execution boundary.",
    ],
    doesNotDefine: "final orchestration authority, which remains in QCore Runtime/Engine.",
    href: "/docs/architecture",
    linkLabel: "Related section",
  },
  {
    id: "context-services",
    title: "Context Services",
    subtitle: "Memory Layer and History Layer",
    purpose:
      "Context services support QCore with continuity and traceability data across loop iterations. They preserve relevant context without becoming orchestration owners.",
    defines: [
      "Memory Layer provides contextual recall used by runtime decision steps.",
      "History Layer preserves decision and output lineage for traceability.",
      "Both services support deterministic progression by supplying stable context references.",
    ],
    doesNotDefine: "decision ownership or transition authority.",
    href: "/docs/architecture/modules/versioning",
    linkLabel: "Related section",
  },
] as const;

export default function QCorePage() {
  return (
    <DocsTemplatePage
      title="Main QCore Structure"
      description="Authoritative architectural definition of the QAgent runtime core structure."
      sectionPath={["QAgent", "Architecture", "Main QCore Structure"]}
      covers="QCore runtime envelope, internal control engine, internal control units, connected interfaces, and supporting context services."
      doesNotCover="API execution lifecycle ownership, client runtime UI ownership, and DSP backend implementation internals."
      overviewIntro="QCore is structured as two distinct layers: QCore Runtime as the outer orchestration envelope, and QCore Engine as the internal control kernel inside that envelope."
      overviewAreasTitle="QCore structure areas"
      overviewAreas={[
        "QCore Runtime (outer orchestration envelope)",
        "QCore Engine (internal control kernel)",
        "Internal control units (Flow Controller, State Manager, Runtime Loop)",
        "Connected interfaces (LLM Interface, Model Provider Registry, Tool System)",
        "Supporting context services (Memory Layer, History Layer)",
      ]}
      outOfScope="Flattening runtime envelope and internal engine into one undifferentiated module list."
      relatedBoundaries={[
        "QCore Runtime = overall orchestration runtime boundary.",
        "QCore Engine = internal control kernel inside runtime boundary.",
        "Connected interfaces = controlled integration points, not orchestration owners.",
        "Context services = supporting continuity services, not control kernel.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Runtime envelope vs internal engine.", href: "#overview" },
        { title: "QCore Diagram", subtitle: "Nested runtime and engine structure.", href: "#diagram" },
        { title: "QCore Details", subtitle: "Ordered specification by hierarchy.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical cross-page boundaries.", href: "#related-docs" },
      ]}
      diagramTitle="QCore Diagram"
      diagram={{
        mode: "structure",
        root: "QCore Runtime (Outer Boundary)",
        groups: [
          {
            title: "QCore Engine (Nested Internal Kernel)",
            items: ["Flow Controller", "State Manager", "Runtime Loop"],
          },
          {
            title: "Connected Reasoning/Execution Interfaces",
            items: ["LLM Interface", "Model Provider Registry", "Tool System"],
          },
          {
            title: "Supporting Context Services",
            items: ["Memory Layer", "History Layer"],
          },
        ],
      }}
      detailsTitle="QCore Details"
      detailsItems={[...detailsItems]}
      relatedDocs={[
        "QCore = runtime and internal control authority.",
        "Architecture = QAgent module map authority.",
        "System Flow = transition sequence authority.",
        "QAgent Overview = layer-level ownership authority.",
      ]}
    />
  );
}
