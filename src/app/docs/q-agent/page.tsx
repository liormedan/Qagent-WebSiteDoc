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

const qagentAreas = [
  "intent intake and clarification",
  "DAL plan construction",
  "approval gating",
  "execution handoff packaging",
];

const relatedBoundaries = [
  "QAgent = intent and planning authority",
  "API Server = execution lifecycle authority",
  "Client Layer = UI state and interaction authority",
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
    defines: ["intent and planning orchestration", "execution handoff readiness", "lineage bridge context"],
    doesNotDefine: "API runtime scheduling or job lifecycle ownership.",
    href: "/docs/q-agent",
    linkLabel: "Canonical page",
  },
  {
    id: "intent-intake",
    title: "Intent Intake",
    subtitle: "Request normalization",
    purpose: "Defines intake transformation from user request into structured intent.",
    defines: ["intent signal normalization", "context preparation", "initial intent candidate formation"],
    doesNotDefine: "policy or retry ownership.",
    href: "/docs/architecture/modules/intent-clarification",
    linkLabel: "Related section",
  },
  {
    id: "clarification-gate",
    title: "Clarification Gate",
    subtitle: "Ambiguity enforcement",
    purpose: "Defines ambiguity checks before planning proceeds.",
    defines: ["ambiguity detection", "clarification-required outcomes", "clarified intent progression"],
    doesNotDefine: "execution orchestration behavior.",
    href: "/docs/architecture/modules/intent-clarification",
    linkLabel: "Related section",
  },
  {
    id: "dal-construction",
    title: "DAL Construction",
    subtitle: "Plan composition",
    purpose: "Defines creation of execution-ready plan artifacts.",
    defines: ["plan graph construction", "UI plan packaging", "handoff artifact composition"],
    doesNotDefine: "runtime execution of generated plan.",
    href: "/docs/architecture/modules/dal",
    linkLabel: "Related section",
  },
  {
    id: "approval-gate",
    title: "Approval Gate",
    subtitle: "Execution authorization",
    purpose: "Defines approval enforcement before API handoff.",
    defines: ["approval decision boundary", "approved/rejected outcomes", "handoff eligibility control"],
    doesNotDefine: "post-handoff API status ownership.",
    href: "/docs/architecture/modules/approval",
    linkLabel: "Related section",
  },
] as const;

const relatedDocs = [
  "QAgent = intent interpretation and plan authority.",
  "API Server = execution orchestration and job authority.",
  "Client Layer = user interaction and UI ownership.",
  "System Flow = cross-layer transition authority.",
];

export default function QAgentPage() {
  return (
    <DocsContent>
      <PageTitle title="QAgent Layer" description="Canonical layer page for QAgent reasoning, planning gates, and execution handoff semantics." />

      <DocsScopeBlocks
        covers="QAgent scope, planning gates, handoff preparation, and canonical flow boundaries."
        doesNotCover="API runtime lifecycle, infrastructure scheduling, and client-side UI state ownership."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="QAgent is the canonical intent-to-plan layer that converts user goals into approved execution handoff for API processing."
            areasTitle="QAgent areas"
            areas={qagentAreas}
            outOfScope="API execution lifecycle policy and client runtime state ownership."
            relatedBoundaries={relatedBoundaries}
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
          <DocsRelatedDocs items={relatedDocs} />
          <p className="mt-3 text-sm text-[var(--muted)]">
            Canonical location: <span className="font-semibold text-slate-100">{QAGENT_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
          </p>
          <p className="text-sm text-[var(--muted)]">{QAGENT_DOC_SOURCE_OF_TRUTH.rule}</p>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
