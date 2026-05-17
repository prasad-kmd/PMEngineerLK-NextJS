import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Structure Validator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Advanced linting and formatting engine for complex JSON data structures.",
  openGraph: {
    title: "JSON Structure Validator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Advanced linting and formatting engine for complex JSON data structures.",
    url: "/tools/json-formatter",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("JSON Structure Validator")}`,
        width: 1200,
        height: 630,
        alt: "Advanced linting and formatting engine for complex JSON data structures.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Structure Validator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Advanced linting and formatting engine for complex JSON data structures.",
    images: [`/api/og?title=${encodeURIComponent("JSON Structure Validator")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
