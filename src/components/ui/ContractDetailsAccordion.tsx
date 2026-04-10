"use client";

import { DocsDetailsAccordion, type DocsDetailsItem } from "@/components/ui/DocsDetailsAccordion";

type ContractAccordionItem = DocsDetailsItem;

export function ContractDetailsAccordion({ items }: { items: ContractAccordionItem[] }) {
  return <DocsDetailsAccordion items={items} />;
}
