import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LED Series Resistor | Engineering Tools | PrasadM Blogfolio",
  description:
    "Determine the ideal current-limiting resistor for your LED circuits to ensure optimal performance.",
  openGraph: {
    title: "LED Series Resistor | Engineering Tools | PrasadM Blogfolio",
    description:
      "Determine the ideal current-limiting resistor for your LED circuits to ensure optimal performance.",
    url: "/tools/led-resistor-calculator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("LED Series Resistor")}`,
        width: 1200,
        height: 630,
        alt: "Determine the ideal current-limiting resistor for your LED circuits to ensure optimal performance.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LED Series Resistor | Engineering Tools | PrasadM Blogfolio",
    description:
      "Determine the ideal current-limiting resistor for your LED circuits to ensure optimal performance.",
    images: [`/api/og?title=${encodeURIComponent("LED Series Resistor")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
