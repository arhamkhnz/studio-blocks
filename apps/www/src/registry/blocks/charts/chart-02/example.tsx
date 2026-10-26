"use client";

import { Chart02, type VisitorCountry } from "./chart-02";

const defaultActivity = [
  0, 6, 12, 20, 12, 0, 6, 6, 0, 4, 0, 20, 15, 4, 6, 0, 4, 12, 20, 0, 4, 20, 12, 0, 6, 6, 0, 20, 0, 4,
].map((visitors, index) => ({ minute: index + 1, visitors }));
const defaultCountries: VisitorCountry[] = [
  { code: "US", name: "United States", visitors: 14 },
  { code: "GB", name: "United Kingdom", visitors: 4 },
  { code: "CA", name: "Canada", visitors: 3 },
  { code: "IN", name: "India", visitors: 3 },
];

export default function Example() {
  return <Chart02 activity={defaultActivity} countries={defaultCountries} />;
}
