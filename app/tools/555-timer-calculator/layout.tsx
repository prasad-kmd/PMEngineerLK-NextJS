import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "555 Timer Calculator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Design Astable and Monostable 555 timer circuits by calculating component values for desired timing.",
  openGraph: {
    title: "555 Timer Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Design Astable and Monostable 555 timer circuits by calculating component values for desired timing.",
    url: "/tools/555-timer-calculator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("555 Timer Calculator")}`,
        width: 1200,
        height: 630,
        alt: "Design Astable and Monostable 555 timer circuits by calculating component values for desired timing.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "555 Timer Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Design Astable and Monostable 555 timer circuits by calculating component values for desired timing.",
    images: [`/api/og?title=${encodeURIComponent("555 Timer Calculator")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
