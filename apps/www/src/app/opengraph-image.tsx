import { ImageResponse } from "next/og";

import { getLogoDataUrl } from "@/lib/logo";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = "Studio Blocks — Minimal, reusable UI blocks built with React, Tailwind CSS, and shadcn/ui.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 64,
        background: "#f5f5f7",
        color: "#292929",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img src={await getLogoDataUrl()} width={64} height={64} alt="" />
        <span style={{ fontSize: 34, letterSpacing: -1.5 }}>studio blocks</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", maxWidth: 950, fontSize: 80, lineHeight: 1.05, letterSpacing: -4 }}>
          Minimal, reusable UI blocks.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#737373" }}>
          Built with React, Tailwind CSS, and shadcn/ui.
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#737373" }}>{new URL(site.url).hostname}</div>
    </div>,
    size,
  );
}
