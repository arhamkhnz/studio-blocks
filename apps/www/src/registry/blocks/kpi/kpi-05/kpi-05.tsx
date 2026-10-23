import { ArrowUpRight } from "lucide-react";

import { Badge } from "@studio-blocks/blocks-ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";

export function Kpi05() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-normal">Unique Visitors</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-2xl leading-none tracking-tight tabular-nums">213.1k</div>
          <Badge className="bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300">
            <ArrowUpRight />
            2.8%
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>
            from <span className="text-foreground">207.3k</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>last 4 weeks</span>
        </div>
      </CardContent>
    </Card>
  );
}
