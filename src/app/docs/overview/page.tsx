import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { CodeExample } from "@/components/ui/CodeExample";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("overview");

export default function OverviewPage() {
  if (!page) {
    return null;
  }

  return (
    <DocsContent>
      <PageTitle title={page.title} description={page.description} />
      <div className="flex flex-col gap-5">
        {page.sections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={section.body}>
            {section.code ? <CodeExample code={section.code} /> : null}
          </SectionBlock>
        ))}

        <SectionBlock
          title="Recommended Read Order"
          body={["Read in this order to move from conceptual spec to implementation planning."]}
        >
          <ol className="list-decimal space-y-1 ps-5">
            <li><Link href="/docs/contracts" className="text-[var(--accent)] hover:underline">/docs/contracts</Link></li>
            <li><Link href="/docs/reasoning-system" className="text-[var(--accent)] hover:underline">/docs/reasoning-system</Link></li>
            <li><Link href="/docs/state-machine" className="text-[var(--accent)] hover:underline">/docs/state-machine</Link></li>
            <li><Link href="/docs/implementation-map" className="text-[var(--accent)] hover:underline">/docs/implementation-map</Link></li>
            <li><Link href="/docs/function-contracts" className="text-[var(--accent)] hover:underline">/docs/function-contracts</Link></li>
          </ol>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}

