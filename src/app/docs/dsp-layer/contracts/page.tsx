import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { ContractDetailsAccordion } from "@/components/ui/ContractDetailsAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const normalizeListItem = (value: string) => value.replace(/^(?:[-*\u2022]\s*)+/, "").trim();

const sharedContractHref = "/docs/dsp-layer/core#4-dsp-contract-critical";
const meteringHref = "/docs/dsp-layer/core#11-metering-awareness";
const compatibilityHref = "/docs/dsp-layer/core#12-future-compatibility";

const contractDetails = [
  {
    id: "execution-contract",
    title: "Execution Contract",
    subtitle: "Input definition",
    purpose: "Define request boundary into DSP execution.",
    defines: ["How processing requests are passed into DSP.", "Request shape expectations for execution handoff."],
    doesNotDefine: "processing behavior semantics.",
    href: sharedContractHref,
  },
  {
    id: "result-contract",
    title: "Result Contract",
    subtitle: "Output definition",
    purpose: "Define success output shape.",
    defines: ["How successful outputs are represented.", "How generated artifacts are returned."],
    doesNotDefine: "execution scheduling behavior.",
    href: sharedContractHref,
  },
  {
    id: "error-contract",
    title: "Error Contract",
    subtitle: "Failure definition",
    purpose: "Define failure representation.",
    defines: ["How processing failures are represented.", "How failure outcomes are returned."],
    doesNotDefine: "retry policy ownership.",
    href: sharedContractHref,
  },
  {
    id: "metadata-contract",
    title: "Metadata Contract",
    subtitle: "Processing metadata",
    purpose: "Define returned metadata envelope.",
    defines: ["Additional processing information returned with results.", "Execution metadata shape expectations."],
    doesNotDefine: "downstream storage schema details.",
    href: sharedContractHref,
  },
  {
    id: "metering-awareness",
    title: "Metering Awareness",
    subtitle: "Usage tracking signals",
    purpose: "Define usage tracking signals exposed by DSP.",
    defines: ["Which execution data is exposed for usage tracking.", "How metering-related signals are returned."],
    doesNotDefine: "billing enforcement logic.",
    href: meteringHref,
  },
  {
    id: "future-compatibility",
    title: "Future Compatibility",
    subtitle: "Stability across backends",
    purpose: "Define compatibility expectations for contract stability.",
    defines: ["Contract stability across backend targets.", "Compatibility expectations for future implementations."],
    doesNotDefine: "backend-specific implementation details.",
    href: compatibilityHref,
  },
] as const;

export default function DspContractsPage() {
  const contractSurfaces = [
    "Execution Contract",
    "Result Contract",
    "Error Contract",
    "Metadata Contract",
    "Metering Awareness",
    "Future Compatibility",
  ];
  const relatedBoundaries = [
    "Contracts = communication agreement.",
    "Core Specification = behavioral definition.",
    "Processing Engine = implementation model.",
    "System Integration = cross-system flow.",
  ];
  const sharedContractSurface = ["Execution Contract", "Result Contract", "Error Contract", "Metadata Contract"];
  const specializedConcerns = ["Metering Awareness", "Future Compatibility"];
  const relatedDocs = [
    "Contracts = interface and payload agreement.",
    "Core Specification = behavior and execution semantics.",
    "Processing Engine = internal execution architecture.",
    "System Integration = end-to-end flow across subsystems.",
  ];

  return (
    <DocsContent>
      <PageTitle
        title="DSP - Contracts"
        description="Defines the communication contract between the execution system and the DSP layer: request shape, result shape, error shape, metadata, metering signals, and compatibility rules."
      />

      <section className="mt-4 space-y-2 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
            <p className="mt-1 text-sm">input/output contracts, error representation, metadata, metering signals, compatibility rules.</p>
          </div>
          <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
            <p className="mt-1 text-sm">DSP behavior, processing logic, engine internals, full system orchestration.</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <p className="text-sm text-[var(--muted)]">
            The DSP contract surface is divided into six areas, each defining a different part of the execution boundary.
          </p>

          <div className="mt-3">
            <p className="text-sm font-semibold text-slate-100">Contract surfaces</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {contractSurfaces.map((item) => (
                <li key={`surface-${item}`}>{normalizeListItem(item)}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            <span className="font-semibold">Out of Scope:</span> DSP behavior, engine internals, and full orchestration flow.
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
              <p className="text-xs text-slate-400">Contract scope and boundaries.</p>
            </Link>
            <Link href="#contract-structure-diagram" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60">
              <p className="font-semibold text-slate-100 group-hover:text-cyan-200">Contract Structure Diagram</p>
              <p className="text-xs text-slate-400">Shared and specialized surfaces.</p>
            </Link>
            <Link href="#contract-details" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60">
              <p className="font-semibold text-slate-100 group-hover:text-cyan-200">Contract Details</p>
              <p className="text-xs text-slate-400">Purpose, defines, boundaries, deep spec.</p>
            </Link>
            <Link href="#related-docs" className="group rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 transition-colors hover:border-cyan-400/60">
              <p className="font-semibold text-slate-100 group-hover:text-cyan-200">Related Docs</p>
              <p className="text-xs text-slate-400">Cross-page ownership boundaries.</p>
            </Link>
          </div>
        </SectionBlock>

        <SectionBlock id="contract-structure-diagram" title="Contract Structure Diagram" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
            <div className="mx-auto w-full max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">
              DSP Contracts
            </div>
            <div className="mx-auto h-4 w-px bg-cyan-400/40" />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Shared Contract Surface</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                  {sharedContractSurface.map((item) => (
                    <li key={`shared-${item}`}>{normalizeListItem(item)}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Specialized Contract Concerns</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                  {specializedConcerns.map((item) => (
                    <li key={`concern-${item}`}>{normalizeListItem(item)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="contract-details" title="Contract Details" body={[]}>
          <ContractDetailsAccordion items={[...contractDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {relatedDocs.map((item) => (
              <li key={`doc-${item}`}>{normalizeListItem(item)}</li>
            ))}
          </ul>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
