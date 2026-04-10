import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { ClientLayerDiagram } from "@/components/ui/ClientLayerDiagram";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { CLIENT_LAYER_CANONICAL_NAME, CLIENT_LAYER_DOC_SOURCE_OF_TRUTH } from "@/lib/client-canonical";

const normalizeListItem = (value: string) => value.replace(/^(?:[-*\u2022]\s*)+/, "").trim();

const clientAreas = [
  "user interaction surfaces",
  "runtime status/result projection",
  "UI state and event ownership",
  "handoff signaling to QAgent",
];

const relatedBoundaries = [
  "Client Layer = user interaction and UI state authority",
  "QAgent Layer = intent and planning authority",
  "API Server Layer = job lifecycle and execution authority",
  "Versioning = canonical output history authority",
];

const inPageLinks = [
  { title: "Overview", subtitle: "Scope and ownership boundaries.", href: "#overview" },
  { title: "Layer Structure Diagram", subtitle: "UI surfaces and runtime flow.", href: "#layer-structure-diagram" },
  { title: "Layer Details", subtitle: "Responsibilities and boundaries.", href: "#layer-details" },
  { title: "Related Docs", subtitle: "Canonical cross-layer references.", href: "#related-docs" },
];

const clientDetails = [
  {
    id: "interaction-surfaces",
    title: "Interaction Surfaces",
    subtitle: "Chat, Canvas, Workspace",
    purpose: "Define user-facing interaction boundaries.",
    defines: ["chat and prompt interaction", "canvas workspace interaction", "workspace navigation and control events"],
    doesNotDefine: "intent policy decisions.",
    href: "/docs/client/chat-ui",
    linkLabel: "Related section",
  },
  {
    id: "runtime-projection",
    title: "Runtime Projection",
    subtitle: "Status and result rendering",
    purpose: "Define projection of progress and outcomes to UI.",
    defines: ["status rendering", "result projection", "error display boundaries"],
    doesNotDefine: "job lifecycle ownership.",
    href: "/docs/client/runtime",
    linkLabel: "Related section",
  },
  {
    id: "state-ownership",
    title: "State Ownership",
    subtitle: "Client-owned state boundary",
    purpose: "Define UI state ownership within Client Layer.",
    defines: ["local UI state", "interaction event state", "view state transitions"],
    doesNotDefine: "global API job status authority.",
    href: "/docs/client/state-ownership",
    linkLabel: "Related section",
  },
  {
    id: "qagent-handoff",
    title: "QAgent Handoff",
    subtitle: "Structured request emission",
    purpose: "Define how Client emits structured requests into QAgent.",
    defines: ["request event emission", "payload shaping for QAgent", "handoff trigger boundaries"],
    doesNotDefine: "QAgent planning semantics.",
    href: "/docs/q-agent",
    linkLabel: "Canonical page",
  },
] as const;

const relatedDocs = [
  "Client Layer = user interaction and UI runtime authority.",
  "QAgent Layer = intent and planning authority.",
  "API Server Layer = execution and job lifecycle authority.",
  "System Flow = cross-layer transition authority.",
];

export default function ClientOverviewPage() {
  return (
    <DocsContent>
      <PageTitle title={CLIENT_LAYER_CANONICAL_NAME} description="Canonical layer page for user interaction boundaries, UI runtime ownership, and request handoff semantics." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
            <p className="mt-1 text-sm">interaction surfaces, runtime projection, UI ownership boundaries, and QAgent handoff behavior.</p>
          </div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
            <p className="mt-1 text-sm">intent planning logic, API job orchestration, and runtime execution scheduling.</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">
            Client Layer is the user-facing boundary that captures interaction, projects runtime state, and presents final outputs.
          </p>
          <div className="mt-3">
            <p className="text-sm font-semibold text-slate-100">Client areas</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {clientAreas.map((item) => (
                <li key={item}>{normalizeListItem(item)}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            <span className="font-semibold">Out of Scope:</span> intent interpretation and API runtime orchestration decisions.
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

        <SectionBlock id="layer-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <ClientLayerDiagram />
        </SectionBlock>

        <SectionBlock id="layer-details" title="Layer Details" body={[]}>
          <LayerSpecAccordion items={[...clientDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {relatedDocs.map((item) => (
              <li key={item}>{normalizeListItem(item)}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Canonical location: <span className="font-semibold text-slate-100">{CLIENT_LAYER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
          </p>
          <p className="text-sm text-[var(--muted)]">{CLIENT_LAYER_DOC_SOURCE_OF_TRUTH.rule}</p>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
