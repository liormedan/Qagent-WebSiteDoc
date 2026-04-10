import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { API_SERVER_CANONICAL_NAME } from "@/lib/api-server-canonical";

const details = [
  {
    id: "owned-outputs",
    title: "Owned Outputs",
    subtitle: "Execution publication lineage",
    purpose: "Define API versioning ownership for execution publication records.",
    defines: ["job lifecycle transition records", "execution result publication", "failure/result correlation"],
    doesNotDefine: "QAgent decision-context history.",
    href: "/docs/api/versioning",
    linkLabel: "Canonical page",
  },
  {
    id: "non-ownership",
    title: "Non-Ownership Boundary",
    subtitle: "Cross-layer authority split",
    purpose: "Define boundaries between API versioning and QAgent version lineage.",
    defines: ["API execution publication lineage", "QAgent user-facing version references"],
    doesNotDefine: "user-facing narrative version history.",
    href: "/docs/q-agent",
    linkLabel: "Related section",
  },
] as const;

export default function ApiVersioningPage() {
  return (
    <DocsContent>
      <PageTitle title={`${API_SERVER_CANONICAL_NAME} - Versioning`} description="Execution publication versioning scope for API lifecycle outcomes." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p><p className="mt-1 text-sm">API-side version publication, lifecycle transitions, and result correlation references.</p></div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p><p className="mt-1 text-sm">QAgent decision lineage and client-facing version narratives.</p></div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">API Versioning stores publication-ready execution outcomes and lifecycle transitions for `/jobs` result integrity.</p>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100"><span className="font-semibold">Out of Scope:</span> user-facing decision-context history.</div>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <Link href="#overview" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Overview</p><p className="text-xs text-slate-400">Scope and ownership split.</p></Link>
            <Link href="#versioning-structure-diagram" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Versioning Structure Diagram</p><p className="text-xs text-slate-400">Owned vs non-owned outputs.</p></Link>
            <Link href="#versioning-details" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Versioning Details</p><p className="text-xs text-slate-400">Purpose, defines, boundaries.</p></Link>
            <Link href="#related-docs" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60"><p className="font-semibold text-slate-100 group-hover:text-cyan-200">Related Docs</p><p className="text-xs text-slate-400">Cross-layer authority references.</p></Link>
          </div>
        </SectionBlock>

        <SectionBlock id="versioning-structure-diagram" title="Versioning Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="mx-auto max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">API Versioning</div>
            <div className="mx-auto h-4 w-px bg-cyan-400/40" />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Owned</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>Job lifecycle records</li><li>Result publication records</li></ul></div>
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Not Owned</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>Decision-context history</li><li>User-facing version narratives</li></ul></div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="versioning-details" title="Versioning Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc pl-5 text-sm text-[var(--muted)]"><li>API Versioning = execution publication lineage authority.</li><li>QAgent Versioning = decision-context lineage authority.</li></ul>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
