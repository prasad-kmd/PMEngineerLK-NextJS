"use server";

import { db } from "@/lib/db";
import { invoices, clients } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { checkAdmin } from "./auth-check";

export async function getDashboardStats() {
  const user = await checkAdmin();
  const stats = await db
    .select({
      totalInvoices: sql<number>`count(*)`,
      amountPaid: sql<number>`sum(case when ${invoices.status} = 'paid' then ${invoices.totalAmount} else 0 end)`,
      outstanding: sql<number>`sum(case when ${invoices.status} in ('sent', 'overdue') then ${invoices.totalAmount} else 0 end)`,
      overdue: sql<number>`sum(case when ${invoices.status} = 'overdue' then ${invoices.totalAmount} else 0 end)`,
    })
    .from(invoices)
    .where(eq(invoices.userId, user.id));

  return {
    totalInvoices: Number(stats[0]?.totalInvoices || 0),
    amountPaid: Number(stats[0]?.amountPaid || 0),
    outstanding: Number(stats[0]?.outstanding || 0),
    overdue: Number(stats[0]?.overdue || 0),
  };
}

export async function getRecentInvoices(limit = 5) {
  const user = await checkAdmin();
  return await db
    .select({
      id: invoices.id,
      invoiceNumber: invoices.invoiceNumber,
      issueDate: invoices.issueDate,
      status: invoices.status,
      totalAmount: invoices.totalAmount,
      clientName: clients.name,
    })
    .from(invoices)
    .leftJoin(clients, eq(invoices.clientId, clients.id))
    .where(eq(invoices.userId, user.id))
    .orderBy(desc(invoices.createdAt))
    .limit(limit);
}
