import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Syntax Escaper | Engineering Tools | PrasadM Blogfolio",
  description:
    "Enterprise-grade HTML entity encoder/decoder designed for secure code presentation and XSS prevention.",
  openGraph: {
    title: "Security & Syntax Escaper | Engineering Tools | PrasadM Blogfolio",
    description:
      "Enterprise-grade HTML entity encoder/decoder designed for secure code presentation and XSS prevention.",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Security & Syntax Escaper")}`,
        width: 1200,
        height: 630,
        alt: "Enterprise-grade HTML entity encoder/decoder designed for secure code presentation and XSS prevention.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security & Syntax Escaper | Engineering Tools | PrasadM Blogfolio",
    description:
      "Enterprise-grade HTML entity encoder/decoder designed for secure code presentation and XSS prevention.",
    images: [
      `/api/og?title=${encodeURIComponent("Security & Syntax Escaper")}`,
    ],
  },
};

export default function HtmlEncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
