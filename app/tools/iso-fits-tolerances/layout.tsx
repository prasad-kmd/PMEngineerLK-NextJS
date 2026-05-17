import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ISO Fits & Tolerances | Engineering Tools | PrasadM Blogfolio",
  description:
    "Standardized fit calculator for shafts and holes based on ISO 286 diameter and tolerance classes.",
  openGraph: {
    title: "ISO Fits & Tolerances | Engineering Tools | PrasadM Blogfolio",
    description:
      "Standardized fit calculator for shafts and holes based on ISO 286 diameter and tolerance classes.",
    url: "/tools/iso-fits-tolerances",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("ISO Fits & Tolerances")}`,
        width: 1200,
        height: 630,
        alt: "Standardized fit calculator for shafts and holes based on ISO 286 diameter and tolerance classes.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISO Fits & Tolerances | Engineering Tools | PrasadM Blogfolio",
    description:
      "Standardized fit calculator for shafts and holes based on ISO 286 diameter and tolerance classes.",
    images: [`/api/og?title=${encodeURIComponent("ISO Fits & Tolerances")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
