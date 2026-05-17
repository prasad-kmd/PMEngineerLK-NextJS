import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Circle Explorer | Engineering Tools | PrasadM Blogfolio",
  description:
    "Interactive visualization of trigonometric functions and unit circle relationships.",
  openGraph: {
    title: "Unit Circle Explorer | Engineering Tools | PrasadM Blogfolio",
    description:
      "Interactive visualization of trigonometric functions and unit circle relationships.",
    url: "/tools/unit-circle",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Unit Circle Explorer")}`,
        width: 1200,
        height: 630,
        alt: "Interactive visualization of trigonometric functions and unit circle relationships.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unit Circle Explorer | Engineering Tools | PrasadM Blogfolio",
    description:
      "Interactive visualization of trigonometric functions and unit circle relationships.",
    images: [`/api/og?title=${encodeURIComponent("Unit Circle Explorer")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
