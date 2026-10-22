"use client";

import { useState, type ReactNode } from "react";
import { cn } from "cn";

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@studio-blocks/blocks-ui/components/empty";

import type { BlockCategory, CategoryFilter } from "@/features/filters/block-categories";
import { BlockFilters } from "@/features/filters/block-filters";
import type { GalleryBlock } from "@/features/gallery/types";

const columnSpans = {
  1: "col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-2 lg:col-span-3",
} as const;

type GalleryContentProps = {
  blocks: { id: string; category: BlockCategory; colSpan: GalleryBlock["colSpan"]; preview: ReactNode }[];
};

export function GalleryContent({ blocks }: GalleryContentProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const visibleBlocks = category === "all" ? blocks : blocks.filter((block) => block.category === category);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <BlockFilters category={category} onCategoryChange={setCategory} />
        <p className="ml-auto shrink-0 text-[15px] font-[450] text-muted-foreground tabular-nums">
          {visibleBlocks.length} {visibleBlocks.length === 1 ? "block" : "blocks"}
        </p>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {visibleBlocks.length === 0 ? "No blocks found for this category." : `${visibleBlocks.length} blocks found.`}
      </p>
      <div id="block-results">
        {visibleBlocks.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBlocks.map((block) => (
              <div key={block.id} className={cn("min-w-0", columnSpans[block.colSpan])}>
                {block.preview}
              </div>
            ))}
          </div>
        ) : (
          <Empty className="min-h-72">
            <EmptyHeader>
              <EmptyTitle>No blocks found for this category</EmptyTitle>
              <EmptyDescription>We're working to add blocks for all categories.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </div>
  );
}
