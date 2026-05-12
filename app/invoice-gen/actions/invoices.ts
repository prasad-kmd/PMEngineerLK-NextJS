"use server";

import { db } from "@/lib/db";
import {
  invoices,
  clients,
  invoiceItems,
  businessSettings,
} from "@/lib/db/schema";
import { eq, desc, ilike, or, and, gte, lte, type SQL } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkAdmin } from "./auth-check";

const invoiceItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0.01, "Quantity must be at least 0.01"),
  unitPrice: z.number().min(0, "Price cannot be negative"),
});

const invoiceSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  issueDate: z.date(),
  dueDate: z.date().optional().nullable(),
  status: z.enum(["draft", "sent", "paid", "overdue", "cancelled"]),
  taxRate: z.number().min(0).optional().default(0),
  discountAmount: z.number().min(0).optional().default(0),
  customNotes: z.string().optional().nullable(),
  paymentTerms: z.string().optional().nullable(),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
});

export async function getInvoices(filters?: {
  q?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const user = await checkAdmin();
  const query = db
    .select({
      id: invoices.id,
      invoiceNumber: invoices.invoiceNumber,
      issueDate: invoices.issueDate,
      dueDate: invoices.dueDate,
      status: invoices.status,
      totalAmount: invoices.totalAmount,
      clientName: clients.name,
    })
    .from(invoices)
    .leftJoin(clients, eq(invoices.clientId, clients.id));

  const conditions: SQL[] = [eq(invoices.userId, user.id)];

  if (filters?.q) {
    conditions.push(
      or(
        ilike(invoices.invoiceNumber, `%${filters.q}%`),
        ilike(clients.name, `%${filters.q}%`),
        ilike(clients.phone, `%${filters.q}%`),
      )!,
    );
  }

  if (filters?.status && filters.status !== "all") {
    conditions.push(
      eq(
        invoices.status,
        filters.status as "draft" | "sent" | "paid" | "overdue" | "cancelled",
      ),
    );
  }

  if (filters?.startDate) {
    conditions.push(gte(invoices.issueDate, filters.startDate));
  }

  if (filters?.endDate) {
    conditions.push(lte(invoices.issueDate, filters.endDate));
  }

  return await query
    .where(and(...conditions)!)
    .orderBy(desc(invoices.createdAt));
}

export async function getInvoiceById(id: string) {
  const user = await checkAdmin();
  const [invoice] = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, user.id)));

  if (!invoice) return null;

  const items = await db
    .select()
    .from(invoiceItems)
    .where(eq(invoiceItems.invoiceId, id))
    .orderBy(invoiceItems.sortOrder);

  const [client] = await db
    .select()
    .from(clients)
    .where(and(eq(clients.id, invoice.clientId), eq(clients.userId, user.id)));

  return {
    ...invoice,
    items,
    client,
  };
}

export async function createInvoice(data: z.infer<typeof invoiceSchema>) {
  const user = await checkAdmin();
  const validatedData = invoiceSchema.parse(data);

  const [settings] = await db
    .select()
    .from(businessSettings)
    .where(eq(businessSettings.userId, user.id));

  if (!settings) throw new Error("Business settings not found.");

  const invoiceId = crypto.randomUUID();
  const invoiceNumber = `${settings.invoicePrefix}${String(
    settings.nextInvoiceNumber,
  ).padStart(settings.invoicePadding, "0")}`;

  let subtotal = 0;
  const itemsToInsert = validatedData.items.map((item, index) => {
    const total = item.quantity * item.unitPrice;
    subtotal += total;
    return {
      id: crypto.randomUUID(),
      invoiceId,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: total,
      sortOrder: index,
    };
  });

  const taxAmount = (subtotal * (validatedData.taxRate ?? 0)) / 100;
  const totalAmount =
    subtotal + taxAmount - (validatedData.discountAmount ?? 0);

  await db.transaction(async (tx) => {
    await tx.insert(invoices).values({
      id: invoiceId,
      invoiceNumber,
      clientId: validatedData.clientId,
      userId: user.id,
      issueDate: validatedData.issueDate,
      dueDate: validatedData.dueDate ?? null,
      status: validatedData.status,
      subtotal,
      taxRate: validatedData.taxRate ?? 0,
      taxAmount,
      discountAmount: validatedData.discountAmount ?? 0,
      totalAmount,
      customNotes: validatedData.customNotes ?? null,
      paymentTerms:
        validatedData.paymentTerms || settings.defaultPaymentTerms || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await tx.insert(invoiceItems).values(itemsToInsert);

    await tx
      .update(businessSettings)
      .set({ nextInvoiceNumber: settings.nextInvoiceNumber + 1 })
      .where(eq(businessSettings.id, settings.id));
  });

  revalidatePath("/invoice-gen/invoices");
  revalidatePath("/invoice-gen/dashboard");
  return { id: invoiceId };
}

export async function updateInvoice(
  id: string,
  data: z.infer<typeof invoiceSchema>,
) {
  const user = await checkAdmin();
  const validatedData = invoiceSchema.parse(data);

  let subtotal = 0;
  const itemsToProcess = validatedData.items.map((item, index) => {
    const total = item.quantity * item.unitPrice;
    subtotal += total;
    return {
      id: item.id || crypto.randomUUID(),
      invoiceId: id,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: total,
      sortOrder: index,
    };
  });

  const taxAmount = (subtotal * (validatedData.taxRate ?? 0)) / 100;
  const totalAmount =
    subtotal + taxAmount - (validatedData.discountAmount ?? 0);

  await db.transaction(async (tx) => {
    const [existing] = await tx
      .select()
      .from(invoices)
      .where(and(eq(invoices.id, id), eq(invoices.userId, user.id)));

    if (!existing) throw new Error("Invoice not found or unauthorized");

    await tx
      .update(invoices)
      .set({
        clientId: validatedData.clientId,
        issueDate: validatedData.issueDate,
        dueDate: validatedData.dueDate ?? null,
        status: validatedData.status,
        subtotal,
        taxRate: validatedData.taxRate ?? 0,
        taxAmount,
        discountAmount: validatedData.discountAmount ?? 0,
        totalAmount,
        customNotes: validatedData.customNotes ?? null,
        paymentTerms: validatedData.paymentTerms ?? null,
        updatedAt: new Date(),
      })
      .where(eq(invoices.id, id));

    await tx.delete(invoiceItems).where(eq(invoiceItems.invoiceId, id));
    await tx.insert(invoiceItems).values(itemsToProcess);
  });

  revalidatePath("/invoice-gen/invoices");
  revalidatePath(`/invoice-gen/invoices/${id}`);
  revalidatePath("/invoice-gen/dashboard");
}

export async function deleteInvoice(id: string) {
  const user = await checkAdmin();
  await db
    .delete(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, user.id)));
  revalidatePath("/invoice-gen/invoices");
  revalidatePath("/invoice-gen/dashboard");
}

export async function updateInvoiceStatus(
  id: string,
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled",
) {
  const user = await checkAdmin();
  await db
    .update(invoices)
    .set({ status, updatedAt: new Date() })
    .where(and(eq(invoices.id, id), eq(invoices.userId, user.id)));
  revalidatePath("/invoice-gen/invoices");
  revalidatePath(`/invoice-gen/invoices/${id}`);
  revalidatePath("/invoice-gen/dashboard");
}
