export function BlockFilters() {
  return (
    <ul aria-label="Block categories" className="flex min-h-8 flex-wrap items-center gap-x-5 gap-y-3 text-sm">
      <li className="font-medium text-foreground">All</li>
      <li className="text-muted-foreground">KPI Card</li>
      <li className="text-muted-foreground">Charts</li>
      <li className="text-muted-foreground">Forms</li>
    </ul>
  );
}
