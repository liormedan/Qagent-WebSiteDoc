import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-md border border-[var(--border)] bg-slate-900 px-3 text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-[var(--accent)]",
        className,
      )}
      {...props}
    />
  );
}
