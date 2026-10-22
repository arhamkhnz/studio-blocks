import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { fontSans } from "@/lib/fonts";
import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: site.title,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  authors: [site.author],
  creator: site.author.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: site.title,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f7",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} overscroll-none`}>
      <body className="overscroll-none antialiased">{children}</body>
    </html>
  );
}
