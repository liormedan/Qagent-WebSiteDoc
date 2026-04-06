"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ModuleAccordionProps = {
  anchorId: string;
  number?: string;
  name: string;
  role: string;
  purpose: string;
  inputs: string;
  outputs: string;
  dependsOn: string;
  isPrimary?: boolean;
};

export function ModuleAccordion({
  anchorId,
  name,
  role,
  purpose,
  inputs,
  outputs,
  dependsOn,
  isPrimary = false,
}: ModuleAccordionProps) {
  const [open, setOpen] = useState(false);
  const buttonId = `${anchorId}-button`;
  const panelId = `${anchorId}-panel`;

  return (
    <section id={anchorId} className="scroll-mt-32 rounded-lg border border-[var(--border)] bg-slate-950/30">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-start"
      >
        <p className="truncate text-[13.5px] font-semibold leading-tight">{name}</p>
        <div className="flex shrink-0 items-center gap-2">
          <Badge className="border border-[var(--border)] bg-slate-900 text-[10px] text-slate-100">{role}</Badge>
          <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", open && "rotate-180")} />
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn("grid transition-[grid-template-rows] duration-200 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[var(--border)] px-4 py-3 text-sm">
            <div className="grid gap-1 py-2 md:grid-cols-[86px_minmax(0,1fr)] md:gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Purpose</p>
              <p className="leading-6 text-slate-300">{purpose}</p>
            </div>

            {isPrimary ? (
              <>
                {[
                  { label: "Inputs", value: inputs },
                  { label: "Outputs", value: outputs },
                  { label: "Depends on", value: dependsOn },
                ].map((row) => (
                  <div key={`${anchorId}-${row.label}`} className="grid gap-1 border-t border-[var(--border)]/70 py-2 md:grid-cols-[86px_minmax(0,1fr)] md:gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{row.label}</p>
                    <p className="leading-6 text-slate-300">{row.value}</p>
                  </div>
                ))}
              </>
            ) : (
              <p className="border-t border-[var(--border)]/70 py-2 text-sm text-slate-400">
                Detailed Inputs / Outputs / Depends on will be added in a later pass.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
