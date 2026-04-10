import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const details = [
  {
    id: "validation",
    title: "Validation",
    subtitle: "Contract conformance",
    purpose: "Define structural validation before orchestration.",
    defines: ["request shape validation", "required field checks", "invalid request rejection"],
    doesNotDefine: "policy or retry semantics.",
    href: "/docs/api/architecture#request-handling",
    linkLabel: "Related section",
  },
  {
    id: "handoff",
    title: "Validated Handoff",
    subtitle: "Orchestration input",
    purpose: "Define the validated output passed to Job Orchestration.",
    defines: ["validated request context", "gateway-to-orchestration bridge", "admission continuation"],
    doesNotDefine: "job lifecycle ownership.",
    href: "/docs/api/job-orchestration",
    linkLabel: "Related section",
  },
] as const;

export default function ApiRequestHandlingPage() {
  return (
    <DocsContent>
      <PageTitle title="Request Handling" description="Validation and normalization boundary before job creation and orchestration." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
            <p className="mt-1 text-sm">validation boundaries, contract checks, and handoff readiness for orchestration.</p>
          </div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
            <p className="mt-1 text-sm">decision policy ownership and execution runtime behavior.</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">Request Handling validates API Gateway input and forwards only conformant payloads to orchestration.</p>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            <span className="font-semibold">Out of Scope:</span> policy decisions and execution scheduling.
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">Related boundaries: Request Handling = validation, Job Orchestration = lifecycle authority.</p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <Link href="#overview" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Overview</Link>
            <Link href="#request-handling-structure-diagram" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Request Handling Structure Diagram</Link>
            <Link href="#request-handling-details" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Request Handling Details</Link>
            <Link href="#related-docs" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Related Docs</Link>
          </div>
        </SectionBlock>

        <SectionBlock id="request-handling-structure-diagram" title="Request Handling Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="mx-auto max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">Request Handling</div>
            <div className="mx-auto h-4 w-px bg-cyan-400/40" />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Validation</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>Contract checks</li><li>Field verification</li></ul></div>
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Output</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>Validated context</li><li>Orchestration handoff</li></ul></div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="request-handling-details" title="Request Handling Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc pl-5 text-sm text-[var(--muted)]">
            <li>Request Handling = validation authority.</li>
            <li>Job Orchestration = lifecycle authority.</li>
            <li>Architecture page = subsystem placement authority.</li>
          </ul>
          <Link href="/docs/api/architecture#request-handling" className="mt-2 inline-block text-sm font-medium text-[var(--accent)] hover:underline">Related section</Link>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
