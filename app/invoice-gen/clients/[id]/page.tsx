import { getClientById } from "@/app/invoice-gen/actions/clients";
import { ClientForm } from "@/components/invoice-gen/client-form";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSettings } from "@/app/invoice-gen/actions/settings";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);
  const settings = await getSettings();

  if (!client) notFound();

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2">
          <ClientForm initialData={client} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/20 backdrop-blur-md border-border/40 rounded-2xl overflow-hidden shadow-sm">
            <CardHeader className="p-8 border-b border-border/40 bg-muted/5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold google-sans flex items-center gap-3">
                  <ReceiptText className="w-5 h-5 text-primary" />
                  Invoice History
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1 font-medium">
                  All invoices generated for this client.
                </p>
              </div>
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none"
              >
                <Link href={`/invoice-gen/invoices/new?clientId=${client.id}`}>
                  New Invoice
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/40 bg-muted/5">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Number
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Date
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {client.invoices.length > 0 ? (
                      client.invoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-b border-border/40 hover:bg-muted/10 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <span className="font-bold text-sm google-sans">
                              {invoice.invoiceNumber}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {formatDate(invoice.issueDate)}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold">
                            {formatCurrency(
                              invoice.totalAmount,
                              settings?.currency || "LKR",
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                invoice.status === "paid" &&
                                  "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                                invoice.status === "overdue" &&
                                  "bg-rose-500/10 text-rose-500 border-rose-500/20",
                                invoice.status === "draft" &&
                                  "bg-muted text-muted-foreground",
                                invoice.status === "sent" &&
                                  "bg-blue-500/10 text-blue-500 border-blue-500/20",
                                invoice.status === "cancelled" &&
                                  "bg-orange-500/10 text-orange-500 border-orange-500/20",
                              )}
                            >
                              {invoice.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              asChild
                              variant="ghost"
                              size="icon"
                              className="rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                            >
                              <Link
                                href={`/invoice-gen/invoices/${invoice.id}`}
                              >
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-12 text-center text-muted-foreground"
                        >
                          No invoices found for this client.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
