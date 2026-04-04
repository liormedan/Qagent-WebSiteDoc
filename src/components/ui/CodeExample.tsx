"use client";

export function CodeExample({ code }: { code: string }) {
  return (
    <pre className="mt-1 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950 p-4 text-sm whitespace-pre-wrap break-words">
      <code>{code}</code>
    </pre>
  );
}
