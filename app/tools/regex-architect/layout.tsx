import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Pattern Architect | Engineering Tools | PrasadM Blogfolio",
  description:
    "Visual regular expression builder and tester with real-time match highlighting.",
  openGraph: {
    title: "Regex Pattern Architect | Engineering Tools | PrasadM Blogfolio",
    description:
      "Visual regular expression builder and tester with real-time match highlighting.",
    url: "/tools/regex-architect",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Regex Pattern Architect")}`,
        width: 1200,
        height: 630,
        alt: "Visual regular expression builder and tester with real-time match highlighting.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Pattern Architect | Engineering Tools | PrasadM Blogfolio",
    description:
      "Visual regular expression builder and tester with real-time match highlighting.",
    images: [`/api/og?title=${encodeURIComponent("Regex Pattern Architect")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
