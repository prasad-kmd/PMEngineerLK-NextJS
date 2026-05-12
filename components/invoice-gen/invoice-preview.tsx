import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { type BusinessSettings, type Client } from "@/lib/db/schema";
import Image from "next/image";
import { type InvoiceWithItems } from "@/types/invoice";

interface InvoicePreviewProps {
  business: BusinessSettings | null;
  client: Client | undefined;
  invoice: Partial<InvoiceWithItems>;
}

export function InvoicePreview({
  business,
  client,
  invoice,
}: InvoicePreviewProps) {
  const currency = business?.currency || "LKR";

  return (
    <Card className="mx-auto w-full max-w-4xl bg-white text-black shadow-lg overflow-hidden rounded-[2rem]">
      <CardContent className="p-12">
        <div className="flex justify-between border-b border-gray-100 pb-8">
          <div>
            {business?.logoUrl && (
              <div className="relative mb-4 h-16 w-32">
                <Image
                  src={business.logoUrl}
                  alt="Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-900">
              {business?.businessName || "Your Business Name"}
            </h2>
            <p className="text-gray-500 whitespace-pre-line text-sm mt-1">
              {business?.address}
            </p>
            <div className="mt-4 space-y-0.5 text-sm text-gray-500">
              {business?.phone && <p>{business.phone}</p>}
              {business?.email && <p>{business.email}</p>}
              {business?.website && <p>{business.website}</p>}
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-primary/20">
              Invoice
            </h1>
            <div className="mt-6 space-y-1 text-sm">
              <p className="font-bold text-gray-900">
                Invoice #: {invoice.invoiceNumber || "DRAFT"}
              </p>
              <p className="text-gray-500">
                Date: {formatDate(invoice.issueDate || new Date())}
              </p>
              {invoice.dueDate && (
                <p className="text-gray-500">
                  Due Date: {formatDate(invoice.dueDate)}
                </p>
              )}
              <div className="mt-3">
                <Badge
                  variant="outline"
                  className="uppercase font-bold text-[10px] tracking-widest border-gray-200"
                >
                  {invoice.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Bill To:
          </h3>
          <div className="text-sm">
            <p className="font-bold text-gray-900 text-lg">
              {client?.name || "Client Name"}
            </p>
            <p className="text-gray-500 whitespace-pre-line mt-1">
              {client?.address}
            </p>
            <div className="mt-2 text-gray-500">
              {client?.phone && <p>{client.phone}</p>}
              {client?.email && <p>{client.email}</p>}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Table>
            <TableHeader className="bg-gray-50/50 border-y border-gray-100">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-12 font-bold text-gray-900">
                  #
                </TableHead>
                <TableHead className="font-bold text-gray-900">
                  Description
                </TableHead>
                <TableHead className="text-center font-bold text-gray-900">
                  Qty
                </TableHead>
                <TableHead className="text-right font-bold text-gray-900">
                  Unit Price
                </TableHead>
                <TableHead className="text-right font-bold text-gray-900">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items?.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-gray-50 hover:bg-transparent"
                >
                  <TableCell className="text-gray-500">{index + 1}</TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {item.description || "Item description"}
                  </TableCell>
                  <TableCell className="text-center text-gray-900">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    {formatCurrency(item.unitPrice || 0, currency)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-gray-900">
                    {formatCurrency(
                      (item.quantity || 0) * (item.unitPrice || 0),
                      currency,
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-10 flex justify-end">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(invoice.subtotal || 0, currency)}
              </span>
            </div>
            {invoice.discountAmount && invoice.discountAmount > 0 && (
              <div className="flex justify-between text-sm text-rose-600 font-medium">
                <span>Discount</span>
                <span>-{formatCurrency(invoice.discountAmount, currency)}</span>
              </div>
            )}
            {invoice.taxRate && invoice.taxRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(invoice.taxAmount || 0, currency)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-100 pt-4 text-xl font-black text-gray-900">
              <span>Total</span>
              <span className="text-primary">
                {formatCurrency(invoice.totalAmount || 0, currency)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-12 border-t border-gray-100 pt-8 text-sm">
          <div>
            <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Notes
            </h4>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {invoice.customNotes || "No notes."}
            </p>
          </div>
          <div>
            <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Payment Terms
            </h4>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {invoice.paymentTerms ||
                business?.defaultPaymentTerms ||
                "Standard payment terms apply."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
