import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const coreCards = [
  {
    title: "1. Layer Definition",
    summary: "Defines DSP role, boundaries, and cross-layer relations.",
    href: "/docs/dsp-layer/core#1-layer-definition",
  },
  {
    title: "2. Responsibilities",
    summary: "Execution, transformation, and artifact generation ownership.",
    href: "/docs/dsp-layer/core#2-responsibilities-refined",
  },
  {
    title: "3. Execution Model",
    summary: "Single-operation MVP model with future pipeline compatibility.",
    href: "/docs/dsp-layer/core#3-execution-model",
  },
  {
    title: "4. State & Behavior",
    summary: "Stateless and deterministic execution model definitions.",
    href: "/docs/dsp-layer/core#9-state-behavior",
  },
  {
    title: "5. Constraints",
    summary: "Explicit non-ownership boundaries for DSP scope.",
    href: "/docs/dsp-layer/core#10-constraints",
  },
];

const internalStructure = [
  {
    label: "DSP Engine",
    summary: "Execution abstraction that routes operations and coordinates processor calls.",
    href: "/docs/dsp-layer/core#7-dsp-engine-abstraction-layer",
  },
  {
    label: "Processor Registry",
    summary: "Operation-to-processor mapping surface used by execution routing.",
    href: "/docs/dsp-layer/core#7-dsp-engine-abstraction-layer",
  },
  {
    label: "Processors",
    summary: "Transformation units that apply deterministic audio operations.",
    href: "/docs/dsp-layer/core#6-processor-types-mvp-only",
  },
  {
    label: "IO Layer",
    summary: "Input/output contract boundary for DSP task payloads and results.",
    href: "/docs/dsp-layer/core#4-dsp-contract-critical",
  },
  {
    label: "Artifact Layer",
    summary: "Output artifact emission boundary for downstream data and lineage flows.",
    href: "/docs/dsp-layer/core#8-execution-flow-system-integration",
  },
];

const contractsLinks = [
  {
    label: "DSP Contract",
    summary: "Canonical input, output, and error payload definitions.",
    href: "/docs/dsp-layer/core#4-dsp-contract-critical",
  },
  {
    label: "Metering Awareness",
    summary: "Processing metadata exposure for API-layer metering.",
    href: "/docs/dsp-layer/core#11-metering-awareness",
  },
  {
    label: "Future Compatibility",
    summary: "Stable interface guarantee across future backend targets.",
    href: "/docs/dsp-layer/core#12-future-compatibility",
  },
];

const integrationLinks = [
  {
    label: "Execution Flow",
    summary: "Cross-layer handoff path from API into DSP and onward to data outputs.",
    href: "/docs/dsp-layer/core#8-execution-flow-system-integration",
  },
  {
    label: "Source of Truth",
    summary: "Canonical ownership and documentation authority for DSP scope.",
    href: "/docs/dsp-layer/core#source-of-truth",
  },
];

const pageStructureLinks = [
  { label: "Core Specification", href: "#core-specification" },
  { label: "Internal Structure", href: "#internal-structure" },
  { label: "Contracts", href: "#contracts" },
  { label: "System Integration", href: "#system-integration" },
  { label: "Execution Flow (Mini)", href: "#execution-flow-mini" },
  { label: "Boundaries", href: "#boundaries" },
];

export default function DspLayerOverviewPage() {
  return (
    <DocsContent>
      <PageTitle title="DSP / Processing Layer" description="Execution layer for deterministic audio transformations." />

      <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <p>
          DSP Layer is the processing execution boundary in WaveQ.
          It executes deterministic transformations and emits output artifacts and metadata for downstream storage and reporting.
        </p>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="layer-summary" title="Layer Summary" body={[]}>
          <p className="text-sm text-[var(--muted)]">
            Canonical entry for DSP scope, contracts, execution behavior, and system integration links.
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {pageStructureLinks.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200">
                {item.label}
              </Link>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="core-specification" title="Core Specification" body={[]} collapsible>
          <p className="text-sm text-[var(--muted)]">Open any core section directly.</p>
          <div className="grid gap-3 md:grid-cols-2">
            {coreCards.map((card) => (
              <Link key={`${card.title}-${card.href}`} href={card.href} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3 transition-colors hover:border-cyan-400/60">
                <p className="font-semibold text-slate-100">{card.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{card.summary}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
                  Open section <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="internal-structure" title="Internal Structure" body={[]} collapsible>
          <div className="space-y-2">
            {internalStructure.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200">
                <p className="font-semibold text-slate-100">{item.label}</p>
                <p className="mt-1 text-xs font-normal text-[var(--muted)]">{item.summary}</p>
              </Link>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="contracts" title="Contracts" body={[]} collapsible>
          <div className="space-y-2">
            {contractsLinks.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200">
                <p className="font-semibold text-slate-100">{item.label}</p>
                <p className="mt-1 text-xs font-normal text-[var(--muted)]">{item.summary}</p>
              </Link>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="system-integration" title="System Integration" body={[]} collapsible>
          <div className="space-y-2">
            {integrationLinks.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200">
                <p className="font-semibold text-slate-100">{item.label}</p>
                <p className="mt-1 text-xs font-normal text-[var(--muted)]">{item.summary}</p>
              </Link>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="execution-flow-mini" title="Execution Flow (Mini)" body={[]} collapsible>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {["QAgent", "API", "DSP", "Output"].map((step, index, arr) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 font-semibold text-cyan-100">{step}</span>
                {index < arr.length - 1 ? <ArrowRight className="h-4 w-4 text-cyan-300/80" /> : null}
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          id="boundaries"
          title="Boundaries"
          body={[
            "- no UI awareness",
            "- no billing enforcement",
            "- no orchestration logic",
            "- stateless execution only",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
