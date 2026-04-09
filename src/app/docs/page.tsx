import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const quickActions = [
  { label: "Start with System Map", href: "/docs/system" },
  { label: "Understand the UI (Client)", href: "/docs/client" },
  { label: "Understand the Brain (QAgent)", href: "/docs/q-agent" },
  { label: "Understand Execution (API Server)", href: "/docs/api" },
];

const readingPath = [
  { step: "System", href: "/docs/system", description: "Understand structure." },
  { step: "Client", href: "/docs/client", description: "Understand UI layer." },
  { step: "QAgent", href: "/docs/q-agent", description: "Understand logic layer." },
  { step: "API", href: "/docs/api", description: "Understand execution layer." },
];

export default function DocsIndexPage() {
  return (
    <DocsContent>
      <PageTitle
        title="WaveQ"
        description="WaveQ is an AI-powered audio workflow system that connects user intent to audio execution."
      />
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>

      <div className="flex flex-col gap-5">
        <SectionBlock title="Quick Actions" body={[]} collapsible>
          <div className="grid gap-3 md:grid-cols-2">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-md border border-[var(--border)] bg-slate-950/30 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-400/60 hover:text-cyan-200"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="Recommended Reading Path" body={[]} collapsible>
          <ol className="space-y-3 text-sm text-[var(--muted)]">
            {readingPath.map((item, index) => (
              <li key={item.href} className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">
                <span className="font-semibold text-slate-100">{index + 1}. </span>
                <Link href={item.href} className="font-semibold text-[var(--accent)] hover:underline">
                  {item.step}
                </Link>
                <span>: {item.description}</span>
              </li>
            ))}
          </ol>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
