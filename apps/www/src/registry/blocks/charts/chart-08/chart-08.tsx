"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@studio-blocks/blocks-ui/components/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@studio-blocks/blocks-ui/components/chart";
import { Empty, EmptyDescription } from "@studio-blocks/blocks-ui/components/empty";

export type StorageCategory = {
  label: string;
  /** Storage used in GB. */
  used: number;
};

export type StorageUsage = {
  /** Total capacity in GB. */
  capacity: number;
  categories: StorageCategory[];
};

export type Chart08Props = {
  data: StorageUsage;
};

const colors = [
  "var(--color-red-500)",
  "var(--color-orange-400)",
  "var(--color-yellow-400)",
  "var(--color-green-500)",
  "var(--color-sky-500)",
  "var(--color-gray-500)",
];
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

function formatStorage(gigabytes: number) {
  return gigabytes >= 1000 ? `${number.format(gigabytes / 1000)} TB` : `${number.format(gigabytes)} GB`;
}

export function Chart08({ data }: Chart08Props) {
  const categories = data.categories
    .filter((category) => Number.isFinite(category.used) && category.used >= 0)
    .map((category, index) => ({
      ...category,
      key: `category${index}`,
      color: colors[index % colors.length],
    }));
  const visibleCategories = categories.filter((category) => category.used > 0);
  const used = categories.reduce((total, category) => total + category.used, 0);
  const validCapacity = Number.isFinite(data.capacity) && data.capacity > 0 && Number.isFinite(used);
  const available = Math.max(0, data.capacity - used);
  const config: ChartConfig = {
    ...Object.fromEntries(
      categories.map((category) => [category.key, { label: category.label, color: category.color }]),
    ),
    available: { label: "Available", color: "var(--muted)" },
  };
  const chartData = [
    {
      name: "Storage",
      ...Object.fromEntries(categories.map((category) => [category.key, category.used])),
      available,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        {validCapacity && (
          <CardAction>
            <CardDescription className="tabular-nums">
              {formatStorage(used)} of {formatStorage(data.capacity)} used
            </CardDescription>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex min-w-0 flex-col gap-3">
        {validCapacity ? (
          <>
            <ChartContainer
              config={config}
              className="aspect-auto h-9 w-full"
              initialDimension={{ width: 640, height: 36 }}
            >
              <BarChart
                accessibilityLayer
                aria-label={`${formatStorage(used)} used out of ${formatStorage(data.capacity)} of storage`}
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                barSize={36}
              >
                <XAxis type="number" domain={[0, Math.max(data.capacity, used)]} hide />
                <YAxis dataKey="name" type="category" hide />
                <ChartTooltip
                  shared={false}
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      formatter={(value, name, item) => (
                        <div className="flex min-w-36 items-center justify-between gap-4">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <span
                              aria-hidden="true"
                              className="size-2.5 shrink-0 rounded-xs"
                              style={{ backgroundColor: item.color }}
                            />
                            {config[String(name)]?.label ?? name}
                          </span>
                          <span className="font-mono font-medium tabular-nums">{formatStorage(Number(value))}</span>
                        </div>
                      )}
                    />
                  }
                />
                {visibleCategories.map((category, index) => {
                  const leftRadius = index === 0 ? 4 : 0;
                  const rightRadius = index === visibleCategories.length - 1 && available === 0 ? 4 : 0;
                  return (
                    <Bar
                      key={category.key}
                      dataKey={category.key}
                      stackId="storage"
                      fill={`var(--color-${category.key})`}
                      stroke="var(--card)"
                      strokeWidth={1}
                      radius={[leftRadius, rightRadius, rightRadius, leftRadius]}
                      isAnimationActive={false}
                    />
                  );
                })}
                {available > 0 && (
                  <Bar
                    dataKey="available"
                    stackId="storage"
                    fill="var(--color-available)"
                    stroke="var(--card)"
                    strokeWidth={1}
                    radius={visibleCategories.length ? [0, 4, 4, 0] : 4}
                    isAnimationActive={false}
                  >
                    <LabelList
                      dataKey="available"
                      content={({ viewBox }) => {
                        if (!viewBox || !("width" in viewBox)) return null;
                        const { x, y, width, height } = viewBox;
                        const label = formatStorage(available);
                        if (
                          typeof x !== "number" ||
                          typeof y !== "number" ||
                          typeof width !== "number" ||
                          typeof height !== "number" ||
                          width < label.length * 8 + 16
                        )
                          return null;
                        return (
                          <text
                            x={x + width / 2}
                            y={y + height / 2}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="pointer-events-none fill-foreground text-xs font-medium tabular-nums"
                          >
                            {label}
                          </text>
                        );
                      }}
                    />
                  </Bar>
                )}
              </BarChart>
            </ChartContainer>
            {categories.length ? (
              <ul aria-label="Storage categories" className="flex flex-wrap gap-x-5 gap-y-2">
                {categories.map((category) => (
                  <li key={category.key} className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="wrap-anywhere">{category.label}</span>
                    <span className="sr-only">: {formatStorage(category.used)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>
                <EmptyDescription>No files stored yet.</EmptyDescription>
              </Empty>
            )}
            {used > data.capacity && (
              <p className="text-sm text-muted-foreground">{formatStorage(used - data.capacity)} over capacity</p>
            )}
          </>
        ) : (
          <Empty>
            <EmptyDescription>No storage capacity available.</EmptyDescription>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
