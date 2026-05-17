import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Books Library | PrasadM Blogfolio",
  description:
    "Discover millions of books, manuscripts, and other digital resources from the Open Library database.",
  openGraph: {
    title: "Open Books Library | PrasadM Blogfolio",
    description:
      "Discover millions of books, manuscripts, and other digital resources from the Open Library database.",
    url: "/open-books",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Open Books Library")}`,
        width: 1200,
        height: 630,
        alt: "Open Books Library",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
