"use client";

import { DocsDetailsAccordion, type DocsDetailsItem } from "@/components/ui/DocsDetailsAccordion";

export type LayerSpecItem = DocsDetailsItem;

export function LayerSpecAccordion({ items, defaultOpenAll = false }: { items: LayerSpecItem[]; defaultOpenAll?: boolean }) {
  return <DocsDetailsAccordion items={items} defaultOpenAll={defaultOpenAll} />;
}
