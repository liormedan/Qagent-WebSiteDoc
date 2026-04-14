import Link from "next/link";
import { cn } from "@/lib/utils";

type Lang = "he" | "en";

type LayerNode = {
  key: string;
  title: string;
  description: string;
  href: string;
  tone: "cyan" | "blue" | "emerald" | "amber" | "violet" | "rose" | "slate";
};

const TONE_CLASS: Record<LayerNode["tone"], string> = {
  cyan: "border-cyan-400/35 bg-cyan-500/[0.06] hover:border-cyan-300/55",
  blue: "border-blue-400/35 bg-blue-500/[0.06] hover:border-blue-300/55",
  emerald: "border-emerald-400/35 bg-emerald-500/[0.06] hover:border-emerald-300/55",
  amber: "border-amber-400/35 bg-amber-500/[0.06] hover:border-amber-300/55",
  violet: "border-violet-400/35 bg-violet-500/[0.06] hover:border-violet-300/55",
  rose: "border-rose-400/35 bg-rose-500/[0.06] hover:border-rose-300/55",
  slate: "border-slate-400/35 bg-slate-500/[0.06] hover:border-slate-300/55",
};

const COPY = {
  en: {
    title: "Interactive Architecture Diagram",
    bridge: "Bridge between Intent/Planning and Execution/Infrastructure",
    planningGroup: "Intent / Planning Side",
    executionGroup: "Execution / Infrastructure Side",
    endToEndGroup: "Cross-Layer Relationship",
  },
  he: {
    title: "דיאגרמת ארכיטקטורה אינטראקטיבית",
    bridge: "הגשר בין כוונה/תכנון לבין ביצוע/תשתיות",
    planningGroup: "צד הכוונה והתכנון",
    executionGroup: "צד הביצוע והתשתיות",
    endToEndGroup: "יחסים חוצי שכבות",
  },
} as const;

const NODES: Record<Lang, { planning: LayerNode[]; execution: LayerNode[]; endToEnd: LayerNode }> = {
  en: {
    planning: [
      {
        key: "client",
        title: "Client / Frontend Layer",
        description: "User-facing interaction and request capture",
        href: "/docs/system/client-frontend-layer",
        tone: "cyan",
      },
      {
        key: "qagent",
        title: "QAgent Layer",
        description: "Intent analysis, planning, and orchestration decisions",
        href: "/docs/system/qagent-layer",
        tone: "blue",
      },
    ],
    execution: [
      {
        key: "api",
        title: "API Server Layer",
        description: "Execution control, routing, and system coordination",
        href: "/docs/system/api-server-layer",
        tone: "emerald",
      },
      {
        key: "dsp",
        title: "DSP / Processing Layer",
        description: "Audio processing and operational runtime",
        href: "/docs/system/dsp-processing-layer",
        tone: "amber",
      },
      {
        key: "data",
        title: "Data Layer",
        description: "Persistence, versions, and canonical records",
        href: "/docs/system/data-layer",
        tone: "violet",
      },
      {
        key: "infra",
        title: "Infrastructure Layer",
        description: "Platform reliability, scale, and service backbone",
        href: "/docs/system/infrastructure-layer",
        tone: "slate",
      },
      {
        key: "auth",
        title: "Auth & Security Layer",
        description: "Identity, authorization, and protection boundaries",
        href: "/docs/system/auth-security-layer",
        tone: "rose",
      },
    ],
    endToEnd: {
      key: "end-to-end",
      title: "End-to-End / Cross-Layer Flow",
      description: "From intent to output across all layers",
      href: "/docs/system/end-to-end-flow",
      tone: "cyan",
    },
  },
  he: {
    planning: [
      {
        key: "client",
        title: "שכבת Client / Frontend",
        description: "ממשק משתמש, קלט ובקשות",
        href: "/docs/system/client-frontend-layer",
        tone: "cyan",
      },
      {
        key: "qagent",
        title: "שכבת QAgent",
        description: "פענוח כוונה, תכנון וקבלת החלטות אורקסטרציה",
        href: "/docs/system/qagent-layer",
        tone: "blue",
      },
    ],
    execution: [
      {
        key: "api",
        title: "שכבת API Server",
        description: "בקרת ביצוע, ניתוב ותיאום מערכת",
        href: "/docs/system/api-server-layer",
        tone: "emerald",
      },
      {
        key: "dsp",
        title: "שכבת DSP / Processing",
        description: "עיבוד אודיו והרצה תפעולית",
        href: "/docs/system/dsp-processing-layer",
        tone: "amber",
      },
      {
        key: "data",
        title: "שכבת Data",
        description: "אחסון, גרסאות ונתונים קנוניים",
        href: "/docs/system/data-layer",
        tone: "violet",
      },
      {
        key: "infra",
        title: "שכבת Infrastructure",
        description: "סקייל, יציבות ותשתית שירותים",
        href: "/docs/system/infrastructure-layer",
        tone: "slate",
      },
      {
        key: "auth",
        title: "שכבת Auth & Security",
        description: "זהויות, הרשאות וגבולות הגנה",
        href: "/docs/system/auth-security-layer",
        tone: "rose",
      },
    ],
    endToEnd: {
      key: "end-to-end",
      title: "זרימה End-to-End חוצת שכבות",
      description: "מהכוונה ועד תוצר סופי לאורך כל השכבות",
      href: "/docs/system/end-to-end-flow",
      tone: "cyan",
    },
  },
};

function LayerCard({ node, centered = false }: { node: LayerNode; centered?: boolean }) {
  return (
    <Link
      href={node.href}
      className={cn(
        "group block rounded-lg border p-3 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/70",
        TONE_CLASS[node.tone],
        "hover:-translate-y-0.5",
        centered && "text-center",
      )}
    >
      <p className="text-sm font-semibold text-slate-100">{node.title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-300">{node.description}</p>
    </Link>
  );
}

export function ArchitectureDiagram({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const nodes = NODES[lang];

  return (
    <div dir={lang === "he" ? "rtl" : "ltr"} className={cn("mt-5 rounded-xl border border-[var(--border)] bg-slate-950/35 p-4", lang === "he" ? "text-right" : "text-left")}>
      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan-200/90">{copy.title}</h3>

      <div className="mt-3 rounded-md border border-cyan-400/25 bg-cyan-500/[0.08] px-3 py-2 text-xs font-medium text-cyan-100">{copy.bridge}</div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">{copy.planningGroup}</p>
          {nodes.planning.map((node) => (
            <LayerCard key={node.key} node={node} />
          ))}
        </section>

        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">{copy.executionGroup}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {nodes.execution.map((node, index) => (
              <div key={node.key} className={index === nodes.execution.length - 1 ? "sm:col-span-2" : undefined}>
                <LayerCard node={node} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-4 border-t border-[var(--border)] pt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">{copy.endToEndGroup}</p>
        <LayerCard node={nodes.endToEnd} centered />
      </div>
    </div>
  );
}
