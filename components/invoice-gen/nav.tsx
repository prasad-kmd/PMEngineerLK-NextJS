"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ReceiptText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/invoice-gen/dashboard", icon: LayoutDashboard },
  { name: "Invoices", href: "/invoice-gen/invoices", icon: ReceiptText },
  { name: "Clients", href: "/invoice-gen/clients", icon: Users },
  { name: "Settings", href: "/invoice-gen/settings", icon: Settings },
];

export function InvoiceGenNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-20 z-10 mb-12 flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-background/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-x-auto no-scrollbar">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all local-jetbrains-mono flex items-center gap-2 group whitespace-nowrap",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
            )}
          >
            <item.icon className={cn("w-3.5 h-3.5", isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100")} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
