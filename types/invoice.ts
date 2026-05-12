import { type Client, type Invoice, type InvoiceItem } from "@/lib/db/schema";

export interface InvoiceWithItems extends Invoice {
  items: InvoiceItem[];
}

export interface InvoiceWithAll extends InvoiceWithItems {
  client: Client;
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";
