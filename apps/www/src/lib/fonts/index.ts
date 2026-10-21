import localFont from "next/font/local";

export const fontSans = localFont({
  src: "./TimelessSansVF.woff2",
  variable: "--font-timeless-sans",
  weight: "300 800",
  style: "normal",
  display: "block",
});

export const fontSerif = localFont({
  src: "./TimelessSerifVF.woff2",
  variable: "--font-timeless-serif",
  weight: "200 700",
  style: "normal",
  adjustFontFallback: "Times New Roman",
  display: "block",
});
