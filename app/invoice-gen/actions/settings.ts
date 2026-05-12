"use server";

import { db } from "@/lib/db";
import { businessSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkAdmin } from "./auth-check";

const settingsSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().or(z.literal("")).nullable(),
  website: z.string().url().optional().or(z.literal("")).nullable(),
  logoUrl: z.string().url().optional().or(z.literal("")).nullable(),
  defaultPaymentTerms: z.string().optional().nullable(),
  defaultTaxRate: z.number().min(0),
  invoicePrefix: z.string().min(1),
  invoicePadding: z.number().min(1),
  currency: z.string().min(3).max(3),
});

export async function getSettings() {
  const user = await checkAdmin();
  const [settings] = await db
    .select()
    .from(businessSettings)
    .where(eq(businessSettings.userId, user.id));
  return settings;
}

export async function updateSettings(data: z.infer<typeof settingsSchema>) {
  const user = await checkAdmin();
  const validatedData = settingsSchema.parse(data);

  const [existing] = await db
    .select()
    .from(businessSettings)
    .where(eq(businessSettings.userId, user.id));

  if (existing) {
    await db
      .update(businessSettings)
      .set({
        ...validatedData,
      })
      .where(eq(businessSettings.userId, user.id));
  } else {
    await db.insert(businessSettings).values({
      id: crypto.randomUUID(),
      userId: user.id,
      ...validatedData,
    });
  }

  revalidatePath("/invoice-gen/settings");
  revalidatePath("/invoice-gen/invoices");
}
