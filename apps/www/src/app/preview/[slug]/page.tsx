import { notFound } from "next/navigation";

import { blocks } from "@/features/gallery/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return blocks.map((block) => ({ slug: block.id }));
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const block = blocks.find((item) => item.id === slug);

  if (!block) notFound();

  const Component = block.component;

  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full" style={{ maxWidth: block.previewMaxWidth }}>
        <Component />
      </div>
    </main>
  );
}
