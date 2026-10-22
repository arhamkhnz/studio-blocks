import type { Metadata } from "next";

import { SiteSidebar } from "@/components/site-sidebar";
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
      <SiteSidebar />
      <BlocksGallery />
    </main>
  );
}
