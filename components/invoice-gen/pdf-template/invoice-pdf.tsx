import { Document, Page, Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";
import { formatCurrency, formatDate } from "@/lib/utils";
import { type BusinessSettings, type Client } from "@/lib/db/schema";
import { type InvoiceWithItems } from "@/types/invoice";
import { registerFonts } from "./pdf-fonts";
import { colors, spacing, typography } from "./pdf-theme";

// Register fonts before rendering
registerFonts();

const styles = StyleSheet.create({
  page: {
    padding: spacing.pagePadding,
    paddingBottom: 70, // Increased bottom padding to avoid collision with fixed page number
    fontSize: typography.body,
    fontFamily: "Montserrat",
    color: colors.text,
    lineHeight: typography.lineHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
    borderBottom: 1,
    borderColor: colors.border,
    paddingBottom: spacing.lg,
  },
  businessInfo: {
    flex: 1,
  },
  logo: {
    width: 100,
    marginBottom: spacing.md,
  },
  businessName: {
    fontSize: typography.h2,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  businessDetails: {
    fontSize: 9,
    color: colors.textMuted,
  },
  link: {
    color: colors.textMuted,
    textDecoration: "none",
  },
  invoiceTitleContainer: {
    textAlign: "right",
    flex: 1,
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  invoiceDetails: {
    gap: 2,
  },
  invoiceDetailRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  },
  invoiceDetailLabel: {
    color: colors.textMuted,
    fontWeight: 500,
  },
  invoiceDetailValue: {
    fontWeight: 700,
    minWidth: 80,
  },
  statusBadge: {
    marginTop: spacing.sm,
    fontSize: 8,
    fontWeight: 700,
    color: colors.textMuted,
    textTransform: "uppercase",
  },
  billingSection: {
    flexDirection: "row",
    marginBottom: spacing.xl,
    gap: spacing.xl,
  },
  billTo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    borderBottom: 1,
    borderColor: colors.border,
    paddingBottom: 2,
  },
  clientName: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  clientDetails: {
    fontSize: 9,
    color: colors.text,
  },
  table: {
    marginTop: spacing.md,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: colors.white,
    fontWeight: 700,
    fontSize: 9,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  tableRowEven: {
    backgroundColor: colors.backgroundLight,
  },
  col1: { width: "8%" },
  col2: { width: "52%" },
  col3: { width: "10%", textAlign: "center" },
  col4: { width: "15%", textAlign: "right" },
  col5: { width: "15%", textAlign: "right" },
  
  summarySection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: spacing.lg,
  },
  summaryBox: {
    width: 200,
    gap: spacing.xs,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTop: 1,
    borderColor: colors.border,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.primary,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.primary,
  },
  notesSection: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  footerSection: {
    flex: 1,
  },
  footerText: {
    fontSize: 9,
    color: colors.text,
    lineHeight: 1.4,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: spacing.pagePadding,
    fontSize: 8,
    color: colors.textMuted,
  },
});

interface InvoicePDFProps {
  business: BusinessSettings | null;
  client: Client;
  invoice: InvoiceWithItems;
}

const normalizeUrl = (url: string) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export function InvoicePDF({ business, client, invoice }: InvoicePDFProps) {
  const currency = business?.currency || "LKR";

  return (
    <Document title={`Invoice ${invoice.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.businessInfo}>
            {business?.logoUrl && (
              <Image src={business.logoUrl} style={styles.logo} />
            )}
            <Text style={styles.businessName}>{business?.businessName}</Text>
            <View style={styles.businessDetails}>
              {business?.address && <Text>{business.address}</Text>}
              {business?.phone && <Text>T: {business.phone}</Text>}
              {business?.email && (
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text>E: </Text>
                  <Link src={`mailto:${business.email}`} style={styles.link}>{business.email}</Link>
                </View>
              )}
              {business?.website && (
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text>W: </Text>
                  <Link src={normalizeUrl(business.website)} style={styles.link}>{business.website}</Link>
                </View>
              )}
            </View>
          </View>
          <View style={styles.invoiceTitleContainer}>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <View style={styles.invoiceDetails}>
              <View style={styles.invoiceDetailRow}>
                <Text style={styles.invoiceDetailLabel}>Invoice No:</Text>
                <Text style={styles.invoiceDetailValue}>{invoice.invoiceNumber}</Text>
              </View>
              <View style={styles.invoiceDetailRow}>
                <Text style={styles.invoiceDetailLabel}>Date:</Text>
                <Text style={styles.invoiceDetailValue}>{formatDate(invoice.issueDate)}</Text>
              </View>
              {invoice.dueDate && (
                <View style={styles.invoiceDetailRow}>
                  <Text style={styles.invoiceDetailLabel}>Due Date:</Text>
                  <Text style={styles.invoiceDetailValue}>{formatDate(invoice.dueDate)}</Text>
                </View>
              )}
              <Text style={styles.statusBadge}>Status: {invoice.status.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.billingSection}>
          <View style={styles.billTo}>
            <Text style={styles.sectionTitle} minPresenceAhead={20}>Bill To</Text>
            <Text style={styles.clientName}>{client?.name}</Text>
            <View style={styles.clientDetails}>
              {client?.address && <Text>{client.address}</Text>}
              {client?.phone && <Text>{client.phone}</Text>}
              {client?.email && <Link src={`mailto:${client.email}`} style={[styles.link, { color: colors.text }]}>{client.email}</Link>}
            </View>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader} fixed>
            <Text style={styles.col1}>#</Text>
            <Text style={styles.col2}>Description</Text>
            <Text style={styles.col3}>Qty</Text>
            <Text style={styles.col4}>Price</Text>
            <Text style={styles.col5}>Amount</Text>
          </View>
          {invoice.items.map((item, index) => (
            <View 
              key={item.id} 
              style={[styles.tableRow, index % 2 === 1 ? styles.tableRowEven : {}]}
              wrap={false}
            >
              <Text style={styles.col1}>{index + 1}</Text>
              <Text style={styles.col2}>{item.description}</Text>
              <Text style={styles.col3}>{item.quantity}</Text>
              <Text style={styles.col4}>{formatCurrency(item.unitPrice, currency)}</Text>
              <Text style={[styles.col5, { fontWeight: 700 }]}>{formatCurrency(item.totalPrice, currency)}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summarySection} wrap={false}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={{ color: colors.textMuted }}>Subtotal</Text>
              <Text>{formatCurrency(invoice.subtotal, currency)}</Text>
            </View>
            
            {invoice.taxRate > 0 && (
              <View style={styles.summaryRow}>
                <Text style={{ color: colors.textMuted }}>Tax ({invoice.taxRate}%)</Text>
                <Text>{formatCurrency(invoice.taxAmount, currency)}</Text>
              </View>
            )}

            {invoice.discountAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={{ color: colors.discount }}>Discount</Text>
                <Text style={{ color: colors.discount }}>-{formatCurrency(invoice.discountAmount, currency)}</Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(invoice.totalAmount, currency)}</Text>
            </View>
          </View>
        </View>

        {/* Notes & Terms */}
        <View style={styles.notesSection}>
          <View style={styles.footerSection} wrap={false}>
            <Text style={styles.sectionTitle} minPresenceAhead={20}>Notes</Text>
            <Text style={styles.footerText}>{invoice.customNotes || "Thank you for your business!"}</Text>
          </View>
          <View style={styles.footerSection} wrap={false}>
            <Text style={styles.sectionTitle} minPresenceAhead={20}>Payment Terms</Text>
            <Text style={styles.footerText}>
              {invoice.paymentTerms || business?.defaultPaymentTerms || "Standard payment terms apply."}
            </Text>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
