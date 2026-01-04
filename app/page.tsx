import Link from "next/link"
import { FileText, BookOpen, GitBranch, Newspaper } from "lucide-react"
import HeroSlideshow from "@/components/hero-slideshow"
import MagicBentoClient from "@/components/magic-bento-client"
import fs from "fs"
import path from "path"

function getPostCount(directory: string): number {
  const dirPath = path.join(process.cwd(), "content", directory)
  if (!fs.existsSync(dirPath)) {
    return 0
  }
  const files = fs.readdirSync(dirPath)
  return files.filter(file => file.endsWith(".md") || file.endsWith(".html")).length
}

export default function HomePage() {
  const ideasCount = getPostCount("ideas")
  const diaryCount = getPostCount("diary")
  const workflowCount = getPostCount("workflow")
  const postsCount = getPostCount("posts")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative border-b border-border px-6 py-20 lg:px-8">
        <HeroSlideshow />
        <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl amoriaregular">
            The OUSL Engineering Project
            <span className="block text-primary mozilla-headline">DMY4102 / DMY4101</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 text-pretty leading-relaxed">
            Documenting our journey to identify and solve engineering challenges in Sri Lanka. A collaborative
            undergraduate group project exploring innovative solutions for real-world problems.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ideas"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Ideas
            </Link>
            <Link
              href="/workflow"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-semibold transition-colors hover:bg-muted"
            >
              View Workflow
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections Grid */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-3xl font-bold philosopher">Project Documentation</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/ideas"
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Ideas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Explore comprehensive project ideas addressing engineering challenges in Sri Lanka
              </p>
            </Link>

            <Link
              href="/diary"
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Diary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Daily progress logs and reflections on our project development journey
              </p>
            </Link>

            <Link
              href="/workflow"
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <GitBranch className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Workflow</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Methodologies, processes, and technical documentation for our approach
              </p>
            </Link>

            <Link
              href="/posts"
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <Newspaper className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Posts</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Updates, announcements, and general insights from our team
              </p>
            </Link>
          </div>
        </div>
      </section>

{/* Magic Bento Section */}
      <section className="border-t border-border bg-muted/10 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-3xl font-bold philosopher">Project Overview</h2>
          <div className="flex items-center justify-center">
            <MagicBentoClient
              ideasCount={ideasCount}
              diaryCount={diaryCount}
              workflowCount={workflowCount}
              postsCount={postsCount}
            />
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold philosopher">About This Project</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This webapp serves as a comprehensive documentation platform for our mechanical and mechatronics
              engineering undergraduate group project. Our mission is to identify significant challenges in Sri Lanka
              and develop innovative engineering solutions.
            </p>
            <p>
              Our team consists of both mechanical and mechatronics engineering students, bringing diverse perspectives
              and technical expertise to tackle real-world problems. We focus on practical, implementable solutions that
              can make a meaningful impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
