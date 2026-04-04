import { Stack } from "@chakra-ui/react";
import { DocsContent } from "@/components/layout/DocsContent";
import { CodeExample } from "@/components/ui/CodeExample";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("audio-comparison/comparison-model");

export default function AudioComparisonModelPage() {
  if (!page) return null;
  return (
    <DocsContent>
      <PageTitle title={page.title} description={page.description} />
      <Stack gap={5}>
        {page.sections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={section.body}>
            {section.code ? <CodeExample code={section.code} /> : null}
          </SectionBlock>
        ))}
      </Stack>
    </DocsContent>
  );
}
