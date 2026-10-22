import { notFound } from "next/navigation";

import { blocks } from "@/catalog/blocks";
import { BlockPreview } from "@/features/canvas/block-preview";
import { getPreviewFrameSize, PreviewFrame } from "@/features/canvas/preview-frame";

export const dynamicParams = false;

export function generateStaticParams() {
  return blocks.map((block) => ({ slug: block.id }));
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const block = blocks.find((item) => item.id === slug);
  if (!block) notFound();

  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full" style={{ maxWidth: getPreviewFrameSize(block.width, block.height).width }}>
        <PreviewFrame title={block.title} maxHeight={block.height}>
          <BlockPreview id={block.id} title={block.title} />
        </PreviewFrame>
      </div>
    </main>
  );
}
