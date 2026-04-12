import Link from "next/link";
import type { DocsScopeLink } from "@/lib/docs-scope-links";

export type { DocsScopeLink } from "@/lib/docs-scope-links";

type DocsScopeBlocksProps = {
  /** High-value next-step links (replaces the old generic covers / does-not-cover grid). */
  links: readonly DocsScopeLink[];
  /** Optional short page-specific note (use sparingly). */
  note?: string;
};

export function DocsScopeBlocks({ links, note }: DocsScopeBlocksProps) {
  const hasLinks = links.length > 0;
  if (!hasLinks && !note) return null;

  return (
    <section className="mt-4 rounded-md border border-[var(--border)] bg-slate-950/40 px-3 py-3">
      {note ? <p className="mb-2.5 text-xs leading-5 text-slate-400">{note}</p> : null}
      {hasLinks ? (
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
          {links.map((link) => (
            link.href.includes("#") ? (
              <a
                key={`${link.href}::${link.label}`}
                href={link.href}
                className="inline-flex items-center rounded-md border border-cyan-500/35 bg-cyan-500/10 px-3 py-2 text-sm font-medium leading-snug tracking-[0.01em] text-cyan-100 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/15"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={`${link.href}::${link.label}`}
                href={link.href}
                className="inline-flex items-center rounded-md border border-cyan-500/35 bg-cyan-500/10 px-3 py-2 text-sm font-medium leading-snug tracking-[0.01em] text-cyan-100 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/15"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      ) : null}
    </section>
  );
}
