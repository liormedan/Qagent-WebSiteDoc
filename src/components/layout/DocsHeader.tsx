"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Puzzle, Sparkles, Store, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MegaKey = "products" | "resources" | "solutions";

const MEGA_MENU: Record<MegaKey, Array<{ heading: string; items: Array<{ title: string; description: string; href: string }> }>> = {
  products: [
    {
      heading: "Core",
      items: [
        { title: "Q Agent", description: "Plan, reason, and gate execution safely.", href: "/docs/q-agent" },
        { title: "Audio Sandbox", description: "Index and query audio evidence quickly.", href: "/docs/audio-sandbox/overview" },
      ],
    },
    {
      heading: "System",
      items: [
        { title: "Orchestration", description: "Coordinate all agents and shared state.", href: "/docs/orchestration/overview" },
        { title: "Execution Runtime", description: "Run approved DAL with progress states.", href: "/docs/execution-runtime/overview" },
      ],
    },
    {
      heading: "Outcomes",
      items: [
        { title: "Audio Comparison", description: "Quantify A/B differences.", href: "/docs/audio-comparison/overview" },
        { title: "Recommendation Engine", description: "Suggest actions with confidence.", href: "/docs/recommendation-engine/overview" },
      ],
    },
  ],
  resources: [
    {
      heading: "Read First",
      items: [
        { title: "System Overview", description: "Understand one request journey end-to-end.", href: "/docs/overview" },
        { title: "Core Concepts", description: "Typed contracts and system boundaries.", href: "/docs/contracts" },
      ],
    },
    {
      heading: "Guides",
      items: [
        { title: "Main Flow", description: "Input -> Analysis -> Comparison -> Recommendation.", href: "/docs/intents" },
        { title: "Implementation", description: "Module map, contracts, and test strategy.", href: "/docs/implementation-map" },
      ],
    },
    {
      heading: "References",
      items: [
        { title: "State Machine", description: "Allowed transitions and guards.", href: "/docs/orchestration/state-machine" },
        { title: "Failure Handling", description: "Fallback and retry policies.", href: "/docs/orchestration/failure-handling" },
      ],
    },
  ],
  solutions: [
    {
      heading: "Use Cases",
      items: [
        { title: "AI Apps", description: "Deploy at the speed of AI.", href: "/docs/recommendation-engine/overview" },
        { title: "Composable Commerce", description: "Power storefronts that convert.", href: "/docs/audio-comparison/overview" },
        { title: "Marketing Sites", description: "Launch campaigns fast.", href: "/docs/lifecycle/overview" },
      ],
    },
    {
      heading: "Tools",
      items: [
        { title: "Marketplace", description: "Extend and automate workflows.", href: "/docs/implementation-map" },
        { title: "Templates", description: "Jumpstart app development.", href: "/docs/module-design" },
        { title: "Partner Finder", description: "Get help from solution partners.", href: "/docs/roadmap" },
      ],
    },
    {
      heading: "Users",
      items: [
        { title: "Platform Engineers", description: "Automate away repetition.", href: "/docs/orchestration/agent-roles" },
        { title: "Design Engineers", description: "Deploy for every idea.", href: "/docs/audio-comparison/canvas-ui" },
      ],
    },
  ],
};

export function DocsHeader({ onOpenMenu, onOpenToc }: { onOpenMenu: () => void; onOpenToc: () => void }) {
  const [activeMega, setActiveMega] = useState<MegaKey | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setActiveMega(null);
      }
    }
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveMega(null);
    }
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const iconFor = useMemo(
    () =>
      ({
        "Use Cases": Sparkles,
        Tools: Wrench,
        Users: Users,
        Core: Puzzle,
        System: Store,
        Outcomes: Users,
        "Read First": Sparkles,
        Guides: Store,
        References: Wrench,
      }) as Record<string, React.ComponentType<{ className?: string }>>,
    [],
  );

  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-[var(--border)] bg-[#0b1020f2] backdrop-blur">
      <div className="relative flex h-full items-center px-3 md:px-6" ref={containerRef}>
        <div className="flex w-full items-center gap-2 lg:gap-4">
          <button type="button" onClick={onOpenMenu} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 lg:hidden">
            Menu
          </button>

          <Link href="/docs" className="rounded-md px-2 py-1 text-base font-bold hover:bg-slate-800 sm:text-lg md:text-xl">
            WaveQ Docs
          </Link>

          <nav className="hidden items-center gap-2 text-sm text-slate-300 xl:flex">
            {(["products", "resources", "solutions"] as const).map((key) => {
              const selected = activeMega === key;
              const label = key[0].toUpperCase() + key.slice(1);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveMega(selected ? null : key)}
                  className={`flex items-center gap-1 rounded-full px-4 py-2 transition-colors ${selected ? "bg-slate-800 text-white" : "hover:bg-slate-800"}`}
                >
                  {label}
                  {selected ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              );
            })}
            <Link href="/docs/architecture" className="rounded-full px-4 py-2 hover:bg-slate-800">Enterprise</Link>
            <Link href="/docs/roadmap" className="rounded-full px-4 py-2 hover:bg-slate-800">Pricing</Link>
          </nav>

          <div className="ml-auto hidden w-full max-w-sm lg:block">
            <Input placeholder="Search Documentation" aria-label="Search Documentation" />
          </div>

          <Button type="button" variant="ghost" size="sm" className="hidden lg:inline-flex">
            Ask Q
          </Button>

          <button type="button" onClick={onOpenToc} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 lg:hidden">
            On this page
          </button>
        </div>

        {activeMega ? (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-40 hidden rounded-xl border border-[var(--border)] bg-black/95 p-4 shadow-2xl xl:block">
            <div className="grid grid-cols-3 gap-5">
              {MEGA_MENU[activeMega].map((column) => {
                const Icon = iconFor[column.heading] ?? Sparkles;
                return (
                  <div key={column.heading} className="space-y-2">
                    <p className="text-lg font-semibold text-slate-100">{column.heading}</p>
                    <div className="space-y-1.5">
                      {column.items.map((entry) => (
                        <Link
                          key={entry.title}
                          href={entry.href}
                          onClick={() => setActiveMega(null)}
                          className="block w-full rounded-lg border border-transparent p-2.5 text-left hover:border-[var(--border)] hover:bg-slate-900/70"
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 rounded-md border border-[var(--border)] p-1.5">
                              <Icon className="h-3.5 w-3.5 text-slate-200" />
                            </span>
                            <span className="space-y-0.5">
                              <span className="block text-lg leading-tight font-semibold text-slate-100">{entry.title}</span>
                              <span className="block text-sm text-slate-400">{entry.description}</span>
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
