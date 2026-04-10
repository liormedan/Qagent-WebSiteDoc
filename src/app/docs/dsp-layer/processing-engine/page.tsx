import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { EngineDetailsAccordion } from "@/components/ui/EngineDetailsAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const normalizeListItem = (value: string) => value.replace(/^(?:[-*\u2022]\s*)+/, "").trim();

const engineDetails = [
  {
    id: "processor-model",
    title: "Processor Model",
    subtitle: "Execution unit definition",
    purpose: "Defines what a processor is within the DSP engine.",
    defines: ["processor as execution unit", "stateless transformation", "input -> output logic"],
    doesNotDefine: "behavior guarantees and API contracts.",
    href: "/docs/dsp-layer/core#5-processor-model",
  },
  {
    id: "processor-types",
    title: "Processor Types",
    subtitle: "Supported operation categories",
    purpose: "Defines categories of supported processing operations.",
    defines: ["normalize", "gain", "eq presets"],
    doesNotDefine: "DSP math implementation.",
    href: "/docs/dsp-layer/core#6-processor-types-mvp-only",
  },
  {
    id: "execution-flow",
    title: "Execution Flow",
    subtitle: "Task path inside the engine",
    purpose: "Defines how a processing task moves through the engine.",
    defines: ["input loading", "processor execution", "output generation"],
    doesNotDefine: "cross-system flow.",
    href: "/docs/dsp-layer/core#8-execution-flow-system-integration",
  },
  {
    id: "execution-coordination",
    title: "Execution Coordination",
    subtitle: "Internal trigger and control",
    purpose: "Defines how execution is triggered and managed internally.",
    defines: ["operation selection", "parameter passing"],
    doesNotDefine: "job lifecycle.",
    href: "/docs/dsp-layer/core#7-dsp-engine-abstraction-layer",
  },
  {
    id: "internal-routing",
    title: "Internal Routing",
    subtitle: "Operation to processor mapping",
    purpose: "Defines how operations map to processors.",
    defines: ["registry lookup", "operation mapping"],
    doesNotDefine: "API routing.",
    href: "/docs/dsp-layer/core#7-dsp-engine-abstraction-layer",
  },
  {
    id: "engine-lifecycle",
    title: "Engine Lifecycle",
    subtitle: "Run lifecycle inside engine",
    purpose: "Defines execution lifecycle within the engine.",
    defines: ["init", "prepare", "execute", "complete", "fail", "cleanup"],
    doesNotDefine: "job persistence.",
    href: "/docs/dsp-layer/core#3-execution-model",
  },
  {
    id: "state-handling",
    title: "State Handling",
    subtitle: "Execution state model",
    purpose: "Defines state rules of execution.",
    defines: ["stateless execution", "isolated runs"],
    doesNotDefine: "system state.",
    href: "/docs/dsp-layer/core#9-state-behavior",
  },
] as const;

export default function DspProcessingEnginePage() {
  const engineAreas = ["execution structure", "processor organization", "execution coordination", "routing"];
  const relatedBoundaries = [
    "Processing Engine = internal execution architecture",
    "Core Specification = behavior and guarantees",
    "Contracts = interface and payload agreement",
    "System Integration = subsystem coordination flow",
  ];
  const relatedDocs = [...relatedBoundaries];
  const lifecycleStates = [
    {
      state: "init",
      purpose: "Initialize engine context for one processing run.",
      represents: "entry into internal engine execution path.",
      not: "job admission, queue acceptance, or orchestration decisions.",
    },
    {
      state: "prepare",
      purpose: "Prepare processor inputs and resolved operation parameters.",
      represents: "internal readiness before transformation executes.",
      not: "contract validation ownership or policy gating.",
    },
    {
      state: "execute",
      purpose: "Run deterministic transformation for the requested operation.",
      represents: "active processing against explicit input contract.",
      not: "cross-system coordination or lifecycle authority.",
    },
    {
      state: "complete",
      purpose: "Finalize successful run and produce output payload.",
      represents: "successful internal engine completion for one task.",
      not: "result persistence ownership or external status authority.",
    },
    {
      state: "fail",
      purpose: "Represent internal execution failure outcome.",
      represents: "error outcome emitted via DSP error/result contract surface.",
      not: "retry policy, escalation policy, or orchestration ownership.",
    },
    {
      state: "cleanup",
      purpose: "Release transient execution-local resources after run ends.",
      represents: "end-of-run internal cleanup boundary.",
      not: "global state cleanup or persisted lifecycle management.",
    },
  ];

  return (
    <DocsContent>
      <PageTitle
        title="DSP - Processing Engine"
        description="Defines the internal execution architecture of the DSP layer, including processor organization, execution flow, and execution routing within the engine."
      />

      <section className="mt-4 space-y-2 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
            <p className="mt-1 text-sm">engine internal structure, processor organization, execution flow within DSP, routing and execution coordination.</p>
          </div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
            <p className="mt-1 text-sm">behavioral guarantees, DSP contracts, API-level request/response, cross-system orchestration.</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">
            The DSP processing engine defines how audio transformations are executed internally.
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            It is composed of execution structure and processor organization, which together determine how processing operations are selected, executed, and completed.
          </p>

          <div className="mt-3">
            <p className="text-sm font-semibold text-slate-100">Engine Areas</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {engineAreas.map((item) => (
                <li key={`engine-area-${item}`}>{normalizeListItem(item)}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            <span className="font-semibold">Out of Scope:</span> This section does not define DSP behavior rules or interface contracts.
          </div>

          <div className="mt-3">
            <p className="text-sm font-semibold text-slate-100">Related boundaries</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {relatedBoundaries.map((item) => (
                <li key={`boundary-${item}`}>{normalizeListItem(item)}</li>
              ))}
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <Link href="#overview" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60">
              <p className="font-semibold text-slate-100 group-hover:text-cyan-200">Overview</p>
              <p className="text-xs text-slate-400">Scope, areas, and boundaries.</p>
            </Link>
            <Link href="#processing-engine-structure-diagram" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60">
              <p className="font-semibold text-slate-100 group-hover:text-cyan-200">Processing Engine Structure Diagram</p>
              <p className="text-xs text-slate-400">Execution structure and processor organization.</p>
            </Link>
            <Link href="#engine-details" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60">
              <p className="font-semibold text-slate-100 group-hover:text-cyan-200">Engine Details</p>
              <p className="text-xs text-slate-400">Processor model, routing, flow, and state.</p>
            </Link>
            <Link href="#engine-lifecycle-semantics" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60">
              <p className="font-semibold text-slate-100 group-hover:text-cyan-200">Engine Lifecycle Semantics</p>
              <p className="text-xs text-slate-400">init, prepare, execute, complete, fail, cleanup.</p>
            </Link>
            <Link href="#related-docs" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60">
              <p className="font-semibold text-slate-100 group-hover:text-cyan-200">Related Docs</p>
              <p className="text-xs text-slate-400">Cross-DSP documentation boundaries.</p>
            </Link>
          </div>
        </SectionBlock>

        <SectionBlock id="processing-engine-structure-diagram" title="Processing Engine Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="mx-auto w-full max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">
              DSP Processing Engine
            </div>
            <div className="mx-auto h-4 w-px bg-cyan-400/40" />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Execution Structure</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                  <li>Execution Flow</li>
                  <li>Engine Loop</li>
                  <li>Coordination</li>
                </ul>
              </div>
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Processor Organization</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                  <li>Processor Model</li>
                  <li>Processor Types</li>
                  <li>Registry / Routing</li>
                </ul>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="engine-details" title="Engine Details" body={[]}>
          <EngineDetailsAccordion items={[...engineDetails]} />
        </SectionBlock>

        <SectionBlock id="engine-lifecycle-semantics" title="Engine Lifecycle Semantics" body={[]}>
          <div className="space-y-2">
            {lifecycleStates.map((item) => (
              <div key={item.state} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-100">{item.state}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  <span className="font-semibold text-slate-100">Purpose:</span> {item.purpose}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  <span className="font-semibold text-slate-100">Represents:</span> {item.represents}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  <span className="font-semibold text-slate-100">Does not represent:</span> {item.not}
                </p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {relatedDocs.map((item) => (
              <li key={`doc-${item}`}>{normalizeListItem(item)}</li>
            ))}
          </ul>
          <div className="mt-3 rounded-md border border-[var(--border)] bg-slate-950/30 p-3 text-sm text-[var(--muted)]">
            <p>
              <span className="font-semibold text-slate-100">DSP Engine (Overview):</span> contextual summary in{" "}
              <Link href="/docs/dsp-layer#internal-structure" className="font-medium text-[var(--accent)] hover:underline">
                /docs/dsp-layer
              </Link>
              .
            </p>
            <p className="mt-1">
              <span className="font-semibold text-slate-100">DSP Engine (Deep Spec):</span> implementation-depth reference in{" "}
              <Link href="/docs/architecture/dagent/dsp-engine-abstraction" className="font-medium text-[var(--accent)] hover:underline">
                /docs/architecture/dagent/dsp-engine-abstraction
              </Link>
              .
            </p>
          </div>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
