import { Container } from "@/components/container";
import { TechnicalBackground } from "@/components/technical-background";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InvoiceGenNav } from "@/components/invoice-gen/nav";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice Generator",
  robots: "noindex, nofollow",
};

export default function InvoiceGenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <TechnicalBackground />

      <Container className="pt-12 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto space-y-6">
          <Breadcrumbs
            items={[
              { label: "Dashboard", href: "/dashboard" },
              {
                label: "Invoice Generator",
                href: "/invoice-gen",
                active: true,
              },
            ]}
            className="mb-4 font-local-inter"
          />

          <header className="space-y-3 mb-8">
            <h1 className="text-4xl font-bold google-sans tracking-tight">
              Invoice Generator
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-local-inter">
              Manage clients, create invoices, and generate professional PDFs.
            </p>
          </header>

          <InvoiceGenNav />

          <div className="font-local-inter">{children}</div>
        </div>
      </Container>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </div>
  );
}
