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
  items: Array<{ label: string; href: string }>;
};

const qagentSections: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      { label: "QAgent Overview", href: "/docs/q-agent" },
      { label: "Architecture", href: "/docs/architecture" },
      { label: "Concept Registry", href: "/docs/concepts" },
    ],
  },
  {
    title: "Core Modules",
    items: [
      { label: "Main QCore Structure", href: "/docs/qcore" },
      { label: "QCore", href: "/docs/architecture/modules/qagent-core" },
      { label: "Files Handler", href: "/docs/architecture/modules/files-handler" },
      { label: "Analyzer", href: "/docs/architecture/modules/analyzer" },
      { label: "Intent + Clarification", href: "/docs/architecture/modules/intent-clarification" },
      { label: "DAL", href: "/docs/architecture/modules/dal" },
      { label: "UAgent", href: "/docs/architecture/modules/uagent" },
      { label: "Approval", href: "/docs/architecture/modules/approval" },
      { label: "DAgent", href: "/docs/architecture/modules/dagent" },
      { label: "Versioning", href: "/docs/architecture/modules/versioning" }
    ],
  },
  {
    title: "Contracts",
    items: [
      { label: "Schema Registry", href: "/docs/architecture/contracts/schema-registry" },
      { label: "Client-QAgent ID Mapping", href: "/docs/architecture/contracts/client-qagent-id-mapping" },
      { label: "Lineage Model", href: "/docs/architecture/contracts/lineage-model" },
      { label: "Approval Modify Contract", href: "/docs/architecture/approval/modify-loop-contract" }
    ],
  },
  {
    title: "Policies",
    items: [
      { label: "Control Policy Matrix", href: "/docs/architecture/policies/control-policy-matrix" },
      { label: "Failure Policy", href: "/docs/architecture/policies/failure-policy" },
      { label: "Session Isolation", href: "/docs/architecture/policies/session-isolation" }
    ],
  },
  {
    title: "System Flow",
    items: [
      { label: "QAgent Flow", href: "/docs/system-flow" },
      { label: "Orchestration Flow", href: "/docs/orchestration/orchestration-flow" },
      { label: "Routing Logic", href: "/docs/orchestration/routing-logic" },
      { label: "State Machine", href: "/docs/orchestration/state-machine" }
    ],
  },
  {
    title: "Implementation",
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

function toQAgentHref(href: string): string {
  return href;
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
  const [openSection, setOpenSection] = useState<string>("");
  const safePathname = hydrated ? pathname : "";

  const clientContext = safePathname.startsWith("/docs/client");
  const apiContext = safePathname.startsWith("/docs/api");
  const systemContext =
    safePathname === "/docs" ||
    safePathname.startsWith("/docs/system") ||
    safePathname.startsWith("/docs/system-flow") ||
    safePathname.startsWith("/docs/dsp-layer") ||
    safePathname.startsWith("/docs/data-layer") ||
    safePathname.startsWith("/docs/auth-security") ||
    safePathname.startsWith("/docs/infrastructure-layer");
  const singleLevelContext = apiContext || clientContext || systemContext;
  const sections = apiContext
    ? apiSections
    : clientContext
      ? clientSections
      : systemContext
        ? systemSections
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
          <div key={section.href ?? section.title} className="space-y-1.5">
            {singleLevelContext && section.href ? (
              <Link
                href={section.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center justify-between rounded-md px-2 py-1 text-left text-xs uppercase tracking-[0.14em] transition-colors",
                  apiContext && section.level === "primary" ? "font-bold text-slate-200" : "font-semibold",
                  apiContext && section.level === "secondary" ? "pl-5" : "",
                  !section.href.includes("#") && safePathname === section.href.split("#")[0]
                    ? "bg-slate-900 text-slate-100"
                    : "text-slate-500 hover:bg-slate-950/70 hover:text-slate-300",
                )}
              >
                <span>{section.title}</span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    !section.href.includes("#") && safePathname === section.href.split("#")[0] ? "text-slate-200" : "text-slate-500 group-hover:text-slate-300",
                  )}
                />
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
                  const active = safePathname === item.href;
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

