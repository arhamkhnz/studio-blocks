import type { ComponentProps } from "react";
import { Waypoints } from "lucide-react";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";
import { Progress } from "@studio-blocks/blocks-ui/components/progress";

export type Kpi06Props = ComponentProps<typeof Card> & {
  title?: string;
  used?: number;
  limit?: number;
};

export function Kpi06({ title = "API requests", used = 24500, limit = 50000, ...props }: Kpi06Props) {
  const usage = Number.isFinite(used) ? Math.max(0, used) : 0;
  const quota = Number.isFinite(limit) ? Math.max(0, limit) : 0;
  const percentage = quota > 0 ? Math.min(100, (usage / quota) * 100) : 0;
  const format = (value: number) => value.toLocaleString("en-US");

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="font-normal">{title}</CardTitle>
        <CardAction>
          <div className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <Waypoints aria-hidden="true" className="size-4" />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="text-3xl leading-none tracking-tight tabular-nums">{format(usage)}</div>
        <Progress
          value={percentage}
          aria-label={`${title} quota usage`}
          aria-valuetext={`${format(usage)} of ${format(quota)} requests used`}
          className="**:data-[slot=progress-indicator]:bg-indigo-500"
        />
        <p className="text-xs text-muted-foreground">
          {format(usage)} of {format(quota)} requests used
        </p>
      </CardContent>
    </Card>
  );
}
