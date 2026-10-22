import { BlockFilters } from "@/features/filters/block-filters";

export function BlocksGallery() {
  return (
    <section aria-label="Blocks" className="flex min-w-0 flex-col gap-6">
      <BlockFilters />
    </section>
  );
}
