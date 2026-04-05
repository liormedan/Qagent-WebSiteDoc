"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const orderedModules = [
  { label: "AgentQ - stracture", href: "/docs/architecture" },
  { label: "QAgent Core", href: "/docs/architecture/modules/qagent-core" },
  { label: "Files Handler", href: "/docs/architecture/modules/files-handler" },
  { label: "Analyzer", href: "/docs/architecture/modules/analyzer" },
  { label: "Intent + Clarification", href: "/docs/architecture/modules/intent-clarification" },
  { label: "DAL", href: "/docs/architecture/modules/dal" },
  { label: "UAgent", href: "/docs/architecture/modules/uagent" },
  { label: "Approval (UI-triggered, Core-enforced)", href: "/docs/architecture/modules/approval" },
  { label: "DAgent", href: "/docs/architecture/modules/dagent" },
  { label: "Versioning", href: "/docs/architecture/modules/versioning" },
];

export function DocsSidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={cn("h-full overflow-y-auto bg-black px-4 py-5", className)}>
      <div>
        <nav className="space-y-0.5">
          {orderedModules.map((moduleItem, index) => {
            const active = index === 0 ? pathname === "/docs/architecture" : pathname === moduleItem.href;
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


