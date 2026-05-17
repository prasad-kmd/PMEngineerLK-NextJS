import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Transformation Suite | Engineering Tools | PrasadM Blogfolio",
  description:
    "Comprehensive Base64, Hex, and URL encoding/decoding utilities.",
  openGraph: {
    title: "Data Transformation Suite | Engineering Tools | PrasadM Blogfolio",
    description:
      "Comprehensive Base64, Hex, and URL encoding/decoding utilities.",
    url: "/tools/data-transform",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Data Transformation Suite")}`,
        width: 1200,
        height: 630,
        alt: "Comprehensive Base64, Hex, and URL encoding/decoding utilities.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Transformation Suite | Engineering Tools | PrasadM Blogfolio",
    description:
      "Comprehensive Base64, Hex, and URL encoding/decoding utilities.",
    images: [
      `/api/og?title=${encodeURIComponent("Data Transformation Suite")}`,
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
