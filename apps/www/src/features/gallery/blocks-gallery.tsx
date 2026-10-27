import { GalleryContent } from "@/features/gallery/gallery-content";
import { homepageBlocks } from "@/features/gallery/homepage-catalog";

export function BlocksGallery() {
  return (
    <section aria-label="Blocks" className="flex min-w-0 flex-col">
      <GalleryContent blocks={homepageBlocks} />
    </section>
  );
}
