import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

// Custom renderer to add IDs to headings for TOC
const renderer = new marked.Renderer()
renderer.heading = ({ text, depth, raw }) => {
  const id = raw.toLowerCase().replace(/[^\w]+/g, "-")
  return `<h${depth} id="${id}">${text}</h${depth}>`
}

marked.setOptions({ renderer })

export interface ContentItem {
  slug: string
  title: string
  date?: string
  description?: string
  content: string
  rawContent: string
  final?: boolean
  firstImage?: string
  readingTime?: number
  technical?: string
  tags?: string[]
  type?: "blog" | "articles" | "projects" | "tutorials"
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function extractFirstImage(content: string, isMarkdown: boolean): string | undefined {
  if (isMarkdown) {
    // Match markdown image syntax: ![alt](url)
    const markdownImageRegex = /!\[.*?\]$$(.*?)$$/
    const match = content.match(markdownImageRegex)
    if (match && match[1]) {
      return match[1]
    }
  }

  // Match HTML image syntax: <img src="url" or <img ... src="url"
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/i
  const match = content.match(htmlImageRegex)
  if (match && match[1]) {
    return match[1]
  }

  return undefined
}

const contentDirectory = path.join(process.cwd(), "content")

export function getContentByType(type: "blog" | "articles" | "projects" | "tutorials"): ContentItem[] {
  const typeDirectory = path.join(contentDirectory, type)

  // Create directory if it doesn't exist
  if (!fs.existsSync(typeDirectory)) {
    return []
  }

  const files = fs.readdirSync(typeDirectory)

  const items = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".html"))
    .map((file) => {
      const slug = file.replace(/\.(md|html)$/, "")
      const fullPath = path.join(typeDirectory, file)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      if (file.endsWith(".md")) {
        const { data, content } = matter(fileContents)
        const htmlContent = marked(content)
        const firstImage = extractFirstImage(content, true)

        return {
          slug,
          title: data.title || slug,
          date: data.date,
          description: data.description,
          content: htmlContent as string,
          rawContent: content,
          final: data.final || false,
          firstImage,
          readingTime: calculateReadingTime(content),
          technical: data.technical,
          tags: data.tags,
          type: type,
        }
      } else {
        // HTML file
        const { data, content } = matter(fileContents)
        const firstImage = extractFirstImage(content, false)

        return {
          slug,
          title: data.title || slug,
          date: data.date,
          description: data.description,
          content: content,
          rawContent: content,
          final: data.final || false,
          firstImage,
          readingTime: calculateReadingTime(content),
          technical: data.technical,
          tags: data.tags,
          type: type,
        }
      }
    })
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })

  return items
}

export function getContentItem(type: "blog" | "articles" | "projects" | "tutorials", slug: string): ContentItem | null {
  const typeDirectory = path.join(contentDirectory, type)

  // Try .md first, then .html
  const mdPath = path.join(typeDirectory, `${slug}.md`)
  const htmlPath = path.join(typeDirectory, `${slug}.html`)

  let fullPath: string
  let isMarkdown: boolean

  if (fs.existsSync(mdPath)) {
    fullPath = mdPath
    isMarkdown = true
  } else if (fs.existsSync(htmlPath)) {
    fullPath = htmlPath
    isMarkdown = false
  } else {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")

  if (isMarkdown) {
    const { data, content } = matter(fileContents)
    const htmlContent = marked(content)
    const firstImage = extractFirstImage(content, true)

    return {
      slug,
      title: data.title || slug,
      date: data.date,
      description: data.description,
      content: htmlContent as string,
      rawContent: content,
      final: data.final || false,
      firstImage,
      readingTime: calculateReadingTime(content),
      technical: data.technical,
      tags: data.tags,
      type: type,
    }
  } else {
    const { data, content } = matter(fileContents)
    const firstImage = extractFirstImage(content, false)

    return {
      slug,
      title: data.title || slug,
      date: data.date,
      description: data.description,
      content: content,
      rawContent: content,
      final: data.final || false,
      firstImage,
      readingTime: calculateReadingTime(content),
      technical: data.technical,
      tags: data.tags,
      type: type,
    }
  }
}
