"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createInvoice,
  updateInvoice,
} from "@/app/invoice-gen/actions/invoices";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  Save,
  ReceiptText,
  User,
  Calendar,
  DollarSign,
  FileText,
  LayoutPanelTop,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { useState, useMemo } from "react";
import * as z from "zod";
import { type Client, type BusinessSettings } from "@/lib/db/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/app/invoice-gen/actions/clients";
import { type InvoiceWithAll } from "@/types/invoice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const invoiceItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0.01, "Quantity must be at least 0.01"),
  unitPrice: z.number().min(0, "Price cannot be negative"),
});

const invoiceSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  issueDate: z.date(),
  dueDate: z.date().nullable().optional(),
  status: z.enum(["draft", "sent", "paid", "overdue", "cancelled"]),
  taxRate: z.number().min(0).optional().default(0),
  discountAmount: z.number().min(0).optional().default(0),
  customNotes: z.string().optional(),
  paymentTerms: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

interface InvoiceFormProps {
  clients: Client[];
  business: BusinessSettings | null;
  initialData?: InvoiceWithAll;
}

const SectionHeader = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="text-lg font-bold google-sans tracking-tight">{title}</h3>
  </div>
);

export function InvoiceForm({
  clients: initialClients,
  business,
  initialData,
}: InvoiceFormProps) {
  const router = useRouter();
  const [clients, setClients] = useState(initialClients);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const currency = business?.currency || "LKR";

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          issueDate: new Date(initialData.issueDate),
          dueDate: initialData.dueDate ? new Date(initialData.dueDate) : null,
          taxRate: initialData.taxRate ?? 0,
          discountAmount: initialData.discountAmount ?? 0,
        }
      : {
          clientId: "",
          issueDate: new Date(),
          dueDate: null,
          status: "draft",
          taxRate: business?.defaultTaxRate || 0,
          discountAmount: 0,
          customNotes: "",
          paymentTerms: business?.defaultPaymentTerms || "",
          items: [{ description: "", quantity: 1, unitPrice: 0 }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watchedItems = form.watch("items");
  const watchedTaxRate = form.watch("taxRate");
  const watchedDiscount = form.watch("discountAmount");

  const { subtotal, taxAmount, total } = useMemo(() => {
    const sub = (watchedItems || []).reduce(
      (acc: number, item) =>
        acc + (item?.quantity || 0) * (item?.unitPrice || 0),
      0,
    );
    const tax = (sub * (watchedTaxRate || 0)) / 100;
    const tot = sub + tax - (watchedDiscount || 0);
    return { subtotal: sub, taxAmount: tax, total: tot };
  }, [watchedItems, watchedTaxRate, watchedDiscount]);

  async function onSubmit(values: InvoiceFormValues) {
    try {
      const dataToSubmit = {
        ...values,
        dueDate: values.dueDate || null,
      };
      if (initialData) {
        await updateInvoice(initialData.id, dataToSubmit);
        toast.success("Invoice updated");
      } else {
        await createInvoice(dataToSubmit);
        toast.success("Invoice created");
      }
      router.push("/invoice-gen/invoices");
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to save invoice";
      toast.error(message);
    }
  }

  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientAddress, setNewClientAddress] = useState("");

  const handleQuickAddClient = async () => {
    if (!newClientName) return;
    try {
      setIsAddingClient(true);
      const res = await createClient({
        name: newClientName,
        email: newClientEmail || null,
        phone: newClientPhone || null,
        address: newClientAddress || null,
      });
      const newClient: Client = {
        id: res.id,
        userId: "",
        name: newClientName,
        email: newClientEmail || null,
        phone: newClientPhone || null,
        address: newClientAddress || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setClients([newClient, ...clients]);
      form.setValue("clientId", res.id);
      setNewClientName("");
      setNewClientEmail("");
      setNewClientPhone("");
      setNewClientAddress("");
      toast.success("Client added and selected");
    } catch {
      toast.error("Failed to add client");
    } finally {
      setIsAddingClient(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Invoice Details */}
          <div className="p-8 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-3xl shadow-sm">
            <SectionHeader icon={ReceiptText} title="Invoice Details" />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                  <User className="h-3 w-3" /> Client
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Controller
                      control={form.control}
                      name="clientId"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border/40 focus:ring-primary/10">
                            <SelectValue placeholder="Select a client" />
                          </SelectTrigger>
                          <SelectContent className="bg-card/90 backdrop-blur-xl border-border/40 rounded-2xl">
                            {clients.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-11 w-11 rounded-xl bg-background/50 border-border/40 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card/90 backdrop-blur-2xl border-border/40 rounded-2xl max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold google-sans flex items-center gap-2">
                          <UserPlus className="h-5 w-5 text-primary" />
                          Quick Add Client
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-5 py-4 font-google-sans">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-muted-foreground ml-1 uppercase tracking-widest">
                            Full Name
                          </Label>
                          <Input
                            className="h-11 rounded-xl bg-background/50 border-border/40 focus:border-primary/50"
                            value={newClientName}
                            onChange={(e) => setNewClientName(e.target.value)}
                            placeholder="e.g. John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-muted-foreground ml-1 uppercase tracking-widest">
                            Email Address
                          </Label>
                          <Input
                            type="email"
                            className="h-11 rounded-xl bg-background/50 border-border/40 focus:border-primary/50"
                            value={newClientEmail}
                            onChange={(e) => setNewClientEmail(e.target.value)}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-muted-foreground ml-1 uppercase tracking-widest">
                            Phone Number
                          </Label>
                          <Input
                            className="h-11 rounded-xl bg-background/50 border-border/40 focus:border-primary/50"
                            value={newClientPhone}
                            onChange={(e) => setNewClientPhone(e.target.value)}
                            placeholder="+94 77 123 4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-muted-foreground ml-1 uppercase tracking-widest">
                            Address
                          </Label>
                          <Textarea
                            className="rounded-xl bg-background/50 border-border/40 focus:border-primary/50 min-h-[80px] resize-none"
                            value={newClientAddress}
                            onChange={(e) =>
                              setNewClientAddress(e.target.value)
                            }
                            placeholder="123, Main Street, Colombo"
                          />
                        </div>
                        <Button
                          type="button"
                          className="w-full font-local-inter font-bold h-11 text-sm uppercase tracking-widest mt-2 bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none"
                          onClick={handleQuickAddClient}
                          disabled={isAddingClient || !newClientName}
                        >
                          {isAddingClient ? "Adding..." : "Add Client"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                  <LayoutPanelTop className="h-3 w-3" /> Status
                </label>
                <Controller
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border/40 focus:ring-primary/10">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-card/90 backdrop-blur-xl border-border/40 rounded-2xl">
                        {["draft", "sent", "paid", "overdue", "cancelled"].map(
                          (s) => (
                            <SelectItem key={s} value={s}>
                              {s.toUpperCase()}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                  <Calendar className="h-3 w-3" /> Issue Date
                </label>
                <input
                  type="date"
                  {...form.register("issueDate", { valueAsDate: true })}
                  defaultValue={
                    form.getValues("issueDate")?.toISOString().split("T")[0]
                  }
                  className="w-full h-11 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-local-jetbrains-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                  <Calendar className="h-3 w-3" /> Due Date (Optional)
                </label>
                <input
                  type="date"
                  {...form.register("dueDate", { valueAsDate: true })}
                  defaultValue={
                    form.getValues("dueDate") instanceof Date
                      ? (form.getValues("dueDate") as Date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  className="w-full h-11 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-local-jetbrains-mono"
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="p-8 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-3xl shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <SectionHeader icon={Plus} title="Line Items" />
              <Button
                type="button"
                size="sm"
                onClick={() =>
                  append({ description: "", quantity: 1, unitPrice: 0 })
                }
                className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 border-none h-9 px-4 font-bold"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-12 gap-3 items-end p-4 rounded-2xl bg-background/30 border border-border/20"
                >
                  <div className="col-span-12 md:col-span-6 space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Description
                    </label>
                    <input
                      {...form.register(`items.${index}.description` as const)}
                      placeholder="Service description"
                      className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2 space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Qty
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      {...form.register(`items.${index}.quantity` as const, {
                        valueAsNumber: true,
                      })}
                      className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all text-sm font-local-jetbrains-mono"
                    />
                  </div>
                  <div className="col-span-5 md:col-span-3 space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...form.register(`items.${index}.unitPrice` as const, {
                        valueAsNumber: true,
                      })}
                      className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all text-sm font-local-jetbrains-mono"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="hover:bg-rose-500/10 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
          {/* Financial Summary */}
          <div className="p-8 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-3xl shadow-sm">
            <SectionHeader icon={DollarSign} title="Financial Summary" />
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...form.register("taxRate", { valueAsNumber: true })}
                    className="w-full h-11 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all font-local-jetbrains-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">
                    Discount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...form.register("discountAmount", {
                      valueAsNumber: true,
                    })}
                    className="w-full h-11 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all font-local-jetbrains-mono"
                  />
                </div>
              </div>
              <div className="pt-6 border-t border-border/40 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium font-local-jetbrains-mono">
                    {formatCurrency(subtotal, currency)}
                  </span>
                </div>
                {(watchedTaxRate ?? 0) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Tax ({watchedTaxRate}%)
                    </span>
                    <span className="font-medium">
                      {formatCurrency(taxAmount, currency)}
                    </span>
                  </div>
                )}
                {(watchedDiscount ?? 0) > 0 && (
                  <div className="flex justify-between text-sm text-rose-500">
                    <span>Discount</span>
                    <span className="font-local-jetbrains-mono">
                      -{formatCurrency(watchedDiscount ?? 0, currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-end pt-2">
                  <span className="text-sm font-bold uppercase tracking-widest google-sans">
                    Total
                  </span>
                  <span className="text-3xl font-black font-local-jetbrains-mono tracking-tighter text-primary">
                    {formatCurrency(total, currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="p-8 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-3xl shadow-sm">
            <SectionHeader icon={FileText} title="Notes & Terms" />
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  Custom Notes
                </label>
                <textarea
                  {...form.register("customNotes")}
                  className="w-full p-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all resize-none min-h-[100px]"
                  placeholder="Warranty info, additional services, etc."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  Payment Terms
                </label>
                <textarea
                  {...form.register("paymentTerms")}
                  className="w-full p-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all resize-none min-h-[100px]"
                  placeholder="Bank details, payment deadlines, etc."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Save Button - Contained within form area */}
        <div className="lg:col-span-12 sticky bottom-8 z-50 flex justify-center mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Button
            type="submit"
            className="bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none"
          >
            <Save className="h-5 w-5" />
            Save Invoice
          </Button>
        </div>
      </form>
    </div>
  );
}
