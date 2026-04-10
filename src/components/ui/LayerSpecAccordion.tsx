"use client";

import { DocsDetailsAccordion, type DocsDetailsItem } from "@/components/ui/DocsDetailsAccordion";

export type LayerSpecItem = DocsDetailsItem;

export function LayerSpecAccordion({ items }: { items: LayerSpecItem[] }) {
  return <DocsDetailsAccordion items={items} />;
}
