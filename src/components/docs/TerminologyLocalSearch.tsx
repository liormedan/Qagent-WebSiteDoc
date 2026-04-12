"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import type { GlossaryEntry, GlossaryKind } from "@/lib/docs-glossary";
import { searchGlossaryTerms } from "@/lib/searchGlossary";

function KindTag({ kind }: { kind: GlossaryKind }) {
  if (kind === "other") return null;
  return (
    <span className="ml-2 rounded border border-slate-600/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
      {kind}
    </span>
  );
}

export function TerminologyLocalSearch({ pool }: { pool: readonly GlossaryEntry[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchGlossaryTerms(query, { pool, limit: 10 }), [query, pool]);

  return (
    <div className="rounded-lg border border-[var(--border)] bg-slate-950/30 p-3 sm:p-4">
      <h2 id="terminology-local-search-heading" className="mb-2 text-base font-semibold tracking-tight text-slate-100">
        Search this glossary
      </h2>
      <label htmlFor="terminology-local-search" className="sr-only">
        Search terms in this glossary
      </label>
      <Input
        id="terminology-local-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search terms in this glossary"
        aria-labelledby="terminology-local-search-heading"
        aria-describedby="terminology-local-search-hint"
        className="h-10 border-slate-700/90 bg-slate-950/60 text-sm text-slate-100 placeholder:text-slate-500"
      />
      <p id="terminology-local-search-hint" className="mt-2 text-xs text-slate-500">
        Matches labels, aliases, tags, and short descriptions. Jump to a row on this page or open the canonical doc.
      </p>

      {query.trim() && results.length > 0 ? (
        <div className="mt-4 border-t border-[var(--border)]/80 pt-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">Search results</p>
          <ul className="space-y-2">
            {results.map(({ entry, canonicalHref, onPageHref }) => (
              <li
                key={entry.id}
                className="rounded-md border border-[var(--border)]/80 bg-slate-950/40 px-3 py-2.5 text-sm text-slate-200"
              >
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-semibold text-cyan-100/95">{entry.label}</span>
                  <KindTag kind={entry.kind} />
                </div>
                {entry.description ? <p className="mt-1 text-xs leading-snug text-slate-400">{entry.description}</p> : null}
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  <Link className="font-medium text-[var(--accent)] hover:underline" href={canonicalHref}>
                    Open canonical: {canonicalHref}
                  </Link>
                  <a
                    className="font-medium text-emerald-200/90 hover:underline"
                    href={onPageHref}
                    onClick={() => {
                      queueMicrotask(() => {
                        const id = onPageHref.startsWith("#") ? onPageHref.slice(1) : `term-${entry.id}`;
                        const host = document.getElementById(id);
                        const details = host?.querySelector("details");
                        if (details) (details as HTMLDetailsElement).open = true;
                      });
                    }}
                  >
                    On this page ↓
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {query.trim() && results.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">No matching glossary rows for that query.</p>
      ) : null}
    </div>
  );
}
