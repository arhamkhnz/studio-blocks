"use client";

import type { ComponentProps } from "react";
import { Label, Pie, PieChart, usePlotArea } from "recharts";
import { cn } from "cn";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@studio-blocks/blocks-ui/components/chart";

export type PerformanceMetric = {
  label: string;
  score: number;
};

export type Chart06Props = ComponentProps<"div"> & {
  score: number;
  metrics: [PerformanceMetric, PerformanceMetric, PerformanceMetric, PerformanceMetric, PerformanceMetric];
};

const gap = 4;
const weights = [10, 25, 30, 25, 10];
const chartConfig = {
  good: {
    label: "Good",
    color: "var(--color-green-500)",
  },
  average: {
    label: "Needs improvement",
    color: "var(--color-amber-500)",
  },
  poor: {
    label: "Poor",
    color: "var(--color-red-500)",
  },
} satisfies ChartConfig;

function normalizedScore(value: number) {
  return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
}

function scoreColor(score: number) {
  return score >= 90 ? "var(--color-good)" : score >= 50 ? "var(--color-average)" : "var(--color-poor)";
}

export function Chart06({ score, metrics, className, ...props }: Chart06Props) {
  const overall = normalizedScore(score);

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("mx-auto aspect-square w-full max-w-sm", className)}
      {...props}
      role="img"
      aria-label={`Performance score ${Math.round(overall)} out of 100. ${metrics.map((metric) => `${metric.label}: ${Math.round(normalizedScore(metric.score))}`).join(", ")}`}
    >
      <PieChart>
        <PerformanceSegments metrics={metrics} overall={overall} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(_, name, item) => (
                <div className="flex min-w-28 items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="size-2.5 shrink-0 rounded-xs"
                      style={{ backgroundColor: item.color }}
                    />
                    {name}
                  </span>
                  <span className="font-mono tabular-nums">{Math.round(item.payload.score)} / 100</span>
                </div>
              )}
            />
          }
        />
      </PieChart>
    </ChartContainer>
  );
}

function PerformanceSegments({ metrics, overall }: Pick<Chart06Props, "metrics"> & { overall: number }) {
  const plot = usePlotArea();
  if (!plot || plot.width <= 0 || plot.height <= 0) return null;

  const radius = Math.min(plot.width, plot.height) / 2;
  const innerRadius = radius * 0.74;
  const outerRadius = radius * 0.82;
  const gapAngle = Math.min(12, (2 * Math.asin(Math.min(1, gap / (2 * innerRadius))) * 180) / Math.PI);
  const segments = metrics.map((metric, index) => {
    const value = normalizedScore(metric.score);
    const offset = weights.slice(0, index).reduce((sum, weight) => sum + weight, 0);
    return {
      ...metric,
      score: value,
      fill: scoreColor(value),
      startAngle: 90 - offset * 3.6 - gapAngle / 2,
      endAngle: 90 - (offset + weights[index]!) * 3.6 + gapAngle / 2,
    };
  });

  return (
    <>
      {segments.map((metric, index) => (
        <Pie
          key={metric.label}
          data={[{ name: metric.label, value: 100, score: metric.score }]}
          dataKey="value"
          nameKey="name"
          startAngle={metric.startAngle}
          endAngle={metric.endAngle}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          cornerRadius={4}
          fill={metric.fill}
          stroke="none"
          isAnimationActive={false}
        >
          <Label
            content={({ viewBox }) => {
              if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox) || !("outerRadius" in viewBox)) return null;
              const cx = Number(viewBox.cx);
              const cy = Number(viewBox.cy);
              const angle = (((metric.startAngle + metric.endAngle) / 2) * Math.PI) / 180;
              const radius = Number(viewBox.outerRadius) + 22;
              return (
                <g className="pointer-events-none">
                  <text
                    x={cx + radius * Math.cos(angle)}
                    y={cy - radius * Math.sin(angle)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-muted-foreground text-xs"
                  >
                    {metric.label}
                  </text>
                  {index === 0 && (
                    <>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={Math.max(0, innerRadius - gap)}
                        fill={scoreColor(overall)}
                        fillOpacity={0.12}
                      />
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className={cn(
                          "text-5xl font-medium tabular-nums",
                          overall >= 90
                            ? "fill-green-700 dark:fill-green-400"
                            : overall >= 50
                              ? "fill-amber-700 dark:fill-amber-400"
                              : "fill-red-700 dark:fill-red-400",
                        )}
                      >
                        {Math.round(overall)}
                      </text>
                    </>
                  )}
                </g>
              );
            }}
          />
        </Pie>
      ))}
    </>
  );
}
