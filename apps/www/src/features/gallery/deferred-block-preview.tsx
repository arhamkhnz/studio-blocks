"use client";

import { Suspense, type CSSProperties } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { Skeleton } from "@studio-blocks/blocks-ui/components/skeleton";

import { BlockPreview } from "@/features/gallery/block-preview";
import { previewComponents } from "@/features/gallery/lazy-preview-components";
import { PreviewErrorBoundary } from "@/features/gallery/preview-error-boundary";
import type { GalleryBlock } from "@/features/gallery/types";

type DeferredBlockPreviewProps = Pick<GalleryBlock, "id" | "title" | "colSpan" | "rowSpan" | "iframe"> & {
  mobileHeight?: number;
};

function EmptyPreview() {
  return null;
}

export function DeferredBlockPreview({ mobileHeight, rowSpan, ...block }: DeferredBlockPreviewProps) {
  const { ref, inView } = useInView({
    rootMargin: "400px 0px",
    triggerOnce: true,
    fallbackInView: true,
  });
  // Keep a minimum mobile footprint after mounting too. Desktop height comes from the gallery rows.
  const height = Math.max(256, mobileHeight ?? (block.iframe ? 768 : rowSpan * 252 + (rowSpan - 1) * 12));
  const Component = block.iframe ? EmptyPreview : previewComponents[block.id];
  const placeholder = (
    <Link
      href={`/blocks/${block.id}`}
      prefetch={false}
      aria-label={`View ${block.title}`}
      className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <Skeleton aria-hidden="true" className="size-full rounded-none bg-preview motion-reduce:animate-none" />
      <span
        role="status"
        className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted-foreground"
      >
        Loading {block.title}…
      </span>
    </Link>
  );

  return (
    <div
      ref={ref}
      className="relative grid h-full min-h-(--preview-height) min-w-0 @min-[38rem]/gallery:min-h-0"
      style={{ "--preview-height": `${height}px` } as CSSProperties}
    >
      {inView ? (
        <PreviewErrorBoundary key={block.id} id={block.id} title={block.title}>
          <Suspense fallback={placeholder}>
            <BlockPreview {...block} component={Component} />
          </Suspense>
        </PreviewErrorBoundary>
      ) : (
        placeholder
      )}
    </div>
  );
}
