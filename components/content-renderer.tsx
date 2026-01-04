"use client"

import { useEffect, useRef } from "react"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import python from "highlight.js/lib/languages/python"
import cpp from "highlight.js/lib/languages/cpp"
import bash from "highlight.js/lib/languages/bash"
import "highlight.js/styles/github-dark.css"
import "katex/dist/katex.min.css"

// Register highlight.js languages
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("cpp", cpp)
hljs.registerLanguage("bash", bash)

interface ContentRendererProps {
  content: string
}

export function ContentRenderer({ content }: ContentRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // Initialize Highlight.js for code blocks
    const codeBlocks = contentRef.current.querySelectorAll("pre code")
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement)
    })

    // Initialize KaTeX for math expressions
    const renderMath = async () => {
      const katex = (await import("katex")).default

      // Render display math ($$...$$)
      const displayMathRegex = /\$\$([\s\S]+?)\$\$/g
      const inlineMathRegex = /\$([^$]+?)\$/g

      let html = contentRef.current!.innerHTML

      // Replace display math
      html = html.replace(displayMathRegex, (match, math) => {
        try {
          return katex.renderToString(math, {
            displayMode: true,
            throwOnError: false,
          })
        } catch (e) {
          console.error("KaTeX error:", e)
          return match
        }
      })

      // Replace inline math
      html = html.replace(inlineMathRegex, (match, math) => {
        try {
          return katex.renderToString(math, {
            displayMode: false,
            throwOnError: false,
          })
        } catch (e) {
          console.error("KaTeX error:", e)
          return match
        }
      })

      contentRef.current!.innerHTML = html

      // Re-highlight code blocks after KaTeX rendering
      const newCodeBlocks = contentRef.current!.querySelectorAll("pre code")
      newCodeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
      })
    }

    renderMath()
  }, [content])

  return (
    <div
      ref={contentRef}
      className="prose prose-neutral dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-6 
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:leading-relaxed prose-p:text-muted-foreground
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
        prose-strong:text-foreground prose-strong:font-semibold
        prose-code:rounded prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:font-mono prose-code:text-sm prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4
        prose-img:rounded-lg prose-img:border prose-img:border-border
        prose-table:border-collapse prose-table:border prose-table:border-border
        prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:font-semibold
        prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic
        prose-ul:list-disc prose-ul:pl-6
        prose-ol:list-decimal prose-ol:pl-6
        prose-li:text-muted-foreground prose-li:my-1"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
