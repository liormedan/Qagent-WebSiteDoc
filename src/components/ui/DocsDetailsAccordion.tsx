"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type DocsDetailsItem = {
  id: string;
  title: string;
  subtitle: string;
  purpose: string;
  defines: string[];
  doesNotDefine: string;
  href: string;
  linkLabel?: string;
};

export function DocsDetailsAccordion({ items }: { items: DocsDetailsItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3 text-sm">
      {items.map((item) => {
        const buttonId = `${item.id}-toggle`;
        const panelId = `${item.id}-panel`;
        const isOpen = openId === item.id;

        return (
          <section id={item.id} key={item.id} className="overflow-hidden rounded-md border border-[var(--border)] bg-slate-950/30">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                className="flex w-full items-start justify-between gap-3 px-3 py-2.5 text-left transition-colors hover:bg-slate-900/30"
              >
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-slate-100">{item.title}</span>
                  <span className="block text-xs text-[var(--muted)]">{item.subtitle}</span>
                </span>
                <ChevronRight className={cn("h-4 w-4 shrink-0 text-slate-400 transition-transform", isOpen && "rotate-90")} />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={cn(
                "overflow-hidden border-[var(--border)] transition-all duration-200",
                isOpen ? "max-h-[560px] border-t opacity-100" : "max-h-0 border-t-0 opacity-0",
              )}
            >
              <div className="space-y-2 px-3 py-2.5">
                <p className="text-[var(--muted)]">
                  <span className="font-semibold text-slate-100">Purpose:</span> {item.purpose}
                </p>
                <p className="font-semibold text-slate-100">Defines:</p>
                <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
                  {item.defines.map((line, index) => (
                    <li key={`${item.id}-defines-${index}`}>{line.replace(/^(?:[-*\u2022]\s*)+/, "").trim()}</li>
                  ))}
                </ul>
                <p className="text-[var(--muted)]">
                  <span className="font-semibold text-slate-100">Does not define:</span> {item.doesNotDefine}
                </p>
                <Link href={item.href} className="inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                  {item.linkLabel ?? "Related section"}
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
