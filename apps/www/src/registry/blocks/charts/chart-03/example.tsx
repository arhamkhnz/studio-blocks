"use client";

import { Chart03 } from "./chart-03";

const exampleDays = Array.from({ length: 30 }, (_, index) => (index === 10 ? 99.375 : 100));

export default function Example() {
  return <Chart03 days={exampleDays} />;
}
