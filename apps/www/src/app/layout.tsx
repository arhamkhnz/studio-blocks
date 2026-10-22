import type { Metadata } from "next";
import type { ReactNode } from "react";

import { fontSans } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Blocks",
  description: "An interactive collection of reusable UI blocks.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} overscroll-none`}>
      <body className="overscroll-none antialiased">{children}</body>
    </html>
  );
}
