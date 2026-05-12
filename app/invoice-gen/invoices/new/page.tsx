import { getClients } from "@/app/invoice-gen/actions/clients";
import { getSettings } from "@/app/invoice-gen/actions/settings";
import { InvoiceForm } from "@/components/invoice-gen/invoice-form";
import { redirect } from "next/navigation";

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string }>;
}) {
  const { clientId } = await searchParams;
  const clients = await getClients();
  const settings = await getSettings();

  if (!settings) {
    redirect("/invoice-gen/settings");
  }

  return (
    <div className="space-y-8">
      <InvoiceForm
        clients={clients}
        business={settings}
        initialData={clientId ? { clientId } : undefined}
      />
    </div>
  );
}
