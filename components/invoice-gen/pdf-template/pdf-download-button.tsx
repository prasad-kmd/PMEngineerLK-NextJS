"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { type BusinessSettings, type Client } from "@/lib/db/schema";
import { type InvoiceWithItems } from "@/types/invoice";

interface PDFDownloadButtonProps {
  business: BusinessSettings | null;
  client: Client;
  invoice: InvoiceWithItems;
}

const PDFLink = dynamic(
  () => import("./pdf-link"),
  { 
    ssr: false,
    loading: () => (
      <Button
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none"
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  },
);

export function PDFDownloadButton({
  business,
  client,
  invoice,
}: PDFDownloadButtonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return (
      <Button
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none"
        onClick={() => setIsLoaded(true)}
      >
        <Download className="mr-2 h-4 w-4" />
        Prepare PDF
      </Button>
    );
  }

  return (
    <PDFLink
      business={business}
      client={client}
      invoice={invoice}
    />
  );
}
