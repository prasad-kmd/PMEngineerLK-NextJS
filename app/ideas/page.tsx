import type { Metadata } from "next"
import Link from "next/link"
import { getContentByType } from "@/lib/content"
import { Calendar, ArrowRight, CheckCircle2 } from "lucide-react"

const title = "Project Ideas"
const description =
  "Comprehensive engineering ideas addressing challenges in Sri Lanka. Each idea explores practical solutions combining mechanical and mechatronics expertise."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/ideas",
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

export default function IdeasPage() {
  const ideas = getContentByType("ideas")
  const hasFinalIdea = ideas.some((idea) => idea.final)

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 ideas_page img_grad_pm">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold mozilla-headline">Project Ideas</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Comprehensive engineering ideas addressing challenges in Sri Lanka. Each idea explores practical solutions
            combining mechanical and mechatronics expertise.
          </p>
        </div>

        {ideas.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No ideas yet. Create a <code className="rounded bg-muted px-2 py-1 font-mono text-sm">.md</code> or{" "}
              <code className="rounded bg-muted px-2 py-1 font-mono text-sm">.html</code> file in the{" "}
              <code className="rounded bg-muted px-2 py-1 font-mono text-sm">content/ideas/</code> directory.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {ideas.map((idea) => {
              const borderColor = hasFinalIdea
                ? idea.final
                  ? "border-green-500/70"
                  : "border-gray-500/30"
                : "border-border"

              const hoverBorderColor = hasFinalIdea
                ? idea.final
                  ? "hover:border-green-500"
                  : "hover:border-gray-500/50"
                : "hover:border-primary/50"

              const backgroundStyle = idea.firstImage
                ? {
                    backgroundImage: `linear-gradient(45deg, #00000000 0%, #0000003d 30%, #00000063 40%, #00000088 50%, #000000c5 65%, #000000 90%), url("${idea.firstImage}")`,
                    backgroundBlendMode: "overlay" as const,
                    backgroundOrigin: "border-box" as const,
                    backgroundPosition: "right" as const,
                    backgroundSize: "cover" as const,
                    backgroundAttachment: "scroll" as const,
                  }
                : undefined

              return (
                <Link
                  key={idea.slug}
                  href={`/ideas/${idea.slug}`}
                  className={`group block rounded-xl border ${borderColor} ${hoverBorderColor} bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden`}
                  style={backgroundStyle}
                >
                  {idea.final && (
                    <div className="absolute -top-3 right-6 flex items-center gap-1.5 rounded-full bg-green-500/20 border border-green-500/50 px-3 py-1 text-xs font-medium text-green-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Marked as Final
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-semibold group-hover:text-primary">{idea.title}</h2>
                      {idea.description && (
                        <p className="mb-3 text-muted-foreground leading-relaxed">{idea.description}</p>
                      )}
                      {idea.date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(idea.date).toLocaleDateString("en-US", {
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
