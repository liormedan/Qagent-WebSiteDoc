import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { QAgentArchitectureLinearDiagram } from "@/components/ui/QAgentArchitectureLinearDiagram";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { QAGENT_CANONICAL_FLOW, QAGENT_DOC_SOURCE_OF_TRUTH } from "@/lib/qagent-canonical";
import { SYSTEM_DOC_SOURCE_OF_TRUTH, SYSTEM_RUNTIME_LIFECYCLE } from "@/lib/system-canonical";

type ModuleChapter = {
  title: string;
  role: "Core" | "Flow" | "Integration" | "UI" | "UI Gated" | "Execution" | "State";
  purpose: string;
  inputs: string;
  outputs: string;
  dependsOn: string;
};

const moduleChapters: ModuleChapter[] = [
  {
    title: "QCore",
    role: "Core",
    purpose: "Controls ordered module execution and enforces deterministic system rules.",
    inputs: "User request context, session state, and module responses.",
    outputs: "Validated next-module command and runtime state updates.",
    dependsOn: "All downstream modules for execution results.",
  },
  {
    title: "Files Handler",
    role: "Flow",
    purpose: "Loads, validates, and indexes user-provided files for analysis.",
    inputs: "Uploaded files and metadata.",
    outputs: "Normalized file references and access-safe handles.",
    dependsOn: "QCore request scope.",
  },
  {
    title: "Analyzer",
    role: "Flow",
    purpose: "Extracts audio evidence and structured signal features for decision layers.",
    inputs: "File handles and analysis directives.",
    outputs: "Feature vectors, detected events, and confidence metadata.",
    dependsOn: "Files Handler output.",
  },
  {
    title: "Intent + Clarification",
    role: "Flow",
    purpose: "Resolves user intent and blocks ambiguous actions until clarified.",
    inputs: "User language intent and analyzer evidence.",
    outputs: "Confirmed intent state with explicit constraints.",
    dependsOn: "QCore and Analyzer evidence.",
  },
  {
    title: "DAL",
    role: "Integration",
    purpose: "Builds executable action plans aligned to approved intent boundaries.",
    inputs: "Confirmed intent, constraints, and module context.",
    outputs: "Deterministic action graph for execution modules.",
    dependsOn: "Intent + Clarification result.",
  },
  {
    title: "UAgent",
    role: "UI",
    purpose: "Generates user-facing plan view and review controls before execution.",
    inputs: "DAL action graph and current session state.",
    outputs: "UI-ready action summary and approval prompts.",
    dependsOn: "DAL output.",
  },
  {
    title: "Approval (UI-triggered, enforced by QCore)",
    role: "UI Gated",
    purpose: "Prevents execution until explicit user approval is captured and verified.",
    inputs: "User approval signal and DAL plan fingerprint.",
    outputs: "Approved or rejected execution gate state.",
    dependsOn: "UAgent prompt delivery and QCore validation.",
  },
  {
    title: "DAgent",
    role: "Execution",
    purpose: "Builds the execution bridge from approved DAL intent to API Server runnable execution context.",
    inputs: "Approved execution graph, media context, and lineage identifiers.",
    outputs: "Execution Request Envelope handoff and execution bridge metadata.",
    dependsOn: "Approval gate, DAL integrity, and API Server /run contract.",
  },
  {
    title: "Versioning",
    role: "State",
    purpose: "Maintains QAgent-side version lineage and references from API execution outputs for compare/revert workflows.",
    inputs: "Execution Result Package references and session lineage data.",
    outputs: "Version references, snapshots, and lifecycle transition records.",
    dependsOn: "API /jobs result publication and DAgent bridge lineage.",
  },
];

function chapterBody(chapter: ModuleChapter): string[] {
  if (chapter.title === "QCore") {
    return [
      "### Main QCore Structure",
      "Defines QCore as the architectural center that governs orchestration, state-aware routing, and system control boundaries.",
      "### QCore Engine",
      "Describes the internal runtime core that executes the agent loop and coordinates decision progression across stages.",
      "### LLM Interface Layer",
      "Explains the controlled bridge that prepares context, invokes external models, validates responses, and returns structured decisions.",
      "### Model Provider Registry",
      "Outlines provider selection logic, fallback options, and model-routing constraints for reliable multi-model operation.",
      "### Tool System",
      "Covers the execution path for approved actions and how tool invocations are routed from decisions into operational modules.",
      "### State Manager",
      "Summarizes how runtime context and progression state are persisted, updated, and reloaded between loop iterations.",
      "### Flow Controller",
      "Defines transition guardrails that enforce valid movement between states and prevent invalid execution sequences.",
      "### Memory / History Layer",
      "Describes how prior interactions, decisions, and lineage are surfaced to preserve context continuity across the workflow.",
    ];
  }

  return [
    "### Module Type",
    chapter.role,
    "### Purpose",
    chapter.purpose,
    "### Inputs",
    chapter.inputs,
    "### Outputs",
    chapter.outputs,
    "### Depends On",
    chapter.dependsOn,
  ];
}

export default function ArchitecturePage() {
  return (
    <DocsContent>
      <PageTitle
        title="Architecture"
        description="QAgent runs an ordered modular flow for audio requests with deterministic routing, UI-gated approval, and versioned outputs."
      />

      <div className="flex flex-col gap-5">
        <section className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs leading-5 text-emerald-100 md:text-sm">
          QAgent Layer
          <br />
          Version: v1.0
          <br />
          Status: Ready for Implementation
        </section>

        <SectionBlock
          title="Architecture Diagram"
          body={[
            "### Overview",
            "Ordered modular flow from request intake to versioned output.",
            "### Canonical Flow",
            QAGENT_CANONICAL_FLOW,
            "### Structure",
            "The diagram is the single reference of module order in this page.",
          ]}
          collapsible
          childrenFirst
        >
          <div className="space-y-3">
            <QAgentArchitectureLinearDiagram />
          </div>
        </SectionBlock>

        {moduleChapters.map((chapter) => (
          <SectionBlock key={chapter.title} title={chapter.title} body={chapterBody(chapter)} collapsible />
        ))}

        <SectionBlock
          title="System-Level Canonical References"
          body={[
            `Primary system entry: ${SYSTEM_DOC_SOURCE_OF_TRUTH.canonicalLocation}`,
            `Canonical runtime lifecycle reference: ${SYSTEM_RUNTIME_LIFECYCLE}`,
            "This page references system-level declarations and does not redefine them.",
          ]}
          collapsible
        />

        <SectionBlock
          title="Source of Truth"
          body={[
            `Canonical location: ${QAGENT_DOC_SOURCE_OF_TRUTH.canonicalLocation}`,
            QAGENT_DOC_SOURCE_OF_TRUTH.rule,
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}



