"use client";

import { Suspense, type CSSProperties, type ReactNode } from "react";
import { cn } from "cn";

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@studio-blocks/blocks-ui/components/empty";
import { Skeleton } from "@studio-blocks/blocks-ui/components/skeleton";

import { BlockFilters } from "@/features/filters/block-filters";
import { updateCategory, useCategoryFilter } from "@/features/filters/use-category-filter";
import type { GalleryBlock } from "@/features/gallery/types";

const columnSpans = {
  1: "col-span-1",
  2: "@min-[38rem]/gallery:col-span-2",
  3: "@min-[38rem]/gallery:col-span-2 @min-[58rem]/gallery:col-span-3",
} as const;

const galleryGridClassName =
  "grid grid-flow-dense grid-cols-1 gap-3 @min-[38rem]/gallery:auto-rows-63 @min-[38rem]/gallery:grid-cols-2 @min-[58rem]/gallery:grid-cols-3";

type GalleryContentProps = {
  blocks: (Pick<GalleryBlock, "id" | "category" | "colSpan" | "rowSpan"> & {
    preview: ReactNode;
  })[];
};

export function GalleryContent({ blocks }: GalleryContentProps) {
  return (
    <div className="@container/gallery flex min-w-0 flex-1 flex-col gap-6">
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
    <div className="min-w-0" aria-busy="true" aria-label="Loading blocks">
      <div className={cn(galleryGridClassName, "**:data-[slot=skeleton]:bg-preview")} aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <Skeleton
            key={index}
            className="h-64 w-full rounded-none motion-reduce:animate-none @min-[38rem]/gallery:h-63"
          />
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
      {visibleBlocks.length > 0 ? (
        <div className={galleryGridClassName}>
          {visibleBlocks.map((block) => (
            <div
              key={block.id}
              className={cn(
                "min-h-0 min-w-0 @min-[38rem]/gallery:row-span-(--preview-row-span)",
                columnSpans[block.colSpan],
              )}
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
    </>
  );
}
