"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import type { GlossaryEntry, GlossaryKind } from "@/lib/docs-glossary";
import { cn } from "@/lib/utils";

const linkClass = "font-semibold text-[var(--accent)] hover:underline";

function KindTag({ kind }: { kind: GlossaryKind }) {
  if (kind === "other") return null;
  return (
    <span className="ml-2 rounded border border-slate-600/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
      {kind}
    </span>
  );
}

function openDetailsForHash() {
  if (typeof window === "undefined") return;
  const hash = window.location.hash;
  if (!hash.startsWith("#term-")) return;
  const id = hash.slice(1);
  const host = document.getElementById(id);
  if (!host) return;
  const details = host.querySelector("details");
  if (details) (details as HTMLDetailsElement).open = true;
}

export function TerminologyGlossaryEntriesList({ entries }: { entries: readonly GlossaryEntry[] }) {
  useEffect(() => {
    openDetailsForHash();
    window.addEventListener("hashchange", openDetailsForHash);
    return () => window.removeEventListener("hashchange", openDetailsForHash);
  }, []);

  return (
    <div className="rounded-lg border border-[var(--border)] bg-slate-950/25" role="list">
      {entries.map((entry) => (
        <div
          key={entry.id}
          id={`term-${entry.id}`}
          tabIndex={-1}
          role="listitem"
          className="scroll-mt-[5.5rem] border-b border-[var(--border)]/80 outline-none last:border-b-0"
        >
          <details className="group border-0 bg-transparent open:bg-slate-900/35">
            <summary
              className={cn(
                "flex cursor-pointer list-none items-center gap-2 px-3 py-3 text-left outline-none transition-colors",
                "marker:hidden [&::-webkit-details-marker]:hidden",
                "hover:bg-slate-900/50 focus-visible:bg-slate-900/50 focus-visible:ring-2 focus-visible:ring-cyan-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a12]",
                "sm:px-4",
              )}
            >
              <ChevronDown
                className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                aria-hidden
              />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-1">
                  <span className="font-semibold text-slate-100">{entry.label}</span>
                  <KindTag kind={entry.kind} />
                </span>
              </span>
            </summary>
            <div className="space-y-2 border-t border-[var(--border)]/60 px-3 pb-3 pt-2 text-[11px] text-slate-500 sm:px-4">
              <p className="text-xs">
                <Link href={entry.href} className={linkClass}>
                  Open canonical page →
                </Link>
              </p>
              {entry.description ? <p className="text-xs leading-relaxed text-slate-400">{entry.description}</p> : null}
              <div>
                <p className="mb-0.5 text-slate-500">Canonical</p>
                <p className="font-mono">
                  <Link className="text-[var(--accent)] hover:underline" href={entry.href}>
                    {entry.href}
                  </Link>
                </p>
              </div>
              {entry.tags?.length ? (
                <p className="text-slate-400">
                  <span className="text-slate-500">Tags:</span> {entry.tags.join(", ")}
                </p>
              ) : null}
              {entry.sourceHrefs?.length ? (
                <div>
                  <p className="mb-1 text-slate-500">Sources</p>
                  <ul className="list-inside list-disc space-y-0.5 font-mono text-[10px] text-slate-400">
                    {entry.sourceHrefs.map((h) => (
                      <li key={h}>
                        <Link className="text-emerald-200/85 hover:underline" href={h}>
                          {h}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {entry.relatedHrefs?.length ? (
                <div>
                  <p className="mb-1 text-slate-500">Related</p>
                  <ul className="list-inside list-disc space-y-0.5 font-mono text-[10px] text-slate-400">
                    {entry.relatedHrefs.map((h) => (
                      <li key={h}>
                        <Link className="text-[var(--accent)] hover:underline" href={h}>
                          {h}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {entry.aliases?.length ? (
                <p className="text-slate-400">
                  Also: {entry.aliases.join(", ")}
                </p>
              ) : null}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
