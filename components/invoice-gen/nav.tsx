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
    <nav className="flex items-center gap-1 p-1 bg-muted/10 backdrop-blur-md rounded-2xl border border-border/40 mb-8 overflow-x-auto no-scrollbar">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all relative group whitespace-nowrap",
              isActive
                ? "bg-background text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <item.icon className={cn("w-4 h-4", isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100")} />
            <span>{item.name}</span>
            {isActive && (
              <motion.div
                layoutId="active-invoice-nav"
                className="absolute inset-0 bg-background rounded-xl -z-10 shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
