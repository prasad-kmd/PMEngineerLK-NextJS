import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Battery Life Estimator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Estimate system runtime based on battery capacity and load current with Peukert's Law support.",
  openGraph: {
    title: "Battery Life Estimator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Estimate system runtime based on battery capacity and load current with Peukert's Law support.",
    url: "/tools/battery-life-estimator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Battery Life Estimator")}`,
        width: 1200,
        height: 630,
        alt: "Estimate system runtime based on battery capacity and load current with Peukert's Law support.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Battery Life Estimator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Estimate system runtime based on battery capacity and load current with Peukert's Law support.",
    images: [`/api/og?title=${encodeURIComponent("Battery Life Estimator")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
