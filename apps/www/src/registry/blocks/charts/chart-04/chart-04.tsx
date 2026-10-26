"use client";

import { useState, type ComponentProps } from "react";
import { Label, PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { cn } from "cn";

import { Card, CardContent, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@studio-blocks/blocks-ui/components/chart";
import { ToggleGroup, ToggleGroupItem } from "@studio-blocks/blocks-ui/components/toggle-group";

export type ResourceUsage = {
  label: string;
  used: number;
  capacity: number;
  unit: string;
};

export type Chart04Props = ComponentProps<typeof Card> & {
  items: ResourceUsage[];
};

const colors = ["var(--color-violet-700)", "var(--color-sky-500)", "var(--color-teal-700)"];

export function Chart04({ items, className, ...props }: Chart04Props) {
  const [selected, setSelected] = useState("resource-0");
  const resources = items
    .filter(
      (item) => Number.isFinite(item.used) && item.used >= 0 && Number.isFinite(item.capacity) && item.capacity > 0,
    )
    .map((item, index) => ({
      ...item,
      resource: `resource-${index}`,
      percent: Math.round((item.used / item.capacity) * 100),
      value: Math.min(100, Number(((item.used / item.capacity) * 100).toFixed(2))),
      fill: colors[index % colors.length],
    }));
  const active = resources.find((item) => item.resource === selected) ?? resources[0];
  const config = Object.fromEntries(
    resources.map((item) => [item.resource, { label: item.label, color: item.fill }]),
  ) satisfies ChartConfig;

  return (
    <Card className={cn("mx-auto w-full max-w-sm", className)} {...props}>
      <CardHeader>
        <CardTitle className="font-normal">Resource usage</CardTitle>
      </CardHeader>
      <CardContent className="flex min-w-0 flex-col gap-4">
        {active ? (
          <>
            <div className="relative aspect-[1.8/1] overflow-hidden">
              <ChartContainer
                config={config}
                className="absolute inset-x-0 top-0 aspect-square w-full"
                role="img"
                aria-label={resources.map((item) => `${item.label}: ${item.percent}% of capacity`).join(", ")}
              >
                <RadialBarChart
                  data={resources.toReversed()}
                  startAngle={180}
                  endAngle={0}
                  innerRadius="55%"
                  outerRadius="95%"
                  barSize={14}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        hideLabel
                        nameKey="resource"
                        className="min-w-36 [&_.tabular-nums]:after:content-['%']"
                      />
                    }
                  />
                  <RadialBar dataKey="value" background cornerRadius={4} isAnimationActive="auto" />
                  <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" className="pointer-events-none">
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy ?? 0) - 28}
                                className="fill-foreground text-3xl tracking-tight tabular-nums"
                              >
                                {active.percent}%
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) - 8} className="fill-muted-foreground text-xs">
                                {active.label} utilization
                              </tspan>
                            </text>
                          );
                        }
                        return null;
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            </div>
            <ToggleGroup
              value={[active.resource]}
              onValueChange={(values) => {
                if (values[0]) setSelected(values[0]);
              }}
              aria-label="Resource details"
              className="w-full flex-wrap justify-start"
              size="sm"
              spacing={4}
            >
              {resources.map((item) => (
                <ToggleGroupItem
                  key={item.resource}
                  value={item.resource}
                  aria-label={`${item.label}, ${item.percent}% used`}
                  className="min-w-0 gap-1.5 rounded-none px-0 font-normal text-muted-foreground hover:bg-transparent aria-pressed:bg-transparent aria-pressed:text-foreground data-[state=on]:bg-transparent"
                >
                  <span className="flex items-center gap-1.5 text-xs">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    {item.label}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">No resource usage to display.</p>
        )}
      </CardContent>
    </Card>
  );
}
