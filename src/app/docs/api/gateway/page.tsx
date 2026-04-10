import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const details = [
  {
    id: "entry-boundary",
    title: "Entry Boundary",
    subtitle: "Execution request intake",
    purpose: "Define API Gateway as the request entry boundary for execution handoff.",
    defines: ["`/run` request intake", "admission into API pipeline", "handoff to Request Handling"],
    doesNotDefine: "validation policy internals or job lifecycle ownership.",
    href: "/docs/api/request-handling",
    linkLabel: "Related section",
  },
  {
    id: "contract-handoff",
    title: "Contract Handoff",
    subtitle: "Gateway output contract",
    purpose: "Define what the gateway forwards after acceptance.",
    defines: ["approved execution request forwarding", "gateway-to-validation transition", "entry status projection"],
    doesNotDefine: "execution scheduling decisions.",
    href: "/docs/api/architecture#api-gateway-layer",
    linkLabel: "Related section",
  },
] as const;

export default function ApiGatewayPage() {
  return (
    <DocsContent>
      <PageTitle title="API Gateway" description="Gateway entry for execution requests and admission into API Server processing." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
            <p className="mt-1 text-sm">gateway intake boundary, admission handoff, and transition into request validation.</p>
          </div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
            <p className="mt-1 text-sm">policy decisions, job orchestration lifecycle, and execution runtime behavior.</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">API Gateway receives execution requests and forwards accepted payloads into API processing flow.</p>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            <span className="font-semibold">Out of Scope:</span> decision logic and runtime execution ownership.
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">Related boundaries: Gateway = entry boundary, Request Handling = validation boundary.</p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <Link href="#overview" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Overview</Link>
            <Link href="#gateway-structure-diagram" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Gateway Structure Diagram</Link>
            <Link href="#gateway-details" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Gateway Details</Link>
            <Link href="#related-docs" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Related Docs</Link>
          </div>
        </SectionBlock>

        <SectionBlock id="gateway-structure-diagram" title="Gateway Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="mx-auto max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">API Gateway</div>
            <div className="mx-auto h-4 w-px bg-cyan-400/40" />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Input</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>Approved request from QAgent</li></ul></div>
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Output</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>Forwarded request to Request Handling</li></ul></div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="gateway-details" title="Gateway Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc pl-5 text-sm text-[var(--muted)]">
            <li>Gateway = API entry authority.</li>
            <li>Request Handling = validation authority.</li>
            <li>Architecture page = placement authority.</li>
          </ul>
          <Link href="/docs/api/architecture#api-gateway-layer" className="mt-2 inline-block text-sm font-medium text-[var(--accent)] hover:underline">Related section</Link>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
