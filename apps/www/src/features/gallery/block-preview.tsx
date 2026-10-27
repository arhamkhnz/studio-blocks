import Link from "next/link";

import { PreviewFrame } from "@/features/gallery/preview-frame";
import type { GalleryBlock } from "@/features/gallery/types";

type BlockPreviewProps = Pick<GalleryBlock, "id" | "title" | "component" | "colSpan" | "iframe">;

export function BlockPreview({ id, title, component: Component, colSpan, iframe }: BlockPreviewProps) {
  return (
    <Link
      href={`/blocks/${id}`}
      prefetch={false}
      aria-label={`View ${title}`}
      className="block h-full min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <PreviewFrame
        colSpan={colSpan}
        iframeSrc={iframe ? `/preview/${id}` : undefined}
        className="h-full min-h-64 @min-[38rem]/gallery:min-h-0"
      >
        {!iframe && <Component />}
      </PreviewFrame>
    </Link>
  );
}
