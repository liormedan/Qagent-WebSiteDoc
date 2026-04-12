import Link from "next/link";
import { findGlossarySegments } from "@/lib/findGlossaryMatches";
import { normalizeDocListText } from "@/lib/docs-text";
import { cn } from "@/lib/utils";

const linkClass = "font-medium text-[var(--accent)] hover:underline";

type AutoLinkedTextProps = {
  text: string;
  /** When set, only glossary entries that include this scope (or have no scope restriction) are used. */
  scope?: string;
  /** Alias for `scope` (same behavior). */
  glossaryScope?: string;
  className?: string;
};

/** Renders prose with glossary-driven internal links (longest match, first mention per entry, skips `code`). */
export function AutoLinkedText({ text, scope, glossaryScope, className }: AutoLinkedTextProps) {
  const normalized = normalizeDocListText(text);
  const segments = findGlossarySegments(normalized, { scope: glossaryScope ?? scope });

  const inner = segments.map((seg, i) => {
    if (seg.type === "text") {
      return <span key={`t-${i}`}>{seg.text}</span>;
    }
    return (
      <Link key={`l-${i}-${seg.entryId}`} href={seg.href} className={linkClass}>
        {seg.text}
      </Link>
    );
  });

  return <span className={className}>{inner}</span>;
}
