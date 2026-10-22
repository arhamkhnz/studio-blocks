import type { Metadata } from "next";
import Image from "next/image";

import { GitHubIcon } from "@/components/icons/github";
import { Button } from "@studio-blocks/blocks-ui/components/button";
import { BlocksGallery } from "@/features/gallery/blocks-gallery";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      creator: { "@type": "Person", ...site.author },
    },
    {
      "@type": "CollectionPage",
      "@id": `${site.url}/#collection`,
      url: site.url,
      name: site.title,
      description: site.description,
      isPartOf: { "@id": `${site.url}/#website` },
    },
  ],
};

export default function Page() {
  return (
    <main className="mx-auto grid min-h-dvh max-w-480 gap-12 px-6 py-8 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:p-8 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <aside className="flex flex-col gap-12 lg:sticky lg:top-8 lg:h-[calc(100dvh-4rem)] lg:self-start">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/studio-blocks.svg" alt="" width={24} height={24} className="size-6 shrink-0" />
            <p className="text-2xl leading-none font-[350] tracking-tighter">studio blocks</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="-mr-2"
            nativeButton={false}
            role="link"
            aria-label="GitHub"
            render={<a href="https://github.com/arhamkhnz/studio-blocks" target="_blank" rel="noopener noreferrer" />}
          >
            <GitHubIcon aria-hidden="true" />
          </Button>
        </header>
        <div className="flex max-w-sm flex-col gap-4">
          <h1 className="text-4xl font-light tracking-tight text-balance lg:text-3xl">
            A collection of minimal, reusable UI blocks
          </h1>
          <p className="max-w-64 text-sm leading-relaxed text-muted-foreground">
            Built with React, Tailwind CSS, and shadcn/ui.
          </p>
        </div>
        <footer className="text-xs text-muted-foreground lg:mt-auto">
          built by{" "}
          <a
            href="https://github.com/arhamkhnz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            arhamkhnz
          </a>
        </footer>
      </aside>
      <BlocksGallery />
    </main>
  );
}
