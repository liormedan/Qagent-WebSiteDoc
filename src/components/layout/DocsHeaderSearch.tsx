"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  glossarySearchScopeForFilter,
  normalizeSearchQuery,
  searchDocsNavPages,
  searchGlossaryTerms,
} from "@/lib/searchGlossary";

const DEBOUNCE_MS = 200;

export function DocsHeaderSearch() {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [rawQuery, setRawQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(rawQuery), DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [rawQuery]);

  const scope = glossarySearchScopeForFilter(pathname);
  const q = normalizeSearchQuery(debounced);
  const termHits = q ? searchGlossaryTerms(debounced, { scope, limit: 5 }) : [];
  const pageHits = q ? searchDocsNavPages(debounced) : [];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setRawQuery("");
      setDebounced("");
      router.push(href);
    },
    [router],
  );

  const showPanel = open && q.length > 0 && (termHits.length > 0 || pageHits.length > 0);

  return (
    <div ref={wrapRef} className="relative w-full min-w-0">
      <Input
        value={rawQuery}
        onChange={(e) => {
          setRawQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search documentation"
        aria-label="Search documentation"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls={showPanel ? listId : undefined}
        aria-autocomplete="list"
        className="h-9 border-slate-700/90 bg-slate-950/60 text-sm text-slate-100 placeholder:text-slate-500"
      />
      {showPanel ? (
        <div
          id={listId}
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-[60] w-[min(calc(100vw-2rem),22rem)] overflow-hidden rounded-lg border border-slate-700/90 bg-[#070a12] shadow-xl ring-1 ring-white/[0.05]"
        >
          {termHits.length > 0 ? (
            <div className="border-b border-slate-800/90 px-2 py-1.5">
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Terms</p>
              <ul className="max-h-[220px] overflow-y-auto">
                {termHits.map(({ entry, score, canonicalHref, onPageHref }) => (
                  <li key={entry.id} className="rounded-md hover:bg-slate-800/90">
                    <button
                      type="button"
                      role="option"
                      aria-selected={false}
                      className="flex w-full flex-col gap-0.5 px-2 py-2 text-left text-sm text-slate-100"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => go(canonicalHref)}
                    >
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="font-semibold text-cyan-100/95">{entry.label}</span>
                        {entry.kind !== "other" ? (
                          <span className="rounded border border-slate-600/80 px-1 py-px text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                            {entry.kind}
                          </span>
                        ) : null}
                        <span className="sr-only">score {score}</span>
                      </span>
                      {entry.description ? (
                        <span className="line-clamp-2 text-xs leading-snug text-slate-400">{entry.description}</span>
                      ) : null}
                    </button>
                    <div className="px-2 pb-2">
                      <Link
                        href={`/docs/terminology${onPageHref}`}
                        className="text-[11px] font-medium text-slate-500 hover:text-cyan-200/90 hover:underline"
                        onClick={() => setOpen(false)}
                      >
                        See in terminology
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {pageHits.length > 0 ? (
            <div className="px-2 py-1.5">
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Pages</p>
              <ul className="max-h-[200px] overflow-y-auto">
                {pageHits.map((p) => (
                  <li key={p.href}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={false}
                      className="flex w-full flex-col gap-0.5 rounded-md px-2 py-2 text-left hover:bg-slate-800/90"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => go(p.href)}
                    >
                      <span className="text-sm font-semibold text-slate-100">{p.title}</span>
                      <span className="line-clamp-2 text-xs text-slate-500">{p.subtitle}</span>
                      <span className="sr-only">score {p.score}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="border-t border-slate-800/80 px-3 py-2 text-center">
            <Link
              href="/docs/terminology"
              className={cn("text-xs font-medium text-slate-400 hover:text-cyan-200/90 hover:underline")}
              onClick={() => setOpen(false)}
            >
              Open terminology index
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
