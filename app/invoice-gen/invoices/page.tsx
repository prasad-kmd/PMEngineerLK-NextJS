import { getInvoices } from "@/app/invoice-gen/actions/invoices";
import { getSettings } from "@/app/invoice-gen/actions/settings";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, ReceiptText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;
  const invoices = await getInvoices({ q, status });
  const settings = await getSettings();

  const statusFilters = [
    { label: "All", value: "all" },
    { label: "Draft", value: "draft" },
    { label: "Sent", value: "sent" },
    { label: "Paid", value: "paid" },
    { label: "Overdue", value: "overdue" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <form>
              <input
                name="q"
                defaultValue={q}
                placeholder="Search invoices..."
                className="w-full h-12 pl-4 pr-4 rounded-2xl bg-card/20 backdrop-blur-md border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
              />
            </form>
          </div>
          
          <div className="flex items-center gap-1 p-1 bg-muted/10 backdrop-blur-md rounded-2xl border border-border/40 overflow-x-auto no-scrollbar">
            {statusFilters.map((f) => (
              <Link
                key={f.value}
                href={`/invoice-gen/invoices?${new URLSearchParams({
                  ...(q ? { q } : {}),
                  ...(f.value !== 'all' ? { status: f.value } : {})
                }).toString()}`}
                className={cn(
                  "px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap",
                  (status === f.value || (!status && f.value === 'all'))
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>

        <Button asChild className="rounded-2xl h-12 px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 font-bold">
          <Link href="/invoice-gen/invoices/new" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>New Invoice</span>
          </Link>
        </Button>
      </div>

      <Card className="bg-card/20 backdrop-blur-md border-border/40 rounded-2xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-muted/5">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Invoice</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Client</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Issue Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Due Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-border/40 hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <ReceiptText className="w-4 h-4" />
                          </div>
                          <Link href={`/invoice-gen/invoices/${invoice.id}`}><span className="font-bold text-sm google-sans">{invoice.invoiceNumber}</span></Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{invoice.clientName}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(invoice.issueDate)}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(invoice.dueDate)}</td>
                      <td className="px-6 py-4 text-sm font-bold">{formatCurrency(invoice.totalAmount, settings?.currency || "LKR")}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={cn(
                          "rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                          invoice.status === 'paid' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                          invoice.status === 'overdue' && "bg-rose-500/10 text-rose-500 border-rose-500/20",
                          invoice.status === 'draft' && "bg-muted text-muted-foreground",
                          invoice.status === 'sent' && "bg-blue-500/10 text-blue-500 border-blue-500/20",
                          invoice.status === 'cancelled' && "bg-orange-500/10 text-orange-500 border-orange-500/20",
                        )}>
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button asChild variant="ghost" size="icon" className="rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <Link href={`/invoice-gen/invoices/${invoice.id}`}>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
