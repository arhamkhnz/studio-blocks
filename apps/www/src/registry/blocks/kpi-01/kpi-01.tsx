import { DollarSign, TrendingUp } from "lucide-react";

import { Badge } from "@studio-blocks/blocks-ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";

export function Kpi01() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
            <DollarSign className="size-4" />
          </div>
        </CardTitle>
        <CardDescription>Total Revenue</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-3xl leading-none font-medium tracking-tight tabular-nums">$1,250.00</div>
          <Badge>
            <TrendingUp className="size-3" />
            +12.5%
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Visitors for the last 6 months</p>
      </CardContent>
    </Card>
  );
}
