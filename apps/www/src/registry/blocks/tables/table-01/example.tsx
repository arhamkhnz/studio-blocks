"use client";

import { Table01, type Invoice } from "./table-01";

const invoices = [
  {
    id: "INV-1042",
    customer: "Maple Design Co.",
    email: "billing@mapledesign.example",
    status: "paid",
    amount: 980,
    dueDate: "2026-10-30",
  },
  {
    id: "INV-1041",
    customer: "Summit Software",
    email: "finance@summitsoftware.example",
    status: "pending",
    amount: 2450,
    dueDate: "2026-10-28",
  },
  {
    id: "INV-1040",
    customer: "Cedar & Finch",
    email: "hello@cedarandfinch.example",
    status: "paid",
    amount: 1299,
    dueDate: "2026-10-25",
  },
  {
    id: "INV-1039",
    customer: "Harbor Coffee",
    email: "accounts@harborcoffee.example",
    status: "overdue",
    amount: 640,
    dueDate: "2026-10-20",
  },
  {
    id: "INV-1038",
    customer: "Oakwell Partners",
    email: "billing@oakwellpartners.example",
    status: "paid",
    amount: 3200,
    dueDate: "2026-10-18",
  },
  {
    id: "INV-1037",
    customer: "Fieldwork Studio",
    email: "billing@fieldworkstudio.example",
    status: "pending",
    amount: 1750,
    dueDate: "2026-10-16",
  },
  {
    id: "INV-1036",
    customer: "Brightside Creative",
    email: "accounts@brightsidecreative.example",
    status: "paid",
    amount: 860,
    dueDate: "2026-10-14",
  },
  {
    id: "INV-1035",
    customer: "Sunday Supply",
    email: "hello@sundaysupply.example",
    status: "overdue",
    amount: 1125,
    dueDate: "2026-10-12",
  },
] satisfies Invoice[];

export default function Example() {
  return <Table01 invoices={invoices} />;
}
