"use client";

import { useId } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@studio-blocks/blocks-ui/components/chart";
import { Empty, EmptyDescription } from "@studio-blocks/blocks-ui/components/empty";

export type TokenUsagePoint = {
  label: string;
  tokens: number;
};

export type Chart07Props = {
  /** Hourly token totals for the last 24 hours, ordered from oldest to newest. */
  data: TokenUsagePoint[];
};

const chartConfig = {
  tokens: { label: "Tokens", color: "var(--color-emerald-500)" },
} satisfies ChartConfig;

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

export function Chart07({ data }: Chart07Props) {
  const id = useId().replace(/:/g, "");
  const gradientId = `token-usage-fill-${id}`;
  const points = data.filter((point) => Number.isFinite(point.tokens) && point.tokens >= 0);

  return (
    <Card className="mx-auto w-full gap-6">
      <CardHeader>
        <CardTitle className="font-normal">Token usage</CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        {points.length ? (
          <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
            <AreaChart
              accessibilityLayer
              aria-label="Hourly token usage over the last 24 hours"
              data={points}
              margin={{ top: 12, right: 0, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-tokens)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="var(--color-tokens)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={12} minTickGap={12} height={32} />
              <YAxis
                orientation="right"
                domain={[0, "auto"]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={5}
                width={48}
                allowDecimals={false}
                tickFormatter={(value: number) => compact.format(value)}
              />
              <ChartTooltip
                cursor={{ stroke: "var(--color-tokens)", strokeOpacity: 0.2 }}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="tokens"
                type="stepAfter"
                baseValue={0}
                stroke="var(--color-tokens)"
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                fillOpacity={1}
                dot={false}
                activeDot={{ r: 3 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <Empty className="h-64">
            <EmptyDescription>No token usage data to display.</EmptyDescription>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
