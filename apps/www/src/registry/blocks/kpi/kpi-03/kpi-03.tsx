import { Badge } from "@studio-blocks/blocks-ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";

export function Kpi03() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">Net worth</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="font-heading text-3xl leading-none tracking-tight tabular-nums">$128.4K</div>
          <p className="text-xs text-muted-foreground">+$9.8K vs last month</p>
        </div>
        <Badge className="bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300">+8.4%</Badge>
      </CardContent>
    </Card>
  );
}
