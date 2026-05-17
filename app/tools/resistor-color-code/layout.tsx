import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resistor Color Code Solver | Engineering Tools | PrasadM Blogfolio",
  description:
    "Interactive visual calculator for 4, 5, and 6-band resistors with real-time value decoding.",
  openGraph: {
    title: "Resistor Color Code Solver | Engineering Tools | PrasadM Blogfolio",
    description:
      "Interactive visual calculator for 4, 5, and 6-band resistors with real-time value decoding.",
    url: "/tools/resistor-color-code",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Resistor Color Code Solver")}`,
        width: 1200,
        height: 630,
        alt: "Interactive visual calculator for 4, 5, and 6-band resistors with real-time value decoding.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resistor Color Code Solver | Engineering Tools | PrasadM Blogfolio",
    description:
      "Interactive visual calculator for 4, 5, and 6-band resistors with real-time value decoding.",
    images: [
      `/api/og?title=${encodeURIComponent("Resistor Color Code Solver")}`,
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
