import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getContentByType, getContentItem } from "@/lib/content"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ContentRenderer } from "@/components/content-renderer"

export async function generateStaticParams() {
  const ideas = getContentByType("ideas")
  return ideas.map((idea) => ({
    slug: idea.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const idea = getContentItem("ideas", params.slug)

  if (!idea) {
    return {}
  }

  return {
    title: idea.title,
    description: idea.description,
  }
}

export default function IdeaPage({ params }: { params: { slug: string } }) {
  const idea = getContentItem("ideas", params.slug)

  if (!idea) {
    notFound()
  }

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 ideas_item img_grad_pm">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/ideas"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Ideas
        </Link>

        <article>
          <header className="mb-8 border-b border-border pb-8">
            <h1 className="mb-4 text-4xl font-bold text-balance lg:text-5xl">{idea.title}</h1>
            {idea.date && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(idea.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </header>

          <ContentRenderer content={idea.content} />
        </article>
      </div>
    </div>
  )
}
