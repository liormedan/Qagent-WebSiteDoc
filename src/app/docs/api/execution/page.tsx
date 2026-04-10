import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import {
  API_SERVER_CANONICAL_NAME,
  EXECUTION_LAYER_CANONICAL_FLOW,
  EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH,
  EXECUTION_RESULT_PACKAGE_DEFINITION,
} from "@/lib/api-server-canonical";

const details = [
  {
    id: "execution-engine",
    title: "Execution Engine",
    subtitle: "Runtime controller",
    purpose: "Define runtime coordination for executable actions.",
    defines: ["execution progression", "runtime coordination", "result handoff"],
    doesNotDefine: "job lifecycle authority.",
    href: "/docs/api/execution",
    linkLabel: "Canonical page",
  },
  {
    id: "plan-dispatch-collect",
    title: "Plan/Dispatch/Collect",
    subtitle: "Execution submodules",
    purpose: "Define interpretation, dispatch, and result collection responsibilities.",
    defines: ["plan interpreter", "action dispatcher", "result collector"],
    doesNotDefine: "decision policy ownership.",
    href: "/docs/api/core-flow",
    linkLabel: "Related section",
  },
  {
    id: "result-package",
    title: "Execution Result Package",
    subtitle: "Canonical outward output",
    purpose: "Define the single outward output package produced by Execution Layer.",
    defines: EXECUTION_RESULT_PACKAGE_DEFINITION.conceptualContents,
    doesNotDefine: "version history ownership.",
    href: EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH.canonicalLocation,
    linkLabel: "Canonical page",
  },
] as const;

export default function ApiExecutionPage() {
  return (
    <DocsContent>
      <PageTitle title={`${API_SERVER_CANONICAL_NAME} - Execution Layer`} description="Runtime execution subsystem for plan interpretation, action dispatch, and result collection." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p><p className="mt-1 text-sm">execution flow, runtime dispatch, and result package emission.</p></div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p><p className="mt-1 text-sm">job lifecycle ownership and upstream decision policy.</p></div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">Execution Layer translates executable structure into runtime actions and canonical result package output.</p>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100"><span className="font-semibold">Out of Scope:</span> decision policy and global job status authority.</div>
          <p className="mt-3 text-sm text-[var(--muted)]">Related boundaries: Execution Layer = runtime action execution, Job Orchestration = status authority.</p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <Link href="#overview" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Overview</p><p className="text-xs text-slate-400">Scope and boundaries.</p></Link>
            <Link href="#execution-structure-diagram" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Execution Structure Diagram</p><p className="text-xs text-slate-400">Canonical runtime execution path.</p></Link>
            <Link href="#execution-details" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Execution Details</p><p className="text-xs text-slate-400">Purpose, defines, boundaries.</p></Link>
            <Link href="#related-docs" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Related Docs</p><p className="text-xs text-slate-400">Canonical references.</p></Link>
          </div>
        </SectionBlock>

        <SectionBlock id="execution-structure-diagram" title="Execution Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {[
                "Runnable job context",
                "Plan Interpreter",
                "Action Dispatcher",
                "Execution Engine",
                "Result Collector",
                EXECUTION_RESULT_PACKAGE_DEFINITION.name,
              ].map((step, index, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 font-medium text-cyan-100">{step}</span>
                  {index < arr.length - 1 ? <span className="text-cyan-300/80">-&gt;</span> : null}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">{EXECUTION_LAYER_CANONICAL_FLOW}</p>
          </div>
        </SectionBlock>

        <SectionBlock id="execution-details" title="Execution Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc pl-5 text-sm text-[var(--muted)]">
            <li>Execution Layer = runtime action authority.</li>
            <li>Job Orchestration = lifecycle authority.</li>
            <li>Decision System = policy authority.</li>
          </ul>
          <p className="mt-2 text-sm text-[var(--muted)]">Canonical location: <span className="font-semibold text-slate-100">{EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span></p>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
