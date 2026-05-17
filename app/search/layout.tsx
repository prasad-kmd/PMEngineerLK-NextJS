import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Source Search | PrasadM Blogfolio",
  description:
    "Search across multiple sources using the same search bar for your needs.",
  openGraph: {
    title: "Multi-Source Search | PrasadM Blogfolio",
    description:
      "Search across multiple sources using the same search bar for your needs.",
    url: "/search",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Multi-Source Search")}`,
        width: 1200,
        height: 630,
        alt: "Multi-Source Search",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
