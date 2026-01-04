import { notFound } from "next/navigation"
import { getContentByType, getContentItem } from "@/lib/content"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ContentRenderer } from "@/components/content-renderer"

export async function generateStaticParams() {
  const workflows = getContentByType("workflow")
  return workflows.map((workflow) => ({
    slug: workflow.slug,
  }))
}

export default function WorkflowPage({ params }: { params: { slug: string } }) {
  const workflow = getContentItem("workflow", params.slug)

  if (!workflow) {
    notFound()
  }

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/workflow"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Workflow
        </Link>

        <article>
          <header className="mb-8 border-b border-border pb-8">
            <h1 className="mb-4 text-4xl font-bold text-balance lg:text-5xl">{workflow.title}</h1>
            {workflow.date && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(workflow.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </header>

          <ContentRenderer content={workflow.content} />
        </article>
      </div>
    </div>
  )
}
