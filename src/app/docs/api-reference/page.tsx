import { DocsContent } from "@/components/layout/DocsContent";
import { CodeExample } from "@/components/ui/CodeExample";
import { DeprecationBanner } from "@/components/ui/DeprecationBanner";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("api");

export default function ApiReferencePage() {
  if (!page) {
    return null;
  }

  return (
    <DocsContent>
      <DeprecationBanner replacementHref="/docs/api" replacementLabel="/docs/api (canonical API docs)" />
      <PageTitle title={page.title} description={page.description} />
      <div className="flex flex-col gap-5">
        <section className="rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs leading-5 text-amber-100 md:text-sm">
          Secondary page: canonical API documentation is <span className="font-semibold">/docs/api</span>.
        </section>
        {page.sections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={section.body}>
            {section.code ? <CodeExample code={section.code} /> : null}
          </SectionBlock>
        ))}
      </div>
    </DocsContent>
  );
}
