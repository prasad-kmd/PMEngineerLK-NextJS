import type { Metadata } from "next";
import Link from "next/link";
import { Search, Bell, User } from "lucide-react";

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
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] selection:bg-[#4fdbc8] selection:text-[#003731]">
      <header className="sticky top-0 right-0 w-full z-40 flex justify-between items-center px-6 md:px-12 bg-[#131313]/60 backdrop-blur-xl h-16 border-b border-white/5">
        <Link href="/entertainment" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-[#4fdbc8] uppercase">
            GSC Movie Hub
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <form
            action="/entertainment/search"
            method="GET"
            className="relative group hidden md:block"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbcac6] h-4 w-4" />
            <input
              name="q"
              className="bg-[#353534]/40 border-none rounded-full py-2 px-10 text-sm focus:ring-1 focus:ring-[#4fdbc8] w-64 transition-all duration-300 placeholder:text-[#bbcac6]/50 outline-none"
              placeholder="Search titles..."
              type="text"
            />
          </form>

          <div className="flex items-center gap-4 text-[#bbcac6]">
            <button className="hover:bg-white/10 p-2 rounded-full transition-all">
              <Bell className="h-5 w-5" />
            </button>
            <button className="hover:bg-white/10 p-2 rounded-full transition-all">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
