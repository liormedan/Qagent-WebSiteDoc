import { normalizeDocListText } from "@/lib/docs-text";
import { DocsDiagramNavCard } from "@/components/ui/DocsDiagramNavCard";

export type DocsDiagramStructureGroup = {
  title: string;
  items: string[];
  /** When set, the whole group is a focusable link (same-page anchor). */
  href?: string;
};

type DocsDiagramProps =
  | {
      mode: "structure";
      root: string;
      groups: readonly DocsDiagramStructureGroup[];
    }
  | {
      mode: "flow";
      steps: string[];
    };

export function DocsDiagram(props: DocsDiagramProps) {
  if (props.mode === "flow") {
    return (
      <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          {props.steps.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-center font-medium text-cyan-100">
                {normalizeDocListText(step)}
              </span>
              {index < props.steps.length - 1 ? <span className="text-cyan-300/80">-&gt;</span> : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
      <div className="mx-auto w-full max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">
        {normalizeDocListText(props.root)}
      </div>
      <div className="mx-auto h-4 w-px bg-cyan-400/40" />
      <div className={props.groups.length <= 2 ? "grid gap-3 md:grid-cols-2" : "grid gap-3 md:grid-cols-3"}>
        {props.groups.map((group) => {
          const inner = (
            <>
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-300">{normalizeDocListText(group.title)}</p>
              <div className="mt-2 space-y-1.5 text-sm text-[var(--muted)]">
                {group.items.map((item) => (
                  <div key={`${group.title}-${item}`} className="rounded-md border border-[var(--border)]/70 bg-slate-950/20 px-2.5 py-1.5 text-center leading-6">
                    {normalizeDocListText(item)}
                  </div>
                ))}
              </div>
            </>
          );
          const cardClass =
            "rounded-md border border-[var(--border)] bg-slate-950/40 p-3 hover:border-cyan-400/35 hover:bg-slate-900/50 focus-visible:ring-2 focus-visible:ring-cyan-400/50";

          if (group.href) {
            return (
              <DocsDiagramNavCard key={group.title} href={group.href} className={cardClass}>
                {inner}
              </DocsDiagramNavCard>
            );
          }

          return (
            <div key={group.title} className={cardClass}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
