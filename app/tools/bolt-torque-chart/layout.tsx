import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bolt Torque Chart | Engineering Tools | PrasadM Blogfolio",
  description:
    "Interactive reference for metric bolt torque specifications across different property classes.",
  openGraph: {
    title: "Bolt Torque Chart | Engineering Tools | PrasadM Blogfolio",
    description:
      "Interactive reference for metric bolt torque specifications across different property classes.",
    url: "/tools/bolt-torque-chart",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Bolt Torque Chart")}`,
        width: 1200,
        height: 630,
        alt: "Interactive reference for metric bolt torque specifications across different property classes.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolt Torque Chart | Engineering Tools | PrasadM Blogfolio",
    description:
      "Interactive reference for metric bolt torque specifications across different property classes.",
    images: [`/api/og?title=${encodeURIComponent("Bolt Torque Chart")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
