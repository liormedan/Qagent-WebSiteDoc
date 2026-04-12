import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { contractTraceDomId } from "@/lib/contract-runtime-trace";
import { EVENTS_MAP_EXPORT, EVENTS_MAP_PHASES } from "@/lib/events-map";

import { EVENTS_MAP_SCOPE_LINKS } from "@/lib/docs-scope-links";

const machineExport = JSON.stringify(EVENTS_MAP_EXPORT, null, 2);

export default function EventsMapPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Events map"
        description="E01–E12 phases aligned to R01–R12: event plane, registry contract_ids, and narrative links. No alternate ordering versus system-runtime."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">WaveQ / Cross-layer</p>

      <DocsScopeBlocks links={EVENTS_MAP_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Cross-layer event posture keyed to the product spine.">
          <DocsOverviewBlock
            intro="Each E phase shares the same cut as the corresponding R step. event_plane is the contracts registry direction label for that cut. contract_ids list registry rows touched at that step; trace rows and V stages live on the Contracts hub."
            areasTitle="Non-goals"
            areas={[
              "Does not replace Client Event Contract field semantics.",
              "Does not replace Auth S/B HTTP ordering.",
              "Does not add payload fields beyond registry + authority targets.",
            ]}
            outOfScope="Alternate lifecycles, marketing language, and implementation file paths."
            relatedBoundaries={["system-runtime: R ordering.", "contracts: contract_id registry and validation JSON.", "client/event-flow: client sequence narrative."]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Overview", subtitle: "Role.", href: "#overview" },
              { title: "Phases E01–E12", subtitle: "Table.", href: "#events-table" },
              { title: "Machine export", subtitle: "JSON.", href: "#machine-export" },
              { title: "Related docs", subtitle: "Authorities.", href: "#related-docs" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="events-table" title="Phases E01–E12" body={[]}>
          <div className="overflow-x-auto rounded-md border border-[var(--border)]">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">phase</th>
                  <th className="px-3 py-2">runtime</th>
                  <th className="px-3 py-2">event_plane</th>
                  <th className="px-3 py-2">contract_id</th>
                  <th className="px-3 py-2">authority</th>
                  <th className="px-3 py-2">narrative</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/80 text-slate-200">
                {EVENTS_MAP_PHASES.map((row) => (
                  <tr key={row.phase} className="bg-slate-950/30">
                    <td className="px-3 py-2 font-mono text-xs text-cyan-100/90">{row.phase}</td>
                    <td className="px-3 py-2 font-mono text-xs">{row.runtime_step}</td>
                    <td className="px-3 py-2 font-mono text-xs text-slate-300">{row.event_plane}</td>
                    <td className="px-3 py-2 align-top font-mono text-[11px] leading-5 text-emerald-100/90">
                      {row.contract_ids.map((cid) => (
                        <span key={cid} className="block">
                          <Link className="text-[var(--accent)] hover:underline" href={`/docs/contracts#${contractTraceDomId(cid)}`}>
                            {cid}
                          </Link>
                        </span>
                      ))}
                    </td>
                    <td className="px-3 py-2 font-mono text-[11px]">
                      <Link className="text-[var(--accent)] hover:underline" href={row.authority_href}>
                        {row.authority_href}
                      </Link>
                    </td>
                    <td className="px-3 py-2 font-mono text-[11px]">
                      <Link className="text-[var(--accent)] hover:underline" href={row.narrative_href}>
                        {row.narrative_href}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>

        <SectionBlock id="machine-export" title="Machine export" body={[]}>
          <pre className="max-h-[min(70vh,480px)] overflow-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
            <code>{machineExport}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/system-runtime", title: "System runtime", description: "R01–R12 spine." },
              { href: "/docs/contracts", title: "Contracts hub", description: "Registry + traceability." },
              { href: "/docs/client/event-flow", title: "Client event flow", description: "Client sequence narrative." },
              { href: "/docs/terminology", title: "Terminology", description: "Glossary pointers." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
