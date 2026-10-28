import { Chart07, type TokenUsagePoint } from "./chart-07";

const data: TokenUsagePoint[] = [
  { label: "24h ago", tokens: 150000 },
  { label: "23h ago", tokens: 380000 },
  { label: "22h ago", tokens: 720000 },
  { label: "21h ago", tokens: 640000 },
  { label: "20h ago", tokens: 850000 },
  { label: "19h ago", tokens: 1200000 },
  { label: "18h ago", tokens: 1650000 },
  { label: "17h ago", tokens: 2400000 },
  { label: "16h ago", tokens: 2100000 },
  { label: "15h ago", tokens: 2250000 },
  { label: "14h ago", tokens: 1480000 },
  { label: "13h ago", tokens: 2300000 },
  { label: "12h ago", tokens: 1350000 },
  { label: "11h ago", tokens: 1580000 },
  { label: "10h ago", tokens: 920000 },
  { label: "9h ago", tokens: 1050000 },
  { label: "8h ago", tokens: 780000 },
  { label: "7h ago", tokens: 1750000 },
  { label: "6h ago", tokens: 2350000 },
  { label: "5h ago", tokens: 1450000 },
  { label: "4h ago", tokens: 980000 },
  { label: "3h ago", tokens: 820000 },
  { label: "2h ago", tokens: 650000 },
  { label: "1h ago", tokens: 480000 },
];

export default function Example() {
  return <Chart07 data={data} />;
}
