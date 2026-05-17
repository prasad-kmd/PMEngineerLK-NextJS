import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Glossary | PrasadM Blogfolio",
  description:
    "Clear, concise definitions for the technical terminology used throughout this platform and the broader engineering field.",
  openGraph: {
    title: "Engineering Glossary | PrasadM Blogfolio",
    description:
      "Clear, concise definitions for the technical terminology used throughout this platform and the broader engineering field.",
    url: "/glossary",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Engineering Glossary")}`,
        width: 1200,
        height: 630,
        alt: "Engineering Glossary",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
