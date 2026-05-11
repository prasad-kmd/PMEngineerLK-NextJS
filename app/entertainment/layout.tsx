import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "GSC Movie Hub | Entertainment",
  description:
    "Experience cinema like never before. High-fidelity streaming for true cinephiles.",
};

export default async function EntertainmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <main>{children}</main>
    </div>
  );
}
