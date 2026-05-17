import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Contrast Checker | Engineering Tools | PrasadM Blogfolio",
  description:
    "Verify WCAG 2.1 accessibility compliance for foreground and background colors.",
  openGraph: {
    title: "Color Contrast Checker | Engineering Tools | PrasadM Blogfolio",
    description:
      "Verify WCAG 2.1 accessibility compliance for foreground and background colors.",
    url: "/tools/color-contrast-checker",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Color Contrast Checker")}`,
        width: 1200,
        height: 630,
        alt: "Verify WCAG 2.1 accessibility compliance for foreground and background colors.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Contrast Checker | Engineering Tools | PrasadM Blogfolio",
    description:
      "Verify WCAG 2.1 accessibility compliance for foreground and background colors.",
    images: [`/api/og?title=${encodeURIComponent("Color Contrast Checker")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
