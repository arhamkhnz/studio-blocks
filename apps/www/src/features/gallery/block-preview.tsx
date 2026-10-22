import Link from "next/link";

import type { GalleryBlock } from "@/features/gallery/types";

export function BlockPreview({ id, title, component: Component, previewMaxWidth, previewAspectRatio }: GalleryBlock) {
  return (
    <Link
      href={`/preview/${id}`}
      aria-label={`Preview ${title}`}
      className="flex min-w-0 items-center justify-center bg-foreground/5 p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      style={{ aspectRatio: previewAspectRatio }}
    >
      <div className="pointer-events-none w-full" style={{ maxWidth: previewMaxWidth }} inert>
        <Component />
      </div>
    </Link>
  );
}
