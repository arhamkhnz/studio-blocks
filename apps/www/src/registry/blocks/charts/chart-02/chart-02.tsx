"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";
import { Bar, BarChart, type BarShapeProps, XAxis, YAxis } from "recharts";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@studio-blocks/blocks-ui/components/chart";

// Include flags.css when copying this component.
import "./flags.css";

export type VisitorActivity = { minute: number; visitors: number };
export type VisitorCountry = { code: string; name: string; visitors: number };
export type Chart02Props = ComponentProps<typeof Card> & {
  activity?: VisitorActivity[];
  countries?: VisitorCountry[];
  visitorsPerMinute?: number;
  isLive?: boolean;
  action?: ReactNode;
};

const defaultActivity = [
  0, 6, 12, 20, 12, 0, 6, 6, 0, 4, 0, 20, 15, 4, 6, 0, 4, 12, 20, 0, 4, 20, 12, 0, 6, 6, 0, 20, 0, 4,
].map((visitors, index) => ({ minute: index + 1, visitors }));
const defaultCountries: VisitorCountry[] = [
  { code: "US", name: "United States", visitors: 14 },
  { code: "GB", name: "United Kingdom", visitors: 4 },
  { code: "CA", name: "Canada", visitors: 3 },
  { code: "IN", name: "India", visitors: 3 },
];

const chartConfig = {
  visitors: { color: "var(--color-blue-500)", label: "Visitors" },
} satisfies ChartConfig;

function VisitorBar({ height, payload, width, x, y }: BarShapeProps) {
  const barHeight = Number(height);
  const barWidth = Number(width);
  const barX = Number(x);
  const barY = Number(y);
  if (![barHeight, barWidth, barX, barY].every(Number.isFinite)) return <g />;

  const visitors = (payload as VisitorActivity | undefined)?.visitors ?? 0;
  const opacity = visitors >= 18 ? 0.95 : 0.4;

  return (
    <g>
      <rect
        x={barX}
        y={barY + barHeight - 2}
        width={barWidth}
        height={2}
        rx={1}
        fill="var(--color-visitors)"
        fillOpacity={visitors === 0 ? 0.2 : opacity}
      />
      {visitors > 0 && barHeight > 4 && (
        <rect
          x={barX}
          y={barY}
          width={barWidth}
          height={barHeight - 4}
          rx={2}
          fill="var(--color-visitors)"
          fillOpacity={opacity}
        />
      )}
    </g>
  );
}

export function Chart02({
  activity = defaultActivity,
  countries = defaultCountries,
  visitorsPerMinute,
  isLive = true,
  action,
  ...props
}: Chart02Props) {
  const data = activity.filter((item) => Number.isFinite(item.visitors) && item.visitors >= 0);
  const countryData = countries.filter((item) => Number.isFinite(item.visitors) && item.visitors >= 0);
  const total = visitorsPerMinute ?? countryData.reduce((sum, item) => sum + item.visitors, 0);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="font-normal">Realtime Visitors</CardTitle>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent className="@container flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl leading-none tracking-tight tabular-nums">{total.toLocaleString("en-US")}</span>
            <span className="text-sm text-muted-foreground">per minute</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden="true" className="relative flex size-2">
              {isLive && (
                <span className="absolute inline-flex size-full rounded-full bg-green-500 opacity-75 motion-safe:animate-ping" />
              )}
              <span
                className={cn(
                  "relative inline-flex size-2 rounded-full",
                  isLive ? "bg-green-500" : "bg-muted-foreground",
                )}
              />
            </span>
            <span>{isLive ? "Live" : "Paused"}</span>
          </div>
        </div>
        {data.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-36 w-full">
            <BarChart
              accessibilityLayer
              data={data}
              margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
              barCategoryGap="15%"
            >
              <XAxis dataKey="minute" hide />
              <YAxis hide domain={[0, Math.max(22, ...data.map((item) => item.visitors))]} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="visitors" fill="var(--color-visitors)" shape={VisitorBar} />
            </BarChart>
          </ChartContainer>
        ) : (
          <p className="flex h-36 items-center justify-center text-sm text-muted-foreground">No visitor activity.</p>
        )}
        <div className="grid grid-cols-1 @xs:grid-cols-2">
          {countryData.map((country, index) => (
            <div
              key={country.code}
              className={cn(
                "flex min-w-0 items-center gap-3 border-border/50 py-3",
                index % 2 === 0 ? "@xs:border-r @xs:pr-5" : "@xs:pl-5",
                index < countryData.length - 1 && "border-b @xs:border-b-0",
                index < countryData.length - 2 && "@xs:border-b",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  `flag:${country.code.toUpperCase()}`,
                  "shrink-0 rounded-xs text-lg ring-1 ring-foreground/10",
                )}
              />
              <span className="min-w-0 flex-1 truncate text-sm">{country.name}</span>
              <span className="text-sm tabular-nums">{country.visitors.toLocaleString("en-US")}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
