import Link from "next/link";

import type { GalleryBlock } from "@/features/gallery/types";

export function BlockPreview({ id, title, component: Component, previewMaxWidth, previewAspectRatio }: GalleryBlock) {
  return (
    <Link
      href={`/blocks/${id}`}
      aria-label={`View ${title}`}
      className="flex min-w-0 items-center justify-center bg-preview p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      style={{ aspectRatio: previewAspectRatio }}
    >
      <div className="pointer-events-none w-full" style={{ maxWidth: previewMaxWidth }} inert>
        <Component />
      </div>
    </Link>
  );
}
