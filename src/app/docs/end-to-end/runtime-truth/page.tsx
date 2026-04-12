import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { END_TO_END_SUBPAGE_SCOPE_LINKS } from "@/lib/docs-scope-links";

export default function EndToEndRuntimeTruthPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Runtime truth"
        description="Pointers to the sole product runtime spine (R), events map (E), and parallel auth spine (S/B). No step definitions on this page."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: End-to-end / Runtime truth</p>

      <DocsScopeBlocks links={END_TO_END_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[{ title: "Runtime pointers", subtitle: "Authorities only.", href: "#runtime-pointers" }]} />
        </SectionBlock>

        <SectionBlock id="runtime-pointers" title="Runtime pointers" body={[]} summaryPreview="Single sources of ordering truth.">
          <div className="space-y-3 text-sm leading-6 text-[var(--muted)]">
            <p>
              Product runtime order:{" "}
              <Link className="font-medium text-[var(--accent)] hover:underline" href="/docs/system-runtime">
                /docs/system-runtime
              </Link>{" "}
              (R01–R12, <span className="font-mono text-slate-400">authority_href</span> and <span className="font-mono text-slate-400">contract_ids</span> per step).
            </p>
            <p>
              Event-plane alignment:{" "}
              <Link className="font-medium text-[var(--accent)] hover:underline" href="/docs/events-map">
                /docs/events-map
              </Link>
              .
            </p>
            <p>
              Protected HTTP and bootstrap order:{" "}
              <Link className="font-medium text-[var(--accent)] hover:underline" href="/docs/auth-security/system-flow">
                /docs/auth-security/system-flow
              </Link>{" "}
              (S/B; parallel invariant from system-runtime export).
            </p>
          </div>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
