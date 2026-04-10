import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { API_SERVER_CANONICAL_NAME, JOB_ORCHESTRATION_AUTHORITY_MODEL, JOB_ORCHESTRATION_CANONICAL_FLOW } from "@/lib/api-server-canonical";

const details = [
  {
    id: "authority",
    title: "Authority Definition",
    subtitle: "Execution-only orchestration",
    purpose: "Define Job Orchestration as an execution coordinator that must execute decision outputs as-is.",
    defines: ["queue/job/worker/status orchestration", "immutable job definition", "execution assignment"],
    doesNotDefine: "priority/retry reinterpretation.",
    href: "/docs/api/job-orchestration",
    linkLabel: "Canonical page",
  },
  {
    id: "worker-status",
    title: "Worker and Status Roles",
    subtitle: "Assignment and status authority",
    purpose: "Define Worker Manager assignment role and Status Tracker authority.",
    defines: ["worker assignment", "single source of truth for status/progress"],
    doesNotDefine: "execution semantics mutation.",
    href: "/docs/api/core-flow",
    linkLabel: "Related section",
  },
  {
    id: "prohibited-behavior",
    title: "Prohibited Behavior",
    subtitle: "No reinterpretation rule",
    purpose: "Define prohibited mutations of Decision System output.",
    defines: ["no priority changes", "no retry changes", "no execution intent reinterpretation"],
    doesNotDefine: "decision policy ownership.",
    href: "/docs/api/decision-system",
    linkLabel: "Related section",
  },
] as const;

export default function ApiJobOrchestrationPage() {
  return (
    <DocsContent>
      <PageTitle title={`${API_SERVER_CANONICAL_NAME} - Job Orchestration (Canonical)`} description="Queue and lifecycle authority that executes Decision System output without reinterpretation." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p><p className="mt-1 text-sm">job orchestration authority, immutability boundaries, worker assignment, and status tracking ownership.</p></div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p><p className="mt-1 text-sm">decision policy semantics and runtime action internals.</p></div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">{JOB_ORCHESTRATION_AUTHORITY_MODEL.noDecisionLogic}</p>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100"><span className="font-semibold">Out of Scope:</span> changing priority, retry behavior, or intent semantics.</div>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <Link href="#overview" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Overview</p><p className="text-xs text-slate-400">Scope and boundaries.</p></Link>
            <Link href="#orchestration-structure-diagram" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Orchestration Structure Diagram</p><p className="text-xs text-slate-400">Canonical orchestration flow.</p></Link>
            <Link href="#orchestration-details" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Orchestration Details</p><p className="text-xs text-slate-400">Purpose, defines, boundaries.</p></Link>
            <Link href="#related-docs" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Related Docs</p><p className="text-xs text-slate-400">Cross-subsystem authority map.</p></Link>
          </div>
        </SectionBlock>

        <SectionBlock id="orchestration-structure-diagram" title="Orchestration Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {[
                "Decision output",
                "Queue Manager",
                "Job Manager",
                "Worker Manager",
                "Status Tracker",
                "Execution handoff",
              ].map((step, index, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 font-medium text-cyan-100">{step}</span>
                  {index < arr.length - 1 ? <span className="text-cyan-300/80">-&gt;</span> : null}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">{JOB_ORCHESTRATION_CANONICAL_FLOW}</p>
          </div>
        </SectionBlock>

        <SectionBlock id="orchestration-details" title="Orchestration Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc pl-5 text-sm text-[var(--muted)]">
            <li>Job Orchestration = lifecycle authority.</li>
            <li>Decision System = policy authority.</li>
            <li>Execution Layer = runtime action authority.</li>
          </ul>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
