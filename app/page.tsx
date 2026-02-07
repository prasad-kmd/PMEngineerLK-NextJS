import Link from "next/link"
import { FileText, BookOpen, GitBranch, Newspaper } from "lucide-react"
import HeroSlideshow from "@/components/hero-slideshow"
import MagicBentoClient from "@/components/magic-bento-client"
import { getContentByType } from "@/lib/content"
import { ChevronDown, Calendar, ArrowRight, Calculator, Sigma, Edit3, Code2 } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const blogs = getContentByType("blog")
  const articles = getContentByType("articles")
  const projects = getContentByType("projects")
  const tutorials = getContentByType("tutorials")

  const blogCount = blogs.length
  const articlesCount = articles.length
  const projectsCount = projects.length
  const tutorialsCount = tutorials.length

  const latestItems = {
    blog: blogs[0],
    articles: articles[0],
    projects: projects[0],
    tutorials: tutorials[0],
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center border-b border-border px-6 py-20 lg:px-8">
        <HeroSlideshow />
        <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl amoriaregular">
            Prasad Madhuranga&apos;s Blogfolio
            <span className="block text-primary mozilla-headline">Engineering Blogfolio</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 text-pretty leading-relaxed">
            Documenting my journey to identify and solve engineering challenges through innovation and technical excellence. 
            Exploring mechatronics and mechanical solutions for real-world problems.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            >
              Explore Blog
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              View Projects
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronDown className="h-8 w-8" />
        </div>
      </section>

      {/* Content Sections Grid */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-4 text-3xl font-bold philosopher lg:text-4xl">Project Documentation</h2>
          <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">
            Comprehensive resources documenting our methodology, findings, and technical progress.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Blog", href: "/blog", icon: FileText, desc: "Explore comprehensive articles and project logs on our blog" },
              { title: "Articles", href: "/articles", icon: BookOpen, desc: "Technical articles and in-depth reflections on our journey" },
              { title: "Projects", href: "/projects", icon: GitBranch, desc: "Showcase of our engineering projects and demonstrations" },
              { title: "Tutorials", href: "/tutorials", icon: Newspaper, desc: "Step-by-step guides, tutorials, and educational resources" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Tools Section */}
      <section className="border-t border-border px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold philosopher lg:text-4xl">Engineering Workspace</h2>
              <p className="mt-2 text-muted-foreground">Professional utilities for technical documentation and advanced calculations.</p>
            </div>
            <Link 
              href="/tools" 
              className="group inline-flex items-center gap-2 font-semibold text-primary"
            >
              All Workspace Tools
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Calculator", icon: Calculator, slug: "scientific-calculator", desc: "Advanced engineering calculations", color: "text-blue-500", bg: "bg-blue-500/10" },
              { name: "LaTeX Editor", icon: Sigma, slug: "latex-equation-editor", desc: "Mathematical formula architect", color: "text-purple-500", bg: "bg-purple-500/10" },
              { name: "MD Editor", icon: Edit3, slug: "markdown-editor", desc: "Technical documentation environment", color: "text-green-500", bg: "bg-green-500/10" },
              { name: "Encoder", icon: Code2, slug: "html-encoder", desc: "Security & syntax escaper", color: "text-orange-500", bg: "bg-orange-500/10" },
            ].map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className={`mb-4 inline-flex rounded-xl ${tool.bg} p-3 ${tool.color}`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold group-hover:text-primary transition-colors">{tool.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tool.desc}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open Tool <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Magic Bento Section */}
      <section className="border-t border-border bg-muted/5 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold philosopher lg:text-4xl">Project Explorer</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Navigate through our research, articles, and technical documentation using our interactive explorer.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <MagicBentoClient
              blogCount={blogCount}
              articlesCount={articlesCount}
              projectsCount={projectsCount}
              tutorialsCount={tutorialsCount}
              latestItems={latestItems}
            />
          </div>
        </div>
      </section>

      {/* Recent Updates Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row md:items-end">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold philosopher lg:text-4xl">Latest Updates</h2>
              <p className="mt-2 text-muted-foreground">Stay informed with our most recent findings and project logs.</p>
            </div>
            <Link 
              href="/blog" 
              className="group inline-flex items-center gap-2 font-semibold text-primary"
            >
              View all updates
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { item: latestItems.blog, type: "Blog", color: "bg-blue-500/10 text-blue-500", href: "/blog" },
              { item: latestItems.articles, type: "Article", color: "bg-teal-500/10 text-teal-500", href: "/articles" },
              { item: latestItems.tutorials, type: "Tutorial", color: "bg-purple-500/10 text-purple-500", href: "/tutorials" }
            ].map((update, idx) => update.item && (
              <Link 
                key={idx}
                href={`${update.href}/${update.item.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image 
                    src={update.item.firstImage || "/img/page/ideas_item.webp"} 
                    alt={update.item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md ${update.color} border border-white/10`}>
                      {update.type}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {update.item.date || "Recent"}
                  </div>
                  <h3 className="mb-2 text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">{update.item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                    {update.item.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-t border-border bg-muted/5 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold philosopher lg:text-4xl">Our Mission</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
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
          <div className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-primary px-8 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Learn more about us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
