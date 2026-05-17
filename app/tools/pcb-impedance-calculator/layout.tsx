import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PCB Impedance Calculator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Calculate microstrip and stripline characteristic impedance for high-speed PCB design.",
  openGraph: {
    title: "PCB Impedance Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Calculate microstrip and stripline characteristic impedance for high-speed PCB design.",
    url: "/tools/pcb-impedance-calculator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("PCB Impedance Calculator")}`,
        width: 1200,
        height: 630,
        alt: "Calculate microstrip and stripline characteristic impedance for high-speed PCB design.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PCB Impedance Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Calculate microstrip and stripline characteristic impedance for high-speed PCB design.",
    images: [`/api/og?title=${encodeURIComponent("PCB Impedance Calculator")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
