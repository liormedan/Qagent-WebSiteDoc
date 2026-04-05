"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const orderedModules = [
  { label: "AgentQ - stracture", href: "/docs/architecture" },
  { label: "01. QAgent Core", href: "/docs/architecture#01-qagent-core" },
  { label: "02. Files Handler", href: "/docs/architecture#02-files-handler" },
  { label: "03. Analyzer", href: "/docs/architecture#03-analyzer" },
  { label: "04. Intent + Clarification", href: "/docs/architecture#04-intent-clarification" },
  { label: "05. DAL", href: "/docs/architecture#05-dal" },
  { label: "06. UAgent", href: "/docs/architecture#06-uagent" },
  { label: "07. Approval (UI-triggered, Core-enforced)", href: "/docs/architecture#07-approval-ui-triggered-core-enforced" },
  { label: "08. DAgent", href: "/docs/architecture#08-dagent" },
  { label: "09. Versioning", href: "/docs/architecture#09-versioning" },
];

export function DocsSidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const isArchitecturePath = pathname === "/docs/architecture" || pathname.startsWith("/docs/architecture#");

  return (
    <aside className={cn("h-full overflow-y-auto bg-black px-4 py-5", className)}>
      <div>
        <nav className="space-y-0.5">
          {orderedModules.map((moduleItem, index) => {
            const active = index === 0 ? isArchitecturePath : false;
            return (
              <Link
                key={moduleItem.label}
                href={moduleItem.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center justify-between rounded-md px-2.5 py-1.5 text-[15px] leading-6 transition-colors",
                  active ? "bg-slate-900 text-slate-50" : "text-slate-300 hover:bg-slate-950 hover:text-slate-100",
                )}
              >
                <span className="pe-3">{moduleItem.label}</span>
                <ChevronRight className={cn("h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-slate-300", active ? "text-slate-200" : "")} />
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}


