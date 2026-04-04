import Link from "next/link";
import { CONCEPTS } from "@/lib/docs/concept-registry";

export function ConceptLink({
  conceptId,
  text,
  expandable = false,
}: {
  conceptId: string;
  text?: string;
  expandable?: boolean;
}) {
  const concept = CONCEPTS.find((item) => item.id === conceptId);
  if (!concept) return <>{text ?? conceptId}</>;

  return (
    <span className="group relative inline">
      <Link
        href={concept.href}
        className="font-medium underline decoration-2 decoration-cyan-500/80 underline-offset-4 transition-colors hover:text-cyan-300"
      >
        {text ?? concept.label}
      </Link>
      {expandable ? (
        <>
          {" "}
          <Link href={concept.href} className="text-xs text-[var(--accent)] hover:underline">
            {"[View Spec ->]"}
          </Link>
        </>
      ) : null}
      {concept.description ? (
        <span className="pointer-events-none absolute top-[120%] left-0 z-30 min-w-[220px] max-w-xs rounded-md border border-[var(--border)] bg-slate-950 p-2 text-xs text-slate-200 opacity-0 shadow-lg transition-opacity duration-150 ease-out invisible group-hover:visible group-hover:opacity-100">
          <span className="block font-semibold text-slate-100">{concept.label}</span>
          <span className="mt-1 block text-slate-300">{concept.description}</span>
          <span className="mt-1 block text-cyan-300">{concept.href}</span>
        </span>
      ) : null}
    </span>
  );
}
