import { Chart01, type IncomeItem } from "./chart-01";

const defaultItems: IncomeItem[] = [
  { label: "Primary salary", amount: 4560, color: "violet" },
  { label: "Freelance projects", amount: 1412, color: "blue" },
  { label: "Dividends and interest", amount: 765, color: "emerald" },
];

export default function Example() {
  return <Chart01 items={defaultItems} />;
}
