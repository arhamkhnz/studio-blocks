import { ArrowDownRight, Wallet } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";

const costs = [
  { time: "00:00", cost: 28.5 },
  { time: "03:00", cost: 62.4 },
  { time: "06:00", cost: 44.8 },
  { time: "09:00", cost: 88.2 },
  { time: "12:00", cost: 37.9 },
  { time: "15:00", cost: 76.6 },
  { time: "18:00", cost: 55.3 },
  { time: "21:00", cost: 58.4 },
];
const maximum = Math.max(...costs.map((point) => point.cost));

export function Kpi08() {
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 font-normal text-muted-foreground">
          <Wallet aria-hidden="true" className="size-3.5" />
          API cost
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-6">
        <div className="flex items-baseline gap-1 text-3xl leading-none tracking-tight tabular-nums">
          <span className="relative -top-px text-xl leading-none text-muted-foreground">$</span>
          <span>452.10</span>
        </div>
        <div
          role="img"
          aria-label="$452.10 API cost across eight intervals"
          className="flex h-11 w-24 shrink-0 items-end gap-1"
        >
          {costs.map((point) => (
            <span
              key={point.time}
              title={`${point.time}: $${point.cost.toFixed(2)}`}
              className="flex-1 rounded-t-sm bg-orange-500 last:bg-orange-400"
              style={{ height: `${(point.cost / maximum) * 100}%` }}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-wrap justify-between gap-x-3 gap-y-1 py-2 text-xs">
        <span className="text-muted-foreground">Cost decreased</span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-flex items-center gap-0.5 font-medium text-green-600 tabular-nums">
            <ArrowDownRight aria-hidden="true" className="size-3" />
            $12.00
          </span>
          <span className="text-muted-foreground">vs yesterday</span>
        </span>
      </CardFooter>
    </Card>
  );
}
