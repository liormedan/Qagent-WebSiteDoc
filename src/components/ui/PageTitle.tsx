"use client";

import { linkConcepts } from "@/lib/docs/auto-link";

/** Strip legacy UI-injected phrases so body copy stays clean (metadata is not shown as a badge anymore). */
function normalizeDescription(description: string): string {
  return description
    .replace("Status: Draft - full spec coming later.", "")
    .replace(/\s+Status: Ready for Implementation\s*$/i, "")
    .trim();
}

export function PageTitle({ title, description }: { title: string; description: string }) {
  const displayDescription = normalizeDescription(description);

  return (
    <div className="mb-6 space-y-2">
      <h1 className="break-words text-[2rem] font-semibold leading-tight">{title}</h1>
      {displayDescription ? (
        <p className="max-w-3xl break-words text-sm text-[var(--muted)]">{linkConcepts(displayDescription)}</p>
      ) : null}
    </div>
  );
}
