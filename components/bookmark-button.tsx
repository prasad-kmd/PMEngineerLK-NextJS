"use client"

import { Bookmark } from "lucide-react"
import { useBookmarks, BookmarkedItem } from "@/hooks/use-bookmarks"
import { cn } from "@/lib/utils"

interface BookmarkButtonProps {
    item: BookmarkedItem
    className?: string
}

export function BookmarkButton({ item, className }: BookmarkButtonProps) {
    const { isBookmarked, toggleBookmark } = useBookmarks()
    const bookmarked = isBookmarked(item.slug, item.type)

    return (
        <button
            onClick={() => toggleBookmark(item)}
            className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all hover:bg-muted",
                bookmarked
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground",
                className
            )}
            title={bookmarked ? "Remove from bookmarks" : "Bookmark this post"}
        >
            <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
            <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
        </button>
    )
}
