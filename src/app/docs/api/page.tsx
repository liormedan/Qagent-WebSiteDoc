import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { API_SERVER_CANONICAL_NAME, API_SERVER_DOC_SOURCE_OF_TRUTH } from "@/lib/api-server-canonical";

const normalizeListItem = (value: string) => value.replace(/^(?:[-*\u2022]\s*)+/, "").trim();

const inPageLinks = [
  { title: "Overview", subtitle: "Scope and ownership boundaries.", href: "#overview" },
  { title: "API Structure Diagram", subtitle: "Entry, orchestration, and runtime flow.", href: "#api-structure-diagram" },
  { title: "API Details", subtitle: "Subsystem-by-subsystem definitions.", href: "#api-details" },
  { title: "Related Docs", subtitle: "Canonical cross-layer references.", href: "#related-docs" },
];

const apiAreas = [
  "request intake and validation",
  "job orchestration and lifecycle",
  "execution routing and result publication",
  "versioning and status projection",
];

const relatedBoundaries = [
  "API Server Layer = execution orchestration authority",
  "QAgent Layer = intent and plan authority",
  "Execution Layer = runtime action execution",
  "Versioning = version history authority",
];

const apiDetails = [
  {
    id: "api-gateway",
    title: "API Gateway",
    subtitle: "Entry boundary",
    purpose: "Define how execution requests enter API Server Layer.",
    defines: ["`/run` intake boundary", "entry route ownership", "request handoff toward validation"],
    doesNotDefine: "plan semantics or policy decisions.",
    href: "/docs/api/gateway",
  },
  {
    id: "request-handling",
    title: "Request Handling",
    subtitle: "Validation boundary",
    purpose: "Define structural validation before orchestration.",
    defines: ["input validation", "contract conformance checks", "rejection of invalid requests"],
    doesNotDefine: "runtime execution behavior.",
    href: "/docs/api/request-handling",
  },
  {
    id: "job-orchestration",
    title: "Job Orchestration",
    subtitle: "Lifecycle authority",
    purpose: "Define queueing and job lifecycle coordination.",
    defines: ["job creation", "queue orchestration", "status/progress authority"],
    doesNotDefine: "decision policy reinterpretation.",
    href: "/docs/api/job-orchestration",
  },
  {
    id: "execution-layer",
    title: "Execution Layer",
    subtitle: "Runtime execution",
    purpose: "Define plan execution routing and action dispatch.",
    defines: ["plan interpretation", "action dispatch", "result collection"],
    doesNotDefine: "job lifecycle ownership.",
    href: "/docs/api/execution",
  },
  {
    id: "decision-system",
    title: "Decision System",
    subtitle: "Policy decision authority",
    purpose: "Define admission and policy decisions before execution.",
    defines: ["policy decisions", "admission outcomes", "retry/policy ownership"],
    doesNotDefine: "runtime action execution.",
    href: "/docs/api/decision-system",
  },
  {
    id: "versioning",
    title: "Versioning",
    subtitle: "Version record authority",
    purpose: "Define version storage and versioned result references.",
    defines: ["version record creation", "reference stability", "version retrieval boundaries"],
    doesNotDefine: "execution runtime behavior.",
    href: "/docs/api/versioning",
  },
] as const;

const relatedDocs = [
  "API Server Layer = execution orchestration authority.",
  "QAgent Layer = intent and planning authority.",
  "Client Layer = user interaction and UI state authority.",
  "DSP Layer = processing execution specialization.",
];

export default function ApiPage() {
  return (
    <DocsContent>
      <PageTitle
        title={API_SERVER_CANONICAL_NAME}
        description="Execution orchestration layer that receives approved requests, manages jobs, and publishes runtime outcomes."
      />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
            <p className="mt-1 text-sm">API entry, request validation, job orchestration, execution routing, and versioned output publication.</p>
          </div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
            <p className="mt-1 text-sm">QAgent intent planning logic, client UI state ownership, and DSP internal processor implementation.</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">
            API Server Layer is the execution orchestration boundary between approved planning artifacts and runtime execution outcomes.
          </p>
          <div className="mt-3">
            <p className="text-sm font-semibold text-slate-100">API areas</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {apiAreas.map((item) => (
                <li key={item}>{normalizeListItem(item)}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            <span className="font-semibold">Out of Scope:</span> plan interpretation ownership in QAgent and UI/runtime ownership in Client Layer.
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

        <SectionBlock id="api-structure-diagram" title="API Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="mx-auto w-full max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">
              API Server Layer
            </div>
            <div className="mx-auto h-4 w-px bg-cyan-400/40" />
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Entry</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                  <li>API Gateway</li>
                  <li>Request Handling</li>
                  <li>Decision System</li>
                </ul>
              </div>
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Orchestration</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                  <li>Job Orchestration</li>
                  <li>Status Tracker</li>
                  <li>Queue Coordination</li>
                </ul>
              </div>
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Runtime & Output</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                  <li>Execution Layer</li>
                  <li>Versioning</li>
                  <li>`/jobs` Result Projection</li>
                </ul>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="api-details" title="API Details" body={[]}>
          <LayerSpecAccordion items={[...apiDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {relatedDocs.map((item) => (
              <li key={item}>{normalizeListItem(item)}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Canonical location: <span className="font-semibold text-slate-100">{API_SERVER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
          </p>
          <p className="text-sm text-[var(--muted)]">{API_SERVER_DOC_SOURCE_OF_TRUTH.rule}</p>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
