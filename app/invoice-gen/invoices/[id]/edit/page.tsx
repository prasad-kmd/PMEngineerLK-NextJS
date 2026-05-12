import { getInvoiceById } from "@/app/invoice-gen/actions/invoices";
import { getClients } from "@/app/invoice-gen/actions/clients";
import { getSettings } from "@/app/invoice-gen/actions/settings";
import { InvoiceForm } from "@/components/invoice-gen/invoice-form";
import { notFound } from "next/navigation";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = await getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  const clients = await getClients();
  const settings = await getSettings();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold google-sans tracking-tight">
        Edit Invoice {invoice.invoiceNumber}
      </h1>
      <InvoiceForm 
        clients={clients} 
        business={settings} 
        initialData={invoice} 
      />
    </div>
  );
}
