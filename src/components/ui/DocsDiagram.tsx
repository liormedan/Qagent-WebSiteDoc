import { normalizeDocListText } from "@/lib/docs-text";

type StructureGroup = {
  title: string;
  items: string[];
};

type DocsDiagramProps =
  | {
      mode: "structure";
      root: string;
      groups: StructureGroup[];
    }
  | {
      mode: "flow";
      steps: string[];
    };

export function DocsDiagram(props: DocsDiagramProps) {
  if (props.mode === "flow") {
    return (
      <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {props.steps.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 font-medium text-cyan-100">
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
        {props.groups.map((group) => (
          <div key={group.title} className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{normalizeDocListText(group.title)}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {group.items.map((item) => (
                <li key={`${group.title}-${item}`}>{normalizeDocListText(item)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
