import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Unit Converter | Engineering Tools | PrasadM Blogfolio",
  description:
    "Convert px to rem, em, %, and viewport units based on custom base font size.",
  openGraph: {
    title: "CSS Unit Converter | Engineering Tools | PrasadM Blogfolio",
    description:
      "Convert px to rem, em, %, and viewport units based on custom base font size.",
    url: "/tools/css-unit-converter",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("CSS Unit Converter")}`,
        width: 1200,
        height: 630,
        alt: "Convert px to rem, em, %, and viewport units based on custom base font size.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Unit Converter | Engineering Tools | PrasadM Blogfolio",
    description:
      "Convert px to rem, em, %, and viewport units based on custom base font size.",
    images: [`/api/og?title=${encodeURIComponent("CSS Unit Converter")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
