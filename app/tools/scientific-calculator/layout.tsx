import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Precision Engineering Calculator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Comprehensive computational engine with support for trigonometric, logarithmic, and advanced algebraic functions.",
  openGraph: {
    title:
      "Precision Engineering Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Comprehensive computational engine with support for trigonometric, logarithmic, and advanced algebraic functions.",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Precision Engineering Calculator")}`,
        width: 1200,
        height: 630,
        alt: "Comprehensive computational engine with support for trigonometric, logarithmic, and advanced algebraic functions.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Precision Engineering Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Comprehensive computational engine with support for trigonometric, logarithmic, and advanced algebraic functions.",
    images: [
      `/api/og?title=${encodeURIComponent("Precision Engineering Calculator")}`,
    ],
  },
};

export default function ScientificCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
