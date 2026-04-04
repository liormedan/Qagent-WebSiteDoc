import { HStack, Stack } from "@chakra-ui/react";
import { DocsContent } from "@/components/layout/DocsContent";
import { CodeExample } from "@/components/ui/CodeExample";
import { InfoCard } from "@/components/ui/InfoCard";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("q-agent");

export default function QAgentPage() {
  if (!page) {
    return null;
  }

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
      <HStack align="stretch" gap={4} flexDir={{ base: "column", md: "row" }} mt={8}>
        {page.infoCards?.map((card) => (
          <InfoCard key={card.title} title={card.title} description={card.description} />
        ))}
      </HStack>
    </DocsContent>
  );
}