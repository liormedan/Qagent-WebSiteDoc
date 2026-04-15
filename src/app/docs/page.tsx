"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DocsContent } from "@/components/layout/DocsContent";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { PdfInlineViewer } from "@/components/ui/PdfInlineViewer";

type Lang = "he" | "en";

type ContentShape = {
  dir: "rtl" | "ltr";
  waveqDocsLabel: string;
  toggleLabel: string;
  toggleButton: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroThinkLine: string;
  heroDescription: string;
  goOverview: string;
  openSystemMap: string;
  systemExplanationTitle: string;
  systemExplanationBody: string;
  bullets: string[];
  architectureTitle: string;
  architectureBody: string;
  videoTitle: string;
  audioTitle: string;
  openAudio: string;
  pdfTitle: string;
  prevPage: string;
  nextPage: string;
  pageXofY: (x: number, y: number) => string;
};

const CONTENT: Record<Lang, ContentShape> = {
  he: {
    dir: "rtl",
    waveqDocsLabel: "WaveQ Docs",
    toggleLabel: "שפה",
    toggleButton: "English",
    heroTitleLine1: "ברוכים הבאים ל-WaveQ",
    heroTitleLine2: "עורך אודיו על ידי שיחה עם סוכן בינה מלאכותית",
    heroThinkLine: "חשבו Cursor/Codex לעולם האודיו",
    heroDescription:
      "זהו דף הכניסה למערכת. כאן תראו הסבר ממוקד על הארכיטקטורה, ולאחר מכן חומרי מדיה באקורדיונים: תמונת מערכת, סרטון הסבר, אודיו ומצגת PDF.",
    goOverview: "מעבר לעמוד ההסברים המלא",
    openSystemMap: "פתיחת מפת המערכת",
    systemExplanationTitle: "הסבר על המערכת",
    systemExplanationBody:
      "WaveQ היא מערכת מבוססת שפה טבעית: המשתמש מדבר או כותב, והמערכת מתרגמת את הבקשה לרצף פעולות אודיו מדויק. הארכיטקטורה בנויה בשכבות ברורות כדי להבטיח תכנון אמין, ביצוע מבוקר ואבטחת מידע מקצה לקצה.",
    bullets: [
      "WaveQ מקבלת בקשה טבעית ומתרגמת אותה לתוכנית פעולה ישימה לביצוע אודיו.",
      "QAgent אחראי על שכבת התכנון וההחלטות, ו-API Server מפעיל את שכבת הביצוע בפועל.",
      "מנגנון הגרסאות שומר עקיבות מלאה בין כוונה, תכנון, ביצוע ותוצר סופי.",
    ],
    architectureTitle: "תמונת ארכיטקטורה",
    architectureBody: "מבט אחד על הגשר בין שלב הכוונה והתכנון לבין שכבת הביצוע והתשתיות.",
    videoTitle: "וידאו: המסע של פקודת אודיו",
    audioTitle: "אודיו: ארכיטקטורת WaveQ והגשר מכוונה לביצוע",
    openAudio: "פתח אודיו בחלון נפרד",
    pdfTitle: "מצגת PDF: WaveQ Architecture",
    prevPage: "עמוד קודם",
    nextPage: "עמוד הבא",
    pageXofY: (x, y) => `עמוד ${x} מתוך ${y}`,
  },
  en: {
    dir: "ltr",
    waveqDocsLabel: "WaveQ Docs",
    toggleLabel: "Language",
    toggleButton: "עברית",
    heroTitleLine1: "Welcome to WaveQ",
    heroTitleLine2: "An Audio Editor Driven by User Intent with AI Workflow",
    heroThinkLine: "Think Cursor/Codex for audio",
    heroDescription:
      "This is the system landing page. Here you get a concise architecture overview, followed by media sections in accordions: system image, explainer video, audio narration, and a PDF presentation.",
    goOverview: "Go To Full Overview Page",
    openSystemMap: "Open System Map",
    systemExplanationTitle: "System Overview",
    systemExplanationBody:
      "WaveQ operates in natural language: the user speaks or writes, and the system translates the request into a precise audio operation flow. The architecture is split into clear layers to ensure reliable planning, controlled execution, and end-to-end data security.",
    bullets: [
      "WaveQ receives a natural request and translates it into an actionable audio execution plan",
      "QAgent manages planning and decisions, while API Server executes the plan in practice",
      "The versioning layer preserves end-to-end traceability across intent, planning, execution, and final output",
    ],
    architectureTitle: "Architecture Image",
    architectureBody: "A single view of the bridge between intent/planning and execution/infrastructure.",
    videoTitle: "Video: The Journey of an Audio Command",
    audioTitle: "Audio: WaveQ Architecture and the Bridge from Intent to Execution",
    openAudio: "Open Audio In New Tab",
    pdfTitle: "PDF Presentation: WaveQ Architecture",
    prevPage: "Previous Page",
    nextPage: "Next Page",
    pageXofY: (x, y) => `Page ${x} of ${y}`,
  },
};

export default function DocsIndexPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => CONTENT[lang], [lang]);

  return (
    <DocsContent>
      <div dir={t.dir} className={lang === "he" ? "space-y-6 text-right" : "space-y-6 text-left"}>
        <section className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5 md:p-7">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200/85">{t.waveqDocsLabel}</p>
              <button
                type="button"
                onClick={() => setLang((curr) => (curr === "he" ? "en" : "he"))}
                className="rounded-md border border-cyan-400/45 bg-slate-950/40 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/20"
                aria-label={t.toggleLabel}
              >
                {t.toggleLabel}: {t.toggleButton}
              </button>
            </div>

            <h1 className="mt-2 text-2xl font-semibold leading-tight text-slate-50 md:text-4xl">
              <span className="block">{t.heroTitleLine1}</span>
              <span className="mt-1 block text-xl md:text-3xl">{t.heroTitleLine2}</span>
            </h1>
            <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/[0.08] px-3 py-1 text-xs font-medium text-cyan-100">
              <span>{t.heroThinkLine}</span>
              <span className="animate-pulse" aria-hidden>
                😊
              </span>
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{t.heroDescription}</p>

            <div className={lang === "he" ? "mt-5 flex flex-wrap justify-end gap-3" : "mt-5 flex flex-wrap justify-start gap-3"}>
              <Link
                href="/docs/overview"
                className="rounded-md border border-cyan-400/50 bg-cyan-500/15 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/25"
              >
                {t.goOverview}
              </Link>
              <Link
                href="/docs/system"
                className="rounded-md border border-[var(--border)] bg-slate-900/70 px-4 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-400/40 hover:text-cyan-100"
              >
                {t.openSystemMap}
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-slate-950/30 p-4 text-center md:p-5">
          <h2 className="text-lg font-semibold text-slate-100">{t.systemExplanationTitle}</h2>
          <p className="mx-auto mt-2 max-w-4xl text-sm leading-7 text-slate-300">{t.systemExplanationBody}</p>
          <ul className="mx-auto mt-3 max-w-4xl list-none space-y-2 pe-0 text-center text-sm leading-6 text-slate-300">
            {t.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="space-y-4">
          <section>
            <details className="group rounded-xl border border-[var(--border)] bg-slate-950/30" open>
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
                <h2 className="text-lg font-semibold text-slate-100">{t.architectureTitle}</h2>
                <span className="text-xs text-slate-400 transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="border-t border-[var(--border)] px-4 py-4">
                <p className="mb-3 text-sm leading-6 text-slate-300">{t.architectureBody}</p>
                <div className="overflow-hidden rounded-lg border border-[var(--border)]">
                  <Image src="/media/waveq-architecture-hero.png" alt="WaveQ Architecture" width={1400} height={920} className="h-auto w-full" priority />
                </div>
                <ArchitectureDiagram lang={lang} />
              </div>
            </details>
          </section>

          <section>
            <details className="group rounded-xl border border-[var(--border)] bg-slate-950/30">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
                <h2 className="text-lg font-semibold text-slate-100">{t.videoTitle}</h2>
                <span className="text-xs text-slate-400 transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="border-t border-[var(--border)] px-4 py-4">
                <video controls preload="metadata" className="w-full rounded-md border border-[var(--border)]/70 bg-black" src="/media/waveq-command-journey.mp4" />
              </div>
            </details>
          </section>

          <section>
            <details className="group rounded-xl border border-[var(--border)] bg-slate-950/30">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
                <h2 className="text-lg font-semibold text-slate-100">{t.audioTitle}</h2>
                <span className="text-xs text-slate-400 transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="border-t border-[var(--border)] px-4 py-4">
                <audio controls preload="metadata" className="w-full" src="/media/waveq-architecture-audio.m4a" />
                <a href="/media/waveq-architecture-audio.m4a" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs text-cyan-200 hover:underline">
                  {t.openAudio}
                </a>
              </div>
            </details>
          </section>

          <section>
            <details className="group rounded-xl border border-[var(--border)] bg-slate-950/30">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
                <h2 className="text-lg font-semibold text-slate-100">{t.pdfTitle}</h2>
                <span className="text-xs text-slate-400 transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="border-t border-[var(--border)] px-4 py-4">
                <PdfInlineViewer
                  fileUrl="/media/waveq-architecture.pdf"
                  labels={{
                    prevPage: t.prevPage,
                    nextPage: t.nextPage,
                    pageXofY: t.pageXofY,
                  }}
                />
              </div>
            </details>
          </section>
        </div>
      </div>
    </DocsContent>
  );
}
