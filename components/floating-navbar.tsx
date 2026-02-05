"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, Bookmark } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Search } from "./search"
import { BookmarksModal } from "./bookmarks-modal"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { toast } from "sonner"

interface FloatingNavbarProps {
    className?: string
    isMobileSidebar?: boolean
}

export function FloatingNavbar({ className, isMobileSidebar = false }: FloatingNavbarProps) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isBookmarksOpen, setIsBookmarksOpen] = useState(false)
    const { bookmarks } = useBookmarks()

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const navItems = [
        {
            icon: Bookmark,
            label: "Bookmarks",
            onClick: () => {
                if (bookmarks.length === 0) {
                    toast.info("No bookmarks saved yet", {
                        description: "Bookmark posts to see them here"
                    });
                } else {
                    setIsBookmarksOpen(true);
                }
            },
        },
    ]

    return (
        <div
            className={cn(
                "flex items-center gap-1 p-1 rounded-full border border-border bg-background/80 backdrop-blur shadow-lg transition-all",
                !isMobileSidebar && "fixed top-6 right-6 z-[60]",
                isMobileSidebar && "relative mt-auto w-fit mx-auto border-none shadow-none bg-transparent",
                className
            )}
        >
            <Search isMobileSidebar={isMobileSidebar} />
            {navItems.map((item) => (
                <button
                    key={item.label}
                    onClick={item.onClick}
                    className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative group"
                    aria-label={item.label}
                >
                    <item.icon className="h-5 w-5" />
                    {!isMobileSidebar && (
                        <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border shadow-sm">
                            {item.label}
                        </span>
                    )}
                </button>
            ))}
            <hr className="h-4 w-[1px] bg-border mx-1" />
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative group"
                aria-label="Toggle theme"
            >
                {theme === "dark" ? <Sun className="h-5 w-5 animate-in zoom-in-50 duration-300" /> : <Moon className="h-5 w-5 animate-in zoom-in-50 duration-300" />}
                {!isMobileSidebar && (
                    <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border shadow-sm">
                        Toggle Theme
                    </span>
                )}
            </button>
            <BookmarksModal
                isOpen={isBookmarksOpen}
                onClose={() => setIsBookmarksOpen(false)}
            />
        </div>
    )
}
