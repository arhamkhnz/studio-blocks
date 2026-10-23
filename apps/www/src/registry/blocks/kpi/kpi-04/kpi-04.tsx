import { ShoppingBag } from "lucide-react";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";

export function Kpi04() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-normal">Total Orders</CardTitle>
        <CardDescription className="text-3xl leading-none tracking-tight text-foreground tabular-nums">
          379
        </CardDescription>
        <CardAction className="grid size-6 place-items-center rounded-sm bg-muted">
          <ShoppingBag className="size-3 text-foreground" aria-hidden="true" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          <span className="text-green-700 dark:text-green-300">+8.3%</span>{" "}
          <span className="text-muted-foreground">vs last week</span>
        </p>
      </CardContent>
    </Card>
  );
}
