import type { CSSProperties, ReactNode } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { getLogoDataUrl } from "@/lib/logo";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt =
  "Studio Blocks - UI blocks for shadcn/ui, featuring revenue, goal progress, and income breakdown cards.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Original static TTFs from the Timeless family, supported by ImageResponse.
const regularFont = readFile(join(process.cwd(), "src/lib/fonts/TimelessSans-SansRegular.ttf"));
const lightFont = readFile(join(process.cwd(), "src/lib/fonts/TimelessSans-SansLight.ttf"));
const gridHeight = 246 + 16 + 230;
const gridInset = (size.height - 96 - gridHeight) / 2;

const colors = {
  background: "#f5f5f7",
  preview: "#e5e5e8",
  foreground: "#292929",
  muted: "#737373",
  border: "#d4d4d8",
};

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: 20,
  gap: 16,
  border: `1px solid ${colors.border}`,
  borderRadius: 14,
  background: "white",
};

// ImageResponse uses Flexbox and inline styles; these are static previews of the blocks.
function PreviewTile({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: 20, background: colors.preview, ...style }}>
      {children}
    </div>
  );
}

function RevenuePreview() {
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 8,
            border: "1px solid #e5e5e5",
            background: "#f5f5f5",
            color: colors.muted,
            fontSize: 20,
          }}
        >
          $
        </div>
        <div style={{ display: "flex", fontSize: 14, color: colors.muted }}>Total Revenue</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 29, letterSpacing: -1 }}>$1,250.00</span>
          <span
            style={{
              display: "flex",
              padding: "4px 7px",
              borderRadius: 20,
              background: "#171717",
              color: "white",
              fontSize: 11,
            }}
          >
            +12.5%
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 12, color: colors.muted }}>Visitors for the last 6 months</div>
      </div>
    </div>
  );
}

function GoalPreview() {
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", fontSize: 16 }}>Monthly Proposal Goal</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 30 }}>12</span>
            <span style={{ fontSize: 14, color: colors.muted }}>sent</span>
          </div>
          <span style={{ fontSize: 12, color: colors.muted }}>18 target</span>
        </div>
        <div style={{ display: "flex", gap: 2, height: 30 }}>
          {Array.from({ length: 42 }, (_, index) => (
            <div
              key={index}
              style={{ display: "flex", flex: 1, borderRadius: 8, background: index < 28 ? "#22c55e" : "#dcfce7" }}
            />
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 12, color: colors.muted }}>67% of this month's target reached.</div>
      </div>
    </div>
  );
}

const income = [
  { label: "Primary salary", value: "$4,560.00", share: 68, color: "#8b5cf6" },
  { label: "Freelance projects", value: "$1,412.00", share: 21, color: "#3b82f6" },
  { label: "Dividends and interest", value: "$765.00", share: 11, color: "#10b981" },
];

function IncomePreview() {
  return (
    <div style={{ ...cardStyle, gap: 22 }}>
      <div style={{ display: "flex", fontSize: 17 }}>Income sources</div>
      <div style={{ display: "flex", gap: 12 }}>
        {income.map((item) => (
          <div key={item.label} style={{ display: "flex", flex: 1, flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: colors.muted }}>
              <span style={{ display: "flex", width: 7, height: 7, borderRadius: 7, background: item.color }} />
              <span>
                {item.label} · {item.share}%
              </span>
            </div>
            <span style={{ fontSize: 23, letterSpacing: -0.5 }}>{item.value}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 5, height: 18 }}>
        {income.map((item) => (
          <div
            key={item.label}
            style={{ display: "flex", flexBasis: 0, flexGrow: item.share, borderRadius: 5, background: item.color }}
          />
        ))}
      </div>
    </div>
  );
}

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 48,
        gap: 48,
        background: colors.background,
        color: colors.foreground,
        fontFamily: "Timeless Sans",
        fontWeight: 400,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: gridInset,
          paddingBottom: gridInset,
          width: 384,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={await getLogoDataUrl()} width={38} height={38} alt="" />
          <span style={{ fontSize: 30, letterSpacing: -1.5 }}>studio blocks</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 64 - gridInset, gap: 24 }}>
          <div style={{ display: "flex", fontSize: 58, lineHeight: 1.08, letterSpacing: -2.8, fontWeight: 300 }}>
            UI blocks for shadcn/ui.
          </div>
          <div style={{ display: "flex", maxWidth: 330, fontSize: 23, lineHeight: 1.45, color: colors.muted }}>
            Minimal, reusable blocks built with React and Tailwind CSS.
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 16, lineHeight: 1, color: colors.muted }}>
          {new URL(site.url).hostname}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 672,
          flexShrink: 0,
          gap: 16,
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <PreviewTile style={{ width: 328, height: 246 }}>
            <RevenuePreview />
          </PreviewTile>
          <PreviewTile style={{ width: 328, height: 246 }}>
            <GoalPreview />
          </PreviewTile>
        </div>
        <PreviewTile style={{ width: 672, height: 230 }}>
          <IncomePreview />
        </PreviewTile>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Timeless Sans", data: await regularFont, weight: 400, style: "normal" },
        { name: "Timeless Sans", data: await lightFont, weight: 300, style: "normal" },
      ],
    },
  );
}
