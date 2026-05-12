"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { createClient, updateClient } from "@/app/invoice-gen/actions/clients";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Save, X } from "lucide-react";
import { type Client } from "@/lib/db/schema";
// import { div } from "framer-motion/client";

const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional().or(z.literal("")).nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientFormProps {
  initialData?: Client;
}

export function ClientForm({ initialData }: ClientFormProps) {
  const router = useRouter();
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
      phone: initialData?.phone ?? "",
      address: initialData?.address ?? "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: ClientFormValues) {
    try {
      console.log("Submitting client data:", values);
      if (initialData) {
        await updateClient(initialData.id, values);
        toast.success("Client updated successfully");
      } else {
        await createClient(values);
        toast.success("Client created successfully");
      }
      router.push("/invoice-gen/clients");
      router.refresh();
    } catch (error) {
      console.error("Client form submission error:", error);
      toast.error("Something went wrong. Please check the console for details.");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <div className="p-8 md:p-12 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-3xl shadow-sm">
        <div className="flex items-start gap-4 mb-10">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold google-sans tracking-tight">
              {initialData ? "Edit Client" : "New Client"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {initialData
                ? "Update client contact information."
                : "Add a new client to your database."}
            </p>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
              <User className="h-3 w-3" /> Full Name
            </label>
            <input
              {...form.register("name")}
              placeholder="e.g. John Doe"
              className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            />
            {form.formState.errors.name && (
              <p className="text-xs font-bold text-rose-500 mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                <Mail className="h-3 w-3" /> Email Address
              </label>
              <input
                {...form.register("email")}
                type="email"
                placeholder="john@example.com"
                className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              />
              {form.formState.errors.email && (
                <p className="text-xs font-bold text-rose-500 mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
                <Phone className="h-3 w-3" /> Phone Number
              </label>
              <input
                {...form.register("phone")}
                placeholder="+1 (555) 000-0000"
                className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              />
            </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-2">
              <MapPin className="h-3 w-3" /> Physical Address
            </label>
            <textarea
              {...form.register("address")}
              placeholder="Enter client's address..."
              rows={4}
              className="w-full p-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-20 z-50 flex justify-center gap-4 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="bg-transparent border-2 border-primary text-primary shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:bg-primary/5 hover:brightness-[1.02] transition-all active:translate-y-[2px] active:shadow-none"
        >
          <X className="mr-2 h-5 w-5" />
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none"
        >
          <Save className="mr-3 h-5 w-5" />
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Update Client"
            : "Create Client"}
        </Button>
      </div>
    </form>
  );
}
