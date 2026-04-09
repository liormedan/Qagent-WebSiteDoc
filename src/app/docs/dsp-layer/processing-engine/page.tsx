import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const processingSections = [
  { label: "Processor Model", href: "/docs/dsp-layer/core#5-processor-model" },
  { label: "Processor Types (MVP)", href: "/docs/dsp-layer/core#6-processor-types-mvp-only" },
  { label: "DSP Engine (Overview)", href: "/docs/dsp-layer/core#7-dsp-engine-abstraction-layer" },
  { label: "DSP Engine (Deep Spec)", href: "/docs/architecture/dagent/dsp-engine-abstraction" },
];

export default function DspProcessingEnginePage() {
  return (
    <DocsContent>
      <PageTitle title="DSP - Processing Engine" description="Engine structure, processor model, and deep-spec references." />
      <SectionBlock title="Processing Engine Sections" body={["Open engine-specific documentation links."]}>
        <div className="space-y-2">
          {processingSections.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200">
              {item.label}
            </Link>
          ))}
        </div>
      </SectionBlock>
    </DocsContent>
  );
}

