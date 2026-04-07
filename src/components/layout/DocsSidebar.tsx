"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarSection = {
  title: string;
  href?: string;
  items: Array<{ label: string; href: string }>;
};

const qagentSections: SidebarSection[] = [
  {
    title: "QAgent",
    items: [
      { label: "Docs Home", href: "/docs" },
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "System Flow", href: "/docs/system-flow" },
      { label: "Terminology", href: "/docs/terminology" },
      { label: "Architecture", href: "/docs/architecture" },
      { label: "Main QAgent Core Structure", href: "/docs/qcore" },
      { label: "Schema Registry", href: "/docs/architecture/contracts/schema-registry" },
      { label: "Lineage Model", href: "/docs/architecture/contracts/lineage-model" },
      { label: "Control Policy Matrix", href: "/docs/architecture/policies/control-policy-matrix" },
      { label: "Failure Policy", href: "/docs/architecture/policies/failure-policy" },
      { label: "Session Isolation", href: "/docs/architecture/policies/session-isolation" },
      { label: "Approval Modify Contract", href: "/docs/architecture/approval/modify-loop-contract" },
      { label: "DSP Engine Abstraction", href: "/docs/architecture/dagent/dsp-engine-abstraction" },
      { label: "Implementation Baseline", href: "/docs/architecture/implementation-baseline" },
    ],
  },
  {
    title: "Core Flow",
    items: [
      { label: "QCore Engine", href: "/docs/architecture/modules/qagent-core" },
      { label: "Files Handler", href: "/docs/architecture/modules/files-handler" },
      { label: "Analyzer", href: "/docs/architecture/modules/analyzer" },
      { label: "Intent + Clarification", href: "/docs/architecture/modules/intent-clarification" },
      { label: "DAL", href: "/docs/architecture/modules/dal" },
      { label: "UAgent", href: "/docs/architecture/modules/uagent" },
      { label: "Approval", href: "/docs/architecture/modules/approval" },
      { label: "DAgent", href: "/docs/architecture/modules/dagent" },
      { label: "Versioning", href: "/docs/architecture/modules/versioning" },
    ],
  },
  {
    title: "Decision System",
    items: [
      { label: "Orchestration Overview", href: "/docs/orchestration/overview" },
      { label: "Routing Logic", href: "/docs/orchestration/routing-logic" },
      { label: "State Machine", href: "/docs/orchestration/state-machine" },
      { label: "Failure Handling", href: "/docs/orchestration/failure-handling" },
    ],
  },
  {
    title: "Audio System",
    items: [
      { label: "Audio Sandbox", href: "/docs/audio-sandbox/overview" },
      { label: "Audio Comparison", href: "/docs/audio-comparison/overview" },
      { label: "Audio Memory", href: "/docs/audio-memory" },
      { label: "Audio DAL", href: "/docs/audio-dal" },
    ],
  },
  {
    title: "Execution",
    items: [
      { label: "Execution Runtime", href: "/docs/execution-runtime/overview" },
      { label: "Runtime Error Handling", href: "/docs/execution-runtime/error-handling" },
      { label: "Cancellation and Retry", href: "/docs/execution-runtime/cancellation-and-retry" },
    ],
  },
  {
    title: "Versioning",
    items: [
      { label: "Versioning Module", href: "/docs/architecture/modules/versioning" },
      { label: "Version Manager", href: "/docs/architecture/modules/versioning/version-manager" },
      { label: "Diff Engine", href: "/docs/architecture/modules/versioning/diff-engine" },
      { label: "Output Versioning", href: "/docs/execution-runtime/output-versioning" },
    ],
  },
  {
    title: "Implementation",
    items: [
      { label: "Implementation Map", href: "/docs/implementation-map" },
      { label: "Module Design", href: "/docs/module-design" },
      { label: "Function Contracts", href: "/docs/function-contracts" },
      { label: "Testing Strategy", href: "/docs/testing-strategy" },
      { label: "API", href: "/docs/api-reference" },
    ],
  },
];

const apiSections: SidebarSection[] = [
  {
    title: "Core Flow",
    href: "/docs/api/core-flow",
    items: [],
  },
  {
    title: "Architecture",
    href: "/docs/api/architecture",
    items: [],
  },
  {
    title: "Decision System",
    href: "/docs/api/decision-system",
    items: [],
  },
  {
    title: "Execution",
    href: "/docs/api/execution",
    items: [],
  },
  {
    title: "Versioning",
    href: "/docs/api/versioning",
    items: [],
  },
  {
    title: "Implementation",
    href: "/docs/api/implementation",
    items: [],
  },
];

const clientSections: SidebarSection[] = [
  {
    title: "Overview",
    href: "/docs/client",
    items: [],
  },
  {
    title: "Chat UI",
    href: "/docs/client/chat-ui",
    items: [],
  },
  {
    title: "Canvas UI",
    href: "/docs/client/canvas-ui",
    items: [],
  },
  {
    title: "Workspace UI",
    href: "/docs/client/workspace-ui",
    items: [],
  },
  {
    title: "Client Runtime",
    href: "/docs/client/runtime",
    items: [],
  },
  {
    title: "State Model",
    href: "/docs/client/state-model",
    items: [],
  },
  {
    title: "State Ownership",
    href: "/docs/client/state-ownership",
    items: [],
  },
  {
    title: "Event Flow",
    href: "/docs/client/event-flow",
    items: [],
  },
  {
    title: "Event Contract",
    href: "/docs/client/event-contract",
    items: [],
  },
  {
    title: "Runtime Lifecycle",
    href: "/docs/client/runtime-lifecycle",
    items: [],
  },
  {
    title: "Error Model",
    href: "/docs/client/error-model",
    items: [],
  },
  {
    title: "Cross-Layer Contracts",
    href: "/docs/client/contracts",
    items: [],
  },
  {
    title: "System Validation",
    href: "/docs/client/system-validation",
    items: [],
  },
  {
    title: "Conformance Tests",
    href: "/docs/client/conformance-tests",
    items: [],
  },
  {
    title: "Test Report",
    href: "/docs/client/test-report",
    items: [],
  },
  {
    title: "UI Plan Contract",
    href: "/docs/client/ui-plan-contract",
    items: [],
  },
];

function toQAgentHref(href: string): string {
  if (!href.startsWith("/docs")) return href;
  return `/docs/qagent${href.replace("/docs", "")}`;
}

export function DocsSidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string>("");
  const clientContext = pathname.startsWith("/docs/client");
  const apiContext = pathname.startsWith("/docs/api");
  const singleLevelContext = apiContext || clientContext;
  const sections = apiContext
    ? apiSections
    : clientContext
      ? clientSections
      : qagentSections.map((section) => ({
          ...section,
          items: section.items.map((item) => ({
            ...item,
            href: toQAgentHref(item.href),
          })),
        }));

  return (
    <aside className={cn("h-full min-h-0 overflow-y-scroll bg-black px-4 py-5", className)}>
      <nav className="space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1.5">
            {singleLevelContext && section.href ? (
              <Link
                href={section.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center justify-between rounded-md px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                  pathname === section.href ? "bg-slate-900 text-slate-100" : "text-slate-500 hover:bg-slate-950/70 hover:text-slate-300",
                )}
              >
                <span>{section.title}</span>
                <ChevronRight className={cn("h-4 w-4 shrink-0 transition-colors", pathname === section.href ? "text-slate-200" : "text-slate-500 group-hover:text-slate-300")} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setOpenSection((current) => (current === section.title ? "" : section.title))}
                className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 transition-colors hover:bg-slate-950/70 hover:text-slate-300"
                aria-expanded={openSection === section.title}
              >
                <span>{section.title}</span>
                <ChevronRight className={cn("h-4 w-4 shrink-0 transition-transform", openSection === section.title ? "rotate-90 text-slate-300" : "text-slate-500")} />
              </button>
            )}

            {!singleLevelContext && openSection === section.title ? (
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center justify-between overflow-hidden rounded-md px-2.5 py-1.5 text-[14px] leading-6 transition-colors",
                        active ? "bg-slate-900 text-slate-50" : "text-slate-300 hover:bg-slate-950 hover:text-slate-100",
                      )}
                    >
                      <span className="flex-1 truncate pe-3">{item.label}</span>
                      <ChevronRight className={cn("h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-slate-300", active ? "text-slate-200" : "")} />
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        ))}
      </nav>
    </aside>
  );
}
