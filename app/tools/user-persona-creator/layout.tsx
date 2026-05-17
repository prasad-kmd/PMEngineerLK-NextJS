import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Persona Architect | Engineering Tools | PrasadM Blogfolio",
  description:
    "Design and export professional user personas for empathy-driven engineering.",
  openGraph: {
    title: "User Persona Architect | Engineering Tools | PrasadM Blogfolio",
    description:
      "Design and export professional user personas for empathy-driven engineering.",
    url: "/tools/user-persona-creator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("User Persona Architect")}`,
        width: 1200,
        height: 630,
        alt: "Design and export professional user personas for empathy-driven engineering.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "User Persona Architect | Engineering Tools | PrasadM Blogfolio",
    description:
      "Design and export professional user personas for empathy-driven engineering.",
    images: [`/api/og?title=${encodeURIComponent("User Persona Architect")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
