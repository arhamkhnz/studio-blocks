"use client";

import type { ComponentProps } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { cn } from "cn";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@studio-blocks/blocks-ui/components/chart";

export type EdgeRequestPoint = {
  time: string;
  requests: number;
};

export type Chart05Props = ComponentProps<typeof Card> & {
  data: EdgeRequestPoint[];
  previousTotal?: number;
  periodLabel?: string;
};

const chartConfig = {
  requests: { label: "Requests", color: "var(--color-blue-500)" },
} satisfies ChartConfig;

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 });

export function Chart05({ data, previousTotal, periodLabel = "24h", className, ...props }: Chart05Props) {
  const points = data.filter((point) => Number.isFinite(point.requests) && point.requests >= 0);
  const total = points.reduce((sum, point) => sum + point.requests, 0);
  const change =
    previousTotal !== undefined && Number.isFinite(previousTotal) && previousTotal > 0
      ? ((total - previousTotal) / previousTotal) * 100
      : null;
  const TrendIcon = change === null || change === 0 ? Minus : change < 0 ? ArrowDownRight : ArrowUpRight;
  const changeLabel = !change ? "change" : change < 0 ? "decrease" : "increase";
  const changeColor = !change ? "text-muted-foreground" : change < 0 ? "text-red-600" : "text-green-600";
  const formattedChange = `${Math.abs(change ?? 0).toFixed(1)}%`;

  return (
    <Card className={cn("mx-auto w-full max-w-sm gap-4 pb-0", className)} {...props}>
      <CardHeader className="gap-2">
        <CardTitle className="flex items-center justify-between gap-3 text-sm font-normal text-muted-foreground">
          <span>Edge requests</span>
          <span className="text-xs">{periodLabel}</span>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-foreground">
            <span className="text-3xl leading-none font-medium tracking-tight tabular-nums">
              {compact.format(total).replace("K", "k")}
            </span>
            {change !== null && (
              <span
                className={cn("inline-flex items-center gap-1 text-sm leading-none tabular-nums", changeColor)}
                aria-label={`${formattedChange} ${changeLabel} from the previous period`}
              >
                <TrendIcon aria-hidden="true" className="size-4" />
                {formattedChange}
              </span>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-24 w-full"
          role="img"
          aria-label={`${total.toLocaleString("en-US")} edge requests across ${points.length} intervals`}
        >
          <AreaChart data={points} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, "dataMax"]} hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="min-w-36" />} />
            <Area
              dataKey="requests"
              type="linear"
              stroke="var(--color-requests)"
              strokeWidth={1.75}
              fill="var(--color-requests)"
              fillOpacity={0.12}
              dot={false}
              activeDot={{ r: 3 }}
              isAnimationActive="auto"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
