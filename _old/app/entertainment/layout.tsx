import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GSC Movie Hub | Entertainment",
  description:
    "Experience cinema like never before. High-fidelity streaming for true cinephiles.",
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
