import { Clock9 } from "@keyline-icons/react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@studio-blocks/blocks-ui/components/card";

export function Kpi09() {
  return (
    <Card className="w-full max-w-xs gap-8">
      <CardHeader>
        <CardTitle className="leading-none font-[450] text-muted-foreground">Conversation started</CardTitle>
        <CardDescription>Today morning</CardDescription>
        <CardAction>
          <Clock9 aria-hidden="true" className="size-5 text-muted-foreground" strokeWidth={1.75} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <time
          dateTime="09:41:06"
          className="flex items-baseline gap-1 text-2xl leading-none font-medium tracking-tight tabular-nums"
        >
          <span>9:41:06</span>
          <span className="text-lg font-normal text-muted-foreground">AM</span>
        </time>
      </CardContent>
    </Card>
  );
}
