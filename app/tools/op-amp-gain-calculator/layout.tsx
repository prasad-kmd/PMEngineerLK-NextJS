import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Op-Amp Gain Calculator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Visual gain calculator for Inverting and Non-Inverting operational amplifier configurations.",
  openGraph: {
    title: "Op-Amp Gain Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Visual gain calculator for Inverting and Non-Inverting operational amplifier configurations.",
    url: "/tools/op-amp-gain-calculator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Op-Amp Gain Calculator")}`,
        width: 1200,
        height: 630,
        alt: "Visual gain calculator for Inverting and Non-Inverting operational amplifier configurations.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Op-Amp Gain Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Visual gain calculator for Inverting and Non-Inverting operational amplifier configurations.",
    images: [`/api/og?title=${encodeURIComponent("Op-Amp Gain Calculator")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
