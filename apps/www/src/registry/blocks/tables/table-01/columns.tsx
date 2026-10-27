"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { cn } from "cn";
import { format, parseISO } from "date-fns";
import { Download, FileText } from "lucide-react";

import { Badge } from "@studio-blocks/blocks-ui/components/badge";
import { Button } from "@studio-blocks/blocks-ui/components/button";
import { invoiceTableFeatures } from "./data-table-features";

export type Invoice = {
  id: string;
  customer: string;
  email: string;
  status: "paid" | "pending" | "overdue";
  amount: number;
  /** Date in YYYY-MM-DD format. */
  dueDate: string;
};

export const invoiceStatuses = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
];

const statusColors = {
  paid: "border-emerald-300 bg-emerald-100 text-emerald-900",
  pending: "border-amber-300 bg-amber-100 text-amber-900",
  overdue: "border-rose-300 bg-rose-100 text-rose-900",
};
const columnHelper = createColumnHelper<typeof invoiceTableFeatures, Invoice>();

export function createInvoiceColumns(currency: string) {
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency });

  return columnHelper.columns([
    columnHelper.accessor("id", {
      header: "Invoice",
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className="flex items-center gap-2 text-muted-foreground">
          <FileText aria-hidden="true" className="size-3.5" />
          {getValue()}
        </span>
      ),
    }),
    columnHelper.accessor((invoice) => `${invoice.customer} ${invoice.email}`, {
      id: "customer",
      header: "Customer",
      enableSorting: false,
      cell: ({ row }) => <span className="font-medium">{row.original.customer}</span>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      enableSorting: false,
      enableGlobalFilter: false,
      filterFn: "equalsString",
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <Badge variant="outline" className={cn("rounded-sm px-1.5 font-medium", statusColors[status])}>
            {invoiceStatuses.find((item) => item.value === status)?.label}
          </Badge>
        );
      },
    }),
    columnHelper.accessor("dueDate", {
      header: "Due date",
      enableGlobalFilter: false,
      sortFn: "text",
      cell: ({ getValue }) => (
        <time dateTime={getValue()} className="text-muted-foreground">
          {format(parseISO(getValue()), "MMM d, yyyy")}
        </time>
      ),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      enableGlobalFilter: false,
      sortFn: "basic",
      cell: ({ getValue }) => <span className="font-medium tabular-nums">{money.format(getValue())}</span>,
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <Button type="button" variant="ghost" size="icon-sm" aria-label={`Download ${row.original.id}`}>
          <Download />
        </Button>
      ),
    }),
  ]);
}
