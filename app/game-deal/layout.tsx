import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Deals | PrasadM Blogfolio",
  description:
    "Find the best discounts on games across various digital stores using CheapShark API.",
  openGraph: {
    title: "Game Deals | PrasadM Blogfolio",
    description:
      "Find the best discounts on games across various digital stores using CheapShark API.",
    url: "/game-deal",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Game Deals")}`,
        width: 1200,
        height: 630,
        alt: "Game Deals",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
