import { readFile } from "node:fs/promises";
import { join } from "node:path";

const logoSvg = readFile(join(process.cwd(), "public/studio-blocks.svg"), "utf8");

export function getLogoSvg() {
  return logoSvg;
}

export async function getLogoDataUrl(renderSize?: number) {
  let svg = await getLogoSvg();
  if (renderSize !== undefined) {
    svg = svg.replace(/<svg\b[^>]*>/, (root) =>
      root.replace(/\bwidth="[^"]*"/, `width="${renderSize}"`).replace(/\bheight="[^"]*"/, `height="${renderSize}"`),
    );
  }
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
