import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blocks } from "@/features/gallery/catalog";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blocks.filter((block) => block.iframe).map((block) => ({ slug: block.id }));
}

export default async function BlockPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const block = blocks.find((item) => item.id === slug && item.iframe);
  if (!block) notFound();
  const Component = block.component;

  return (
    <main className="grid h-dvh place-items-center overflow-hidden bg-preview **:data-[slot=sidebar-wrapper]:h-full">
      <Component />
    </main>
  );
}
