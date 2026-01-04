"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, BookOpen, GitBranch, Newspaper, Home, Menu, X, Users, Mail } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { WebShareButton } from "./web-share-button"
import { PushNotificationManager } from "./push-notification-manager"

const primaryNav = [
  { name: "Home", href: "/", icon: Home },
  { name: "Ideas", href: "/ideas", icon: FileText },
  { name: "Diary", href: "/diary", icon: BookOpen },
  { name: "Workflow", href: "/workflow", icon: GitBranch },
  { name: "Posts", href: "/posts", icon: Newspaper },
]

const secondaryNav = [
  { name: "About", href: "/about", icon: Users },
  { name: "Contact", href: "/contact", icon: Mail },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderNavItem = (item: { name: string; href: string; icon: React.ElementType }) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={() => setMobileMenuOpen(false)}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <item.icon className="h-5 w-5" />
        {item.name}
      </Link>
    )
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <Link href="/" className="text-lg font-bold">
          Engineering Project
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2 hover:bg-muted">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card transition-transform duration-300 lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-border px-6 py-6">
            <Link href="/" className="block" onClick={() => setMobileMenuOpen(false)}>
              <h1 className="text-xl font-bold text-balance leading-tight mozilla-headline">DMY4102</h1>
              <p className="mt-1 text-xs text-muted-foreground">Mechanical & Mechatronics Engineering Project</p>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {primaryNav.map(renderNavItem)}
            <hr className="my-2 border-border" />
            <PushNotificationManager />
            <WebShareButton />
            <hr className="my-2 border-border" />
            {secondaryNav.map(renderNavItem)}
          </nav>

          {/* Footer */}
          <div className="border-t border-border px-6 py-4">
            <p className="text-xs text-muted-foreground">
              Undergraduate Group Project
              <br />
              The Open University of Sri Lanka
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Spacer for mobile */}
      <div className="h-14 lg:hidden" />
    </>
  )
}
