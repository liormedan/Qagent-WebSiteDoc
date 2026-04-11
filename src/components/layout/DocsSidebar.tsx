"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarSection = {
  title: string;
  href?: string;
  level?: "primary" | "secondary";
  items: Array<{ label: string; href: string; kind?: "local" | "reference" }>;
};

const qagentSections: SidebarSection[] = [
  {
    title: "QAgent Overview",
    href: "/docs/q-agent",
    items: [],
  },
  {
    title: "Architecture",
    href: "/docs/architecture",
    items: [
      { label: "Architecture Overview", href: "/docs/architecture" },
      { label: "Modules Overview", href: "/docs/qcore" },
      { label: "Analyzer", href: "/docs/architecture/modules/analyzer" },
      { label: "Files Handler", href: "/docs/architecture/modules/files-handler" },
      { label: "Intent + Clarification", href: "/docs/architecture/modules/intent-clarification" },
      { label: "DAL", href: "/docs/architecture/modules/dal" },
      { label: "UAgent", href: "/docs/architecture/modules/uagent" },
      { label: "Approval", href: "/docs/architecture/modules/approval" },
      { label: "DAgent", href: "/docs/architecture/modules/dagent" },
      { label: "Versioning", href: "/docs/architecture/modules/versioning" },
    ],
  },
  {
    title: "Concept Registry",
    href: "/docs/concepts",
    items: [{ label: "Concept Registry", href: "/docs/concepts" }],
  },
  {
    title: "Core Modules",
    href: "/docs/qcore",
    items: [
      { label: "Main QCore Structure", href: "/docs/qcore" },
      { label: "QCore", href: "/docs/architecture/modules/qagent-core" },
    ],
  },
  {
    title: "Contracts",
    href: "/docs/architecture/contracts/schema-registry",
    items: [
      { label: "Schema Registry", href: "/docs/architecture/contracts/schema-registry" },
      { label: "Client-QAgent ID Mapping", href: "/docs/architecture/contracts/client-qagent-id-mapping" },
      { label: "Lineage Model", href: "/docs/architecture/contracts/lineage-model" },
      { label: "Approval Modify Contract", href: "/docs/architecture/approval/modify-loop-contract" }
    ],
  },
  {
    title: "Policies",
    href: "/docs/architecture/policies/control-policy-matrix",
    items: [
      { label: "Control Policy Matrix", href: "/docs/architecture/policies/control-policy-matrix" },
      { label: "Failure Policy", href: "/docs/architecture/policies/failure-policy" },
      { label: "Session Isolation", href: "/docs/architecture/policies/session-isolation" }
    ],
  },
  {
    title: "System Flow (Cross-layer)",
    href: "/docs/system-flow",
    items: [
      { label: "Runtime Graph (Cross-layer Reference)", href: "/docs/system-flow", kind: "reference" },
      { label: "Orchestration Flow", href: "/docs/orchestration/orchestration-flow" },
      { label: "Routing Logic", href: "/docs/orchestration/routing-logic" },
      { label: "State Machine", href: "/docs/orchestration/state-machine" }
    ],
  },
  {
    title: "Implementation",
    href: "/docs/architecture/implementation-baseline",
    items: [
      { label: "Implementation Baseline", href: "/docs/architecture/implementation-baseline" },
      { label: "Implementation Map", href: "/docs/implementation-map" },
      { label: "Implementation Notes", href: "/docs/module-design" },
      { label: "Function Contracts", href: "/docs/function-contracts" },
      { label: "Testing Strategy", href: "/docs/testing-strategy" }
    ],
  },
];
const apiSections: SidebarSection[] = [
  {
    title: "API Server Layer",
    href: "/docs/api",
    level: "primary",
    items: [],
  },
  {
    title: "Core Flow",
    href: "/docs/api/core-flow",
    level: "secondary",
    items: [],
  },
  {
    title: "Architecture",
    href: "/docs/api/architecture",
    level: "secondary",
    items: [],
  },
  {
    title: "API Gateway Layer",
    href: "/docs/api/gateway",
    level: "secondary",
    items: [],
  },
  {
    title: "Request Handling",
    href: "/docs/api/request-handling",
    level: "secondary",
    items: [],
  },
  {
    title: "Job Orchestration",
    href: "/docs/api/job-orchestration",
    level: "secondary",
    items: [],
  },
  {
    title: "Execution Layer",
    href: "/docs/api/execution",
    level: "secondary",
    items: [],
  },
  {
    title: "Decision System",
    href: "/docs/api/decision-system",
    level: "secondary",
    items: [],
  },
  {
    title: "Versioning",
    href: "/docs/api/versioning",
    level: "secondary",
    items: [],
  },
  {
    title: "Implementation",
    href: "/docs/api/implementation",
    level: "secondary",
    items: [],
  },
];

const clientSections: SidebarSection[] = [
  {
    title: "Client Layer",
    href: "/docs/client",
    items: [],
  },
  {
    title: "Surfaces",
    items: [
      { label: "Chat UI", href: "/docs/client/chat-ui" },
      { label: "Canvas UI", href: "/docs/client/canvas-ui" },
      { label: "Workspace UI", href: "/docs/client/workspace-ui" },
    ],
  },
  {
    title: "Runtime & State",
    items: [
      { label: "Client Runtime", href: "/docs/client/runtime" },
      { label: "State Model", href: "/docs/client/state-model" },
      { label: "State Ownership", href: "/docs/client/state-ownership" },
    ],
  },
  {
    title: "Events & Contracts",
    items: [
      { label: "Event Flow", href: "/docs/client/event-flow" },
      { label: "Event Contract", href: "/docs/client/event-contract" },
      { label: "Runtime Lifecycle", href: "/docs/client/runtime-lifecycle" },
      { label: "Error Model", href: "/docs/client/error-model" },
      { label: "Contracts", href: "/docs/client/contracts" },
    ],
  },
  {
    title: "Validation & Tests",
    items: [
      { label: "System Validation", href: "/docs/client/system-validation" },
      { label: "Conformance Tests", href: "/docs/client/conformance-tests" },
      { label: "Test Report", href: "/docs/client/test-report" },
      { label: "UI Plan Contract", href: "/docs/client/ui-plan-contract" },
    ],
  },
];

const systemSections: SidebarSection[] = [
  {
    title: "System Overview",
    href: "/docs/system",
    items: [],
  },
  {
    title: "Client / Frontend Layer",
    href: "/docs/system/client-frontend-layer",
    items: [],
  },
  {
    title: "QAgent Layer",
    href: "/docs/system/qagent-layer",
    items: [],
  },
  {
    title: "API Server Layer",
    href: "/docs/system/api-server-layer",
    items: [],
  },
  {
    title: "DSP / Processing Layer",
    href: "/docs/system/dsp-processing-layer",
    items: [],
  },
  {
    title: "Data Layer",
    href: "/docs/system/data-layer",
    items: [],
  },
  {
    title: "Infrastructure Layer",
    href: "/docs/system/infrastructure-layer",
    items: [],
  },
  {
    title: "Auth & Security Layer",
    href: "/docs/system/auth-security-layer",
    items: [],
  },
  {
    title: "End-to-End Flow (cross-layer flow)",
    href: "/docs/system/end-to-end-flow",
    items: [],
  },
];

const dataLayerSections: SidebarSection[] = [
  {
    title: "Overview",
    href: "/docs/data-layer",
    level: "primary",
    items: [],
  },
  {
    title: "System View",
    href: "/docs/data-layer/system-view",
    level: "secondary",
    items: [],
  },
  {
    title: "Data Ownership",
    href: "/docs/data-layer/data-ownership",
    level: "secondary",
    items: [],
  },
  {
    title: "Canonical vs Derived Data",
    href: "/docs/data-layer/canonical-data",
    level: "secondary",
    items: [],
  },
  {
    title: "Persistence Model",
    href: "/docs/data-layer/persistence-model",
    level: "secondary",
    items: [],
  },
  {
    title: "Artifact Management",
    href: "/docs/data-layer/artifact-management",
    level: "secondary",
    items: [],
  },
];

const dspSections: SidebarSection[] = [
  {
    title: "Overview",
    href: "/docs/dsp-layer",
    items: [],
  },
  {
    title: "Core Specification",
    href: "/docs/dsp-layer/core-specification",
    items: [],
  },
  {
    title: "Contracts",
    href: "/docs/dsp-layer/contracts",
    items: [],
  },
  {
    title: "Processing Engine",
    href: "/docs/dsp-layer/processing-engine",
    items: [],
  },
  {
    title: "System Integration",
    href: "/docs/dsp-layer/system-integration",
    items: [],
  },
];

function toQAgentHref(href: string): string {
  return href;
}

function normalizePath(path: string): string {
  if (!path) return "";
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

function isSectionActive(pathname: string, href: string): boolean {
  const path = normalizePath(pathname);
  const target = normalizePath(href.split("#")[0] ?? href);
  if (!target) return false;
  if (target === "/docs/dsp-layer" || target === "/docs/data-layer") {
    return path === target;
  }
  return path === target || path.startsWith(`${target}/`);
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function DocsSidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const [openSection, setOpenSection] = useState<string>("Architecture");
  const safePathname = hydrated ? pathname : "";

  const clientContext = safePathname.startsWith("/docs/client");
  const apiContext = safePathname.startsWith("/docs/api");
  const dspContext =
    safePathname.startsWith("/docs/dsp-layer") ||
    safePathname.startsWith("/docs/architecture/dagent/dsp-engine-abstraction");
  const dataLayerContext = safePathname.startsWith("/docs/data-layer");
  const systemContext =
    safePathname === "/docs" ||
    safePathname.startsWith("/docs/system") ||
    safePathname.startsWith("/docs/system-flow") ||
    safePathname.startsWith("/docs/auth-security") ||
    safePathname.startsWith("/docs/infrastructure-layer");
  const singleLevelContext = apiContext || systemContext || dspContext || dataLayerContext;
  const sections = apiContext
    ? apiSections
    : clientContext
      ? clientSections
      : dspContext
        ? dspSections
        : dataLayerContext
          ? dataLayerSections
      : systemContext
        ? systemSections
        : qagentSections.map((section) => ({
          ...section,
          items: section.items.map((item) => ({
            ...item,
            href: toQAgentHref(item.href),
          })),
        }));

  const activeOpenSection = clientContext && openSection === "Architecture" ? "Surfaces" : openSection;

  return (
    <aside className={cn("h-full min-h-0 overflow-y-scroll bg-black px-4 py-5", className)}>
      <nav className="space-y-4">
        {sections.map((section) => (
          <div key={section.href ?? section.title} className="space-y-1.5">
            {singleLevelContext && section.href ? (
              <Link
                href={section.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center justify-between rounded-md px-2 py-1 text-left text-xs uppercase tracking-[0.14em] transition-colors",
                  (apiContext || dataLayerContext) && section.level === "primary" ? "font-bold text-slate-200" : "font-semibold",
                  (apiContext || dataLayerContext) && section.level === "secondary" ? "pl-5" : "",
                  isSectionActive(safePathname, section.href)
                    ? "bg-slate-900 text-slate-100"
                    : "text-slate-500 hover:bg-slate-950/70 hover:text-slate-300",
                )}
              >
                <span>{section.title}</span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isSectionActive(safePathname, section.href) ? "text-slate-200" : "text-slate-500 group-hover:text-slate-300",
                  )}
                />
              </Link>
            ) : !singleLevelContext && section.href && section.items.length === 0 ? (
              <Link
                href={section.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center justify-between rounded-md px-2.5 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors",
                  isSectionActive(safePathname, section.href)
                    ? "bg-slate-900 text-slate-50"
                    : "text-slate-300 hover:bg-slate-950 hover:text-slate-100",
                )}
              >
                <span className="flex-1 pe-3 whitespace-normal leading-5">{section.title}</span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-slate-300",
                    isSectionActive(safePathname, section.href) ? "text-slate-200" : "",
                  )}
                />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setOpenSection(activeOpenSection === section.title ? "" : section.title)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 transition-colors hover:bg-slate-950/70 hover:text-slate-300",
                  clientContext ? "text-slate-300 hover:text-slate-100" : "",
                )}
                aria-expanded={activeOpenSection === section.title}
              >
                <span className="pe-3 whitespace-normal leading-5">{section.title}</span>
                <ChevronRight className={cn("h-4 w-4 shrink-0 transition-transform", activeOpenSection === section.title ? "rotate-90 text-slate-300" : "text-slate-500")} />
              </button>
            )}

            {!singleLevelContext && activeOpenSection === section.title ? (
              <div className={cn("space-y-0.5", clientContext ? "border-l border-[var(--border)]/60 pl-2" : "")}>
                {section.items.map((item) => {
                  const active = isSectionActive(safePathname, item.href);
                  const isReference = item.kind === "reference";
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center justify-between rounded-md px-2.5 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors",
                        active ? "bg-slate-900 text-slate-50" : "text-slate-300 hover:bg-slate-950 hover:text-slate-100",
                        isReference ? "border border-cyan-400/30 bg-cyan-500/5 text-cyan-200 hover:bg-cyan-500/10" : "",
                      )}
                    >
                      <span className="flex-1 pe-3 whitespace-normal leading-5">{item.label}</span>
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

