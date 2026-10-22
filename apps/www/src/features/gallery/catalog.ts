import { Kpi01 } from "@/registry/blocks/kpi-01/kpi-01";
import { Kpi02 } from "@/registry/blocks/kpi-02/kpi-02";

export const blocks = [
  {
    id: "kpi-01",
    title: "Total Revenue",
    category: "KPI Card",
    component: Kpi01,
    previewMaxWidth: 384,
  },
  {
    id: "kpi-02",
    title: "Lead Pipeline Value",
    category: "KPI Card",
    component: Kpi02,
    previewMaxWidth: 384,
  },
];
