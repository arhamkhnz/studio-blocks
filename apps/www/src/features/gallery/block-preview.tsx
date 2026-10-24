import Link from "next/link";

import { PreviewFrame } from "@/features/gallery/preview-frame";
import type { GalleryBlock } from "@/features/gallery/types";

export function BlockPreview({ id, title, component: Component, colSpan }: GalleryBlock) {
  return (
    <Link
      href={`/blocks/${id}`}
      aria-label={`View ${title}`}
      className="block h-full min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <PreviewFrame colSpan={colSpan} className="h-full min-h-64 @min-[38rem]/gallery:min-h-0">
        <Component />
      </PreviewFrame>
    </Link>
  );
}
