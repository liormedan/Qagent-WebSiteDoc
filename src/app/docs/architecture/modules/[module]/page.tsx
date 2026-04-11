import { notFound } from "next/navigation";
import { ARCHITECTURE_MODULE_SCOPE_LINKS } from "@/lib/docs-scope-links";
import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";

type ModuleKey =
  | "qagent-core"
  | "files-handler"
  | "analyzer"
  | "intent-clarification"
  | "dal"
  | "uagent"
  | "approval"
  | "dagent"
  | "versioning";

type ModuleConfig = {
  title: string;
  description: string;
  overviewIntro: string;
  overviewAreas: string[];
  outOfScope: string;
  relatedBoundaries: string[];
  diagram: {
    root: string;
    groups: Array<{ title: string; items: string[] }>;
  };
  details: Array<{
    title: string;
    subtitle: string;
    purpose: string;
    defines: string[];
    doesNotDefine: string;
    href?: string;
    linkLabel?: string;
  }>;
  relatedDocs: string[];
};

const moduleConfigs: Record<ModuleKey, ModuleConfig> = {
  "qagent-core": {
    title: "QCore",
    description: "Core orchestration module that enforces deterministic control flow inside QAgent.",
    overviewIntro: "QCore is the control center of QAgent. It aligns interpretation, planning, and gating into one deterministic module boundary.",
    overviewAreas: ["control authority", "module orchestration", "flow progression", "state-aware enforcement"],
    outOfScope: "Cross-layer runtime lifecycle orchestration owned by API Server Layer.",
    relatedBoundaries: [
      "QCore = orchestration authority inside QAgent.",
      "DAL = plan construction authority.",
      "Approval = user authorization gate authority.",
      "API Server = execution lifecycle authority.",
    ],
    diagram: {
      root: "QCore",
      groups: [
        { title: "Control", items: ["Flow Coordination", "State Control", "Gate Enforcement"] },
        { title: "Inputs", items: ["Analyzer Signals", "Intent Clarification", "Policy Context"] },
        { title: "Outputs", items: ["DAL Trigger", "Approval Trigger", "Execution Handoff Eligibility"] },
      ],
    },
    details: [
      {
        title: "Module Identity",
        subtitle: "Core authority",
        purpose: "Define QCore as the canonical orchestrator module inside QAgent.",
        defines: ["deterministic flow ownership", "control-gate sequencing", "state-aware progression rules"],
        doesNotDefine: "actual execution runtime behavior.",
      },
      {
        title: "Control Responsibilities",
        subtitle: "Flow governance",
        purpose: "Define how QCore governs module transitions and execution readiness.",
        defines: ["transition sequencing", "policy enforcement boundaries", "gated handoff progression"],
        doesNotDefine: "DSP signal processing behavior.",
      },
      {
        title: "Boundary Model",
        subtitle: "Separation of concerns",
        purpose: "Define explicit ownership boundaries between QCore and adjacent modules.",
        defines: ["QCore vs DAL boundary", "QCore vs Approval boundary", "QCore vs API boundary"],
        doesNotDefine: "API-side job lifecycle status model.",
      },
    ],
    relatedDocs: [
      "QAgent Overview = layer authority and canonical flow.",
      "DAL Module = plan graph construction authority.",
      "Approval Module = user-triggered authorization boundary.",
      "System Flow = cross-layer transition reference.",
    ],
  },
  "files-handler": {
    title: "Files Handler",
    description: "Input gateway module for ingestion, validation, normalization, and file reference readiness.",
    overviewIntro: "Files Handler prepares raw file inputs into deterministic, validated references for downstream reasoning modules.",
    overviewAreas: ["ingestion", "validation", "normalization", "metadata readiness"],
    outOfScope: "Plan construction and execution lifecycle ownership.",
    relatedBoundaries: [
      "Files Handler = file readiness authority.",
      "Analyzer = semantic interpretation authority.",
      "Data Layer = storage lineage authority.",
    ],
    diagram: {
      root: "Files Handler",
      groups: [
        { title: "Input", items: ["Upload/Link Intake", "Source Resolution"] },
        { title: "Preparation", items: ["Validation", "Normalization", "Metadata Extraction"] },
        { title: "Output", items: ["Stable File Reference", "Analyzer-Ready Artifact"] },
      ],
    },
    details: [
      {
        title: "Ingestion Boundary",
        subtitle: "Input intake",
        purpose: "Define accepted input surfaces and source handling behavior.",
        defines: ["upload/link intake", "source normalization", "initial file reference context"],
        doesNotDefine: "content-level user intent interpretation.",
      },
      {
        title: "Validation and Normalization",
        subtitle: "Readiness enforcement",
        purpose: "Define pre-analysis checks and structure normalization behavior.",
        defines: ["format/shape checks", "deterministic normalization", "error boundary before analyzer"],
        doesNotDefine: "policy decision outcomes.",
      },
      {
        title: "Output Contract",
        subtitle: "Downstream handoff",
        purpose: "Define what downstream modules can rely on after file preparation.",
        defines: ["stable file reference", "metadata envelope", "analyzer-ready output"],
        doesNotDefine: "execution runtime contracts.",
      },
    ],
    relatedDocs: [
      "Analyzer Module = structured interpretation authority.",
      "QAgent Overview = intent-to-handoff authority.",
      "Data Layer = canonical artifact storage authority.",
    ],
  },
  analyzer: {
    title: "Analyzer",
    description: "Interpretation module that transforms prepared inputs into structured machine-usable signals.",
    overviewIntro: "Analyzer converts prepared input artifacts into structured interpretation signals for planning modules.",
    overviewAreas: ["feature extraction", "signal structuring", "context shaping", "intent-facing output"],
    outOfScope: "final intent decision and execution control authority.",
    relatedBoundaries: [
      "Analyzer = structured interpretation authority.",
      "Intent + Clarification = ambiguity resolution authority.",
      "DAL = executable plan authority.",
    ],
    diagram: {
      root: "Analyzer",
      groups: [
        { title: "Inputs", items: ["Prepared File Artifact", "Metadata Context"] },
        { title: "Analysis", items: ["Feature Extraction", "Signal Structuring", "Context Enrichment"] },
        { title: "Outputs", items: ["Structured Interpretation", "Intent-facing Signals"] },
      ],
    },
    details: [
      {
        title: "Interpretation Scope",
        subtitle: "Signal generation",
        purpose: "Define Analyzer as the module responsible for structured interpretation output.",
        defines: ["machine-usable features", "contextual signal envelope", "deterministic structured output"],
        doesNotDefine: "approval decisions or runtime jobs.",
      },
      {
        title: "Operational Ownership",
        subtitle: "Analysis responsibilities",
        purpose: "Define responsibilities for extraction, interpretation, and output shaping.",
        defines: ["input-to-signal transformation", "context-aware structuring", "handoff consistency"],
        doesNotDefine: "cross-layer output persistence.",
      },
      {
        title: "Downstream Boundary",
        subtitle: "Handoff to intent layer",
        purpose: "Define what the Intent + Clarification layer receives from Analyzer.",
        defines: ["interpreted signal packet", "ambiguity-relevant context", "planning-ready structure"],
        doesNotDefine: "final plan generation.",
      },
    ],
    relatedDocs: [
      "Intent + Clarification = ambiguity resolution authority.",
      "DAL = plan composition authority.",
      "System Flow = transition authority.",
    ],
  },
  "intent-clarification": {
    title: "Intent + Clarification",
    description: "Intent interpretation and ambiguity-resolution module before plan construction.",
    overviewIntro: "Intent + Clarification resolves user goal ambiguity and produces validated intent for planning.",
    overviewAreas: ["intent interpretation", "ambiguity detection", "clarification loop", "validated intent handoff"],
    outOfScope: "job orchestration and execution lifecycle ownership.",
    relatedBoundaries: [
      "Intent + Clarification = intent quality authority.",
      "Analyzer = interpretation signal authority.",
      "DAL = execution-ready planning authority.",
    ],
    diagram: {
      root: "Intent + Clarification",
      groups: [
        { title: "Inputs", items: ["Analyzer Signals", "Session Context"] },
        { title: "Resolution", items: ["Intent Candidate", "Ambiguity Check", "Clarification Loop"] },
        { title: "Outputs", items: ["Validated Intent", "Plan-ready Intent Envelope"] },
      ],
    },
    details: [
      {
        title: "Intent Formation",
        subtitle: "Goal modeling",
        purpose: "Define conversion from interpretation signals into structured user intent.",
        defines: ["intent candidate shaping", "goal disambiguation context", "structured intent envelope"],
        doesNotDefine: "DAL execution graph internals.",
      },
      {
        title: "Clarification Gate",
        subtitle: "Ambiguity control",
        purpose: "Define how ambiguity is detected and resolved before planning proceeds.",
        defines: ["clarification-required outcomes", "resolved intent path", "no-execute on unresolved intent"],
        doesNotDefine: "approval policy outcome.",
      },
      {
        title: "Validated Handoff",
        subtitle: "Planning transition",
        purpose: "Define what DAL can assume when intent handoff occurs.",
        defines: ["validated intent packet", "clarification state", "planning prerequisites met"],
        doesNotDefine: "execution request envelope fields.",
      },
    ],
    relatedDocs: [
      "Analyzer = signal interpretation authority.",
      "DAL = plan composition authority.",
      "Approval = user authorization gate authority.",
    ],
  },
  dal: {
    title: "DAL",
    description: "Planning module that converts validated intent into executable plan artifacts.",
    overviewIntro: "DAL transforms validated intent into deterministic plan structures for user approval and execution handoff.",
    overviewAreas: ["plan graph construction", "execution artifact packaging", "UI plan shaping", "planning boundaries"],
    outOfScope: "API runtime orchestration and queue lifecycle.",
    relatedBoundaries: ["DAL = planning authority.", "Approval = authorization authority.", "DAgent = execution action authority."],
    diagram: {
      root: "DAL",
      groups: [
        { title: "Inputs", items: ["Validated Intent", "Policy/Session Context"] },
        { title: "Planning", items: ["Plan Graph", "Action Mapping", "Constraint Validation"] },
        { title: "Outputs", items: ["Approval-ready Plan", "Execution Handoff Artifact"] },
      ],
    },
    details: [
      {
        title: "Planning Scope",
        subtitle: "Plan authority",
        purpose: "Define DAL as the canonical module for plan construction inside QAgent.",
        defines: ["action graph assembly", "constraint-aware plan shaping", "execution-ready plan artifacts"],
        doesNotDefine: "runtime action execution state.",
      },
      {
        title: "Plan Packaging",
        subtitle: "Handoff artifacts",
        purpose: "Define output structures consumed by UAgent, Approval, and DAgent.",
        defines: ["approval packet", "execution preparation payload", "UI-facing plan representation"],
        doesNotDefine: "API-side request contract ownership.",
      },
      {
        title: "Boundary Guarantees",
        subtitle: "Separation rules",
        purpose: "Define what DAL explicitly does not own to avoid overlap.",
        defines: ["planning-only ownership", "no execution-side mutation", "handoff boundary enforcement"],
        doesNotDefine: "job lifecycle tracking.",
      },
    ],
    relatedDocs: [
      "Approval = explicit authorization boundary.",
      "DAgent = execution action authority.",
      "API Server = runtime orchestration authority.",
    ],
  },
  uagent: {
    title: "UAgent",
    description: "UI-facing mediation module that reflects planning state and user interaction outcomes.",
    overviewIntro: "UAgent projects planning and approval state to the user while preserving clear separation from execution runtime.",
    overviewAreas: ["UI state mediation", "interaction handling", "approval context projection", "state synchronization"],
    outOfScope: "API status authority and job orchestration.",
    relatedBoundaries: [
      "UAgent = user-facing interaction projection.",
      "Client Layer = UI runtime/render ownership.",
      "Approval = authorization decision authority.",
    ],
    diagram: {
      root: "UAgent",
      groups: [
        { title: "Inputs", items: ["DAL Plan Packet", "Approval State", "Session Context"] },
        { title: "Mediation", items: ["Presentation Mapping", "Interaction Processing", "State Sync"] },
        { title: "Outputs", items: ["User-visible Plan Context", "Approval Trigger Signals"] },
      ],
    },
    details: [
      {
        title: "Interaction Scope",
        subtitle: "User mediation",
        purpose: "Define UAgent role in projecting planning state and collecting user interaction outcomes.",
        defines: ["plan context presentation", "interaction boundary", "state synchronization signals"],
        doesNotDefine: "client-rendering implementation internals.",
      },
      {
        title: "State Projection",
        subtitle: "Runtime visibility",
        purpose: "Define how user-facing state is derived from planning/approval context.",
        defines: ["projection from canonical plan state", "approval-stage status context", "interaction-safe updates"],
        doesNotDefine: "API job-state ownership.",
      },
      {
        title: "Handoff Interaction",
        subtitle: "Approval trigger",
        purpose: "Define UAgent’s transition role into approval gating.",
        defines: ["approval initiation signals", "interaction completion signals", "UI-to-approval boundary"],
        doesNotDefine: "approval enforcement rules.",
      },
    ],
    relatedDocs: [
      "Client Layer = UI runtime authority.",
      "Approval = authorization authority.",
      "QAgent Overview = canonical layer boundary.",
    ],
  },
  approval: {
    title: "Approval",
    description: "Authorization gate module that enforces explicit approval before execution handoff.",
    overviewIntro: "Approval is the explicit human-control gate that must resolve before any execution handoff is allowed.",
    overviewAreas: ["approval state model", "gate enforcement", "authorized transition logic", "rejection handling"],
    outOfScope: "post-handoff job-state transitions.",
    relatedBoundaries: [
      "Approval = explicit execution authorization boundary.",
      "UAgent = user interaction projection boundary.",
      "DAgent = execution preparation boundary.",
    ],
    diagram: {
      root: "Approval",
      groups: [
        { title: "Inputs", items: ["Plan Packet", "User Decision", "Session Context"] },
        { title: "Gate", items: ["Approve/Reject Resolution", "Control Policy Checks"] },
        { title: "Outputs", items: ["Authorized Handoff", "Blocked Transition Outcome"] },
      ],
    },
    details: [
      {
        title: "Authorization Scope",
        subtitle: "Gate ownership",
        purpose: "Define Approval as the canonical gate before execution can proceed.",
        defines: ["approve/reject state", "authorization boundary", "transition gating"],
        doesNotDefine: "runtime execution scheduling.",
      },
      {
        title: "Policy Enforcement",
        subtitle: "Control guardrails",
        purpose: "Define policy checks applied at approval time.",
        defines: ["policy-compliant authorization", "rejection outcomes", "blocked execution path"],
        doesNotDefine: "API policy error semantics.",
      },
      {
        title: "Transition Outcome",
        subtitle: "Handoff eligibility",
        purpose: "Define resulting eligibility state after gate resolution.",
        defines: ["eligible handoff state", "non-eligible blocked state", "downstream transition signal"],
        doesNotDefine: "execution result modeling.",
      },
    ],
    relatedDocs: [
      "Control Policy Matrix = policy boundary authority.",
      "DAL = plan formation authority.",
      "DAgent = execution operation authority.",
    ],
  },
  dagent: {
    title: "DAgent",
    description: "Execution module that interprets approved plans and prepares execution handoff artifacts.",
    overviewIntro: "DAgent converts approved plan instructions into execution-ready operation payloads for API runtime processing.",
    overviewAreas: ["plan interpretation", "operation routing", "execution preparation", "handoff packaging"],
    outOfScope: "API internal execution lifecycle and status projection.",
    relatedBoundaries: [
      "DAgent = execution preparation authority in QAgent.",
      "DSP Layer = processing execution authority.",
      "API Layer = job orchestration authority.",
    ],
    diagram: {
      root: "DAgent",
      groups: [
        { title: "Inputs", items: ["Approved Plan", "Operation Context"] },
        { title: "Execution Prep", items: ["Operation Resolution", "Routing Strategy", "Payload Assembly"] },
        { title: "Outputs", items: ["Execution Request Envelope", "Runtime-ready Action Set"] },
      ],
    },
    details: [
      {
        title: "Execution Preparation",
        subtitle: "Approved plan translation",
        purpose: "Define DAgent’s responsibility to translate approved plans into operation payloads.",
        defines: ["operation resolution", "payload assembly", "runtime handoff preparation"],
        doesNotDefine: "runtime queue/job lifecycle state.",
      },
      {
        title: "Routing Scope",
        subtitle: "Operation mapping",
        purpose: "Define how actions are mapped to executable operations before API handoff.",
        defines: ["operation selection", "routing metadata", "deterministic handoff packet"],
        doesNotDefine: "API endpoint contract authority.",
      },
      {
        title: "Handoff Contract Boundary",
        subtitle: "QAgent to API",
        purpose: "Define what DAgent emits at cross-layer transition.",
        defines: ["execution request envelope readiness", "required operation context", "handoff completion state"],
        doesNotDefine: "API execution result semantics.",
      },
    ],
    relatedDocs: [
      "API Core Flow = runtime lifecycle authority.",
      "DSP Layer = processing engine authority.",
      "Versioning Module = QAgent lineage boundary.",
    ],
  },
  versioning: {
    title: "Versioning",
    description: "Version tracking module for lineage continuity, restore references, and revision traceability.",
    overviewIntro: "Versioning preserves QAgent-side lineage continuity and version references across planning and execution cycles.",
    overviewAreas: ["version identity", "lineage capture", "restore references", "timeline continuity"],
    outOfScope: "API-side storage backend implementation.",
    relatedBoundaries: [
      "Versioning = lineage continuity authority.",
      "API Versioning = runtime result version authority.",
      "Data Layer = canonical persistence authority.",
    ],
    diagram: {
      root: "Versioning",
      groups: [
        { title: "Capture", items: ["State Snapshot", "Version Identifier", "Lineage Link"] },
        { title: "Management", items: ["History Tracking", "Restore Reference", "Diff Context"] },
        { title: "Outputs", items: ["Version Reference", "Traceable Timeline"] },
      ],
    },
    details: [
      {
        title: "Lineage Ownership",
        subtitle: "Version continuity",
        purpose: "Define QAgent-side version continuity and traceability ownership.",
        defines: ["version identity references", "lineage links", "history continuity context"],
        doesNotDefine: "API storage write orchestration.",
      },
      {
        title: "Restore Context",
        subtitle: "State return capability",
        purpose: "Define references required for restore and compare workflows.",
        defines: ["restore pointer context", "state snapshot linkage", "history traversal references"],
        doesNotDefine: "actual restore execution runtime.",
      },
      {
        title: "Related Deep Specs",
        subtitle: "Child module references",
        purpose: "Define where deep implementation-facing specs for version internals are documented.",
        defines: ["version manager deep spec", "diff engine deep spec", "module-level continuity context"],
        doesNotDefine: "new versioning architecture decisions.",
        href: "/docs/architecture/modules/versioning/version-manager",
        linkLabel: "Deep spec",
      },
    ],
    relatedDocs: [
      "Lineage Model = cross-layer ID mapping authority.",
      "Version Manager = deep spec for version creation logic.",
      "Diff Engine = deep spec for version delta semantics.",
      "API Versioning = runtime version publication authority.",
    ],
  },
};

const moduleEntries = Object.entries(moduleConfigs) as Array<[ModuleKey, ModuleConfig]>;

export function generateStaticParams() {
  return moduleEntries.map(([module]) => ({ module }));
}

export default async function ArchitectureModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const config = moduleConfigs[module as ModuleKey];

  if (!config) {
    notFound();
  }

  const detailsItems = config.details.map((item) => ({
    id: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title: item.title,
    subtitle: item.subtitle,
    purpose: item.purpose,
    defines: item.defines,
    doesNotDefine: item.doesNotDefine,
    href: item.href ?? `/docs/architecture/modules/${module}`,
    linkLabel: item.linkLabel ?? "Canonical page",
  }));

  return (
    <DocsTemplatePage
      title={config.title}
      description={config.description}
      sectionPath={["QAgent", "Architecture", "Modules", config.title]}
      scopeLinks={ARCHITECTURE_MODULE_SCOPE_LINKS}
      overviewIntro={config.overviewIntro}
      overviewAreasTitle="Module areas"
      overviewAreas={config.overviewAreas}
      outOfScope={config.outOfScope}
      relatedBoundaries={config.relatedBoundaries}
      navItems={[
        { title: "Overview", subtitle: "Module scope and boundaries.", href: "#overview" },
        { title: "Module Diagram", subtitle: "Internal module structure.", href: "#diagram" },
        { title: "Module Details", subtitle: "Responsibilities and constraints.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Module Diagram"
      diagram={{
        mode: "structure",
        root: config.diagram.root,
        groups: config.diagram.groups,
      }}
      detailsTitle="Module Details"
      detailsItems={detailsItems}
      relatedDocs={config.relatedDocs}
    />
  );
}
