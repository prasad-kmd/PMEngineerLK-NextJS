import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moment of Inertia | Engineering Tools | PrasadM Blogfolio",
  description:
    "Compute Ixx and Iyy for standard cross-sections like I-beams, rectangles, and circles.",
  openGraph: {
    title: "Moment of Inertia | Engineering Tools | PrasadM Blogfolio",
    description:
      "Compute Ixx and Iyy for standard cross-sections like I-beams, rectangles, and circles.",
    url: "/tools/moment-of-inertia-calculator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Moment of Inertia")}`,
        width: 1200,
        height: 630,
        alt: "Compute Ixx and Iyy for standard cross-sections like I-beams, rectangles, and circles.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moment of Inertia | Engineering Tools | PrasadM Blogfolio",
    description:
      "Compute Ixx and Iyy for standard cross-sections like I-beams, rectangles, and circles.",
    images: [`/api/og?title=${encodeURIComponent("Moment of Inertia")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
