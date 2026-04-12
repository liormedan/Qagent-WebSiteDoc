import { ExternalLink } from "lucide-react";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const coreResources = [
  {
    title: "Live documentation",
    description: "Deployed WaveQ docs site (/docs entry).",
    href: "https://qagent-web-site-doc.vercel.app/docs",
  },
  {
    title: "Documentation repository",
    description: "GitHub source for this Next.js documentation project (Qagent-WebSiteDoc).",
    href: "https://github.com/liormedan/Qagent-WebSiteDoc",
  },
  {
    title: "WaveQ app (workspace chat)",
    description: "Hosted client: workspace chat surface on Vercel.",
    href: "https://wave-q-frontend-vercel.vercel.app/workspace/chat",
  },
  {
    title: "Frontend repository",
    description: "GitHub source for the WaveQ frontend (main branch).",
    href: "https://github.com/liormedan/WaveQ-Frontend-Vercel/tree/main",
  },
] as const;

export default function DevelopmentPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Development"
        description="Access source code, deployments, and development resources."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">WaveQ / Engineering</p>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="core-resources" title="Core Resources" body={[]} summaryPreview="Deployed docs, live app, and GitHub sources.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {coreResources.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-lg border border-[var(--border)]/80 bg-slate-950/30 p-3 shadow-sm transition-colors hover:border-cyan-400/45 hover:bg-slate-900/40"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-slate-100">{r.title}</span>
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-slate-500 group-hover:text-cyan-300/90" aria-hidden />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{r.description}</span>
                <span className="mt-3 break-all font-mono text-[11px] text-cyan-200/80 group-hover:underline">{r.href}</span>
              </a>
            ))}
          </div>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
