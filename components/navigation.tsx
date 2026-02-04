"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText, BookOpen, GitBranch, Newspaper, Home, Menu, X, Users, Mail,
  ChevronLeft, ChevronRight, PanelLeft
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { WebShareButton } from "./web-share-button"
import { PushNotificationManager } from "./push-notification-manager"
import { useSidebar } from "./sidebar-context"

const primaryNav = [
  { name: "Home", href: "/", icon: Home },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "Articles", href: "/articles", icon: BookOpen },
  { name: "Projects", href: "/projects", icon: GitBranch },
  { name: "Tutorials", href: "/tutorials", icon: Newspaper },
]

const secondaryNav = [
  { name: "About", href: "/about", icon: Users },
  { name: "Contact", href: "/contact", icon: Mail },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isCollapsed, toggleSidebar } = useSidebar()

  const renderNavItem = (item: { name: string; href: string; icon: React.ElementType }) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={() => setMobileMenuOpen(false)}
        title={isCollapsed ? item.name : undefined}
        className={cn(
          "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all gap-3",
          isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
          isCollapsed ? "lg:justify-center lg:px-2 lg:gap-0" : "justify-start"
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        <span className={cn(
          "transition-opacity duration-300",
          isCollapsed ? "lg:opacity-0 lg:w-0 lg:overflow-hidden" : "opacity-100"
        )}>
          {item.name}
        </span>
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
          "fixed inset-y-0 left-0 z-40 border-r border-border bg-card transition-all duration-300 ease-in-out lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "lg:w-20 w-64" : "w-64"
        )}
      >
        <div className="flex h-full flex-col relative">
          {/* Collapse Toggle Button (Desktop only) */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-20 z-50 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground shadow-sm transition-transform hover:scale-110"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          {/* Logo */}
          <div className={cn(
            "border-b border-border px-6 py-6 transition-all duration-300",
            isCollapsed ? "px-4 overflow-hidden" : "px-6"
          )}>
            <Link href="/" className="block" onClick={() => setMobileMenuOpen(false)}>
              <div className={cn("flex items-center gap-3", isCollapsed && "lg:gap-0 lg:justify-center")}>
                <PanelLeft className={cn("h-6 w-6 text-primary shrink-0 transition-transform", isCollapsed && "scale-110")} />
                {!isCollapsed && (
                  <div className="animate-in fade-in slide-in-from-left-2 duration-300 hidden lg:block">
                    <h1 className="text-xl font-bold text-balance leading-tight mozilla-headline">DMY4102</h1>
                    <p className="mt-1 text-xs text-muted-foreground">Mechanical & Mechatronics Engineering Project</p>
                  </div>
                )}
                {/* Always show on mobile logo */}
                <div className="lg:hidden">
                  <h1 className="text-xl font-bold text-balance leading-tight mozilla-headline">DMY4102</h1>
                  <p className="mt-1 text-xs text-muted-foreground">Mechanical & Mechatronics Engineering Project</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {primaryNav.map(renderNavItem)}
            <hr className="my-2 border-border" />
            <PushNotificationManager isCollapsed={isCollapsed} />
            <WebShareButton isCollapsed={isCollapsed} />
            <hr className="my-2 border-border" />
            {secondaryNav.map(renderNavItem)}
          </nav>

          {/* Footer */}
          {(!isCollapsed || mobileMenuOpen) && (
            <div className={cn(
              "border-t border-border px-6 py-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
              isCollapsed && "lg:hidden"
            )}>
              <p className="text-xs text-muted-foreground">
                Undergraduate Group Project
                <br />
                The Open University of Sri Lanka
              </p>
            </div>
          )}
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
