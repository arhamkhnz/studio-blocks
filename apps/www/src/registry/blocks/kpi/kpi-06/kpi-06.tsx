import { Waypoints } from "lucide-react";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";
import { Progress } from "@studio-blocks/blocks-ui/components/progress";

export function Kpi06() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-normal">API requests</CardTitle>
        <CardAction>
          <div className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <Waypoints aria-hidden="true" className="size-4" />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="text-3xl leading-none tracking-tight tabular-nums">24,500</div>
        <Progress
          value={49}
          aria-label="API requests quota usage"
          aria-valuetext="24,500 of 50,000 requests used"
          className="**:data-[slot=progress-indicator]:bg-indigo-500"
        />
        <p className="text-xs text-muted-foreground">24,500 of 50,000 requests used</p>
      </CardContent>
    </Card>
  );
}
