import type { Metadata } from "next"
import Link from "next/link"
import { Edit3, Calculator, Replace, Code2, Sigma, ArrowRight, Scaling, Braces, Terminal, FileCode } from "lucide-react"

const title = "Engineering Workspace"
const description = "Professional-grade utilities for technical documentation, advanced calculations, and structured content development."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        url: "/tools",
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

const tools = [
    {
        name: "Technical Document Editor",
        slug: "markdown-editor",
        description: "High-performance Markdown environment with real-time GitHub-flavored preview and direct export capabilities.",
        icon: Edit3,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        name: "Precision Engineering Calculator",
        slug: "scientific-calculator",
        description: "Comprehensive computational engine with support for trigonometric, logarithmic, and advanced algebraic functions.",
        icon: Calculator,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
    },
    {
        name: "MathML Integration Engine",
        slug: "latex-mathml-converter",
        description: "Seamlessly transform LaTeX syntax into standards-compliant MathML for high-fidelity web-based mathematical rendering.",
        icon: Replace,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
    {
        name: "Security & Syntax Escaper",
        slug: "html-encoder",
        description: "Enterprise-grade HTML entity encoder/decoder designed for secure code presentation and XSS prevention.",
        icon: Code2,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
    },
    {
        name: "Mathematical Formula Architect",
        slug: "latex-equation-editor",
        description: "Advanced LaTeX authoring environment with dynamic block mathematical rendering and formula templates.",
        icon: Sigma,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
    },
]

const upcomingTools = [
    {
        name: "Precision Unit Converter",
        description: "Standardized metric and imperial unit conversions for engineering parameters like torque, pressure, and energy.",
        icon: Scaling,
    },
    {
        name: "JSON Structure Validator",
        description: "Advanced linting and formatting engine for complex JSON data structures with schema validation support.",
        icon: Braces,
    },
    {
        name: "Regex Pattern Architect",
        description: "Visual regular expression builder and tester with real-time match highlighting and explanation.",
        icon: Terminal,
    },
    {
        name: "Data Transformation Suite",
        description: "Comprehensive Base64, Hex, and URL encoding/decoding utilities for secure data handling.",
        icon: FileCode,
    },
]

export default function ToolsPage() {
    return (
        <div className="min-h-screen px-6 py-12 lg:px-8 img_grad_pm">
            <div className="mx-auto max-w-4xl">
                <div className="mb-12 text-center lg:text-left">
                    <h1 className="mb-4 text-4xl font-bold mozilla-headline">Engineering Workspace</h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {tools.map((tool) => (
                        <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="group block rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`rounded-lg ${tool.bgColor} p-3 ${tool.color} shrink-0`}>
                                    <tool.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors google-sans">
                                            {tool.name}
                                        </h2>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed local-inter">
                                        {tool.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-20">
                    <div className="mb-8 border-b border-border pb-4">
                        <h2 className="text-2xl font-bold mozilla-headline">Pipeline & Upcoming Releases</h2>
                        <p className="mt-2 text-muted-foreground">
                            Advanced utilities currently under development for the next workspace iteration.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {upcomingTools.map((tool) => (
                            <div
                                key={tool.name}
                                className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 opacity-80 grayscale-[0.5] transition-all hover:grayscale-0 hover:opacity-100"
                            >
                                <div className="mb-4 inline-flex rounded-lg bg-muted p-2 text-muted-foreground">
                                    <tool.icon className="h-5 w-5" />
                                </div>
                                <h3 className="mb-2 font-semibold">{tool.name}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {tool.description}
                                </p>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse" />
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                                        In Development
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
