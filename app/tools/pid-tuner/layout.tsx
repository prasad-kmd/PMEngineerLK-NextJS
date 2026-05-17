import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PID Controller Tuner | Engineering Tools | PrasadM Blogfolio",
  description:
    "Real-time Proportional-Integral-Derivative simulation for control systems analysis.",
  openGraph: {
    title: "PID Controller Tuner | Engineering Tools | PrasadM Blogfolio",
    description:
      "Real-time Proportional-Integral-Derivative simulation for control systems analysis.",
    url: "/tools/pid-tuner",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("PID Controller Tuner")}`,
        width: 1200,
        height: 630,
        alt: "Real-time Proportional-Integral-Derivative simulation for control systems analysis.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PID Controller Tuner | Engineering Tools | PrasadM Blogfolio",
    description:
      "Real-time Proportional-Integral-Derivative simulation for control systems analysis.",
    images: [`/api/og?title=${encodeURIComponent("PID Controller Tuner")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
