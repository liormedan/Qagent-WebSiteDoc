import Link from "next/link";
import type { ReactNode } from "react";
import { getGlossaryEntryById } from "@/lib/docs-glossary";
import { cn } from "@/lib/utils";

const linkClass = "font-medium text-[var(--accent)] hover:underline";

/** Explicit glossary-controlled link (canonical href from registry). */
export function TermLink({
  termId,
  children,
  className,
}: {
  termId: string;
  children: ReactNode;
  className?: string;
}) {
  const entry = getGlossaryEntryById(termId);
  if (!entry) {
    return <span className={className}>{children}</span>;
  }
  return (
    <Link href={entry.href} className={cn(linkClass, className)}>
      {children}
    </Link>
  );
}
