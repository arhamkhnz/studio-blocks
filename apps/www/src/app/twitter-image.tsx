import OpenGraphImage from "./opengraph-image";

export const dynamic = "force-static";
export const alt = "Studio Blocks — Minimal, reusable UI blocks built with React, Tailwind CSS, and shadcn/ui.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return OpenGraphImage();
}
