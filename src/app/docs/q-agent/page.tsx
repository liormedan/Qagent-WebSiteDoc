import { DocsContent } from "@/components/layout/DocsContent";
import { CodeExample } from "@/components/ui/CodeExample";
import { InfoCard } from "@/components/ui/InfoCard";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { DeprecationBanner } from "@/components/ui/DeprecationBanner";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("q-agent");

export default function QAgentPage() {
  if (!page) {
    return null;
  }

  return (
    <DocsContent>
      <DeprecationBanner replacementHref="/docs" replacementLabel="/docs (QAgent layer home)" />
      <PageTitle title={page.title} description={page.description} />
      <div className="flex flex-col gap-5">
        <section className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs leading-5 text-emerald-100 md:text-sm">
          QAgent Layer — LOCKED
          <br />
          Version: v1.0
          <br />
          Status: Production-ready (documentation)
        </section>
        {page.sections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={section.body}>
            {section.code ? <CodeExample code={section.code} /> : null}
          </SectionBlock>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-stretch gap-4 md:flex-row">
        {page.infoCards?.map((card) => (
          <InfoCard key={card.title} title={card.title} description={card.description} />
        ))}
      </div>
    </DocsContent>
  );
}



