import { BlockFilters } from "@/features/filters/block-filters";
import { BlockPreview } from "@/features/gallery/block-preview";
import { blocks } from "@/features/gallery/catalog";

export function BlocksGallery() {
  return (
    <section aria-label="Blocks" className="flex min-w-0 flex-col gap-6">
      <BlockFilters />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block) => (
          <BlockPreview key={block.id} {...block} />
        ))}
      </div>
    </section>
  );
}
