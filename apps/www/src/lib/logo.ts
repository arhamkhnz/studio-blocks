import { readFile } from "node:fs/promises";
import { join } from "node:path";

const logoSvg = readFile(join(process.cwd(), "public/studio-blocks.svg"), "utf8");

export function getLogoSvg() {
  return logoSvg;
}

export async function getLogoDataUrl() {
  return `data:image/svg+xml;base64,${Buffer.from(await getLogoSvg()).toString("base64")}`;
}
