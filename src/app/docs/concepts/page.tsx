import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { CANONICAL_CONCEPT_REGISTRY } from "@/lib/docs/concept-registry";

export default function ConceptsPage() {
  return (
    <DocsContent>
      <PageTitle title="Concept Registry" description="Single source of truth for canonical WaveQ concepts and their ownership." />
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>

      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Purpose"
          body={["Define one canonical concept map to prevent duplication, ambiguous naming, and conflicting page ownership."]}
          collapsible
        />

        <SectionBlock title="Canonical Registry" body={["Each concept has one canonical page and one owning layer/domain."]} collapsible>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold">Concept</th>
                  <th className="px-3 py-2 font-semibold">Description</th>
                  <th className="px-3 py-2 font-semibold">Canonical Location</th>
                  <th className="px-3 py-2 font-semibold">Owned By</th>
                </tr>
              </thead>
              <tbody>
                {CANONICAL_CONCEPT_REGISTRY.map((item) => (
                  <tr key={item.concept} className="border-t border-[var(--border)] text-slate-300">
                    <td className="px-3 py-2 font-medium text-slate-100">{item.concept}</td>
                    <td className="px-3 py-2">{item.description}</td>
                    <td className="px-3 py-2">
                      <Link href={item.canonical_page} className="text-[var(--accent)] hover:underline">
                        {item.canonical_page}
                      </Link>
                    </td>
                    <td className="px-3 py-2">{item.owned_by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
