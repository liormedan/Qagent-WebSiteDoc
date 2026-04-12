"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAskQ } from "@/components/ask-q/AskQProvider";
import type { AskQResponseMode } from "@/lib/ask-q/responseMode";
import type { AskQMessage } from "./AskQProvider";

const MODE_LABEL: Record<AskQResponseMode, string> = {
  gemini: "Gemini",
  retrieval: "Docs",
  retrieval_fallback: "Fallback",
  daily_limit: "Limit",
  greeting: "Welcome",
  low_signal: "Ask more",
  client_fallback: "Docs",
  match_gate: "Catalog",
  output_guard: "Catalog",
  bad_request: "Error",
  error: "Error",
};

function AskQModeBadge({ mode }: { mode: AskQResponseMode }) {
  return (
    <span className="mb-1 inline-block rounded border border-slate-600/70 bg-slate-800/90 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
      {MODE_LABEL[mode]}
    </span>
  );
}

const HIDE_GUIDED_MODES = new Set<AskQResponseMode>(["greeting", "low_signal", "bad_request", "error", "client_fallback"]);

function showGuidedSuggestions(m: AskQMessage): boolean {
  if (m.role !== "assistant" || !m.mode || !m.suggestions?.length) return false;
  return !HIDE_GUIDED_MODES.has(m.mode);
}

export function AskQPanel() {
  const { panelOpen, closePanel, messages, sendMessage, composing, panelTitleId } = useAskQ();
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!panelOpen) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [panelOpen]);

  useEffect(() => {
    if (!panelOpen) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [panelOpen, messages.length, composing]);

  useEffect(() => {
    if (!panelOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [panelOpen, closePanel]);

  if (!panelOpen) return null;

  const submit = () => {
    sendMessage(draft);
    setDraft("");
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex h-[min(72dvh,32rem)] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-xl border border-slate-800/90 bg-[#070a12f2] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.78)] ring-1 ring-white/[0.06] backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby={panelTitleId}
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 px-3 py-2.5">
        <h2 id={panelTitleId} className="truncate text-sm font-semibold text-slate-100">
          Q Doc Agent
        </h2>
        <button
          type="button"
          onClick={closePanel}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
          aria-label="Close Q Doc Agent"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div
        ref={listRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "rounded-lg px-3 py-2 text-[13px] leading-relaxed",
              m.role === "user"
                ? "ml-4 border border-cyan-500/20 bg-cyan-500/10 text-slate-100"
                : "mr-2 border border-slate-700/60 bg-slate-900/50 text-slate-200",
            )}
          >
            <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
            {m.role === "assistant" && m.mode ? <AskQModeBadge mode={m.mode} /> : null}
            {m.role === "assistant" && m.confidence != null ? (
              <p className="mb-1 text-[10px] text-slate-500">Confidence {Math.round(m.confidence * 100)}%</p>
            ) : null}
            <p className="whitespace-pre-wrap break-words">{m.content}</p>
            {showGuidedSuggestions(m) ? (
              <div className="mt-2.5 border-t border-slate-700/40 pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  You may also want to explore
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5 list-none">
                  {m.suggestions!.map((s, i) => (
                    <li key={`${m.id}-guided-${i}`}>
                      {s.href ? (
                        <Link
                          href={s.href}
                          title={s.reason}
                          className="inline-flex max-w-full items-center rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-100/95 underline-offset-2 hover:border-cyan-400/45 hover:bg-cyan-500/15 hover:underline"
                        >
                          <span className="truncate">{s.label}</span>
                        </Link>
                      ) : (
                        <span
                          title={s.reason}
                          className="inline-flex max-w-full items-center rounded-full border border-slate-600/60 bg-slate-800/60 px-2.5 py-1 text-[11px] text-slate-300"
                        >
                          <span className="truncate">{s.label}</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {m.role === "assistant" && m.sources && m.sources.length > 0 ? (
              <div className="mt-2.5 border-t border-slate-700/55 pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Sources</p>
                <ul className="mt-1.5 list-none space-y-1.5">
                  {m.sources.map((s) => (
                    <li key={`${m.id}-${s.href}`}>
                      <Link
                        href={s.href}
                        className="text-[12px] font-medium text-cyan-200/95 underline-offset-2 hover:text-cyan-100 hover:underline"
                        title={s.href}
                      >
                        {s.title}
                      </Link>
                      <span className="mt-0.5 block truncate font-mono text-[10px] text-slate-500" title={s.href}>
                        {s.href}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ))}
        {composing ? (
          <div className="mr-2 rounded-lg border border-slate-700/40 bg-slate-900/30 px-3 py-2 text-[13px] text-slate-400">
            <span className="inline-flex gap-1">
              <span className="animate-pulse">Thinking</span>
              <span aria-hidden>…</span>
            </span>
          </div>
        ) : null}
      </div>

      <div className="border-t border-slate-800/80 p-2">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Message… (Enter to send, Shift+Enter for newline)"
            className="min-h-[2.5rem] flex-1 resize-none rounded-md border border-slate-700/80 bg-slate-950/80 px-2.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
            disabled={composing}
            aria-label="Message to Q Doc Agent"
          />
          <Button
            type="button"
            size="sm"
            className="shrink-0"
            onClick={submit}
            disabled={composing || !draft.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
