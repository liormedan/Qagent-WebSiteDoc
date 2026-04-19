import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function ImplementationMapPage() {
  return (
    <DocsContent>
      <PageTitle title="Implementation Map" description="Authority Index" />
      <div className="flex flex-col gap-5">
        <SectionBlock title="Authority Pages" body={[]}>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-200">
            <li>
              <Link href="/docs/system-flow" className="text-[var(--accent)] hover:underline">
                /docs/system-flow
              </Link>
            </li>
            <li>
              <Link href="/docs/function-contracts" className="text-[var(--accent)] hover:underline">
                /docs/function-contracts
              </Link>
            </li>
            <li>
              <Link href="/docs/state-machine" className="text-[var(--accent)] hover:underline">
                /docs/state-machine
              </Link>
            </li>
            <li>
              <Link href="/docs/execution-runtime" className="text-[var(--accent)] hover:underline">
                /docs/execution-runtime
              </Link>
            </li>
          </ul>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}

