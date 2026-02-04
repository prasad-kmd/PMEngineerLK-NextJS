import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getContentByType, getContentItem } from "@/lib/content"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ContentRenderer } from "@/components/content-renderer"

export async function generateStaticParams() {
  const entries = getContentByType("articles")
  return entries.map((entry) => ({
    slug: entry.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const entry = getContentItem("articles", params.slug)

  if (!entry) {
    return {}
  }

  return {
    title: entry.title,
    description: entry.description,
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const entry = getContentItem("articles", params.slug)

  if (!entry) {
    notFound()
  }

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 articles_item img_grad_pm">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/articles"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>

        <article>
          <header className="mb-8 border-b border-border pb-8">
            <h1 className="mb-4 text-4xl font-bold text-balance lg:text-5xl">{entry.title}</h1>
            {entry.date && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(entry.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </header>

          <ContentRenderer content={entry.content} />
        </article>
      </div>
    </div>
  )
}
