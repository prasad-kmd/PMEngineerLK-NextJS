import type { Metadata } from "next"
import Image from "next/image"
import {
    ExternalLink,
    Code2,
    Cpu,
    Layers,
    Globe,
    Briefcase,
    GraduationCap,
    Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getContentByType } from "@/lib/content"
import Link from "next/link"
import { PortfolioHeroActions } from "@/components/portfolio-hero-actions"

const title = "Portfolio | PrasadM"
const description = "Showcasing the professional journey, technical expertise, and engineering projects of PrasadM, a Mechatronics and Mechanical Engineering undergraduate."

export const metadata: Metadata = {
    title,
    description,
}

const skills = [
    { name: "Embedded Systems", icon: Cpu, level: 90 },
    { name: "Full-Stack Development", icon: Code2, level: 85 },
    { name: "Mechanical Design", icon: Layers, level: 80 },
    { name: "IoT Solutions", icon: Globe, level: 88 },
]

export default function PortfolioPage() {
    const dynamicProjects = getContentByType("projects")
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-border bg-card/30 py-24 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--primary)_0%,transparent_100%)] opacity-[0.03]" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
                        <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-2xl border-4 border-primary/20 shadow-2xl lg:h-80 lg:w-80">
                            <Image
                                src="https://placehold.co/800x800/1e293b/14b8a6?text=Profile+Photo"
                                alt="Profile Photo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl amoriaregular">
                                Prasad<span className="text-primary">M</span>
                            </h1>
                            <p className="mt-4 text-xl font-medium text-muted-foreground philosopher">
                                Mechatronics & Mechanical Engineering Undergraduate
                            </p>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                                Passionate about bridging the gap between hardware and software. I specialize in
                                developing intelligent systems that solve real-world engineering challenges
                                through innovative design and robust implementation.
                            </p>
                            <PortfolioHeroActions />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-3">
                    {/* Left Column: Experience & Education */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Featured Projects */}
                        <section>
                            <div className="mb-8 flex items-center gap-3 border-b border-border pb-4">
                                <Briefcase className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-bold mozilla-headline">Featured Engineering Projects</h2>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2">
                                {dynamicProjects.map((project) => (
                                    <Card key={project.slug} className="group overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg flex flex-col">
                                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                                            <Image
                                                src={project.firstImage || `https://placehold.co/600x400/1e293b/14b8a6?text=${encodeURIComponent(project.title)}`}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <CardContent className="p-6 flex flex-1 flex-col">
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
                                                {project.description}
                                            </p>
                                            {project.technical && (
                                                <p className="text-xs font-mono text-primary/70 mb-4">
                                                    Stack: {project.technical}
                                                </p>
                                            )}
                                            {project.tags && project.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.tags.map(tag => (
                                                        <span key={tag} className="px-2 py-1 bg-primary/5 text-primary text-[10px] font-semibold rounded uppercase tracking-wider">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <Link href={`/projects/${project.slug}`}>
                                                <Button variant="link" className="p-0 text-primary h-auto group-hover:underline">
                                                    View Case Study <ExternalLink className="ml-1 h-3 w-3" />
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Experience */}
                        <section>
                            <div className="mb-8 flex items-center gap-3 border-b border-border pb-4">
                                <Award className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-bold mozilla-headline">Professional Milestones</h2>
                            </div>
                            <div className="space-y-8">
                                <div className="relative pl-8 border-l-2 border-primary/20">
                                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                                    <span className="text-sm font-bold text-primary">2023 - Present</span>
                                    <h3 className="text-lg font-bold mt-1">Senior Systems Engineer</h3>
                                    <p className="text-muted-foreground text-sm">Industrial Automation Solutions Inc.</p>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        Leading a team of 5 engineers in designing next-generation PLC controllers and
                                        integrating cloud-based predictive maintenance systems.
                                    </p>
                                </div>
                                <div className="relative pl-8 border-l-2 border-primary/20">
                                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-border" />
                                    <span className="text-sm font-bold text-muted-foreground">2020 - 2023</span>
                                    <h3 className="text-lg font-bold mt-1">Mechatronics Designer</h3>
                                    <p className="text-muted-foreground text-sm">Robotics Innovation Lab</p>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        Developed kinematics algorithms for 6-DOF robotic arms and implemented
                                        computer vision systems for autonomous sorting.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Skills & Info */}
                    <div className="space-y-12">
                        {/* Expertise */}
                        <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 philosopher">Technical Expertise</h3>
                            <div className="space-y-6">
                                {skills.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <skill.icon className="h-4 w-4 text-primary" />
                                                <span className="text-sm font-medium">{skill.name}</span>
                                            </div>
                                            <span className="text-xs font-bold text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-1000"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                <h3 className="text-xl font-bold philosopher">Education</h3>
                            </div>
                            <div className="space-y-6 text-sm">
                                <div>
                                    <p className="font-bold">BSc (Hons) in Mechatronics Engineering</p>
                                    <p className="text-muted-foreground">The Open University of Sri Lanka</p>
                                    <p className="text-xs text-primary mt-1 font-medium">First Class Honours</p>
                                </div>
                                <hr className="border-border/50" />
                                <div>
                                    <p className="font-bold">Advanced Diploma in Industrial Electronics</p>
                                    <p className="text-muted-foreground">Ceylon-German Technical Training Institute</p>
                                </div>
                            </div>
                        </section>

                        {/* Research Interests */}
                        <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-4 philosopher">Research Interests</h3>
                            <div className="space-y-3">
                                {[
                                    "Bio-Inspired Robotics",
                                    "Autonomous Navigation",
                                    "Renewable Energy Systems",
                                    "Smart Materials"
                                ].map(interest => (
                                    <div key={interest} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        {interest}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Languages */}
                        <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-4 philosopher">Languages</h3>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-3 py-1 bg-muted rounded-full">English (Professional)</span>
                                <span className="px-3 py-1 bg-muted rounded-full">Sinhala (Native)</span>
                                <span className="px-3 py-1 bg-muted rounded-full">German (Basic)</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Footer Call to Action */}
            <section className="bg-primary/5 py-16 text-center border-t border-border">
                <div className="mx-auto max-w-2xl px-6">
                    <h2 className="text-3xl font-bold amoriaregular mb-4">Let&apos;s Build Something Together</h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        I am always open to discussing new projects, creative ideas or
                        opportunities to be part of your visions.
                    </p>
                    <Button size="lg" className="rounded-full px-12 transition-transform hover:scale-105">
                        Get In Touch
                    </Button>
                </div>
            </section>
        </div>
    )
}
