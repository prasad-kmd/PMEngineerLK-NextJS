import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MathML Integration Engine | Engineering Tools | PrasadM Blogfolio",
  description:
    "Seamlessly transform LaTeX syntax into standards-compliant MathML for high-fidelity web-based mathematical rendering.",
  openGraph: {
    title: "MathML Integration Engine | Engineering Tools | PrasadM Blogfolio",
    description:
      "Seamlessly transform LaTeX syntax into standards-compliant MathML for high-fidelity web-based mathematical rendering.",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("MathML Integration Engine")}`,
        width: 1200,
        height: 630,
        alt: "Seamlessly transform LaTeX syntax into standards-compliant MathML for high-fidelity web-based mathematical rendering.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MathML Integration Engine | Engineering Tools | PrasadM Blogfolio",
    description:
      "Seamlessly transform LaTeX syntax into standards-compliant MathML for high-fidelity web-based mathematical rendering.",
    images: [
      `/api/og?title=${encodeURIComponent("MathML Integration Engine")}`,
    ],
  },
};

export default function LatexToMathmlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
