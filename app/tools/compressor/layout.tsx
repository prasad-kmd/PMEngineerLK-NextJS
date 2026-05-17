import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stream Compressor | Engineering Tools | PrasadM Blogfolio",
  description:
    "High-performance browser-native file compression using Compression Streams API.",
  openGraph: {
    title: "Stream Compressor | Engineering Tools | PrasadM Blogfolio",
    description:
      "High-performance browser-native file compression using Compression Streams API.",
    url: "/tools/compressor",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Stream Compressor")}`,
        width: 1200,
        height: 630,
        alt: "High-performance browser-native file compression using Compression Streams API.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stream Compressor | Engineering Tools | PrasadM Blogfolio",
    description:
      "High-performance browser-native file compression using Compression Streams API.",
    images: [`/api/og?title=${encodeURIComponent("Stream Compressor")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
