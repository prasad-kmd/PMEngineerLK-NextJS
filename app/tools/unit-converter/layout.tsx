import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precision Unit Converter | Engineering Tools | PrasadM Blogfolio",
  description:
    "Standardized metric and imperial unit conversions for engineering parameters.",
  openGraph: {
    title: "Precision Unit Converter | Engineering Tools | PrasadM Blogfolio",
    description:
      "Standardized metric and imperial unit conversions for engineering parameters.",
    url: "/tools/unit-converter",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Precision Unit Converter")}`,
        width: 1200,
        height: 630,
        alt: "Standardized metric and imperial unit conversions for engineering parameters.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precision Unit Converter | Engineering Tools | PrasadM Blogfolio",
    description:
      "Standardized metric and imperial unit conversions for engineering parameters.",
    images: [`/api/og?title=${encodeURIComponent("Precision Unit Converter")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
