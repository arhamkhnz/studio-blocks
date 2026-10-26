"use client";

import type { ReactNode } from "react";

import { ToggleGroup, ToggleGroupItem } from "@studio-blocks/blocks-ui/components/toggle-group";

import { blockCategories, type CategoryFilter } from "@/features/filters/block-categories";

type BlockFiltersProps = {
  category?: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  children?: ReactNode;
};

export function BlockFilters({ category, onCategoryChange, children }: BlockFiltersProps) {
  return (
    <ToggleGroup
      aria-label="Block categories"
      className="-ml-2.5 min-w-0 flex-1 flex-wrap **:data-[slot=toggle-group-item]:text-[15px] **:data-[slot=toggle-group-item]:font-[450] [&_[data-slot=toggle-group-item][aria-pressed=false]]:text-muted-foreground [&_[data-slot=toggle-group-item][aria-pressed=true]]:bg-transparent [&_[data-slot=toggle-group-item][aria-pressed=true]]:text-foreground"
      value={category ? [category] : []}
      multiple={false}
      onValueChange={(values) => {
        const nextCategory = blockCategories.find((item) => item.value === values[0]);
        if (nextCategory) onCategoryChange(nextCategory.value);
      }}
    >
      {blockCategories.map((item) => (
        <ToggleGroupItem key={item.value} value={item.value} aria-controls="block-results">
          {item.label}
        </ToggleGroupItem>
      ))}
      {children}
    </ToggleGroup>
  );
}
