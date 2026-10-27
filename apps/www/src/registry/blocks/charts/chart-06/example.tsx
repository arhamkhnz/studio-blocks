import { Chart06, type Chart06Props } from "./chart-06";

const metrics: Chart06Props["metrics"] = [
  { label: "FCP", score: 100 },
  { label: "LCP", score: 100 },
  { label: "TBT", score: 100 },
  { label: "CLS", score: 2 },
  { label: "SI", score: 65 },
];

export default function Example() {
  return <Chart06 score={72} metrics={metrics} />;
}
