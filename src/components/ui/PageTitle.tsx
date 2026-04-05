"use client";

import { linkConcepts } from "@/lib/docs/auto-link";

export function PageTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6 space-y-2">
      <h1 className="break-words text-[2rem] font-semibold leading-tight">{title}</h1>
      <p className="max-w-3xl break-words text-sm text-[var(--muted)]">{linkConcepts(description)}</p>
    </div>
  );
}
