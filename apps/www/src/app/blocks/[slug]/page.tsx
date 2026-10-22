import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteSidebar } from "@/components/site-sidebar";
import { blockCategories } from "@/features/filters/block-categories";
import { blocks } from "@/features/gallery/catalog";
import { BlockInstallation } from "@/features/installation/block-installation";
import { getInstallation } from "@/features/installation/get-installation";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return blocks.map((block) => ({ slug: block.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const block = blocks.find((item) => item.id === slug);

  if (!block) notFound();

  return {
    title: block.title,
    description: block.description,
    alternates: { canonical: `/blocks/${block.id}` },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${block.title} | ${site.name}`,
      description: block.description,
      url: `/blocks/${block.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${block.title} | ${site.name}`,
      description: block.description,
    },
  };
}

export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const block = blocks.find((item) => item.id === slug);

  if (!block) notFound();

  const Component = block.component;
  const installation = await getInstallation(block.id);
  const category = blockCategories.find((item) => item.value === block.category);

  return (
    <main className="mx-auto grid min-h-dvh max-w-480 gap-12 px-6 py-8 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:p-8 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-20">
      <SiteSidebar title={block.title} description={block.description} />
      <article className="flex min-w-0 flex-col gap-6">
        <div className="flex min-h-8 flex-wrap items-center justify-between gap-4">
          <ol aria-label="Block details" className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>{category?.label}</li>
            <li aria-hidden="true" className="text-foreground/25">
              /
            </li>
            <li className="tabular-nums">{block.id.toUpperCase()}</li>
          </ol>
          <Link
            href="/"
            className="ml-auto flex h-8 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to blocks
          </Link>
        </div>
        <BlockInstallation
          {...installation}
          preview={
            <section
              aria-label={`${block.title} preview`}
              className="flex min-h-96 flex-1 items-center justify-center bg-preview p-6 sm:min-h-128 sm:p-10"
            >
              <div className="w-full" style={{ maxWidth: block.previewMaxWidth }}>
                <Component />
              </div>
            </section>
          }
        />
      </article>
    </main>
  );
}
