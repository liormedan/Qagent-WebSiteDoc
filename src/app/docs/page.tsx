import Link from "next/link";
import Image from "next/image";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "Start with System Map", href: "/docs/system" },
  { label: "Understand the UI (Client)", href: "/docs/client" },
  { label: "Understand the Brain (QAgent)", href: "/docs/q-agent" },
  { label: "Understand Execution (API Server)", href: "/docs/api" },
  { label: "Open Media Kit (Video + Slides)", href: "/docs/presentation-kit" },
];

const readingPathSystemChapters = [
  {
    title: "Client / Frontend Layer",
    href: "/docs/system/client-frontend-layer",
    description: "System placement of the Client layer: responsibilities, diagram, and pointers to canonical Client documentation.",
  },
  {
    title: "QAgent Layer",
    href: "/docs/system/qagent-layer",
    description: "System placement of QAgent: planning boundary, handoffs to API, and links to the QAgent documentation tree.",
  },
  {
    title: "API Server Layer",
    href: "/docs/system/api-server-layer",
    description: "System placement of the API: orchestration role, tiers at a glance, and links to /docs/api deep specs.",
  },
  {
    title: "DSP / Processing Layer",
    href: "/docs/system/dsp-processing-layer",
    description: "System placement of DSP: processing versus orchestration, and links to DSP layer contracts and core specs.",
  },
  {
    title: "Data Layer",
    href: "/docs/system/data-layer",
    description: "System IA stub for persistence: where the Data Layer sits on the map and links to /docs/data-layer chapters.",
  },
  {
    title: "Infrastructure Layer",
    href: "/docs/system/infrastructure-layer",
    description: "Hosting, scaling, deployment, and platform support that stabilizes services across Client, QAgent, and API.",
  },
  {
    title: "Auth & Security Layer",
    href: "/docs/system/auth-security-layer",
    description: "Identity, authorization, and isolation boundaries applied before protected operations continue across flows.",
  },
  {
    title: "End-to-End Flow (Cross-Layer)",
    href: "/docs/system/end-to-end-flow",
    description: "Cross-layer journey from user interaction through planning, API execution, and versioning as one system path.",
  },
] as const;

const cardClassName = cn(
  "group block h-full rounded-lg border border-[var(--border)] bg-slate-950/40 p-4 text-left shadow-sm transition-colors",
  "cursor-pointer hover:border-cyan-400/55 hover:bg-slate-900/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60",
);

export default function DocsIndexPage() {
  return (
    <DocsContent>
      <PageTitle
        title="WaveQ"
        description="WaveQ is an AI-powered audio workflow system that connects user intent to audio execution."
      />

      <div className="flex flex-col gap-5">
        <SectionBlock title="חומרי הסבר: וידאו ומצגות" body={[]}>
          <div className="space-y-4">
            <Image
              src="/media/waveq-architecture-hero.png"
              alt="מפת הארכיטקטורה של WaveQ"
              width={1400}
              height={920}
              className="h-auto w-full rounded-lg border border-[var(--border)] bg-slate-950/30"
              priority
            />

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-[var(--border)] bg-slate-950/30 p-3">
                <p className="mb-2 text-sm font-semibold text-slate-100">וידאו: המסע של פקודת אודיו</p>
                <video
                  controls
                  preload="metadata"
                  className="w-full rounded-md border border-[var(--border)]/70 bg-black"
                  src="/media/waveq-command-journey.mp4"
                />
              </div>

              <div className="rounded-lg border border-[var(--border)] bg-slate-950/30 p-3">
                <p className="mb-2 text-sm font-semibold text-slate-100">אודיו: ארכיטקטורת WaveQ</p>
                <audio controls preload="metadata" className="w-full" src="/media/waveq-architecture-audio.m4a" />
                <a
                  href="/media/waveq-architecture-audio.m4a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-cyan-200 hover:underline"
                >
                  פתח אודיו בחלון נפרד
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-slate-950/30 p-3">
              <p className="mb-2 text-sm font-semibold text-slate-100">מצגת PDF: WaveQ Architecture</p>
              <a
                href="/media/waveq-architecture.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-200 hover:underline"
              >
                פתח את המצגת (PDF)
              </a>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="Quick Actions" body={[]}>
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

        <SectionBlock title="Recommended Reading Path" body={[]}>
          <p className="text-sm text-[var(--muted)]">
            Same routes as the System sidebar: each card opens a System placement chapter (map context, diagram, and links into
            the canonical docs for that layer). For a direct jump to the full system overview, use{" "}
            <span className="text-slate-300">Quick Actions → Start with System Map</span> above.
          </p>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">System map chapters</p>
          <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {readingPathSystemChapters.map((item) => (
              <Link key={`system-${item.href}`} href={item.href} className={cardClassName}>
                <span className="block text-sm font-semibold text-slate-100 transition-colors group-hover:text-cyan-100">{item.title}</span>
                <span className="mt-2 block text-xs leading-relaxed text-[var(--muted)]">{item.description}</span>
              </Link>
            ))}
          </div>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
