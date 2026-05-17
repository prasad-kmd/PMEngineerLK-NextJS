import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Button LAB | Tailwind Labs",
  description: "Interactive experiment for designing accent-aware Tailwind CSS buttons with live preview and code export.",
  openGraph: {
    title: "Button LAB | Tailwind Labs",
    description: "Interactive experiment for designing accent-aware Tailwind CSS buttons with live preview and code export.",
    url: "/tools/ts-labs/button-lab",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Button LAB")}`,
        width: 1200,
        height: 630,
        alt: "Button LAB",
      },
    ],
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}