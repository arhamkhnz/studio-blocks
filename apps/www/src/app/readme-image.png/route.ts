import { createSocialImage } from "@/lib/social-image";

export const dynamic = "force-static";

export function GET() {
  return createSocialImage(2);
}
