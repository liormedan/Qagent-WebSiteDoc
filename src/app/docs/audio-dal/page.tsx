import { DocsContent } from "@/components/layout/DocsContent";
import { CodeExample } from "@/components/ui/CodeExample";
import { DeprecationBanner } from "@/components/ui/DeprecationBanner";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("audio-dal");

export default function AudioDalPage() {
  if (!page) {
    return null;
  }

  return (
    <DocsContent>
      <DeprecationBanner replacementHref="/docs/dal-integration" replacementLabel="/docs/dal-integration" />
      <PageTitle title={page.title} description={page.description} />
      <div className="flex flex-col gap-5">
        {page.sections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={section.body}>
            {section.code ? <CodeExample code={section.code} /> : null}
          </SectionBlock>
        ))}
      </div>
    </DocsContent>
  );
}


