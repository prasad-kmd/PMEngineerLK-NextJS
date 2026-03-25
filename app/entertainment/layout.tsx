import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GSC Movie Hub | Entertainment",
  description:
    "Experience cinema like never before. High-fidelity streaming for true cinephiles.",
  openGraph: {
    title: "GSC Movie Hub | Entertainment",
    description: "Experience cinema like never before. High-fidelity streaming for true cinephiles.",
    type: "website",
    url: "/entertainment",
    images: [
      {
        url: "/api/og?title=GSC%20Movie%20Hub&description=Experience%20cinema%20like%20never%20before.%20High-fidelity%20streaming%20for%20true%20cinephiles.&type=entertainment",
        width: 1280,
        height: 720,
        alt: "GSC Movie Hub Entertainment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GSC Movie Hub | Entertainment",
    description: "Experience cinema like never before. High-fidelity streaming for true cinephiles.",
    images: ["/api/og?title=GSC%20Movie%20Hub&description=Experience%20cinema%20like%20never%20before.&type=entertainment"],
  },
};

export default function EntertainmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <main>{children}</main>
    </div>
  );
}
