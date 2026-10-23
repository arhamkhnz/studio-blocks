import OpenGraphImage from "./opengraph-image";

export const dynamic = "force-static";
export const alt =
  "Studio Blocks - UI blocks for shadcn/ui, featuring revenue, goal progress, and income breakdown cards.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return OpenGraphImage();
}
