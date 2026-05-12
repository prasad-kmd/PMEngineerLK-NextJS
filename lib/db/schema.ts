import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  uuid,
  index,
  integer,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { type InferSelectModel } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  role: text("role").notNull().default("user"),
  // Added for future extensibility and localstorage sync
  preferences: jsonb("preferences").default({}),
});

export type User = InferSelectModel<typeof user>;

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const systemLogs = pgTable(
  "system_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    service: text("service").notNull(), // 'notion', 'supabase', 'posthog', 'system'
    level: text("level").notNull(), // 'info', 'warning', 'error'
    message: text("message").notNull(),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      createdAtIndex: index("created_at_idx").on(table.createdAt),
      serviceCreatedAtIndex: index("service_created_at_idx").on(
        table.service,
        table.createdAt,
      ),
    };
  },
);

export const clients = pgTable(
  "clients",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    address: text("address"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    nameIdx: index("client_name_idx").on(table.name),
  }),
);

export type Client = InferSelectModel<typeof clients>;

export const invoices = pgTable(
  "invoices",
  {
    id: text("id").primaryKey(),
    invoiceNumber: text("invoice_number").notNull().unique(),
    clientId: text("client_id")
      .notNull()
      .references(() => clients.id),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    issueDate: timestamp("issue_date").notNull(),
    dueDate: timestamp("due_date"),
    status: text("status", {
      enum: ["draft", "sent", "paid", "overdue", "cancelled"],
    })
      .default("draft")
      .notNull(),
    subtotal: doublePrecision("subtotal").notNull(),
    taxRate: doublePrecision("tax_rate").default(0).notNull(),
    taxAmount: doublePrecision("tax_amount").default(0).notNull(),
    discountAmount: doublePrecision("discount_amount").default(0).notNull(),
    totalAmount: doublePrecision("total_amount").notNull(),
    customNotes: text("custom_notes"),
    paymentTerms: text("payment_terms"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    invoiceNumberIdx: index("invoice_number_idx").on(table.invoiceNumber),
    statusIdx: index("invoice_status_idx").on(table.status),
    issueDateIdx: index("issue_date_idx").on(table.issueDate),
  }),
);

export type Invoice = InferSelectModel<typeof invoices>;

export const invoiceItems = pgTable("invoice_items", {
  id: text("id").primaryKey(),
  invoiceId: text("invoice_id")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  quantity: doublePrecision("quantity").notNull(),
  unitPrice: doublePrecision("unit_price").notNull(),
  totalPrice: doublePrecision("total_price").notNull(),
  sortOrder: integer("sort_order").notNull(),
});

export type InvoiceItem = InferSelectModel<typeof invoiceItems>;

export const businessSettings = pgTable("business_settings", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id)
    .unique(),
  businessName: text("business_name").notNull(),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  logoUrl: text("logo_url"),
  defaultPaymentTerms: text("default_payment_terms"),
  defaultTaxRate: doublePrecision("default_tax_rate").default(0).notNull(),
  invoicePrefix: text("invoice_prefix").default("INV-").notNull(),
  nextInvoiceNumber: integer("next_invoice_number").default(1).notNull(),
  invoicePadding: integer("invoice_padding").default(4).notNull(),
  currency: text("currency").default("LKR").notNull(),
});

export type BusinessSettings = InferSelectModel<typeof businessSettings>;
