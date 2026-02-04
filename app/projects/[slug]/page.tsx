import { notFound } from "next/navigation"
import { getContentByType, getContentItem } from "@/lib/content"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ContentRenderer } from "@/components/content-renderer"

export async function generateStaticParams() {
  const projects = getContentByType("projects")
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getContentItem("projects", params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <article>
          <header className="mb-8 border-b border-border pb-8">
            <h1 className="mb-4 text-4xl font-bold text-balance lg:text-5xl">{project.title}</h1>
            {project.date && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(project.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </header>

          <ContentRenderer content={project.content} />
        </article>
      </div>
    </div>
  )
}
