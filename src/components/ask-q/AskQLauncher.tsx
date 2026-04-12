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
        aria-label={panelOpen ? "Close Ask Q panel" : "Open Ask Q panel"}
        aria-pressed={panelOpen}
        title="Ask Q"
      >
        <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
      </button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={togglePanel}
        className={cn(
          "hidden w-[88px] shrink-0 justify-center md:inline-flex",
          panelOpen && "bg-slate-800/90 text-cyan-100 ring-1 ring-cyan-400/25",
          className,
        )}
        title={panelOpen ? "Close Ask Q" : "Ask anything about WaveQ…"}
        aria-label={panelOpen ? "Close Ask Q panel" : "Open Ask Q panel"}
        aria-pressed={panelOpen}
      >
        Ask Q
      </Button>
    </>
  );
}
