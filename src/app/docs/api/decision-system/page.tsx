import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { API_SERVER_CANONICAL_NAME } from "@/lib/api-server-canonical";

const modules = [
  "Request Admission Controller",
  "Execution Policy Guard",
  "Load Shedding Controller",
  "Priority Resolver",
  "Failure Classification Unit",
  "Retry Decision Logic",
];

const details = [
  {
    id: "admission-policy",
    title: "Admission and Policy",
    subtitle: "Operational decision surface",
    purpose: "Define operational admission and policy decisions before orchestration.",
    defines: ["admission checks", "policy compliance decisions", "priority/load outcomes"],
    doesNotDefine: "QAgent intent and planning ownership.",
    href: "/docs/api/job-orchestration",
    linkLabel: "Related section",
  },
  {
    id: "failure-retry",
    title: "Failure and Retry Decisions",
    subtitle: "Execution control posture",
    purpose: "Define failure classification and retry posture decisions.",
    defines: ["failure classes", "retry posture", "decision output to orchestration"],
    doesNotDefine: "runtime action execution.",
    href: "/docs/api/execution",
    linkLabel: "Related section",
  },
] as const;

export default function ApiDecisionSystemPage() {
  return (
    <DocsContent>
      <PageTitle title={`${API_SERVER_CANONICAL_NAME} - Decision System`} description="Operational decision subsystem for admission, policy, load, and retry posture." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p><p className="mt-1 text-sm">admission, policy control, load behavior, failure classification, and retry decision posture.</p></div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p><p className="mt-1 text-sm">intent interpretation and plan construction ownership.</p></div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">Decision System governs operational execution decisions within API boundaries.</p>
          <div className="mt-3"><p className="text-sm font-semibold text-slate-100">Decision modules</p><ul className="mt-1 list-disc pl-5 text-sm text-[var(--muted)]">{modules.map((m)=><li key={m}>{m}</li>)}</ul></div>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100"><span className="font-semibold">Out of Scope:</span> QAgent planning and user-facing decisions.</div>
          <p className="mt-3 text-sm text-[var(--muted)]">Related boundaries: Decision System = policy decisions, Job Orchestration = execution of decisions.</p>
        </SectionBlock>
        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2"><Link href="#overview" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Overview</Link><Link href="#decision-structure-diagram" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Decision Structure Diagram</Link><Link href="#decision-details" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Decision Details</Link><Link href="#related-docs" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Related Docs</Link></div>
        </SectionBlock>
        <SectionBlock id="decision-structure-diagram" title="Decision Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4"><div className="mx-auto max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">Decision System</div><div className="mx-auto h-4 w-px bg-cyan-400/40" /><div className="grid gap-3 md:grid-cols-2"><div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Admission & Policy</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>Admission check</li><li>Policy guard</li><li>Priority/load decision</li></ul></div><div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Failure & Retry</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>Failure classification</li><li>Retry posture</li><li>Decision output</li></ul></div></div></div>
        </SectionBlock>
        <SectionBlock id="decision-details" title="Decision Details" body={[]}><LayerSpecAccordion items={[...details]} /></SectionBlock>
        <SectionBlock id="related-docs" title="Related Docs" body={[]}><ul className="list-disc pl-5 text-sm text-[var(--muted)]"><li>Decision System = operational policy authority.</li><li>Job Orchestration = execution lifecycle authority.</li><li>QAgent = intent/plan authority.</li></ul></SectionBlock>
      </div>
    </DocsContent>
  );
}
