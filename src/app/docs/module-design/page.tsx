import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function ModuleDesignPage() {
  return (
    <DocsContent>
      <PageTitle title="Module Design" description="Authority Index" />
      <div className="flex flex-col gap-5">
        <SectionBlock title="Authority Pages" body={[]}>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-200">
            <li>
              <Link href="/docs/architecture" className="text-[var(--accent)] hover:underline">
                /docs/architecture
              </Link>
            </li>
            <li>
              <Link href="/docs/q-agent" className="text-[var(--accent)] hover:underline">
                /docs/q-agent
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
          </ul>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}

