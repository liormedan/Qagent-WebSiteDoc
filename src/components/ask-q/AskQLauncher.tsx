"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAskQ } from "@/components/ask-q/AskQProvider";

export function AskQLauncher({ className }: { className?: string }) {
  const { panelOpen, togglePanel } = useAskQ();

  return (
    <>
      <button
        type="button"
        onClick={togglePanel}
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-700/90 bg-slate-950/60 text-slate-300 transition-colors hover:border-cyan-500/35 hover:bg-slate-800/85 hover:text-cyan-100/95 md:hidden",
          panelOpen && "border-cyan-500/40 bg-cyan-500/10 text-cyan-100 ring-1 ring-cyan-400/35",
          className,
        )}
        aria-label={panelOpen ? "Close Q Doc Agent" : "Open Q Doc Agent"}
        aria-pressed={panelOpen}
        title="Q Doc Agent"
      >
        <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
      </button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={togglePanel}
        className={cn(
          "hidden h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-slate-700/90 bg-slate-950/60 px-2.5 text-slate-300 transition-colors hover:border-cyan-500/35 hover:bg-slate-800/85 hover:text-cyan-100/95 md:inline-flex",
          panelOpen && "border-cyan-500/40 bg-cyan-500/10 text-cyan-100 ring-1 ring-cyan-400/35",
          className,
        )}
        title={panelOpen ? "Close Q Doc Agent" : "WaveQ documentation assistant"}
        aria-label={panelOpen ? "Close Q Doc Agent" : "Open Q Doc Agent"}
        aria-pressed={panelOpen}
      >
        <MessageCircle className="h-[17px] w-[17px] shrink-0 opacity-85" aria-hidden />
        <span className="max-w-[7.5rem] truncate text-[13px] font-medium sm:max-w-[9rem]">Q Doc Agent</span>
      </Button>
    </>
  );
}
