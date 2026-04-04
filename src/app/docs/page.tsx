import { SimpleGrid } from "@chakra-ui/react";
import { DocsContent } from "@/components/layout/DocsContent";
import { NavCard } from "@/components/ui/NavCard";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { docsNavigation } from "@/lib/navigation";

export default function DocsIndexPage() {
  return (
    <DocsContent>
      <PageTitle
        title="WaveQ Documentation"
        description="Product and technical documentation for Q Agent and audio.dal."
      />
      <SectionBlock
        title="Overview"
        body={[
          "This docs site is a foundation for product docs, technical specs, and engineering planning.",
          "Use the navigation cards below to access the initial documentation sections.",
        ]}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        {docsNavigation.map((item) => (
          <NavCard key={item.href} {...item} />
        ))}
      </SimpleGrid>
    </DocsContent>
  );
}