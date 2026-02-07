"use client"

import { useState, useEffect } from "react"
import { List, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TOCProps {
  content: string
}

export function TOC({ content }: TOCProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract headings from HTML content
    // Improved regex to be more flexible with attribute order and case sensitivity
    const headingRegex = /<h([2-3])\s+[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h\1>/gi
    const matches = Array.from(content.matchAll(headingRegex))
    
    const extractedHeadings = matches.map((match) => ({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, "").trim(), // Remove any nested HTML tags in heading
    }))

    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="hidden lg:block sticky top-24 h-fit w-64 shrink-0 overflow-y-auto max-h-[calc(100vh-8rem)] custom-scrollbar">
      <div className="flex items-center gap-2 mb-4 px-2">
        <List className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Table of Contents</h3>
      </div>
      <ul className="space-y-1 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "group flex items-center py-2 pr-4 transition-all hover:text-primary relative",
                heading.level === 3 ? "pl-8 text-xs" : "pl-4 text-sm font-medium",
                activeId === heading.id 
                  ? "text-primary border-l-2 border-primary -ml-[1.5px] bg-primary/5" 
                  : "text-muted-foreground border-l border-transparent"
              )}
            >
              {heading.text}
              <ChevronRight className={cn(
                "h-3 w-3 ml-auto opacity-0 transition-all group-hover:opacity-100",
                activeId === heading.id && "opacity-100"
              )} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
