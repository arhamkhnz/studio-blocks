import { getLogoSvg } from "@/lib/logo";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/svg+xml";

export default async function Icon() {
  return new Response(await getLogoSvg(), {
    headers: { "Content-Type": contentType },
  });
}
