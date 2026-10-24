"use client";

import { useState, type ComponentProps } from "react";
import { cn } from "cn";

import { Card, CardAction, CardContent, CardDescription, CardHeader } from "@studio-blocks/blocks-ui/components/card";

export type AvailabilityDay = {
  id: string;
  label: string;
  /** Percentage from 0 to 100. Use null when this day has no measurements. */
  uptime: number | null;
  incident?: string;
};

export type AvailabilityStatus = "operational" | "degraded" | "outage" | "maintenance" | "unknown";

export type Chart03Props = ComponentProps<typeof Card> & {
  title?: string;
  /** Equal-length daily buckets, ordered oldest first, with unique IDs. */
  days?: readonly AvailabilityDay[];
  /** Current service status, independent of historical incidents. */
  status?: AvailabilityStatus;
  periodLabel?: string;
  onDaySelect?: (day: AvailabilityDay) => void;
};

const exampleDays: AvailabilityDay[] = Array.from({ length: 30 }, (_, index) => ({
  id: `day-${index + 1}`,
  label: index === 29 ? "Today" : `${29 - index} ${index === 28 ? "day" : "days"} ago`,
  uptime: index === 10 ? 99.375 : 100,
  ...(index === 10 && { incident: "9-minute partial outage. Resolved." }),
}));

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

function daySummary(day: AvailabilityDay) {
  const uptime = normalizeUptime(day.uptime);
  if (uptime === null) return "No measurements available.";
  return day.incident ?? (uptime === 100 ? "No incidents reported." : `${uptime.toFixed(2)}% availability.`);
}

export function Chart03({
  title = "API availability",
  days = exampleDays,
  status = "operational",
  periodLabel = `over the last ${days.length} ${days.length === 1 ? "day" : "days"}`,
  onDaySelect,
  ...props
}: Chart03Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedDay = days.find((day) => day.id === selectedId) ?? days.at(-1);
  const measurements = days.map((day) => normalizeUptime(day.uptime)).filter((value) => value !== null);
  const availability = measurements.length
    ? measurements.reduce((total, value) => total + value, 0) / measurements.length
    : null;
  const currentStatus = statuses[status] ?? statuses.unknown;

  function selectDay(day: AvailabilityDay) {
    setSelectedId(day.id);
    onDaySelect?.(day);
  }

  return (
    <Card {...props}>
      <CardHeader className="items-center">
        <CardDescription>{title}</CardDescription>
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
              aria-label={`${title} daily history`}
              className="flex h-9"
              style={{ gap: `min(0.25rem, ${100 / (days.length * 3)}%)` }}
            >
              {days.map((day) => {
                const uptime = normalizeUptime(day.uptime);
                return (
                  <button
                    key={day.id}
                    type="button"
                    aria-label={`${day.label}: ${daySummary(day)}`}
                    aria-pressed={day.id === selectedDay?.id}
                    title={`${day.label}: ${daySummary(day)}`}
                    onClick={() => selectDay(day)}
                    className={cn(
                      "min-w-0 flex-1 rounded-xs transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      day.id === selectedDay?.id ? "opacity-100" : "opacity-60",
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
              <span>{days[0]?.label}</span>
              {days.length > 1 && <span>{days.at(-1)?.label}</span>}
            </div>
          </div>
        ) : null}
        <p role="status" aria-live="polite" className="border-t pt-3 text-xs leading-relaxed text-muted-foreground">
          {selectedDay ? `${selectedDay.label} · ${daySummary(selectedDay)}` : "No availability history yet."}
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
