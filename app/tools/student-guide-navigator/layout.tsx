import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Engineering Student Navigator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Interactive guide and utility for OUSL Engineering students (2025/26).",
  openGraph: {
    title:
      "Engineering Student Navigator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Interactive guide and utility for OUSL Engineering students (2025/26).",
    url: "/tools/student-guide-navigator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Engineering Student Navigator")}`,
        width: 1200,
        height: 630,
        alt: "Interactive guide and utility for OUSL Engineering students (2025/26).",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Engineering Student Navigator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Interactive guide and utility for OUSL Engineering students (2025/26).",
    images: [
      `/api/og?title=${encodeURIComponent("Engineering Student Navigator")}`,
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
