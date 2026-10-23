import type { ComponentProps } from "react";
import { cn } from "cn";

import { Card, CardContent, CardHeader, CardTitle } from "@studio-blocks/blocks-ui/components/card";

const colors = {
  violet: "border-violet-600 bg-violet-500",
  blue: "border-blue-600 bg-blue-500",
  emerald: "border-emerald-600 bg-emerald-500",
  amber: "border-amber-600 bg-amber-500",
  rose: "border-rose-600 bg-rose-500",
};

export type IncomeItem = {
  label: string;
  amount: number;
  color: keyof typeof colors;
};

export type Chart01Props = ComponentProps<typeof Card> & {
  title?: string;
  items?: IncomeItem[];
  currency?: string;
  locale?: string;
};

const defaultItems: IncomeItem[] = [
  { label: "Primary salary", amount: 4560, color: "violet" },
  { label: "Freelance projects", amount: 1412, color: "blue" },
  { label: "Dividends and interest", amount: 765, color: "emerald" },
];

export function Chart01({
  title = "Income sources",
  items = defaultItems,
  currency = "USD",
  locale = "en-US",
  ...props
}: Chart01Props) {
  const sources = items.filter((item) => Number.isFinite(item.amount) && item.amount >= 0);
  const total = sources.reduce((sum, item) => sum + item.amount, 0);
  const formatter = new Intl.NumberFormat(locale, { style: "currency", currency });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-3 md:grid-flow-col md:auto-cols-fr">
          {sources.map((item, index) => (
            <section key={`${item.label}-${index}`} className="flex min-w-0 items-start gap-2">
              <span
                aria-hidden="true"
                className={cn("mt-1 size-2 shrink-0 rounded-full border", colors[item.color])}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="text-xs leading-snug text-muted-foreground wrap-break-word">
                  {item.label} · {total > 0 ? Math.round((item.amount / total) * 100) : 0}%
                </p>
                <div className="font-heading text-lg leading-none tracking-tight tabular-nums">
                  {formatter.format(item.amount)}
                </div>
              </div>
            </section>
          ))}
        </div>
        {total > 0 ? (
          <div aria-hidden="true" className="flex h-5 gap-1">
            {sources.filter((item) => item.amount > 0).map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className={cn("min-w-0 rounded-sm border", colors[item.color])}
                style={{ flexGrow: item.amount, flexBasis: 0 }}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No income to display.</p>
        )}
      </CardContent>
    </Card>
  );
}
