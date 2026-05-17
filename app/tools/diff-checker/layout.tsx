import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diff Comparison Engine | Engineering Tools | PrasadM Blogfolio",
  description:
    "Side-by-side code comparison tool with intelligent change highlighting.",
  openGraph: {
    title: "Diff Comparison Engine | Engineering Tools | PrasadM Blogfolio",
    description:
      "Side-by-side code comparison tool with intelligent change highlighting.",
    url: "/tools/diff-checker",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Diff Comparison Engine")}`,
        width: 1200,
        height: 630,
        alt: "Side-by-side code comparison tool with intelligent change highlighting.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diff Comparison Engine | Engineering Tools | PrasadM Blogfolio",
    description:
      "Side-by-side code comparison tool with intelligent change highlighting.",
    images: [`/api/og?title=${encodeURIComponent("Diff Comparison Engine")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
