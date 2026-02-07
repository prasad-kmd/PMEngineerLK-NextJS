import type { Metadata } from "next"
import Link from "next/link"
import { 
  Home, 
  UserRound, 
  FileText, 
  BookOpen, 
  GitBranch, 
  Newspaper, 
  Wrench, 
  Users, 
  Mail,
  ArrowRight,
  ShieldCheck,
  Scale,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react"

const title = "Site Directory"
const description = "A comprehensive overview of all sections within the engineering documentation platform."

export const metadata: Metadata = {
  title,
  description,
}

const secondaryPages = [
  {
    name: "Disclaimer",
    href: "/disclaimer",
    icon: AlertTriangle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    name: "Terms and Conditions",
    href: "/terms-and-conditions",
    icon: Scale,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
]

const mainPages = [
  {
    name: "Home",
    href: "/",
    description: "The central hub for project news and featured content.",
    icon: Home,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    description: "Professional showcase of engineering expertise and projects.",
    icon: UserRound,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    name: "Blog",
    href: "/blog",
    description: "Chronological logs and updates of our engineering journey.",
    icon: FileText,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    name: "Articles",
    href: "/articles",
    description: "In-depth technical papers and reflective engineering essays.",
    icon: BookOpen,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    name: "Projects",
    href: "/projects",
    description: "Detailed documentation of our mechanical and mechatronics builds.",
    icon: GitBranch,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    name: "Tutorials",
    href: "/tutorials",
    description: "Educational resources and step-by-step technical guides.",
    icon: Newspaper,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    name: "Engineering Tools",
    href: "/tools",
    description: "A suite of precision utilities for technical workflows.",
    icon: Wrench,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    name: "About Me",
    href: "/about",
    description: "Learn about my journey and the mission behind this engineering platform.",
    icon: Users,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    name: "What's Now",
    href: "/now",
    description: "A snapshot of my current focus, learning journey, and active builds.",
    icon: Home,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    name: "Setup / Uses",
    href: "/uses",
    description: "Detailed list of my hardware setup, software stack, and dev tools.",
    icon: Wrench,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    name: "Project Roadmap",
    href: "/roadmap",
    description: "Transparent timeline of upcoming features and project milestones.",
    icon: GitBranch,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    name: "Site Changelog",
    href: "/changelog",
    description: "Chronological history of updates and engineering efforts on this site.",
    icon: FileText,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    name: "Code Snippets",
    href: "/snippets",
    description: "Reusable technical shortcuts and engineering cheatsheets.",
    icon: FileText,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    name: "Contact",
    href: "/contact",
    description: "Get in touch for collaborations or technical inquiries.",
    icon: Mail,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    name: "Visual Gallery",
    href: "/gallery",
    description: "Visual documentation of my engineering journey and field work.",
    icon: ImageIcon,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
]

export default function PagesOverview() {
  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 bg-background">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center lg:text-left">
          <h1 className="mb-4 text-4xl font-bold mozilla-headline">Site Directory</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl google-sans">
            {description}
          </p>
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {secondaryPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group relative flex items-center gap-3 rounded-xl border border-border bg-card/50 px-4 py-3 transition-all hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${page.bgColor} ${page.color} transition-transform group-hover:scale-110`}>
                <page.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium group-hover:text-primary transition-colors google-sans">
                {page.name}
              </span>
              <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mainPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${page.bgColor} ${page.color} transition-transform group-hover:scale-110`}>
                <page.icon className="h-6 w-6" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold group-hover:text-primary transition-colors google-sans">
                    {page.name}
                  </h2>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-primary" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed local-inter">
                  {page.description}
                </p>
              </div>
              
              {/* Glassmorphism gradient effect on hover */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* Decorative footer element */}
        <div className="mt-20 flex justify-center opacity-20">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </div>
  )
}
