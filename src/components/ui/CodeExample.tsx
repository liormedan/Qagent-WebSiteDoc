"use client";

import { useDocsReadMode } from "@/components/layout/DocsReadModeContext";

export function CodeExample({ code }: { code: string }) {
  const { mode } = useDocsReadMode();
  if (mode !== "technical") return null;

  return (
    <pre className="mt-1 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950 p-4 text-sm whitespace-pre-wrap break-words">
      <code>{code}</code>
    </pre>
  );
}
