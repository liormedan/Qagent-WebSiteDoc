"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Lang = "he" | "en";
type Tone = "cyan" | "blue" | "emerald" | "amber" | "violet" | "rose" | "slate";

type DiagramNode = {
  key: string;
  title: string;
  description: string;
  href: string;
  tone: Tone;
  role: "standard" | "hub" | "bridge";
};

type DiagramNodeSet = {
  client: DiagramNode;
  qagent: DiagramNode;
  api: DiagramNode;
  dsp: DiagramNode;
  data: DiagramNode;
  infra: DiagramNode;
  auth: DiagramNode;
  end2end: DiagramNode;
};

type DiagramEdge = {
  from: keyof DiagramNodeSet;
  to: keyof DiagramNodeSet;
  kind?: "solid" | "support";
};

type Box = { x: number; y: number; w: number; h: number };

const TONE_CLASS: Record<Tone, string> = {
  cyan: "border-cyan-400/40 bg-cyan-500/[0.07] hover:border-cyan-300/60",
  blue: "border-blue-400/40 bg-blue-500/[0.07] hover:border-blue-300/60",
  emerald: "border-emerald-400/40 bg-emerald-500/[0.08] hover:border-emerald-300/60",
  amber: "border-amber-400/40 bg-amber-500/[0.07] hover:border-amber-300/60",
  violet: "border-violet-400/40 bg-violet-500/[0.07] hover:border-violet-300/60",
  rose: "border-rose-400/40 bg-rose-500/[0.07] hover:border-rose-300/60",
  slate: "border-slate-400/40 bg-slate-500/[0.07] hover:border-slate-300/60",
};

const COPY = {
  en: {
    title: "Interactive Architecture Diagram",
    planningGroup: "Intent / Planning",
    executionGroup: "Execution / Infrastructure Cluster",
    authLayer: "Auth & Security Boundary Layer",
    bridge: "End-to-End / Cross-Layer Relationship",
    mobileFlow: "Architecture Flow",
  },
  he: {
    title: "דיאגרמת ארכיטקטורה אינטראקטיבית",
    planningGroup: "כוונה / תכנון",
    executionGroup: "אשכול ביצוע / תשתיות",
    authLayer: "שכבת גבול: Auth & Security",
    bridge: "יחסים חוצי שכבות End-to-End",
    mobileFlow: "זרימת ארכיטקטורה",
  },
} as const;

const NODES: Record<Lang, DiagramNodeSet> = {
  en: {
    client: {
      key: "client",
      title: "Client / Frontend Layer",
      description: "User-facing interaction and request capture",
      href: "/docs/system/client-frontend-layer",
      tone: "cyan",
      role: "standard",
    },
    qagent: {
      key: "qagent",
      title: "QAgent Layer",
      description: "Intent analysis, planning, and orchestration decisions",
      href: "/docs/system/qagent-layer",
      tone: "blue",
      role: "standard",
    },
    api: {
      key: "api",
      title: "API Server Layer",
      description: "Execution control, routing, and system coordination",
      href: "/docs/system/api-server-layer",
      tone: "emerald",
      role: "hub",
    },
    dsp: {
      key: "dsp",
      title: "DSP / Processing Layer",
      description: "Audio processing and runtime operations",
      href: "/docs/system/dsp-processing-layer",
      tone: "amber",
      role: "standard",
    },
    data: {
      key: "data",
      title: "Data Layer",
      description: "Persistence, versions, and canonical records",
      href: "/docs/system/data-layer",
      tone: "violet",
      role: "standard",
    },
    infra: {
      key: "infra",
      title: "Infrastructure Layer",
      description: "Scale, reliability, and service backbone",
      href: "/docs/system/infrastructure-layer",
      tone: "slate",
      role: "standard",
    },
    auth: {
      key: "auth",
      title: "Auth & Security Layer",
      description: "Identity, authorization, and protection boundaries",
      href: "/docs/system/auth-security-layer",
      tone: "rose",
      role: "standard",
    },
    end2end: {
      key: "end2end",
      title: "End-to-End / Cross-Layer Flow",
      description: "From intent to output across all layers",
      href: "/docs/system/end-to-end-flow",
      tone: "cyan",
      role: "bridge",
    },
  },
  he: {
    client: {
      key: "client",
      title: "שכבת Client / Frontend",
      description: "ממשק משתמש, קלט ובקשות",
      href: "/docs/system/client-frontend-layer",
      tone: "cyan",
      role: "standard",
    },
    qagent: {
      key: "qagent",
      title: "שכבת QAgent",
      description: "פענוח כוונה, תכנון והחלטות אורקסטרציה",
      href: "/docs/system/qagent-layer",
      tone: "blue",
      role: "standard",
    },
    api: {
      key: "api",
      title: "שכבת API Server",
      description: "בקרת ביצוע, ניתוב ותיאום מערכת",
      href: "/docs/system/api-server-layer",
      tone: "emerald",
      role: "hub",
    },
    dsp: {
      key: "dsp",
      title: "שכבת DSP / Processing",
      description: "עיבוד אודיו והרצה תפעולית",
      href: "/docs/system/dsp-processing-layer",
      tone: "amber",
      role: "standard",
    },
    data: {
      key: "data",
      title: "שכבת Data",
      description: "אחסון, גרסאות ונתונים קנוניים",
      href: "/docs/system/data-layer",
      tone: "violet",
      role: "standard",
    },
    infra: {
      key: "infra",
      title: "שכבת Infrastructure",
      description: "סקייל, יציבות ותשתית שירותים",
      href: "/docs/system/infrastructure-layer",
      tone: "slate",
      role: "standard",
    },
    auth: {
      key: "auth",
      title: "שכבת Auth & Security",
      description: "זהויות, הרשאות וגבולות הגנה",
      href: "/docs/system/auth-security-layer",
      tone: "rose",
      role: "standard",
    },
    end2end: {
      key: "end2end",
      title: "זרימה End-to-End חוצת שכבות",
      description: "מהכוונה ועד תוצר סופי לאורך כל השכבות",
      href: "/docs/system/end-to-end-flow",
      tone: "cyan",
      role: "bridge",
    },
  },
};

const EDGES: DiagramEdge[] = [
  { from: "client", to: "qagent" },
  { from: "qagent", to: "api" },
  { from: "api", to: "dsp" },
  { from: "api", to: "data" },
  { from: "api", to: "infra" },
  { from: "auth", to: "api", kind: "support" },
  { from: "auth", to: "infra", kind: "support" },
  { from: "end2end", to: "qagent", kind: "support" },
  { from: "end2end", to: "api", kind: "support" },
  { from: "end2end", to: "dsp", kind: "support" },
];

const BOX: Record<keyof DiagramNodeSet | "auth_band" | "bridge_band", Box> = {
  client: { x: 7, y: 20.5, w: 19, h: 17 },
  qagent: { x: 7, y: 45.8, w: 19, h: 17 },
  api: { x: 38, y: 33, w: 24, h: 22 },
  dsp: { x: 75, y: 21, w: 18, h: 13.5 },
  data: { x: 75, y: 38.5, w: 18, h: 13.5 },
  infra: { x: 75, y: 56, w: 18, h: 13.5 },
  auth: { x: 44, y: 2.5, w: 12, h: 5 },
  end2end: { x: 27.5, y: 86, w: 45, h: 6.8 },
  auth_band: { x: 2, y: 4.5, w: 96, h: 70 },
  bridge_band: { x: 24, y: 80.8, w: 52, h: 11.2 },
};

function point(key: keyof DiagramNodeSet | "end2end", side: "left" | "right" | "top" | "bottom") {
  const b = BOX[key];
  if (side === "left") return { x: b.x, y: b.y + b.h / 2 };
  if (side === "right") return { x: b.x + b.w, y: b.y + b.h / 2 };
  if (side === "top") return { x: b.x + b.w / 2, y: b.y };
  return { x: b.x + b.w / 2, y: b.y + b.h };
}

function edgePath(edge: DiagramEdge) {
  if (edge.from === "client" && edge.to === "qagent") {
    const a = point("client", "bottom");
    const b = point("qagent", "top");
    return `M ${a.x} ${a.y} C ${a.x} ${a.y + 7}, ${b.x} ${b.y - 7}, ${b.x} ${b.y}`;
  }
  if (edge.from === "qagent" && edge.to === "api") {
    const a = point("qagent", "right");
    const b = point("api", "left");
    return `M ${a.x} ${a.y} C ${a.x + 8} ${a.y}, ${b.x - 8} ${b.y}, ${b.x} ${b.y}`;
  }
  if (edge.from === "api" && (edge.to === "dsp" || edge.to === "data" || edge.to === "infra")) {
    const a = point("api", "right");
    const b = point(edge.to, "left");
    return `M ${a.x} ${a.y} C ${a.x + 6} ${a.y}, ${b.x - 7} ${b.y}, ${b.x} ${b.y}`;
  }
  if (edge.from === "auth") {
    const a = edge.to === "api" ? { x: 50, y: 7 } : { x: 58, y: 7 };
    const b = edge.to === "api" ? point("api", "top") : point("infra", "top");
    return `M ${a.x} ${a.y} C ${a.x} ${a.y + 10}, ${b.x} ${b.y - 9}, ${b.x} ${b.y}`;
  }
  if (edge.from === "end2end") {
    if (edge.to === "qagent") {
      const a = { x: 36, y: 84 };
      const b = point("qagent", "bottom");
      return `M ${a.x} ${a.y} C ${a.x} ${a.y - 10}, ${b.x} ${b.y + 8}, ${b.x} ${b.y}`;
    }
    if (edge.to === "api") {
      const a = { x: 50, y: 84 };
      const b = point("api", "bottom");
      return `M ${a.x} ${a.y} C ${a.x} ${a.y - 10}, ${b.x} ${b.y + 8}, ${b.x} ${b.y}`;
    }
    const a = { x: 64, y: 84 };
    const b = point("dsp", "bottom");
    return `M ${a.x} ${a.y} C ${a.x} ${a.y - 10}, ${b.x} ${b.y + 8}, ${b.x} ${b.y}`;
  }
  return "";
}

function NodeCard({
  node,
  box,
  active,
  onEnter,
  onLeave,
}: {
  node: DiagramNode;
  box: Box;
  active: boolean;
  onEnter: (k: string) => void;
  onLeave: () => void;
}) {
  const isHub = node.role === "hub";
  return (
    <Link
      href={node.href}
      onMouseEnter={() => onEnter(node.key)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(node.key)}
      onBlur={onLeave}
      className={cn(
        "absolute z-20 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border px-2 py-1.5 text-center transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/70",
        TONE_CLASS[node.tone],
        isHub &&
          "z-30 border-emerald-300/75 bg-emerald-500/[0.16] shadow-[0_0_0_2px_rgba(16,185,129,0.42),0_20px_32px_-20px_rgba(16,185,129,0.85)]",
        active && "ring-1 ring-cyan-300/45"
      )}
      style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}
    >
      <p
        className={cn(
          "w-full overflow-hidden break-words text-slate-100 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
          isHub ? "text-sm font-bold leading-5" : "text-xs font-semibold leading-5"
        )}
      >
        {node.title}
      </p>
    </Link>
  );
}

function MobileFlow({ lang, copy, nodes }: { lang: Lang; copy: (typeof COPY)[Lang]; nodes: DiagramNodeSet }) {
  const order = [nodes.client, nodes.qagent, nodes.api, nodes.dsp, nodes.data, nodes.infra];
  return (
    <div className="space-y-3 lg:hidden">
      <Link href={nodes.auth.href} className="block rounded-md border border-rose-400/35 bg-rose-500/[0.1] px-3 py-2 text-center text-xs font-semibold text-rose-100">
        {copy.authLayer}
      </Link>

      <div className="rounded-lg border border-[var(--border)] bg-[#070d1f] p-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">{copy.mobileFlow}</p>
        <div className="space-y-2">
          {order.map((node, i) => (
            <div key={node.key}>
              <Link
                href={node.href}
                className={cn(
                  "block rounded-lg border px-2.5 py-2 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/70",
                  TONE_CLASS[node.tone],
                  node.role === "hub" && "border-emerald-300/65 bg-emerald-500/[0.13] shadow-[0_0_0_1px_rgba(16,185,129,0.4)]",
                  lang === "he" ? "text-right" : "text-left"
                )}
              >
                <p className={cn("text-slate-100", node.role === "hub" ? "text-sm font-bold" : "text-xs font-semibold")}>{node.title}</p>
              </Link>
              {i < order.length - 1 ? <div className="py-1 text-center text-slate-500">↓</div> : null}
            </div>
          ))}
        </div>
      </div>

      <Link
        href={nodes.end2end.href}
        className={cn(
          "block rounded-md border border-cyan-400/35 bg-cyan-500/[0.1] px-3 py-2 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/70",
          lang === "he" ? "text-right" : "text-left"
        )}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-200/90">{copy.bridge}</p>
        <p className="mt-1 text-xs font-semibold text-slate-100">{nodes.end2end.title}</p>
      </Link>
    </div>
  );
}

export function ArchitectureDiagram({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const nodes = useMemo(() => NODES[lang], [lang]);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div dir={lang === "he" ? "rtl" : "ltr"} className={cn("mt-5 rounded-xl border border-[var(--border)] bg-slate-950/35 p-2.5", lang === "he" ? "text-right" : "text-left")}>
      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan-200/90">{copy.title}</h3>

      <div className="mt-3 hidden lg:block">
        <div className="relative rounded-lg border border-[var(--border)] bg-[#070d1f] p-2">
          <div className="relative h-[328px] w-full xl:h-[342px]">
            <div className="pointer-events-none absolute" style={{ left: `${BOX.auth_band.x}%`, top: `${BOX.auth_band.y}%`, width: `${BOX.auth_band.w}%`, height: `${BOX.auth_band.h}%` }}>
              <div className="h-full w-full rounded-xl border border-dashed border-rose-300/35 bg-rose-500/[0.02] shadow-[inset_0_0_0_1px_rgba(251,113,133,0.06)]" />
            </div>

            <div className="pointer-events-none absolute left-[2%] top-[4.5%] h-[70%] w-[0.45%] rounded-full bg-gradient-to-b from-rose-300/35 via-rose-300/10 to-transparent" />
            <div className="pointer-events-none absolute right-[2%] top-[4.5%] h-[70%] w-[0.45%] rounded-full bg-gradient-to-b from-rose-300/35 via-rose-300/10 to-transparent" />

            <div className="absolute left-[6%] top-[14%] z-20 rounded-md border border-slate-700/65 bg-slate-900/35 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-300">
              {copy.planningGroup}
            </div>
            <div className="absolute right-[6%] top-[14%] z-20 rounded-md border border-slate-700/65 bg-slate-900/35 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-300">
              {copy.executionGroup}
            </div>

            <Link
              href={nodes.auth.href}
              className="absolute left-1/2 top-[1.5%] z-30 -translate-x-1/2 rounded-full border border-rose-400/40 bg-rose-500/[0.13] px-3 py-1 text-center text-[10px] font-semibold tracking-[0.08em] text-rose-100 shadow-[0_4px_16px_-12px_rgba(251,113,133,0.8)]"
            >
              {copy.authLayer}
            </Link>

            <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
              <defs>
                <marker id="arch-arrow-compact" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#7dd3fc" />
                </marker>
              </defs>
              {EDGES.map((edge) => {
                const d = edgePath(edge);
                const on = activeNode === edge.from || activeNode === edge.to;
                return (
                  <path
                    key={`${edge.from}-${edge.to}`}
                    d={d}
                    fill="none"
                    stroke={on ? "#a5f3fc" : edge.kind === "support" ? "#94a3b8" : "#67e8f9"}
                    strokeOpacity={on ? 0.95 : edge.kind === "support" ? 0.5 : 0.82}
                    strokeWidth={on ? 0.58 : edge.kind === "support" ? 0.34 : 0.44}
                    strokeDasharray={edge.kind === "support" ? "1.2 1" : undefined}
                    markerEnd="url(#arch-arrow-compact)"
                  />
                );
              })}
            </svg>

            <NodeCard node={nodes.client} box={BOX.client} active={activeNode === nodes.client.key} onEnter={setActiveNode} onLeave={() => setActiveNode(null)} />
            <NodeCard node={nodes.qagent} box={BOX.qagent} active={activeNode === nodes.qagent.key} onEnter={setActiveNode} onLeave={() => setActiveNode(null)} />
            <NodeCard node={nodes.api} box={BOX.api} active={activeNode === nodes.api.key} onEnter={setActiveNode} onLeave={() => setActiveNode(null)} />
            <NodeCard node={nodes.dsp} box={BOX.dsp} active={activeNode === nodes.dsp.key} onEnter={setActiveNode} onLeave={() => setActiveNode(null)} />
            <NodeCard node={nodes.data} box={BOX.data} active={activeNode === nodes.data.key} onEnter={setActiveNode} onLeave={() => setActiveNode(null)} />
            <NodeCard node={nodes.infra} box={BOX.infra} active={activeNode === nodes.infra.key} onEnter={setActiveNode} onLeave={() => setActiveNode(null)} />

            <Link
              href={nodes.end2end.href}
              onMouseEnter={() => setActiveNode(nodes.end2end.key)}
              onMouseLeave={() => setActiveNode(null)}
              onFocus={() => setActiveNode(nodes.end2end.key)}
              onBlur={() => setActiveNode(null)}
              className={cn(
                "absolute z-20 flex flex-col items-center justify-center rounded-md border border-cyan-400/40 bg-gradient-to-r from-cyan-500/[0.08] via-sky-500/[0.12] to-cyan-500/[0.08] px-2.5 py-1 text-center transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/70",
                activeNode === nodes.end2end.key && "ring-1 ring-cyan-300/45"
              )}
              style={{ left: `${BOX.bridge_band.x}%`, top: `${BOX.bridge_band.y}%`, width: `${BOX.bridge_band.w}%`, minHeight: `${BOX.bridge_band.h}%` }}
            >
              <p className="w-full overflow-hidden text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-200/90 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]">{copy.bridge}</p>
              <p className="overflow-hidden text-center text-[11px] font-semibold text-slate-100 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]">
                {nodes.end2end.title}
              </p>
            </Link>
          </div>
        </div>
      </div>

      <MobileFlow lang={lang} copy={copy} nodes={nodes} />
    </div>
  );
}
