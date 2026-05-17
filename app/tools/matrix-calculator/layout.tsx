import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matrix Calculator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Calculate determinant, inverse, and trace for matrices with real-time validation.",
  openGraph: {
    title: "Matrix Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Calculate determinant, inverse, and trace for matrices with real-time validation.",
    url: "/tools/matrix-calculator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Matrix Calculator")}`,
        width: 1200,
        height: 630,
        alt: "Calculate determinant, inverse, and trace for matrices with real-time validation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matrix Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Calculate determinant, inverse, and trace for matrices with real-time validation.",
    images: [`/api/og?title=${encodeURIComponent("Matrix Calculator")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
