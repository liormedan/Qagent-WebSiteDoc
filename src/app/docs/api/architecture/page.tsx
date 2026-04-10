import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { API_SERVER_CANONICAL_NAME } from "@/lib/api-server-canonical";

const architectureDetails = [
  {
    id: "gateway-layer",
    title: "API Gateway Layer",
    subtitle: "Endpoint entry surface",
    purpose: "Define endpoint ownership and inbound request surface.",
    defines: ["`/run`, `/jobs`, `/files`, `/health` endpoints", "entry boundary", "handoff to Request Handling"],
    doesNotDefine: "policy decisions and runtime scheduling.",
    href: "/docs/api/gateway",
    linkLabel: "Related section",
  },
  {
    id: "request-handling",
    title: "Request Handling",
    subtitle: "Validation and routing",
    purpose: "Define validation and routing before orchestration.",
    defines: ["validation", "auth checks", "request routing"],
    doesNotDefine: "job lifecycle ownership.",
    href: "/docs/api/request-handling",
    linkLabel: "Related section",
  },
  {
    id: "job-orchestration",
    title: "Job Orchestration",
    subtitle: "Queue and lifecycle",
    purpose: "Define queue management and job lifecycle authority.",
    defines: ["queue manager", "job manager", "worker manager", "status tracker"],
    doesNotDefine: "execution action semantics.",
    href: "/docs/api/job-orchestration",
    linkLabel: "Related section",
  },
  {
    id: "execution-layer",
    title: "Execution Layer",
    subtitle: "Runtime action execution",
    purpose: "Define plan interpretation and action dispatch architecture.",
    defines: ["execution engine", "plan interpreter", "action dispatcher", "result collector"],
    doesNotDefine: "job status authority.",
    href: "/docs/api/execution",
    linkLabel: "Related section",
  },
] as const;

export default function ApiArchitecturePage() {
  return (
    <DocsContent>
      <PageTitle title={`${API_SERVER_CANONICAL_NAME} - Architecture`} description="Canonical architecture map for API Server subsystems and responsibilities." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
            <p className="mt-1 text-sm">API subsystem structure, module ownership, and responsibilities map.</p>
          </div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
            <p className="mt-1 text-sm">deep runtime implementation details and policy internals.</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">API Architecture organizes gateway, validation, orchestration, and execution modules under one runtime contract surface.</p>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100"><span className="font-semibold">Out of Scope:</span> subsystem internal algorithms.</div>
          <p className="mt-3 text-sm text-[var(--muted)]">Related boundaries: Architecture = module topology, subsystem pages = deep spec authority.</p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <Link href="#overview" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Overview</Link>
            <Link href="#architecture-structure-diagram" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Architecture Structure Diagram</Link>
            <Link href="#architecture-details" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Architecture Details</Link>
            <Link href="#related-docs" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Related Docs</Link>
          </div>
        </SectionBlock>

        <SectionBlock id="architecture-structure-diagram" title="Architecture Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="mx-auto max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">API Server Layer</div>
            <div className="mx-auto h-4 w-px bg-cyan-400/40" />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Entry & Validation</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>API Gateway</li><li>Request Handling</li></ul></div>
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Runtime & Output</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>Job Orchestration</li><li>Execution Layer</li></ul></div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="architecture-details" title="Architecture Details" body={[]}>
          <LayerSpecAccordion items={[...architectureDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc pl-5 text-sm text-[var(--muted)]"><li>Architecture page = module topology authority.</li><li>Gateway/Request/Orchestration/Execution pages = deep specification authority.</li></ul>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
