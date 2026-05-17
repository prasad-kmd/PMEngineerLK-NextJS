import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Document Editor | Engineering Tools | PrasadM Blogfolio",
  description:
    "High-performance Markdown environment with real-time GitHub-flavored preview and direct export capabilities.",
  openGraph: {
    title: "Technical Document Editor | Engineering Tools | PrasadM Blogfolio",
    description:
      "High-performance Markdown environment with real-time GitHub-flavored preview and direct export capabilities.",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Technical Document Editor")}`,
        width: 1200,
        height: 630,
        alt: "High-performance Markdown environment with real-time GitHub-flavored preview and direct export capabilities.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Document Editor | Engineering Tools | PrasadM Blogfolio",
    description:
      "High-performance Markdown environment with real-time GitHub-flavored preview and direct export capabilities.",
    images: [
      `/api/og?title=${encodeURIComponent("Technical Document Editor")}`,
    ],
  },
};

export default function MarkdownEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
