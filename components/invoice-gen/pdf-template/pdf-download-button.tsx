"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDF } from "./invoice-pdf";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useSyncExternalStore, useMemo } from "react";
import { type BusinessSettings, type Client } from "@/lib/db/schema";
import { type InvoiceWithItems } from "@/types/invoice";

interface PDFDownloadButtonProps {
  business: BusinessSettings | null;
  client: Client;
  invoice: InvoiceWithItems;
}

function subscribe() {
  return () => {};
}

export function PDFDownloadButton({
  business,
  client,
  invoice,
}: PDFDownloadButtonProps) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const document = useMemo(
    () => <InvoicePDF business={business} client={client} invoice={invoice} />,
    [business, client, invoice],
  );

  if (!isClient) {
    return (
      <Button
        className="rounded-full h-12 px-6 font-bold shadow-lg shadow-primary/20"
        disabled
      >
        <Download className="mr-2 h-4 w-4" />
        Loading PDF...
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={document}
      fileName={`${invoice.invoiceNumber}.pdf`}
    >
      {({ loading }) => (
        <Button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none"
          disabled={loading}
        >
          <Download className="mr-2 h-4 w-4" />
          {loading ? "Generating..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
