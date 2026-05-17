import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Architect | Engineering Tools | PrasadM Blogfolio",
  description:
    "Craft a high-impact, professional resume with real-time preview and precision PDF export.",
  openGraph: {
    title: "Resume Architect | Engineering Tools | PrasadM Blogfolio",
    description:
      "Craft a high-impact, professional resume with real-time preview and precision PDF export.",
    url: "/tools/resume-creator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Resume Architect")}`,
        width: 1200,
        height: 630,
        alt: "Craft a high-impact, professional resume with real-time preview and precision PDF export.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Architect | Engineering Tools | PrasadM Blogfolio",
    description:
      "Craft a high-impact, professional resume with real-time preview and precision PDF export.",
    images: [`/api/og?title=${encodeURIComponent("Resume Architect")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
