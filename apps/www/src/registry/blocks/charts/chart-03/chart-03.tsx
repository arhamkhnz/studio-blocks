"use client";

import { useState, type ComponentProps } from "react";
import { cn } from "cn";

import { Card, CardAction, CardContent, CardDescription, CardHeader } from "@studio-blocks/blocks-ui/components/card";

export type AvailabilityStatus = "operational" | "degraded" | "outage" | "maintenance" | "unknown";

export type Chart03Props = ComponentProps<typeof Card> & {
  /** Daily uptime percentages, oldest first. Use null for a day without measurements. */
  days: readonly (number | null)[];
  /** Current service status, independent of historical incidents. */
  status?: AvailabilityStatus;
  periodLabel?: string;
  onDaySelect?: (uptime: number | null, index: number) => void;
};

const statuses = {
  operational: { label: "Operational", color: "bg-green-500" },
  degraded: { label: "Degraded", color: "bg-amber-500" },
  outage: { label: "Outage", color: "bg-red-500" },
  maintenance: { label: "Maintenance", color: "bg-blue-500" },
  unknown: { label: "Unknown", color: "bg-muted-foreground" },
} satisfies Record<AvailabilityStatus, { label: string; color: string }>;

function normalizeUptime(value: number | null) {
  return typeof value === "number" && Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : null;
}

function daySummary(uptime: number | null) {
  if (uptime === null) return "No measurements available.";
  return uptime === 100 ? "No incidents reported." : `${uptime.toFixed(2)}% availability.`;
}

export function Chart03({
  days,
  status = "operational",
  periodLabel = `over the last ${days.length} ${days.length === 1 ? "day" : "days"}`,
  onDaySelect,
  ...props
}: Chart03Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const values = days.map(normalizeUptime);
  const activeIndex = selectedIndex !== null && selectedIndex < values.length ? selectedIndex : values.length - 1;
  const measurements = values.filter((value) => value !== null);
  const availability = measurements.length
    ? measurements.reduce((total, value) => total + value, 0) / measurements.length
    : null;
  const currentStatus = statuses[status] ?? statuses.unknown;

  function dayLabel(index: number) {
    const daysAgo = days.length - index - 1;
    return daysAgo === 0 ? "Today" : `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  }

  function selectDay(index: number) {
    setSelectedIndex(index);
    onDaySelect?.(values[index] ?? null, index);
  }

  return (
    <Card {...props}>
      <CardHeader className="items-center">
        <CardDescription>API availability</CardDescription>
        <CardAction className="row-span-1 self-center">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span aria-hidden="true" className={cn("size-1.5 rounded-full", currentStatus.color)} />
            {currentStatus.label}
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="text-3xl leading-none tracking-tight tabular-nums">
            {availability === null ? "No data" : `${availability.toFixed(2)}%`}
          </div>
          <p className="text-xs text-muted-foreground">Availability {periodLabel}</p>
        </div>
        {days.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div
              role="group"
              aria-label="API availability daily history"
              className="flex h-9"
              style={{ gap: `min(0.25rem, ${100 / (days.length * 3)}%)` }}
            >
              {values.map((uptime, index) => {
                const label = `${dayLabel(index)}: ${daySummary(uptime)}`;
                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={label}
                    aria-pressed={index === activeIndex}
                    title={label}
                    onClick={() => selectDay(index)}
                    className={cn(
                      "min-w-0 flex-1 rounded-xs transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      index === activeIndex ? "opacity-100" : "opacity-60",
                      uptime === null
                        ? "bg-muted-foreground/25"
                        : uptime === 100
                          ? "bg-green-500"
                          : uptime === 0
                            ? "bg-red-500"
                            : "bg-amber-500",
                    )}
                  />
                );
              })}
            </div>
            <div className="flex justify-between gap-3 text-xs wrap-break-word text-muted-foreground">
              <span>{dayLabel(0)}</span>
              {days.length > 1 && <span>Today</span>}
            </div>
          </div>
        ) : null}
        <p role="status" aria-live="polite" className="border-t pt-3 text-xs leading-relaxed text-muted-foreground">
          {activeIndex >= 0
            ? `${dayLabel(activeIndex)} · ${daySummary(values[activeIndex] ?? null)}`
            : "No availability history yet."}
          {measurements.length > 0 && measurements.length < days.length && (
            <span className="block">
              {measurements.length} of {days.length} days measured.
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
