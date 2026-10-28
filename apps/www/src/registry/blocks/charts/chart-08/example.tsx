import { Chart08, type StorageUsage } from "./chart-08";

const data: StorageUsage = {
  capacity: 1000,
  categories: [
    { label: "Documents", used: 248.6 },
    { label: "Applications", used: 126.4 },
    { label: "Photos", used: 96.8 },
    { label: "Other Users & Shared", used: 42.5 },
    { label: "macOS", used: 24.7 },
    { label: "System Data", used: 145 },
  ],
};

export default function Example() {
  return <Chart08 data={data} />;
}
