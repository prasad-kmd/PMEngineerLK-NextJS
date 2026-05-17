import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Mathematical Formula Architect | Engineering Tools | PrasadM Blogfolio",
  description:
    "Advanced LaTeX authoring environment with dynamic block mathematical rendering and formula templates.",
  openGraph: {
    title:
      "Mathematical Formula Architect | Engineering Tools | PrasadM Blogfolio",
    description:
      "Advanced LaTeX authoring environment with dynamic block mathematical rendering and formula templates.",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Mathematical Formula Architect")}`,
        width: 1200,
        height: 630,
        alt: "Advanced LaTeX authoring environment with dynamic block mathematical rendering and formula templates.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Mathematical Formula Architect | Engineering Tools | PrasadM Blogfolio",
    description:
      "Advanced LaTeX authoring environment with dynamic block mathematical rendering and formula templates.",
    images: [
      `/api/og?title=${encodeURIComponent("Mathematical Formula Architect")}`,
    ],
  },
};

export default function LatexEquationEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
