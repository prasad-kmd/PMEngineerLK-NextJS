import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PID Controller Simulator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Visual interactive graph for tuning P, I, and D gains with real-time step response analysis.",
  openGraph: {
    title: "PID Controller Simulator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Visual interactive graph for tuning P, I, and D gains with real-time step response analysis.",
    url: "/tools/pid-controller-simulator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("PID Controller Simulator")}`,
        width: 1200,
        height: 630,
        alt: "Visual interactive graph for tuning P, I, and D gains with real-time step response analysis.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PID Controller Simulator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Visual interactive graph for tuning P, I, and D gains with real-time step response analysis.",
    images: [`/api/og?title=${encodeURIComponent("PID Controller Simulator")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
