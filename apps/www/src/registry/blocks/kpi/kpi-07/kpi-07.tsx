import type { ComponentProps } from "react";
import { cn } from "cn";

import { Card, CardContent, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";

export type Kpi07Props = ComponentProps<typeof Card> & {
  title: string;
  value: number;
  target: number;
  unit: string;
  period?: string;
};

export function Kpi07({ title, value, target, unit, period = "this month's", ...props }: Kpi07Props) {
  const current = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  const goal = Number.isFinite(target) ? Math.max(0, Math.floor(target)) : 0;
  const progress = goal > 0 ? Math.min(1, current / goal) : 0;
  const percentage = Math.round(progress * 100);
  const segments = 42;
  const activeSegments = Math.round(progress * segments);
  const format = (number: number) => number.toLocaleString("en-US");

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl leading-none tracking-tight tabular-nums">{format(current)}</span>
            <span className="text-base text-muted-foreground">{unit}</span>
          </div>
          <span className="text-sm text-muted-foreground tabular-nums">{format(goal)} target</span>
        </div>
        <div
          role="progressbar"
          aria-label={title}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
          aria-valuetext={`${format(current)} of ${format(goal)} target reached`}
          className="flex h-8 gap-0.5"
        >
          {Array.from({ length: segments }, (_, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={cn("min-w-0 flex-1 rounded-full", index < activeSegments ? "bg-green-500" : "bg-green-500/15")}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {goal > 0 ? `${percentage}% of ${period} target reached.` : "Set a target to track your progress."}
        </p>
      </CardContent>
    </Card>
  );
}
