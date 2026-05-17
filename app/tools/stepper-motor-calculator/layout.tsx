import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stepper Motor Calculator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Calculate precise steps/mm settings for 3D printers and CNC machines based on hardware specs.",
  openGraph: {
    title: "Stepper Motor Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Calculate precise steps/mm settings for 3D printers and CNC machines based on hardware specs.",
    url: "/tools/stepper-motor-calculator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Stepper Motor Calculator")}`,
        width: 1200,
        height: 630,
        alt: "Calculate precise steps/mm settings for 3D printers and CNC machines based on hardware specs.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stepper Motor Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Calculate precise steps/mm settings for 3D printers and CNC machines based on hardware specs.",
    images: [`/api/og?title=${encodeURIComponent("Stepper Motor Calculator")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
