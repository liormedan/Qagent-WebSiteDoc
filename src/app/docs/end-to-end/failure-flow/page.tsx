import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { END_TO_END_SUBPAGE_SCOPE_LINKS } from "@/lib/docs-scope-links";

export default function EndToEndFailureFlowPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Failure flow"
        description="System-level failure posture: which authority owns envelopes and validation rejections. No per-code catalogs here."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: End-to-end / Failure flow</p>

      <DocsScopeBlocks links={END_TO_END_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[{ title: "Failure posture", subtitle: "Pointers.", href: "#failure-posture" }]} />
        </SectionBlock>

        <SectionBlock id="failure-posture" title="Failure posture" body={[]} summaryPreview="Own boundary, own envelope.">
          <div className="space-y-3 text-sm leading-6 text-[var(--muted)]">
            <p>At system scope, failures surface through the documented envelope and stage gate for the boundary where they occur.</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Client-visible failures:{" "}
                <Link className="text-[var(--accent)] hover:underline" href="/docs/client/error-model">
                  Client Error Model
                </Link>
                .
              </li>
              <li>
                Protected HTTP / API auth failures:{" "}
                <Link className="text-[var(--accent)] hover:underline" href="/docs/auth-security/error-contracts">
                  Auth error contracts
                </Link>
                , context in{" "}
                <Link className="text-[var(--accent)] hover:underline" href="/docs/auth-security/system-flow">
                  Auth system flow
                </Link>
                .
              </li>
              <li>
                Contract / ingress validation:{" "}
                <Link className="text-[var(--accent)] hover:underline" href="/docs/contracts#validation-strategy">
                  Validation strategy (V01–V05)
                </Link>
                .
              </li>
            </ul>
            <p className="text-xs text-slate-500">
              A failure at one cut does not reassign ownership or ordering from system-runtime or auth-security system-flow.
            </p>
          </div>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
