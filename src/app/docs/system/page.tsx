import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const systemTree = `WaveQ
|- 1. Client / Frontend Layer
|- 2. QAgent Layer
|- 3. API Server Layer
|- 4. DSP / Processing Layer
|- 5. Data Layer
|- 6. Infrastructure Layer
|- 7. Auth & Security Layer
|- 8. End-to-End Flow`;

const sections: Array<{ title: string; href: string }> = [
  { title: "1. Client / Frontend Layer", href: "/docs/system/client-frontend-layer" },
  { title: "2. QAgent Layer", href: "/docs/system/qagent-layer" },
  { title: "3. API Server Layer", href: "/docs/system/api-server-layer" },
  { title: "4. DSP / Processing Layer", href: "/docs/system/dsp-processing-layer" },
  { title: "5. Data Layer", href: "/docs/system/data-layer" },
  { title: "6. Infrastructure Layer", href: "/docs/system/infrastructure-layer" },
  { title: "7. Auth & Security Layer", href: "/docs/system/auth-security-layer" },
  { title: "8. End-to-End Flow", href: "/docs/system/end-to-end-flow" },
];

export default function SystemPage() {
  return (
    <DocsContent>
      <PageTitle title="WaveQ System Structure" description="This page presents the full architecture of WaveQ as a unified system." />

      <div className="flex flex-col gap-5">
        <SectionBlock title="System Tree" body={[]} collapsible>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{systemTree}</pre>
        </SectionBlock>

        {sections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={["This layer page is currently empty and ready for content."]} collapsible>
            <Link href={section.href} className="inline-block text-sm font-medium text-[var(--accent)] hover:underline">
              Open Empty Layer Page
            </Link>
          </SectionBlock>
        ))}
      </div>
    </DocsContent>
  );
}
