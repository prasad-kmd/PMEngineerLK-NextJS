import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Material Property Database | Engineering Tools | PrasadM Blogfolio",
  description:
    "High-fidelity technical specifications for common engineering materials.",
  openGraph: {
    title: "Material Property Database | Engineering Tools | PrasadM Blogfolio",
    description:
      "High-fidelity technical specifications for common engineering materials.",
    url: "/tools/material-database",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Material Property Database")}`,
        width: 1200,
        height: 630,
        alt: "High-fidelity technical specifications for common engineering materials.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Material Property Database | Engineering Tools | PrasadM Blogfolio",
    description:
      "High-fidelity technical specifications for common engineering materials.",
    images: [
      `/api/og?title=${encodeURIComponent("Material Property Database")}`,
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
