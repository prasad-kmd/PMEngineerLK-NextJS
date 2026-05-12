import { getInvoiceById } from "@/app/invoice-gen/actions/invoices";
import { getSettings } from "@/app/invoice-gen/actions/settings";
import { InvoicePreview } from "@/components/invoice-gen/invoice-preview";
import { Button } from "@/components/ui/button";
import { ReceiptText, FileEdit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PDFDownloadButton } from "@/components/invoice-gen/pdf-template/pdf-download-button";
import { DeleteInvoiceButton } from "@/components/invoice-gen/delete-invoice-button";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = await getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  const settings = await getSettings();

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black google-sans tracking-tight flex items-center gap-4">
            <ReceiptText className="h-10 w-10 text-primary shrink-0" />
            {invoice.invoiceNumber}
          </h1>
          <p className="text-muted-foreground">
            Previewing invoice for{" "}
            <span className="text-foreground font-bold">
              {invoice.client.name}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-2 border-primary text-primary shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:bg-primary/5 hover:brightness-[1.02] transition-all active:translate-y-[2px] active:shadow-none"
          >
            <Link href={`/invoice-gen/invoices/${invoice.id}/edit`}>
              <FileEdit className="mr-2 h-5 w-5" />
              Edit
            </Link>
          </Button>
          <DeleteInvoiceButton id={invoice.id} />
          <PDFDownloadButton
            business={settings}
            client={invoice.client}
            invoice={invoice}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <InvoicePreview
          business={settings}
          client={invoice.client}
          invoice={invoice}
        />
      </div>
    </div>
  );
}
