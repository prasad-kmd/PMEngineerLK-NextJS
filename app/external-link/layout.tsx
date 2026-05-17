import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaving Our Site | PrasadM Blogfolio",
  description: "You are being redirected to an external website.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
