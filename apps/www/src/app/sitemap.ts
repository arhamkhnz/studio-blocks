import type { MetadataRoute } from "next";

import { blocks } from "@/features/gallery/catalog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...blocks.map((block) => ({
      url: `${site.url}/blocks/${block.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
