export const blockCategories = [
  { value: "all", label: "All" },
  { value: "kpi", label: "KPI Cards" },
  { value: "charts", label: "Charts" },
  { value: "forms", label: "Forms" },
  { value: "tables", label: "Tables" },
  { value: "lists", label: "Lists" },
  { value: "navigation", label: "Navigation" },
] as const;

export type CategoryFilter = (typeof blockCategories)[number]["value"];
export type BlockCategory = Exclude<CategoryFilter, "all">;
