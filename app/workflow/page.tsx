import type { Metadata } from "next"
import Link from "next/link"
import { getContentByType } from "@/lib/content"
import { Calendar, ArrowRight } from "lucide-react"

const title = "Workflow & Methodology"
const description = "Technical documentation, processes, and methodologies guiding our project approach."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/workflow",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(title)}`,
        width: 1200,
        height: 630,
        alt: description,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`/api/og?title=${encodeURIComponent(title)}`],
  },
}

export default function WorkflowPage() {
  const workflows = getContentByType("workflow")

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 workflow_page img_grad_pm">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold mozilla-headline">Workflow & Methodology</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Technical documentation, processes, and methodologies guiding our project approach.
          </p>
        </div>

        {workflows.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No workflow documents yet. Create a{" "}
              <code className="rounded bg-muted px-2 py-1 font-mono text-sm">.md</code> or{" "}
              <code className="rounded bg-muted px-2 py-1 font-mono text-sm">.html</code> file in the{" "}
              <code className="rounded bg-muted px-2 py-1 font-mono text-sm">content/workflow/</code> directory.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {workflows.map((workflow, index) => {
              const borderColor = index === 0 ? "border-blue-500/70" : "border-border"
              const hoverBorderColor = index === 0 ? "hover:border-blue-500" : "hover:border-primary/50"

              const backgroundStyle = workflow.firstImage
                ? {
                    backgroundImage: `linear-gradient(45deg, #00000000 0%, #0000003d 30%, #00000063 40%, #00000088 50%, #000000c5 65%, #000000 90%), url("${workflow.firstImage}")`,
                    backgroundBlendMode: "overlay" as const,
                    backgroundOrigin: "border-box" as const,
                    backgroundPosition: "right" as const,
                    backgroundSize: "cover" as const,
                    backgroundAttachment: "scroll" as const,
                  }
                : undefined

              return (
                <Link
                  key={workflow.slug}
                  href={`/workflow/${workflow.slug}`}
                  className={`group block rounded-xl border ${borderColor} ${hoverBorderColor} bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5 overflow-hidden`}
                  style={backgroundStyle}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-semibold group-hover:text-primary">{workflow.title}</h2>
                      {workflow.description && (
                        <p className="mb-3 text-muted-foreground leading-relaxed">{workflow.description}</p>
                      )}
                      {workflow.date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(workflow.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
