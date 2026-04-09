import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const integrationSections = [
  { label: "Execution Flow Integration", href: "/docs/dsp-layer/core#8-execution-flow-system-integration" },
  { label: "Source of Truth", href: "/docs/dsp-layer/core#source-of-truth" },
];

export default function DspSystemIntegrationPage() {
  return (
    <DocsContent>
      <PageTitle title="DSP - System Integration" description="System handoff and integration references for DSP." />
      <SectionBlock title="Integration Sections" body={["Open integration-related deep-spec sections."]}>
        <div className="space-y-2">
          {integrationSections.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200">
              {item.label}
            </Link>
          ))}
        </div>
      </SectionBlock>
    </DocsContent>
  );
}

