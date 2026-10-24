"use client";

import { useId, useState, type ComponentProps, type ComponentType, type SVGProps } from "react";
import Adobe from "@thesvg/react/adobe";
import Canva from "@thesvg/react/canva";
import Dropbox from "@thesvg/react/dropbox";
import Figma from "@thesvg/react/figma";
import Github from "@thesvg/react/github";
import GoogleDrive from "@thesvg/react/google-drive";
import Linear from "@thesvg/react/linear";
import Notion from "@thesvg/react/notion";
import Slack from "@thesvg/react/slack";
import Spotify from "@thesvg/react/spotify";
import Vercel from "@thesvg/react/vercel";
import Zoom from "@thesvg/react/zoom";
import { cn } from "cn";
import { format, parseISO } from "date-fns";
import { CalendarDays } from "lucide-react";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";
import { Empty, EmptyDescription } from "@studio-blocks/blocks-ui/components/empty";
import { Separator } from "@studio-blocks/blocks-ui/components/separator";
import { ToggleGroup, ToggleGroupItem } from "@studio-blocks/blocks-ui/components/toggle-group";

export type Renewal = {
  name: string;
  plan?: string;
  /** Optional brand icon. Entries without an icon show their first initial. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Amount in major currency units, for example 129.99 for $129.99. */
  amount: number;
};

export type RenewalDay = {
  /** Date in YYYY-MM-DD format. */
  date: string;
  total: number;
  items: readonly Renewal[];
};

export type RenewalWeek = {
  rangeLabel: string;
  total: number;
  count: number;
  days: readonly RenewalDay[];
};

export type List01Props = ComponentProps<typeof Card> & {
  /** Display-ready week with grouped renewals and precomputed totals. */
  data?: RenewalWeek;
  currency?: string;
};

// Example renewal amounts illustrate team subscriptions, not current service pricing.
const exampleWeek: RenewalWeek = {
  rangeLabel: "Oct 25 - 31",
  total: 2209,
  count: 12,
  days: [
    {
      date: "2026-10-25",
      total: 240,
      items: [
        { name: "Figma", icon: Figma, plan: "Professional monthly", amount: 120 },
        { name: "Notion", icon: Notion, plan: "Business monthly", amount: 120 },
      ],
    },
    {
      date: "2026-10-26",
      total: 590,
      items: [
        { name: "Slack", icon: Slack, plan: "Team monthly", amount: 240 },
        { name: "Linear", icon: Linear, plan: "Business monthly", amount: 200 },
        { name: "Vercel", icon: (props) => <Vercel variant="mono" {...props} />, plan: "Pro monthly", amount: 150 },
      ],
    },
    { date: "2026-10-27", total: 0, items: [] },
    {
      date: "2026-10-28",
      total: 129,
      items: [{ name: "GitHub", icon: Github, plan: "Team monthly", amount: 129 }],
    },
    {
      date: "2026-10-29",
      total: 890,
      items: [
        { name: "Dropbox", icon: Dropbox, plan: "Business monthly", amount: 320 },
        { name: "Zoom", icon: Zoom, plan: "Business monthly", amount: 240 },
        { name: "Google Drive", icon: GoogleDrive, plan: "Business monthly", amount: 200 },
        { name: "Adobe", icon: Adobe, plan: "Creative Cloud monthly", amount: 130 },
      ],
    },
    {
      date: "2026-10-30",
      total: 360,
      items: [
        { name: "Canva", icon: Canva, plan: "Business monthly", amount: 180 },
        { name: "Spotify", icon: Spotify, plan: "Annual subscription", amount: 180 },
      ],
    },
    { date: "2026-10-31", total: 0, items: [] },
  ],
};

function formatDate(date: string, pattern: string) {
  return format(parseISO(date), pattern);
}

export function List01({ data = exampleWeek, currency = "USD", className, ...props }: List01Props) {
  const detailsId = useId();
  const [selectedDay, setSelectedDay] = useState(0);
  const activeDay = data.days[selectedDay] ?? data.days[0];
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 0 });

  return (
    <Card className={cn("mx-auto w-full max-w-md", className)} {...props}>
      <CardHeader className="items-center">
        <CardTitle className="text-sm font-normal text-muted-foreground">Upcoming renewals</CardTitle>
        <CardAction className="row-span-1 flex items-center gap-1.5 self-center text-xs text-muted-foreground">
          <CalendarDays aria-hidden="true" className="size-3.5" />
          {data.rangeLabel}
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="col-span-full text-3xl leading-none font-normal tracking-tight tabular-nums">
            {money.format(data.total)}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.count} {data.count === 1 ? "subscription" : "subscriptions"} due this week
          </p>
        </div>
        <ToggleGroup
          aria-label="Renewal dates"
          multiple={false}
          value={activeDay ? [activeDay.date] : []}
          onValueChange={(values) => {
            const index = data.days.findIndex((day) => day.date === values[0]);
            if (index !== -1) setSelectedDay(index);
          }}
          className="grid w-full grid-cols-7 gap-1"
        >
          {data.days.map((day) => (
            <ToggleGroupItem
              key={day.date}
              value={day.date}
              aria-controls={detailsId}
              aria-label={`${formatDate(day.date, "EEEE, MMM d, yyyy")}, ${day.items.length} ${day.items.length === 1 ? "renewal" : "renewals"}`}
              className="h-auto min-w-0 flex-col gap-1 px-0 py-2"
            >
              <span className="text-xs text-muted-foreground">{formatDate(day.date, "EEE")}</span>
              <span className="tabular-nums">{formatDate(day.date, "d")}</span>
              <span
                aria-hidden="true"
                className={cn("size-1 rounded-full bg-muted-foreground", !day.items.length && "invisible")}
              />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div id={detailsId} aria-live="polite" aria-atomic="true" className="flex flex-col gap-2">
          {activeDay && (
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span>{formatDate(activeDay.date, "EEEE, MMM d")}</span>
              <span className="text-muted-foreground tabular-nums">{money.format(activeDay.total)}</span>
            </div>
          )}
          <Separator />
          {activeDay?.items.length ? (
            <ul aria-label="Subscriptions renewing on the selected date" className="flex flex-col gap-2">
              {activeDay.items.map((item, index) => (
                <li key={`${item.name}-${index}`} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    {item.icon ? (
                      <item.icon aria-hidden="true" className="size-5 shrink-0" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="grid size-4 shrink-0 place-items-center text-xs text-muted-foreground"
                      >
                        {item.name.trim().slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm wrap-break-word">{item.name}</p>
                      {item.plan && <p className="text-xs wrap-break-word text-muted-foreground">{item.plan}</p>}
                    </div>
                    <span className="shrink-0 text-xs tabular-nums">{money.format(item.amount)}</span>
                  </div>
                  {index < activeDay.items.length - 1 && <Separator />}
                </li>
              ))}
            </ul>
          ) : (
            <Empty className="py-4">
              <EmptyDescription className="text-xs">No renewals for this date.</EmptyDescription>
            </Empty>
          )}
        </div>
        <p className="text-xs text-muted-foreground">Amounts before applicable taxes.</p>
      </CardContent>
    </Card>
  );
}
