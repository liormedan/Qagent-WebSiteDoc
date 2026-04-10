import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { QAgentCanonicalFlowDiagram } from "@/components/ui/QAgentCanonicalFlowDiagram";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { QAGENT_CANONICAL_FLOW, QAGENT_DOC_SOURCE_OF_TRUTH } from "@/lib/qagent-canonical";

const normalizeListItem = (value: string) => value.replace(/^(?:[-*\u2022]\s*)+/, "").trim();

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

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
            <p className="mt-1 text-sm">QAgent scope, planning gates, handoff preparation, and canonical flow boundaries.</p>
          </div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
            <p className="mt-1 text-sm">API runtime lifecycle, infrastructure scheduling, and client-side UI state ownership.</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">
            QAgent is the canonical intent-to-plan layer that converts user goals into approved execution handoff for API processing.
          </p>
          <div className="mt-3">
            <p className="text-sm font-semibold text-slate-100">QAgent areas</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {qagentAreas.map((item) => (
                <li key={item}>{normalizeListItem(item)}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            <span className="font-semibold">Out of Scope:</span> API execution lifecycle policy and client runtime state ownership.
          </div>
          <div className="mt-3">
            <p className="text-sm font-semibold text-slate-100">Related boundaries</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {relatedBoundaries.map((item) => (
                <li key={item}>{normalizeListItem(item)}</li>
              ))}
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            {inPageLinks.map((item) => (
              <Link key={item.href} href={item.href} className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60">
                <p className="font-semibold text-slate-100 group-hover:text-cyan-200">{item.title}</p>
                <p className="text-xs text-slate-400">{item.subtitle}</p>
              </Link>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="qagent-structure-diagram" title="QAgent Structure Diagram" body={[]}>
          <QAgentCanonicalFlowDiagram />
          <p className="mt-3 text-sm text-[var(--muted)]">Canonical flow: {QAGENT_CANONICAL_FLOW}</p>
        </SectionBlock>

        <SectionBlock id="qagent-details" title="QAgent Details" body={[]}>
          <LayerSpecAccordion items={[...qagentDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {relatedDocs.map((item) => (
              <li key={item}>{normalizeListItem(item)}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Canonical location: <span className="font-semibold text-slate-100">{QAGENT_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
          </p>
          <p className="text-sm text-[var(--muted)]">{QAGENT_DOC_SOURCE_OF_TRUTH.rule}</p>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
