import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { QAGENT_CANONICAL_FLOW, QAGENT_DOC_SOURCE_OF_TRUTH } from "@/lib/qagent-canonical";
import { normalizeDocListText } from "@/lib/docs-text";

import { QAGENT_LAYER_HUB_LINKS } from "@/lib/docs-scope-links";
const qagentAreas = [
  "Intent intake and ambiguity resolution before planning",
  "DAL plan construction from validated intent and constraints",
  "Approval gating before any execution-eligible transition",
  "Execution handoff preparation toward API /run boundary",
];

const relatedBoundaries = [
  "QAgent = intent interpretation and plan authority",
  "API Server = execution lifecycle authority",
  "Client Layer = UI state and interaction authority",
  "QAgent child pages = subordinate specs, not competing layer definitions",
  "Versioning = canonical version record authority",
];

const inPageLinks = [
  { title: "Overview", subtitle: "Scope and ownership boundaries.", href: "#overview" },
  { title: "QAgent Structure Diagram", subtitle: "Canonical planning-to-handoff flow.", href: "#qagent-structure-diagram" },
  { title: "QAgent Details", subtitle: "Gates and planning components.", href: "#qagent-details" },
  { title: "Related Docs", subtitle: "Canonical cross-layer references.", href: "#related-docs" },
];

const qagentDetails = [
  {
    id: "qagent-scope",
    title: "QAgent Scope",
    subtitle: "Layer identity",
    purpose: "Defines QAgent as the orchestration and reasoning layer between Client and API.",
    defines: [
      "QAgent owns intent-to-plan orchestration and validation gates before execution handoff.",
      "QAgent converts user goals into deterministic planning artifacts rather than runtime jobs.",
      "QAgent maintains lineage context so downstream execution can be traced to intent and approval decisions.",
    ],
    doesNotDefine: "API runtime scheduling or job lifecycle ownership.",
    href: "/docs/q-agent",
    linkLabel: "Canonical page",
  },
  {
    id: "intent-intake",
    title: "Intent Intake",
    subtitle: "Request normalization",
    purpose: "Defines intake transformation from user request into structured intent.",
    defines: [
      "Normalizes user input, file context, and session context into a stable intake envelope.",
      "Builds initial intent candidates with explicit assumptions and missing-field awareness.",
      "Prepares clarification-ready context so unresolved intent does not leak into planning.",
    ],
    doesNotDefine: "policy or retry ownership.",
    href: "/docs/architecture/modules/intent-clarification",
    linkLabel: "Related section",
  },
  {
    id: "clarification-gate",
    title: "Clarification Gate",
    subtitle: "Ambiguity enforcement",
    purpose: "Defines ambiguity checks before planning proceeds.",
    defines: [
      "Detects ambiguous, conflicting, or incomplete intent states before DAL construction starts.",
      "Routes unresolved intent to clarification-required outcomes instead of speculative planning.",
      "Allows progression only when clarified intent is explicit enough for deterministic plan composition.",
    ],
    doesNotDefine: "execution orchestration behavior.",
    href: "/docs/architecture/modules/intent-clarification",
    linkLabel: "Related section",
  },
  {
    id: "dal-construction",
    title: "DAL Construction",
    subtitle: "Plan composition",
    purpose: "Defines creation of execution-ready plan artifacts.",
    defines: [
      "Constructs plan graphs from validated intent and policy-compliant constraints.",
      "Produces UI-facing plan packaging for review and approval interactions.",
      "Builds handoff artifacts that are execution-ready but still inside QAgent ownership boundary.",
    ],
    doesNotDefine: "runtime execution of generated plan.",
    href: "/docs/architecture/modules/dal",
    linkLabel: "Related section",
  },
  {
    id: "approval-gate",
    title: "Approval Gate",
    subtitle: "Execution authorization",
    purpose: "Defines approval enforcement before API handoff.",
    defines: [
      "Enforces explicit approval decision boundary before any execution-eligible transition.",
      "Produces approved or rejected outcomes with deterministic gate-state semantics.",
      "Controls whether execution handoff packaging can proceed to API boundary.",
    ],
    doesNotDefine: "post-handoff API status ownership.",
    href: "/docs/architecture/modules/approval",
    linkLabel: "Related section",
  },
  {
    id: "execution-handoff",
    title: "Execution Handoff",
    subtitle: "QAgent to API transition boundary",
    purpose: "Defines the final QAgent-owned transition that prepares and emits the execution request envelope toward API /run.",
    defines: [
      "Packages approved plan context into an API-consumable execution request envelope.",
      "Preserves request, plan, and approval lineage references needed for downstream status mapping.",
      "Marks the ownership handoff point where API Server becomes execution lifecycle authority.",
    ],
    doesNotDefine: "API job scheduling, runtime execution state, or result publication.",
    href: "/docs/api/core-flow",
    linkLabel: "Related section",
  },
] as const;

const relatedDocs = [
  "QAgent Overview = canonical parent page for QAgent scope and ownership.",
  "Architecture and module pages = subordinate specifications under QAgent authority.",
  "API Server = execution orchestration and job lifecycle authority after handoff.",
  "Client Layer = user interaction and UI ownership authority.",
  "System Flow = cross-layer transition authority.",
];

const normalizedQAgentAreas = qagentAreas.map(normalizeDocListText);
const normalizedRelatedBoundaries = relatedBoundaries.map(normalizeDocListText);
const normalizedRelatedDocs = relatedDocs.map(normalizeDocListText);

export default function QAgentPage() {
  return (
    <DocsContent>
      <PageTitle title="QAgent Layer" description="Canonical layer page for QAgent reasoning, planning gates, and execution handoff semantics." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: QAgent / Overview</p>

      <DocsScopeBlocks links={QAGENT_LAYER_HUB_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="QAgent is the canonical intent-to-plan layer that converts user goals into approved execution handoff for API processing."
            areasTitle="QAgent areas"
            areas={normalizedQAgentAreas}
            outOfScope="API execution lifecycle policy and client runtime state ownership."
            relatedBoundaries={normalizedRelatedBoundaries}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageLinks} />
        </SectionBlock>

        <SectionBlock id="qagent-structure-diagram" title="QAgent Structure Diagram" body={[]}>
          <DocsDiagram
            mode="flow"
            steps={["User Input", "QCore", "Files Handler", "Analyzer", "Intent + Clarification", "DAL", "UAgent", "Approval", "DAgent", "Execution Request Envelope", "API Server"]}
          />
          <p className="mt-3 text-sm text-[var(--muted)]">Canonical flow: {QAGENT_CANONICAL_FLOW}</p>
        </SectionBlock>

        <SectionBlock id="qagent-details" title="QAgent Details" body={[]}>
          <LayerSpecAccordion items={[...qagentDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs items={normalizedRelatedDocs} />
          <p className="mt-3 text-sm text-[var(--muted)]">
            Canonical location: <span className="font-semibold text-slate-100">{QAGENT_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
          </p>
          <p className="text-sm text-[var(--muted)]">{QAGENT_DOC_SOURCE_OF_TRUTH.rule}</p>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
