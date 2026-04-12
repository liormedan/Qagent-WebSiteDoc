import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { EndToEndIntegrationTable } from "../EndToEndIntegrationTable";

import { END_TO_END_SUBPAGE_SCOPE_LINKS } from "@/lib/docs-scope-links";

export default function EndToEndIntegrationPointsPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Integration points"
        description="Named cross-layer cuts with pointers to the contracts hub and layer authorities. Payloads and contract_id definitions are not duplicated here."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: End-to-end / Integration points</p>

      <DocsScopeBlocks links={END_TO_END_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[{ title: "Integration table", subtitle: "Cuts and pointers.", href: "#integration-table" }]} />
        </SectionBlock>

        <SectionBlock id="integration-table" title="Integration table" body={[]} summaryPreview="Registry + trace matrix is canonical.">
          <p className="mb-3 text-sm leading-6 text-[var(--muted)]">
            <span className="font-mono text-slate-300">contract_id</span> rows and traceability (→ R → V) live in the{" "}
            <Link className="text-[var(--accent)] hover:underline" href="/docs/contracts">
              Contracts hub
            </Link>{" "}
            and{" "}
            <Link className="text-[var(--accent)] hover:underline" href="/docs/contracts#contract-traceability">
              Contract traceability
            </Link>
            .
          </p>
          <EndToEndIntegrationTable />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
