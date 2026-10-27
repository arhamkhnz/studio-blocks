"use client";

import { useMemo, useState } from "react";
import { useTable, type ColumnFiltersState, type PaginationState, type SortingState } from "@tanstack/react-table";
import { cn } from "cn";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Download } from "lucide-react";

import { Button } from "@studio-blocks/blocks-ui/components/button";
import { Empty, EmptyDescription } from "@studio-blocks/blocks-ui/components/empty";
import { Input } from "@studio-blocks/blocks-ui/components/input";
import { Pagination, PaginationContent, PaginationItem } from "@studio-blocks/blocks-ui/components/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@studio-blocks/blocks-ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@studio-blocks/blocks-ui/components/table";
import { createInvoiceColumns, invoiceStatuses, type Invoice } from "./columns";
import { invoiceTableFeatures } from "./data-table-features";

export type { Invoice } from "./columns";

export type Table01Props = {
  invoices: Invoice[];
  currency?: string;
};

const pageSizes = [5, 10, 20].map((value) => ({ value, label: String(value) }));

export function Table01({ invoices, currency = "USD" }: Table01Props) {
  const columns = useMemo(() => createInvoiceColumns(currency), [currency]);
  const [sorting, setSorting] = useState<SortingState>([{ id: "dueDate", desc: true }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 });
  const table = useTable({
    features: invoiceTableFeatures,
    data: invoices,
    columns,
    getRowId: (invoice) => invoice.id,
    globalFilterFn: "includesString",
    enableSortingRemoval: false,
    state: { sorting, columnFilters, globalFilter, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
  });
  const rows = table.getRowModel().rows;
  const total = table.getFilteredRowModel().rows.length;
  const status = (table.getColumn("status")?.getFilterValue() as string | undefined) ?? "all";
  const pageCount = Math.max(1, table.getPageCount());

  return (
    <section
      aria-label="Customer invoices"
      className="@container/invoices mx-auto w-full min-w-0 overflow-hidden bg-card"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold tracking-tight">Recent invoices</h2>
          <span className="text-xs font-normal text-muted-foreground tabular-nums">[{invoices.length}]</span>
        </div>
        <div className="flex min-w-0 flex-1 basis-full flex-wrap items-center justify-end gap-2 @lg/invoices:basis-auto">
          <Select
            items={invoiceStatuses}
            value={status}
            onValueChange={(value) => {
              if (invoiceStatuses.some((item) => item.value === value)) {
                table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value);
                table.setPageIndex(0);
              }
            }}
          >
            <SelectTrigger
              size="sm"
              aria-label="Filter invoices by payment status"
              className="w-full text-xs font-normal @lg/invoices:w-28"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start" alignItemWithTrigger={false}>
              <SelectGroup>
                {invoiceStatuses.map((item) => (
                  <SelectItem key={item.value} value={item.value} className="text-xs">
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            type="search"
            aria-label="Search invoices"
            placeholder="Search invoices…"
            value={globalFilter}
            onChange={(event) => {
              table.setGlobalFilter(event.target.value);
              table.setPageIndex(0);
            }}
            className="h-7 min-w-0 flex-1 rounded-[min(var(--radius-md),10px)] text-xs md:text-xs @lg/invoices:w-40 @lg/invoices:flex-none [&::-webkit-search-cancel-button]:opacity-50 [&::-webkit-search-cancel-button]:grayscale"
          />
          <Button type="button" variant="outline" size="sm" className="text-xs">
            <Download data-icon="inline-start" />
            Export
          </Button>
        </div>
      </header>
      <div className="overflow-hidden border-y">
        {rows.length ? (
          <Table
            aria-label="Customer invoices"
            className="min-w-xl [&_td]:px-3 [&_td]:py-1 [&_td+td]:border-l [&_td:first-child]:pl-4 [&_th]:px-3 [&_th+th]:border-l [&_th:first-child]:pl-4"
          >
            <TableHeader className="bg-muted/30 **:data-[slot=table-head]:h-8 **:data-[slot=table-head]:text-xs **:data-[slot=table-head]:font-medium **:data-[slot=table-head]:text-muted-foreground">
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id} className="hover:bg-transparent">
                  {group.headers.map((header) => {
                    const sorted = header.column.getIsSorted();
                    const SortIcon = sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown;
                    return (
                      <TableHead
                        key={header.id}
                        scope="col"
                        aria-sort={
                          header.column.getCanSort()
                            ? sorted === "asc"
                              ? "ascending"
                              : sorted === "desc"
                                ? "descending"
                                : "none"
                            : undefined
                        }
                        className={cn(
                          header.column.id === "amount" && "text-right",
                          header.column.id === "actions" && "w-12 text-right",
                        )}
                      >
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn("text-xs font-medium", header.column.id === "amount" ? "-mr-2.5" : "-ml-2.5")}
                            aria-label={`Sort ${header.column.columnDef.header} ${header.column.getNextSortingOrder() === "desc" ? "descending" : "ascending"}`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <table.FlexRender header={header} />
                            <SortIcon aria-hidden="true" data-icon="inline-end" />
                          </Button>
                        ) : (
                          <table.FlexRender header={header} />
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn((cell.column.id === "amount" || cell.column.id === "actions") && "text-right")}
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Empty className="min-h-48 gap-3">
            <EmptyDescription>
              {invoices.length ? "No invoices match your filters." : "No invoices to display."}
            </EmptyDescription>
            {(globalFilter || columnFilters.length > 0) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  table.resetColumnFilters();
                  table.setGlobalFilter("");
                  table.setPageIndex(0);
                }}
              >
                Clear filters
              </Button>
            )}
          </Empty>
        )}
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-xs font-normal text-muted-foreground tabular-nums">
        <p role="status" aria-live="polite">
          {total ? pagination.pageIndex * pagination.pageSize + 1 : 0}-
          {pagination.pageIndex * pagination.pageSize + rows.length} of {total} invoices
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Select
            items={pageSizes}
            value={pagination.pageSize}
            onValueChange={(value) => {
              if (value !== null) table.setPageSize(value);
            }}
          >
            <SelectTrigger size="sm" aria-label="Rows per page" className="text-xs font-normal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {pageSizes.map((item) => (
                  <SelectItem key={item.value} value={item.value} className="text-xs">
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="tabular-nums">
            Page {pagination.pageIndex + 1} of {pageCount}
          </span>
          <Pagination aria-label="Invoice pagination" className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Previous page"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                >
                  <ChevronLeft />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Next page"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                >
                  <ChevronRight />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </footer>
    </section>
  );
}
