import Link from "next/link";

import { blocks } from "@/features/gallery/catalog";

type BlockPreviewProps = (typeof blocks)[number];

export function BlockPreview({ id, title, component: Component, previewMaxWidth }: BlockPreviewProps) {
  return (
    <Link
      href={`/preview/${id}`}
      aria-label={`Preview ${title}`}
      className="flex aspect-4/3 min-w-0 items-center justify-center rounded-xl bg-foreground/5 p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <div className="pointer-events-none w-full" style={{ maxWidth: previewMaxWidth }} inert>
        <Component />
      </div>
    </Link>
  );
}
