import { ArrowRight, Briefcase } from "@keyline-icons/react";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";

export function Kpi10() {
  return (
    <Card className="pb-0">
      <CardHeader className="flex gap-2 px-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-md border bg-muted text-muted-foreground shadow-xs">
          <Briefcase aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <CardDescription className="leading-none">Active contracts</CardDescription>
          <CardTitle className="text-lg font-medium tracking-tight tabular-nums">12</CardTitle>
        </div>
      </CardHeader>
      <CardFooter className="bg-muted p-0">
        <a
          href="#"
          aria-label="View active contracts details"
          className="flex w-full items-center justify-between px-(--card-spacing) py-2 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          View details
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </a>
      </CardFooter>
    </Card>
  );
}
