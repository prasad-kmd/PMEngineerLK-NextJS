import { Document, Page, Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";
import { formatDate } from "@/lib/utils";
import { type BusinessSettings, type Client } from "@/lib/db/schema";
import { type InvoiceWithItems } from "@/types/invoice";
import { registerFonts } from "./pdf-fonts";
import { colors, spacing, typography } from "./pdf-theme";

// Register fonts before rendering
registerFonts();

// Helper for number-only formatting (for table)
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

// Helper for currency code formatting (for summary)
const formatWithCurrency = (num: number, currency: string) => {
  const isNegative = num < 0;
  const absoluteValue = Math.abs(num);
  const formattedNumber = formatNumber(absoluteValue);
  
  return isNegative 
    ? `- ${currency} ${formattedNumber}` 
    : `${currency} ${formattedNumber}`;
};

const styles = StyleSheet.create({
  page: {
    padding: spacing.pagePadding,
    paddingBottom: 80, 
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
    fontFamily: "GoogleSans",
    fontSize: typography.h2,
    fontWeight: 500,
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
    flex: 1,
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontFamily: "Montserrat",
    fontSize: 28,
    fontWeight: 500,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.lg,
  },
  invoiceDetails: {
    gap: 8,
  },
  invoiceDetailRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: spacing.sm,
  },
  invoiceDetailLabel: {
    color: colors.textMuted,
    fontWeight: 500,
    fontSize: 9,
    width: 80,
    textAlign: "left",
  },
  invoiceDetailValue: {
    fontWeight: 700,
    fontSize: 9,
    width: 80,
    textAlign: "right",
  },
  invoiceDetailValueContainer: {
    width: 80,
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: colors.backgroundLight,
    border: 1,
    borderColor: colors.border,
  },
  statusText: {
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
    backgroundColor: colors.tableHeaderBg,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 9,
  },
  tableHeaderText: {
    color: colors.tableHeaderText,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    fontFamily: "Inter",
    fontSize: 9,
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
    fontFamily: "Inter",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    fontSize: 10,
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
  notesAndTerms: {
    flexDirection: "row",
    marginTop: spacing.xl,
    gap: spacing.xl,
  },
  notesCol: {
    flex: 1,
  },
  termsCol: {
    flex: 1,
    borderLeft: 1,
    borderColor: colors.border,
    paddingLeft: spacing.lg,
  },
  footerText: {
    fontSize: 9,
    color: colors.text,
    lineHeight: 1.4,
  },
  fixedFooter: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 7,
    lineHeight: 1.4,
  },
  footerLink: {
    color: colors.textMuted,
    textDecoration: "underline",
  },
  pageNumber: {
    position: "absolute",
    bottom: 25,
    right: spacing.pagePadding,
    fontSize: 7,
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
    <Document 
    title={`Invoice ${invoice.invoiceNumber} for ${client?.name}`}
    author="Prasad Madhuranga"
  subject={`Computer Generated Invoice - ${client?.name}`}
  keywords="invoice, engineering, LKR, Sri Lanka, PMEngineerLK"
  creator="Prasad Madhuranga (via prasadm.vercel.app)"
  producer="PrasadM Blogfolio"
    >
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
              <View style={styles.invoiceDetailRow}>
                <Text style={styles.invoiceDetailLabel}>Status:</Text>
                <View style={styles.invoiceDetailValueContainer}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{invoice.status.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
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
            <Text style={[styles.col1, styles.tableHeaderText]}>#</Text>
            <Text style={[styles.col2, styles.tableHeaderText]}>Description</Text>
            <Text style={[styles.col3, styles.tableHeaderText]}>Qty</Text>
            <Text style={[styles.col4, styles.tableHeaderText]}>Price</Text>
            <Text style={[styles.col5, styles.tableHeaderText]}>Amount</Text>
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
              <Text style={styles.col4}>{formatNumber(item.unitPrice)}</Text>
              <Text style={[styles.col5, { fontWeight: 700 }]}>{formatNumber(item.totalPrice)}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryBox} wrap={false}>
            <View style={styles.summaryRow}>
              <Text style={{ color: colors.textMuted }}>Subtotal</Text>
              <Text>{formatWithCurrency(invoice.subtotal, currency)}</Text>
            </View>
            
            {invoice.taxRate > 0 && (
              <View style={styles.summaryRow}>
                <Text style={{ color: colors.textMuted }}>Tax ({invoice.taxRate}%)</Text>
                <Text>{formatWithCurrency(invoice.taxAmount, currency)}</Text>
              </View>
            )}

            {invoice.discountAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={{ color: colors.discount }}>Discount</Text>
                <Text style={{ color: colors.discount }}>{formatWithCurrency(-invoice.discountAmount, currency)}</Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatWithCurrency(invoice.totalAmount, currency)}</Text>
            </View>
          </View>
        </View>

        {/* Notes & Terms */}
        <View style={styles.notesAndTerms}>
          <View style={styles.notesCol} wrap={false}>
            <Text style={styles.sectionTitle} minPresenceAhead={20}>Notes</Text>
            <Text style={styles.footerText}>{invoice.customNotes || "Thank you for your business!"}</Text>
          </View>
          <View style={styles.termsCol} wrap={false}>
            <Text style={styles.sectionTitle} minPresenceAhead={20}>Payment Terms</Text>
            <Text style={styles.footerText}>
              {invoice.paymentTerms || business?.defaultPaymentTerms || "Standard payment terms apply."}
            </Text>
          </View>
        </View>

        {/* Fixed Footer Statement */}
        <View style={styles.fixedFooter} fixed>
          <Text>This computer-generated invoice is valid and does not require a physical signature.</Text>
          <Text>
            Generated via{" "}
            <Link src="https://prasadm.vercel.app" style={styles.footerLink}>
              prasadm.vercel.app
            </Link>
          </Text>
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
