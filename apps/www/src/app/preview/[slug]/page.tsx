import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blocks } from "@/features/gallery/catalog";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return blocks.map((block) => ({ slug: block.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const block = blocks.find((item) => item.id === slug);

  if (!block) notFound();

  const title = `${block.title} (${block.id})`;
  const description = `Preview the ${block.title} UI block from ${site.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/preview/${block.id}` },
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: `/preview/${block.id}`,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
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
