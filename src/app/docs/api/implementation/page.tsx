import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { API_SERVER_CANONICAL_NAME } from "@/lib/api-server-canonical";

const details = [
  {
    id: "implementation-order",
    title: "Implementation Order",
    subtitle: "Sequenced rollout",
    purpose: "Define the canonical implementation sequence for API layer rollout.",
    defines: ["API Gateway Layer", "Request Handling", "Job Orchestration", "Execution Layer", "Status and Result Publication"],
    doesNotDefine: "runtime algorithm details.",
    href: "/docs/api/core-flow",
    linkLabel: "Related section",
  },
  {
    id: "freeze-policy",
    title: "Freeze Policy",
    subtitle: "Governance lock",
    purpose: "Define constraints that preserve locked architecture during implementation.",
    defines: ["locked naming", "canonical flow adherence", "envelope definition stability"],
    doesNotDefine: "architecture redesign authority.",
    href: "/docs/api",
    linkLabel: "Canonical page",
  },
] as const;

export default function ApiImplementationPage() {
  return (
    <DocsContent>
      <PageTitle title={`${API_SERVER_CANONICAL_NAME} - Implementation`} description="Implementation sequencing and freeze policy for API layer rollout." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p><p className="mt-1 text-sm">implementation order, governance rules, and freeze policy for API subsystem rollout.</p></div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p><p className="mt-1 text-sm">runtime algorithm details and contract redesign.</p></div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">Implementation follows the locked API model and canonical naming across all subsystems.</p>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100"><span className="font-semibold">Out of Scope:</span> changes to locked architecture decisions.</div>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <Link href="#overview" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Overview</p><p className="text-xs text-slate-400">Scope and freeze boundary.</p></Link>
            <Link href="#implementation-structure-diagram" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Implementation Structure Diagram</p><p className="text-xs text-slate-400">Rollout stage sequence.</p></Link>
            <Link href="#implementation-details" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Implementation Details</p><p className="text-xs text-slate-400">Purpose, defines, boundaries.</p></Link>
            <Link href="#related-docs" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Related Docs</p><p className="text-xs text-slate-400">Canonical governance references.</p></Link>
          </div>
        </SectionBlock>

        <SectionBlock id="implementation-structure-diagram" title="Implementation Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {[
                "API Gateway",
                "Request Handling",
                "Job Orchestration",
                "Execution Layer",
                "Status/Result Publication",
              ].map((step, index, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 font-medium text-cyan-100">{step}</span>
                  {index < arr.length - 1 ? <span className="text-cyan-300/80">-&gt;</span> : null}
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="implementation-details" title="Implementation Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc pl-5 text-sm text-[var(--muted)]"><li>Implementation page = sequencing and freeze governance.</li><li>Subsystem pages = technical authority for each module.</li></ul>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
