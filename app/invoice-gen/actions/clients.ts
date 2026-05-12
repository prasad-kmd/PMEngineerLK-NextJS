"use server";

import { db } from "@/lib/db";
import { clients, invoices } from "@/lib/db/schema";
import { eq, desc, ilike, or, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkAdmin } from "./auth-check";

const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional().or(z.literal("")).nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
});

export async function getClients(search?: string) {
  const user = await checkAdmin();
  if (search) {
    return await db
      .select()
      .from(clients)
      .where(
        and(
          eq(clients.userId, user.id),
          or(
            ilike(clients.name, `%${search}%`),
            ilike(clients.email, `%${search}%`),
            ilike(clients.phone, `%${search}%`),
          ),
        ),
      )
      .orderBy(desc(clients.createdAt));
  }
  return await db
    .select()
    .from(clients)
    .where(eq(clients.userId, user.id))
    .orderBy(desc(clients.createdAt));
}

export async function getClientById(id: string) {
  const user = await checkAdmin();
  const [client] = await db
    .select()
    .from(clients)
    .where(and(eq(clients.id, id), eq(clients.userId, user.id)));
  if (!client) return null;

  const clientInvoices = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.clientId, id), eq(invoices.userId, user.id)))
    .orderBy(desc(invoices.createdAt));

  return {
    ...client,
    invoices: clientInvoices,
  };
}

export async function createClient(data: z.infer<typeof clientSchema>) {
  const user = await checkAdmin();
  const validatedData = clientSchema.parse(data);
  const id = crypto.randomUUID();

  try {
    await db.insert(clients).values({
      id,
      userId: user.id,
      name: validatedData.name,
      email: validatedData.email ?? null,
      phone: validatedData.phone ?? null,
      address: validatedData.address ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath("/invoice-gen/clients");
    return { id };
  } catch (error) {
    console.error("Error creating client:", error);
    throw new Error("Failed to create client");
  }
}

export async function updateClient(
  id: string,
  data: z.infer<typeof clientSchema>,
) {
  const user = await checkAdmin();
  const validatedData = clientSchema.parse(data);

  try {
    await db
      .update(clients)
      .set({
        name: validatedData.name,
        email: validatedData.email ?? null,
        phone: validatedData.phone ?? null,
        address: validatedData.address ?? null,
        updatedAt: new Date(),
      })
      .where(and(eq(clients.id, id), eq(clients.userId, user.id)));

    revalidatePath("/invoice-gen/clients");
    revalidatePath(`/invoice-gen/clients/${id}`);
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error("Failed to update client");
  }
}

export async function deleteClient(id: string) {
  const user = await checkAdmin();
  try {
    await db
      .delete(clients)
      .where(and(eq(clients.id, id), eq(clients.userId, user.id)));
    revalidatePath("/invoice-gen/clients");
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error("Failed to delete client");
  }
}
