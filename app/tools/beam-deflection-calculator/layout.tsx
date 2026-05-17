import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beam Deflection Calculator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Analyze maximum deflection and stress for Cantilever and Simply Supported beam load cases.",
  openGraph: {
    title: "Beam Deflection Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Analyze maximum deflection and stress for Cantilever and Simply Supported beam load cases.",
    url: "/tools/beam-deflection-calculator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Beam Deflection Calculator")}`,
        width: 1200,
        height: 630,
        alt: "Analyze maximum deflection and stress for Cantilever and Simply Supported beam load cases.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beam Deflection Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Analyze maximum deflection and stress for Cantilever and Simply Supported beam load cases.",
    images: [
      `/api/og?title=${encodeURIComponent("Beam Deflection Calculator")}`,
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
