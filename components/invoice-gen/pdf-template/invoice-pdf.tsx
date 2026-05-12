import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { formatCurrency, formatDate } from "@/lib/utils";
import { type BusinessSettings, type Client } from "@/lib/db/schema";
import { type InvoiceWithItems } from "@/types/invoice";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: 2,
    borderColor: "#000",
    paddingBottom: 20,
    marginBottom: 30,
  },
  businessInfo: {
    flexDirection: "column",
    flex: 1,
  },
  logo: {
    width: 120,
    marginBottom: 10,
  },
  businessName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  businessDetails: {
    fontSize: 9,
    color: "#666",
    lineHeight: 1.4,
  },
  invoiceTitleContainer: {
    textAlign: "right",
    flex: 1,
  },
  invoiceTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  invoiceDetails: {
    marginTop: 15,
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase",
    marginBottom: 8,
    borderBottom: 1,
    borderColor: "#EEE",
    paddingBottom: 4,
  },
  billToSection: {
    marginBottom: 40,
    width: "50%",
  },
  clientName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  clientDetails: {
    fontSize: 10,
    color: "#444",
    lineHeight: 1.4,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#000",
    padding: 10,
    color: "#FFF",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: "#EEE",
    padding: 10,
    alignItems: "center",
  },
  col1: { width: "10%" },
  col2: { width: "50%" },
  col3: { width: "10%", textAlign: "center" },
  col4: { width: "15%", textAlign: "right" },
  col5: { width: "15%", textAlign: "right" },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 40,
  },
  summaryBox: {
    width: 220,
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottom: 1,
    borderColor: "#EEE",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 40,
    right: 40,
    borderTop: 1,
    borderColor: "#EEE",
    paddingTop: 20,
    flexDirection: "row",
  },
  footerSection: {
    flex: 1,
    marginRight: 40,
  },
  footerText: {
    fontSize: 9,
    color: "#777",
    lineHeight: 1.5,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 40,
    fontSize: 8,
    color: "#AAA",
  },
});

interface InvoicePDFProps {
  business: BusinessSettings | null;
  client: Client;
  invoice: InvoiceWithItems;
}

export function InvoicePDF({ business, client, invoice }: InvoicePDFProps) {
  const currency = business?.currency || "LKR";

  return (
    <Document title={`Invoice ${invoice.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.businessInfo}>
            {business?.logoUrl && <Image src={business.logoUrl} style={styles.logo} alt="Business Logo" />}
            <Text style={styles.businessName}>{business?.businessName}</Text>
            <View style={styles.businessDetails}>
              {business?.address && <Text>{business.address}</Text>}
              {business?.phone && <Text>T: {business.phone}</Text>}
              {business?.email && <Text>E: {business.email}</Text>}
              {business?.website && <Text>W: {business.website}</Text>}
            </View>
          </View>
          <View style={styles.invoiceTitleContainer}>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <View style={styles.invoiceDetails}>
              <Text style={{ fontWeight: "bold" }}># {invoice.invoiceNumber}</Text>
              <Text>Date: {formatDate(invoice.issueDate)}</Text>
              {invoice.dueDate && <Text>Due: {formatDate(invoice.dueDate)}</Text>}
              <Text style={{ marginTop: 8, color: "#999", fontSize: 8 }}>STATUS: {invoice.status.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.billToSection}>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <Text style={styles.clientName}>{client?.name}</Text>
          <View style={styles.clientDetails}>
            {client?.address && <Text>{client.address}</Text>}
            {client?.phone && <Text>{client.phone}</Text>}
            {client?.email && <Text>{client.email}</Text>}
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>#</Text>
            <Text style={styles.col2}>Description</Text>
            <Text style={styles.col3}>Qty</Text>
            <Text style={styles.col4}>Unit Price</Text>
            <Text style={styles.col5}>Amount</Text>
          </View>
          {invoice.items.map((item, index) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.col1}>{index + 1}</Text>
              <Text style={styles.col2}>{item.description}</Text>
              <Text style={styles.col3}>{item.quantity}</Text>
              <Text style={styles.col4}>{formatCurrency(item.unitPrice, currency)}</Text>
              <Text style={[styles.col5, { fontWeight: "bold" }]}>{formatCurrency(item.totalPrice, currency)}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={{ color: "#666" }}>Subtotal</Text>
              <Text>{formatCurrency(invoice.subtotal, currency)}</Text>
            </View>
            
            {invoice.taxRate > 0 && (
              <View style={styles.summaryRow}>
                <Text style={{ color: "#666" }}>Tax ({invoice.taxRate}%)</Text>
                <Text>{formatCurrency(invoice.taxAmount, currency)}</Text>
              </View>
            )}

            {invoice.discountAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={{ color: "#dc2626" }}>Discount</Text>
                <Text style={{ color: "#dc2626" }}>-{formatCurrency(invoice.discountAmount, currency)}</Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(invoice.totalAmount, currency)}</Text>
            </View>
          </View>
        </View>

        {/* Notes & Terms */}
        <View style={styles.footer}>
          <View style={styles.footerSection}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.footerText}>{invoice.customNotes || "Thank you for your business!"}</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.sectionTitle}>Payment Terms</Text>
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
