import { ArrowUpRight, TrendingUp } from "lucide-react";

import { Badge } from "@studio-blocks/blocks-ui/components/badge";
import { Card, CardAction, CardContent, CardDescription, CardHeader } from "@studio-blocks/blocks-ui/components/card";

export function Kpi02() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Lead Pipeline Value</CardDescription>
        <CardAction>
          <ArrowUpRight className="size-4" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none tracking-tight">$284,500</span>
          <Badge
            variant="outline"
            className="border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300"
          >
            <TrendingUp />
            +12%
          </Badge>
        </div>
        <p className="text-sm">
          <span className="font-medium text-foreground">$254,200</span>{" "}
          <span className="text-muted-foreground">last month</span>
        </p>
      </CardContent>
    </Card>
  );
}
