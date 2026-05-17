import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PCB Trace Width Calculator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Calculate required trace width based on IPC-2221 standards for specific current and temperature rise.",
  openGraph: {
    title: "PCB Trace Width Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Calculate required trace width based on IPC-2221 standards for specific current and temperature rise.",
    url: "/tools/pcb-trace-width",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("PCB Trace Width Calculator")}`,
        width: 1200,
        height: 630,
        alt: "Calculate required trace width based on IPC-2221 standards for specific current and temperature rise.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PCB Trace Width Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Calculate required trace width based on IPC-2221 standards for specific current and temperature rise.",
    images: [
      `/api/og?title=${encodeURIComponent("PCB Trace Width Calculator")}`,
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
