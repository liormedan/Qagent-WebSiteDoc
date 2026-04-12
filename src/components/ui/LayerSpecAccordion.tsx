"use client";

import {
  DocsDetailsAccordion,
  type DocsDetailsItem,
  type DocsDetailsSummaryVariant,
} from "@/components/ui/DocsDetailsAccordion";

export type LayerSpecItem = DocsDetailsItem;

export function LayerSpecAccordion({
  items,
  defaultOpenAll = false,
  summaryVariant,
}: {
  items: LayerSpecItem[];
  defaultOpenAll?: boolean;
  summaryVariant?: DocsDetailsSummaryVariant;
}) {
  return <DocsDetailsAccordion items={items} defaultOpenAll={defaultOpenAll} summaryVariant={summaryVariant} />;
}
