"use client";

import { linkConcepts } from "@/lib/docs/auto-link";

export function PageTitle({ title, description }: { title: string; description: string }) {
  const isDraft = description.includes("Status: Draft");
  const cleanDescription = description.replace("Status: Draft - full spec coming later.", "").trim();
  const statusLabel = isDraft ? "Concept" : "Ready for Implementation ✅";
  const statusTone = isDraft
    ? "border-amber-400/40 bg-amber-500/10 text-amber-200"
    : "border-emerald-400/40 bg-emerald-500/10 text-emerald-200";

  return (
    <div className="mb-6 space-y-2">
      <h1 className="break-words text-[2rem] font-semibold leading-tight">{title}</h1>
      <div className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusTone}`}>
        Status: {statusLabel}
      </div>
      <p className="max-w-3xl break-words text-sm text-[var(--muted)]">{linkConcepts(cleanDescription)}</p>
    </div>
  );
}
