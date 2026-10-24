"use client";

import { Suspense, type CSSProperties, type ReactNode } from "react";
import { cn } from "cn";

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@studio-blocks/blocks-ui/components/empty";
import { Skeleton } from "@studio-blocks/blocks-ui/components/skeleton";

import type { BlockCategory } from "@/features/filters/block-categories";
import { BlockFilters } from "@/features/filters/block-filters";
import { updateCategory, useCategoryFilter } from "@/features/filters/use-category-filter";
import type { GalleryBlock } from "@/features/gallery/types";

const columnSpans = {
  1: "col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-2 lg:col-span-3",
} as const;

type GalleryContentProps = {
  blocks: {
    id: string;
    category: BlockCategory;
    colSpan: GalleryBlock["colSpan"];
    rowSpan: number;
    preview: ReactNode;
  }[];
};

export function GalleryContent({ blocks }: GalleryContentProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <Suspense fallback={<BlockFilters onCategoryChange={updateCategory} />}>
          <GalleryFilters blocks={blocks} />
        </Suspense>
      </div>
      <div id="block-results" className="flex flex-1 flex-col">
        <Suspense fallback={<GallerySkeleton />}>
          <GalleryResults blocks={blocks} />
        </Suspense>
      </div>
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="flex min-w-0 flex-col gap-6" aria-busy="true" aria-label="Loading blocks">
      <div className="grid gap-3 sm:auto-rows-63 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index} className="bg-preview **:data-[slot=skeleton]:bg-preview">
            <Skeleton className="h-64 w-full rounded-none motion-reduce:animate-none sm:h-63" />
          </div>
        ))}
      </div>
      <p className="sr-only" role="status">
        Loading blocks.
      </p>
    </div>
  );
}

function GalleryFilters({ blocks }: GalleryContentProps) {
  const [category, setCategory] = useCategoryFilter();
  const count = category === "all" ? blocks.length : blocks.filter((block) => block.category === category).length;
  return (
    <>
      <BlockFilters category={category} onCategoryChange={setCategory} />
      <p className="ml-auto shrink-0 text-[15px] font-[450] text-muted-foreground tabular-nums">
        {count} {count === 1 ? "block" : "blocks"}
      </p>
    </>
  );
}

function GalleryResults({ blocks }: GalleryContentProps) {
  const [category] = useCategoryFilter();
  const visibleBlocks = category === "all" ? blocks : blocks.filter((block) => block.category === category);

  return (
    <>
      <p className="sr-only" role="status" aria-live="polite">
        {visibleBlocks.length === 0 ? "No blocks found for this category." : `${visibleBlocks.length} blocks found.`}
      </p>
      <div className="flex flex-1 flex-col">
        {visibleBlocks.length > 0 ? (
          <div className="grid grid-flow-dense gap-3 sm:auto-rows-63 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBlocks.map((block) => (
              <div
                key={block.id}
                className={cn("min-w-0 sm:row-span-(--preview-row-span)", columnSpans[block.colSpan])}
                style={{ "--preview-row-span": block.rowSpan } as CSSProperties}
              >
                {block.preview}
              </div>
            ))}
          </div>
        ) : (
          <Empty className="min-h-72 **:data-[slot=empty-description]:text-sm **:data-[slot=empty-description]:leading-relaxed **:data-[slot=empty-title]:text-2xl **:data-[slot=empty-title]:font-light">
            <EmptyHeader className="max-w-md gap-1.5">
              <EmptyTitle>No blocks found for this category</EmptyTitle>
              <EmptyDescription>We're working to add blocks for all categories.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </>
  );
}
