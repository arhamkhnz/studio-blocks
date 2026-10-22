import localFont from "next/font/local";

export const fontSans = localFont({
  src: "./TimelessSansVF.woff2",
  variable: "--font-timeless-sans",
  weight: "300 800",
  style: "normal",
  display: "block",
});
