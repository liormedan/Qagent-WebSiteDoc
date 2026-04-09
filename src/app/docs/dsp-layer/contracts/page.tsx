import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const contractSections = [
  { label: "DSP Contract", href: "/docs/dsp-layer/core#4-dsp-contract-critical" },
  { label: "Metering Awareness", href: "/docs/dsp-layer/core#11-metering-awareness" },
  { label: "Future Compatibility", href: "/docs/dsp-layer/core#12-future-compatibility" },
];

export default function DspContractsPage() {
  return (
    <DocsContent>
      <PageTitle title="DSP - Contracts" description="Contract surfaces and compatibility declarations for DSP execution." />
      <SectionBlock title="Contract Sections" body={["Open a contract section in the deep spec page."]}>
        <div className="space-y-2">
          {contractSections.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200">
              {item.label}
            </Link>
          ))}
        </div>
      </SectionBlock>
    </DocsContent>
  );
}

