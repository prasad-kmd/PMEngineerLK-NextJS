import {
  getDashboardStats,
  getRecentInvoices,
} from "@/app/invoice-gen/actions/dashboard";
import { getSettings } from "@/app/invoice-gen/actions/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import {
  ReceiptText,
  Users,
  CreditCard,
  AlertCircle,
  ArrowRight,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const recentInvoices = await getRecentInvoices();
  const settings = await getSettings();

  if (!settings) {
    return (
      <Card className="border-primary/20 bg-primary/5 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardContent className="p-12 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Settings className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold google-sans">
              Configuration Required
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Please set up your business profile in settings to start
              generating invoices.
            </p>
          </div>
          <Button asChild className="rounded-xl px-8">
            <Link href="/invoice-gen/settings">Go to Settings</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    {
      title: "Total Invoices",
      value: stats.totalInvoices,
      icon: ReceiptText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Amount Paid",
      value: formatCurrency(stats.amountPaid, settings.currency),
      icon: CreditCard,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Outstanding",
      value: formatCurrency(stats.outstanding, settings.currency),
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "Overdue",
      value: formatCurrency(stats.overdue, settings.currency),
      icon: AlertCircle,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card
            key={stat.title}
            className="bg-card/20 backdrop-blur-md border-border/40 rounded-2xl hover:border-primary/30 transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold google-sans uppercase tracking-widest text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-local-jetbrains-mono tracking-tight">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="bg-card/20 backdrop-blur-md border-border/40 rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border/40">
            <div>
              <CardTitle className="text-lg font-bold google-sans">
                Recent Invoices
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Your most recently created invoices.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-xl h-9"
              >
                <Link href="/invoice-gen/invoices">View All</Link>
              </Button>
              <Button asChild size="sm" className="rounded-xl h-9">
                <Link
                  href="/invoice-gen/invoices/new"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Invoice</span>
                </Link>
              </Button>
            </div>
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
                      Client
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
                  {recentInvoices.length > 0 ? (
                    recentInvoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b border-border/40 hover:bg-muted/10 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <Link
                            href={`/invoice-gen/invoices/${invoice.id}`}
                            prefetch={false}
                          >
                            <span className="font-bold text-sm google-sans">
                              {invoice.invoiceNumber}
                            </span>
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          {invoice.clientName}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {formatDate(invoice.issueDate)}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold">
                          {formatCurrency(
                            invoice.totalAmount,
                            settings.currency,
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
                              prefetch={false}
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
                        colSpan={6}
                        className="px-6 py-12 text-center text-muted-foreground"
                      >
                        No recent invoices found.
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
  );
}
