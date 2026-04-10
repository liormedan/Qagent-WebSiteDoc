"use client";

import { DocsDetailsAccordion, type DocsDetailsItem } from "@/components/ui/DocsDetailsAccordion";

type EngineAccordionItem = DocsDetailsItem;

export function EngineDetailsAccordion({ items }: { items: EngineAccordionItem[] }) {
  return <DocsDetailsAccordion items={items} />;
}
