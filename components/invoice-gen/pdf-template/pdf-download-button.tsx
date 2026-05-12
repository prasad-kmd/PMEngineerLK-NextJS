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

export function PDFDownloadButton({ business, client, invoice }: PDFDownloadButtonProps) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const document = useMemo(() => (
    <InvoicePDF business={business} client={client} invoice={invoice} />
  ), [business, client, invoice]);

  if (!isClient) {
    return (
      <Button className="rounded-full h-12 px-6 font-bold shadow-lg shadow-primary/20" disabled>
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
          className="rounded-full h-12 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 cursor-pointer" 
          disabled={loading}
        >
          <Download className="mr-2 h-4 w-4" />
          {loading ? "Generating..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
