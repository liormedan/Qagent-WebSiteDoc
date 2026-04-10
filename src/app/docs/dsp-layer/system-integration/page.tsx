import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const details = [
  {
    id: "execution-flow-integration",
    title: "Execution Flow Integration",
    subtitle: "Cross-layer DSP handoff",
    purpose: "Defines how DSP execution is integrated into the cross-layer runtime path.",
    defines: ["QAgent to API handoff context", "API to DSP processing transition", "DSP output return toward Data layer"],
    doesNotDefine: "DSP processor internals.",
    href: "/docs/dsp-layer/core#8-execution-flow-system-integration",
    linkLabel: "Deep spec",
  },
  {
    id: "source-of-truth",
    title: "Source of Truth",
    subtitle: "Canonical governance",
    purpose: "Defines canonical documentation authority boundaries for DSP integration semantics.",
    defines: ["canonical layer page authority", "child-page non-redefinition rule"],
    doesNotDefine: "new architectural ownership semantics.",
    href: "/docs/dsp-layer/core#source-of-truth",
    linkLabel: "Deep spec",
  },
] as const;

export default function DspSystemIntegrationPage() {
  return (
    <DocsContent>
      <PageTitle title="DSP - System Integration" description="Subsystem handoff and integration boundaries for DSP within the WaveQ execution flow." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
            <p className="mt-1 text-sm">cross-layer DSP handoff points, execution transition boundaries, and integration governance references.</p>
          </div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
            <p className="mt-1 text-sm">processor implementation details, DSP behavior guarantees, and API policy decisions.</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">System Integration defines where DSP starts and ends inside the end-to-end execution path.</p>
          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            <span className="font-semibold">Out of Scope:</span> DSP internal execution model and contract payload internals.
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">Related boundaries: Integration = cross-layer transition, Core/Contracts/Engine pages = internal DSP authority.</p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <Link href="#overview" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Overview</Link>
            <Link href="#integration-structure-diagram" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Integration Structure Diagram</Link>
            <Link href="#integration-details" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Integration Details</Link>
            <Link href="#related-docs" className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">Related Docs</Link>
          </div>
        </SectionBlock>

        <SectionBlock id="integration-structure-diagram" title="Integration Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="mx-auto max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">DSP System Integration</div>
            <div className="mx-auto h-4 w-px bg-cyan-400/40" />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Inbound</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>QAgent handoff via API</li><li>Execution contract intake</li></ul></div>
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Outbound</p><ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]"><li>Output artifacts</li><li>Metadata to Data/Status flow</li></ul></div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="integration-details" title="Integration Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc pl-5 text-sm text-[var(--muted)]">
            <li>System Integration = cross-layer transition authority.</li>
            <li>DSP Core = behavior and execution guarantees.</li>
            <li>DSP Contracts = payload boundary authority.</li>
            <li>Processing Engine = internal execution architecture.</li>
          </ul>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
