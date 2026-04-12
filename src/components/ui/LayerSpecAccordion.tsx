"use client";

import {
  DocsDetailsAccordion,
  type DocsDetailsAccordionVariant,
  type DocsDetailsItem,
  type DocsDetailsSummaryVariant,
} from "@/components/ui/DocsDetailsAccordion";

export type LayerSpecItem = DocsDetailsItem;

export function LayerSpecAccordion({
  items,
  defaultOpenAll = false,
  summaryVariant,
  variant,
}: {
  items: LayerSpecItem[];
  defaultOpenAll?: boolean;
  summaryVariant?: DocsDetailsSummaryVariant;
  variant?: DocsDetailsAccordionVariant;
}) {
  return (
    <DocsDetailsAccordion
      items={items}
      defaultOpenAll={defaultOpenAll}
      summaryVariant={summaryVariant}
      variant={variant}
    />
  );
}
