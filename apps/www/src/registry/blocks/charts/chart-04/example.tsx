"use client";

import { Chart04, type ResourceUsage } from "./chart-04";

const defaultItems: ResourceUsage[] = [
  { label: "CPU", used: 3.36, capacity: 8, unit: "vCPU" },
  { label: "Memory", used: 10.9, capacity: 16, unit: "GB" },
  { label: "Storage", used: 405, capacity: 500, unit: "GB" },
];

export default function Example() {
  return <Chart04 items={defaultItems} />;
}
