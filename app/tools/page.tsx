import type { Metadata } from "next"
import Link from "next/link"
import {
    Edit3, Calculator, Replace, Code2, Sigma, ArrowRight, Scaling, Braces,
    Terminal, FileCode, Split, Users, Zap, Cpu, Timer, Lightbulb, Activity,
    Settings, Waypoints, Settings2, Wrench, MoveUpRight, Battery, LineChart, Ruler
} from "lucide-react"
import { AIContentIndicator } from "@/components/ai-content-indicator";

interface Tool {
    name: string
    slug: string
    description: string
    icon: React.ElementType
    color: string
    bgColor: string
}

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

const coreTools = [
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
    {
        name: "Precision Unit Converter",
        slug: "unit-converter",
        description: "Standardized metric and imperial unit conversions for engineering parameters like torque, pressure, and energy.",
        icon: Scaling,
        color: "text-cyan-500",
        bgColor: "bg-cyan-500/10",
    },
    {
        name: "JSON Structure Validator",
        slug: "json-formatter",
        description: "Advanced linting and formatting engine for complex JSON data structures with schema validation support.",
        icon: Braces,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
    },
    {
        name: "Diff Comparison Engine",
        slug: "diff-checker",
        description: "Side-by-side text and code comparison tool with intelligent change highlighting for documentation review.",
        icon: Split,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
    },
    {
        name: "User Persona Architect",
        slug: "user-persona-creator",
        description: "Design and export professional user personas to enhance empathy-driven engineering and product design.",
        icon: Users,
        color: "text-indigo-500",
        bgColor: "bg-indigo-500/10",
    },
]

const electronicsTools = [
    {
        name: "Resistor Color Code Solver",
        slug: "resistor-color-code",
        description: "Interactive visual calculator for 4, 5, and 6-band resistors with real-time value decoding.",
        icon: Zap,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
    },
    {
        name: "PCB Trace Width Calculator",
        slug: "pcb-trace-width",
        description: "Calculate required trace width based on IPC-2221 standards for specific current and temperature rise.",
        icon: Cpu,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        name: "555 Timer Calculator",
        slug: "555-timer-calculator",
        description: "Design Astable and Monostable 555 timer circuits by calculating component values for desired timing.",
        icon: Timer,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        name: "LED Series Resistor",
        slug: "led-resistor-calculator",
        description: "Determine the ideal current-limiting resistor for your LED circuits to ensure optimal performance.",
        icon: Lightbulb,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
    },
    {
        name: "Op-Amp Gain Calculator",
        slug: "op-amp-gain-calculator",
        description: "Visual gain calculator for Inverting and Non-Inverting operational amplifier configurations.",
        icon: Activity,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
    },
]

const mechanicalTools = [
    {
        name: "ISO Fits & Tolerances",
        slug: "iso-fits-tolerances",
        description: "Standardized fit calculator for shafts and holes based on ISO 286 diameter and tolerance classes.",
        icon: Settings,
        color: "text-slate-500",
        bgColor: "bg-slate-500/10",
    },
    {
        name: "Beam Deflection Calculator",
        slug: "beam-deflection-calculator",
        description: "Analyze maximum deflection and stress for Cantilever and Simply Supported beam load cases.",
        icon: Waypoints,
        color: "text-indigo-500",
        bgColor: "bg-indigo-500/10",
    },
    {
        name: "Gear Ratio & Speed",
        slug: "gear-ratio-calculator",
        description: "Calculate output speed and torque for gear trains or belt drives based on driver/driven parameters.",
        icon: Settings2,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
    },
    {
        name: "Bolt Torque Chart",
        slug: "bolt-torque-chart",
        description: "Interactive reference for metric bolt torque specifications across different property classes.",
        icon: Wrench,
        color: "text-zinc-500",
        bgColor: "bg-zinc-500/10",
    },
]

const mechatronicsTools = [
    {
        name: "Stepper Motor Calculator",
        slug: "stepper-motor-calculator",
        description: "Calculate precise steps/mm settings for 3D printers and CNC machines based on hardware specs.",
        icon: MoveUpRight,
        color: "text-rose-500",
        bgColor: "bg-rose-500/10",
    },
    {
        name: "Battery Life Estimator",
        slug: "battery-life-estimator",
        description: "Estimate system runtime based on battery capacity and load current with Peukert's Law support.",
        icon: Battery,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
    },
    {
        name: "PID Controller Simulator",
        slug: "pid-controller-simulator",
        description: "Visual interactive graph for tuning P, I, and D gains with real-time step response analysis.",
        icon: LineChart,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        name: "Sensor Scaling Calculator",
        slug: "sensor-scaling-calculator",
        description: "Map analog voltage or current signals to physical engineering units for sensor calibration.",
        icon: Ruler,
        color: "text-lime-500",
        bgColor: "bg-lime-500/10",
    },
]

const upcomingTools = [
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

function ToolSection({ title, tools }: { title: string, tools: Tool[] }) {
    return (
        <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold mozilla-headline border-b border-border pb-2">{title}</h2>
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
        </div>
    )
}

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

                <ToolSection title="Electronics Engineering" tools={electronicsTools} />
                <ToolSection title="Mechanical Engineering" tools={mechanicalTools} />
                <ToolSection title="Mechatronics & Robotics" tools={mechatronicsTools} />
                <ToolSection title="Core Utilities" tools={coreTools} />

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
            <AIContentIndicator />
        </div>
    )
}
