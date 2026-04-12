"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Same-page anchor card: Space activates like click (native links only handle Enter). */
export function DocsDiagramNavCard({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={cn("block no-underline outline-none transition-colors", className)}
      onKeyDown={(e) => {
        if (e.key === " ") {
          e.preventDefault();
          (e.currentTarget as HTMLAnchorElement).click();
        }
      }}
    >
      {children}
    </a>
  );
}
