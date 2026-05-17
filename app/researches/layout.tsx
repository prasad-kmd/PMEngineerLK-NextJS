import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Researches | PrasadM Blogfolio",
  description:
    "Access and search through the open-access archive for millions of scholarly articles in the fields of physics, mathematics, computer science, and engineering.",
  openGraph: {
    title: "Engineering Researches | PrasadM Blogfolio",
    description:
      "Access and search through the open-access archive for millions of scholarly articles in the fields of physics, mathematics, computer science, and engineering.",
    url: "/researches",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Engineering Researches")}`,
        width: 1200,
        height: 630,
        alt: "Engineering Researches",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
