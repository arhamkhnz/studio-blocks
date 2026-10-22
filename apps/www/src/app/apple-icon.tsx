import { ImageResponse } from "next/og";

import { getLogoDataUrl } from "@/lib/logo";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#000" }}>
      <img src={await getLogoDataUrl()} width={size.width} height={size.height} alt="" />
    </div>,
    size,
  );
}
