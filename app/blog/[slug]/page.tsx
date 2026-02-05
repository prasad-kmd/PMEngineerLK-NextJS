import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getContentByType, getContentItem } from "@/lib/content"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ContentRenderer } from "@/components/content-renderer"
import { BookmarkButton } from "@/components/bookmark-button"

export async function generateStaticParams() {
  const blogPosts = getContentByType("blog")
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getContentItem("blog", params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getContentItem("blog", params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 blog_item img_grad_pm">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-8 border-b border-border pb-8">
            <h1 className="mb-4 text-4xl font-bold text-balance lg:text-5xl">{post.title}</h1>
            {post.date && (
              <div className="flex flex-wrap items-center justify-between gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <BookmarkButton
                  key={post.slug}
                  item={{
                    slug: post.slug,
                    title: post.title,
                    date: post.date,
                    type: "blog"
                  }}
                />
              </div>
            )}
          </header>

          <ContentRenderer content={post.content} />
        </article>
      </div>
    </div>
  )
}
