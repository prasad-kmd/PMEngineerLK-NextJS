import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "External Feeds | PrasadM Blogfolio",
  description:
    "Latest updates and posts from my external engineering blog on Blogger.",
  openGraph: {
    title: "External Feeds | PrasadM Blogfolio",
    description:
      "Latest updates and posts from my external engineering blog on Blogger.",
    url: "/feeds",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("External Feeds")}`,
        width: 1200,
        height: 630,
        alt: "External Feeds",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
