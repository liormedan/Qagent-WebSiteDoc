"use client";

import { linkConcepts } from "@/lib/docs/auto-link";

export function PageTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-10 space-y-5">
      <h1 className="break-words text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
      <p className="max-w-3xl break-words text-sm text-[var(--muted)] md:text-base">{linkConcepts(description)}</p>
    </div>
  );
}
