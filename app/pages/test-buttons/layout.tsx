import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Button Lab | PrasadM Blogfolio",
  description:
    "A sandbox for creating and testing accent-aware Tailwind button recipes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
