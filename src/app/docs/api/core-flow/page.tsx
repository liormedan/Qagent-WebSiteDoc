import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import {
  API_SERVER_CANONICAL_FLOW,
  API_SERVER_FLOW_SEGMENTS,
  EXECUTION_LAYER_CANONICAL_FLOW,
  JOB_ORCHESTRATION_CANONICAL_FLOW,
} from "@/lib/api-server-canonical";

const flowDetails = [
  {
    id: "api-flow",
    title: "API Canonical Flow",
    subtitle: "Layer-level execution path",
    purpose: "Defines the canonical API sequence from intake to result projection.",
    defines: [
      "QAgent request handoff",
      "gateway intake and validation",
      "orchestration, execution, and `/jobs` publication",
    ],
    doesNotDefine: "QAgent internal planning behavior.",
    href: "/docs/api",
    linkLabel: "Canonical page",
  },
  {
    id: "orchestration-execution",
    title: "Orchestration and Execution Flows",
    subtitle: "Sub-flow composition",
    purpose: "Defines how orchestration and execution canonical flows compose under API flow.",
    defines: ["job orchestration flow", "execution layer flow", "sub-flow consistency"],
    doesNotDefine: "infrastructure runtime optimization.",
    href: "/docs/api/execution",
    linkLabel: "Related section",
  },
] as const;

const canonicalSteps = [
  "QAgent approved request",
  "API Gateway /run",
  "Request Handling validation",
  "Job Orchestration queue",
  "Execution Layer runtime",
  "/jobs status/results",
  "QAgent result consumption",
];

export default function ApiCoreFlowPage() {
  return (
    <DocsContent>
      <PageTitle title="API Server Layer - Core Flow" description="Canonical runtime flow from approved execution request to published result." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
            <p className="mt-1 text-sm">API canonical flow stages and relation to orchestration and execution sub-flows.</p>
          </div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
            <p className="mt-1 text-sm">module internals and non-flow implementation details.</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">Core Flow defines the ordered sequence of API runtime stages and the handoff points between modules.</p>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            <span className="font-semibold">Out of Scope:</span> module-level policy and implementation detail.
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">Related boundaries: Core Flow = stage order, module pages = internal definitions.</p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <Link href="#overview" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Overview</p><p className="text-xs text-slate-400">Scope and boundaries.</p></Link>
            <Link href="#flow-structure-diagram" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Flow Structure Diagram</p><p className="text-xs text-slate-400">Canonical stage chain.</p></Link>
            <Link href="#flow-details" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Flow Details</p><p className="text-xs text-slate-400">Purpose and sub-flow mapping.</p></Link>
            <Link href="#related-docs" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Related Docs</p><p className="text-xs text-slate-400">Cross-page flow ownership.</p></Link>
          </div>
        </SectionBlock>

        <SectionBlock id="flow-structure-diagram" title="Flow Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {canonicalSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 font-medium text-cyan-100">{step}</span>
                  {index < canonicalSteps.length - 1 ? <span className="text-cyan-300/80">-&gt;</span> : null}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">Canonical reference: {API_SERVER_CANONICAL_FLOW}</p>
            <div className="mt-3 space-y-1 text-sm text-[var(--muted)]">
              {API_SERVER_FLOW_SEGMENTS.map((segment) => (
                <p key={segment.stage}><span className="font-semibold text-slate-100">{segment.stage}</span>: {segment.modules.join(", ")}</p>
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="flow-details" title="Flow Details" body={[]}>
          <LayerSpecAccordion items={[...flowDetails]} />
          <div className="mt-3 space-y-2 rounded-md border border-[var(--border)] bg-slate-950/30 p-3 text-sm text-[var(--muted)]">
            <p><span className="font-semibold text-slate-100">Job Orchestration Canonical Flow:</span> {JOB_ORCHESTRATION_CANONICAL_FLOW}</p>
            <p><span className="font-semibold text-slate-100">Execution Layer Canonical Flow:</span> {EXECUTION_LAYER_CANONICAL_FLOW}</p>
          </div>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc pl-5 text-sm text-[var(--muted)]">
            <li>Core Flow = canonical stage ordering authority.</li>
            <li>Job Orchestration page = orchestration flow authority.</li>
            <li>Execution page = execution flow authority.</li>
          </ul>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
