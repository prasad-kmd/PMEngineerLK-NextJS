import React from "react"
import type { Metadata } from "next"
import { History, GitCommit, Tag, ArrowRight } from "lucide-react"

const title = "Changelog"
const description = "A timeline of updates and improvements to this website."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/changelog",
  },
}

const updates = [
  {
    version: "1.2.0",
    date: "October 24, 2023",
    title: "Enhanced Workspace & Tools",
    description: "Introduced new engineering tools and dedicated productivity pages.",
    changes: [
      "Added User Persona Creator tool",
      "Added Diff Checker tool",
      "Created /uses and /now pages",
      "Added Table of Contents to technical articles",
      "Standalone /roadmap page",
    ],
    type: "feature",
  },
  {
    version: "1.1.0",
    date: "October 10, 2023",
    title: "Technical Foundation",
    description: "Integration of advanced mathematical rendering and search capabilities.",
    changes: [
      "Integrated LaTeX to MathML converter",
      "Implemented global Command Palette (Ctrl+K)",
      "Added Scientific Calculator",
      "Next.js 15 & Tailwind CSS 4 migration",
    ],
    type: "improvement",
  },
  {
    version: "1.0.0",
    date: "September 15, 2023",
    title: "Initial Launch",
    description: "The first version of the PMEngineer portfolio goes live.",
    changes: [
      "Core CMS for blog and projects",
      "Glassmorphism UI design",
      "Portfolio gallery",
      "About and Contact pages",
    ],
    type: "launch",
  },
]

export default function ChangelogPage() {
  return (
    <div className="min-h-screen pb-20 px-6 lg:px-8 pt-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4 amoriaregular">Changelog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Following the evolution of this platform as it grows into a comprehensive engineering workspace.
          </p>
        </header>

        <div className="relative space-y-12 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border lg:before:left-1/2 lg:before:-ml-[1px]">
          {updates.map((update, idx) => (
            <div key={idx} className="relative flex flex-col lg:flex-row lg:justify-between lg:items-start group">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 z-10 h-9 w-9 rounded-full border-4 border-background bg-primary flex items-center justify-center lg:left-1/2 lg:-ml-[18px]">
                <GitCommit className="h-5 w-5 text-primary-foreground" />
              </div>

              <div className={`lg:w-[45%] ${idx % 2 === 0 ? "lg:order-1" : "lg:order-2 lg:text-right"}`}>
                 <div className="pl-12 lg:pl-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                      <Tag className="h-3 w-3" />
                      v{update.version}
                    </span>
                    <h3 className="text-2xl font-bold mb-1 philosopher">{update.title}</h3>
                    <p className="text-sm text-primary/70 font-semibold mb-4">{update.date}</p>
                 </div>
              </div>

              <div className={`lg:w-[45%] mt-4 lg:mt-0 ${idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                <div className="pl-12 lg:pl-0">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow group-hover:shadow-md">
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {update.description}
                      </p>
                      <ul className="space-y-2">
                        {update.changes.map((change, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                            <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
