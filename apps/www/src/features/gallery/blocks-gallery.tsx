import { BlockPreview } from "@/features/gallery/block-preview";
import { blocks } from "@/features/gallery/catalog";
import { GalleryContent } from "@/features/gallery/gallery-content";

export function BlocksGallery() {
  return (
    <section aria-label="Blocks" className="min-w-0">
      <GalleryContent
        blocks={blocks.map((block) => ({
          id: block.id,
          category: block.category,
          colSpan: block.colSpan,
          rowSpan: block.rowSpan,
          preview: <BlockPreview {...block} />,
        }))}
      />
    </section>
  );
}
