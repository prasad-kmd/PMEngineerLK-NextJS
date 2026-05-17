import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gear Ratio & Speed | Engineering Tools | PrasadM Blogfolio",
  description:
    "Calculate output speed and torque for gear trains or belt drives based on driver/driven parameters.",
  openGraph: {
    title: "Gear Ratio & Speed | Engineering Tools | PrasadM Blogfolio",
    description:
      "Calculate output speed and torque for gear trains or belt drives based on driver/driven parameters.",
    url: "/tools/gear-ratio-calculator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Gear Ratio & Speed")}`,
        width: 1200,
        height: 630,
        alt: "Calculate output speed and torque for gear trains or belt drives based on driver/driven parameters.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gear Ratio & Speed | Engineering Tools | PrasadM Blogfolio",
    description:
      "Calculate output speed and torque for gear trains or belt drives based on driver/driven parameters.",
    images: [`/api/og?title=${encodeURIComponent("Gear Ratio & Speed")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
