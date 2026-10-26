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

const exampleData = [
  959, 506, 1381, 374, 1012, 1808, 1117, 849, 1276, 1650, 3990, 585, 1486, 1012, 1808, 1012, 532, 1223, 638, 1597, 1117,
  1650, 959, 2235, 796, 1065, 532, 1544, 959, 1861, 1065, 1755, 743, 3189, 1170, 1065, 1808, 532, 1276, 374, 638, 1486,
  2288, 1117, 5050, 1808, 1650, 1597, 1012, 532, 3189, 374, 1755, 3031, 480, 532, 3136, 3458, 1486, 532, 322, 743, 849,
  959, 2657, 690, 1170, 1808, 638, 1276, 3300, 1486, 322, 2235, 480, 532, 264, 1170, 1012, 638, 2715, 1486, 849, 2657,
  532, 480, 1276, 585, 1597, 849, 959, 532, 1486, 849, 2393, 943,
].map((requests, index) => ({
  time: `${String(Math.floor(index / 4)).padStart(2, "0")}:${String((index % 4) * 15).padStart(2, "0")}`,
  requests,
}));

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

export function Chart05Demo() {
  return <Chart05 data={exampleData} previousTotal={113830} />;
}
