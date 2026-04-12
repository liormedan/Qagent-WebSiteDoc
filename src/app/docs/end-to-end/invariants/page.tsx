import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { END_TO_END_INVARIANTS, END_TO_END_LAYER_EXPORT, END_TO_END_LAYER_SPEC_VERSION } from "@/lib/end-to-end-layer-spec";

import { END_TO_END_SUBPAGE_SCOPE_LINKS } from "@/lib/docs-scope-links";

const machineExport = JSON.stringify(END_TO_END_LAYER_EXPORT, null, 2);

export default function EndToEndInvariantsPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Invariants"
        description="Global system rules with one authority href each. Machine export for tooling."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: End-to-end / Invariants</p>

      <DocsScopeBlocks links={END_TO_END_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Invariants", subtitle: "E2E-INV rules.", href: "#invariants-list" },
              { title: "Machine export", subtitle: "JSON.", href: "#machine-export" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="invariants-list" title="Invariants" body={[]} summaryPreview="Global rules.">
          <p className="mb-2 text-xs font-mono text-slate-500">spec_version={END_TO_END_LAYER_SPEC_VERSION}</p>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-200">
            {END_TO_END_INVARIANTS.map((inv) => (
              <li key={inv.id} className="scroll-mt-28">
                <span className="font-mono text-xs text-cyan-200/90">{inv.id}</span>
                <p className="mt-1 text-[var(--muted)]">{inv.statement}</p>
                <p className="mt-1 font-mono text-[11px]">
                  <Link className="text-[var(--accent)] hover:underline" href={inv.authority_href}>
                    {inv.authority_href}
                  </Link>
                </p>
              </li>
            ))}
          </ol>
        </SectionBlock>

        <SectionBlock id="machine-export" title="Machine export" body={[]}>
          <pre className="max-h-[min(50vh,360px)] overflow-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
            <code>{machineExport}</code>
          </pre>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
