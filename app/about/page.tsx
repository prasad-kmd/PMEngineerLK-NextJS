import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Target, Lightbulb, Users, ArrowRight, Settings, Cpu, HardDrive, ShieldCheck } from "lucide-react"
import Roadmap from "@/components/roadmap"
const title = "About Us"
const description =
  "A collaborative undergraduate engineering initiative focused on solving real-world challenges in Sri Lanka through innovative mechanical and mechatronics solutions."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/about",
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

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative border-b border-border">
        <Image src="/img/about_us.webp" alt="About Us" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight text-balance lg:text-5xl amoriaregular">About Our Project</h1>
            <p className="mt-6 text-lg leading-8 text-gray-200 text-pretty">
              A collaborative undergraduate engineering initiative focused on identifying and solving real-world
              challenges in Sri Lanka through innovative mechanical and mechatronics solutions.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Core Pillars */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg">
            <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-xl font-bold">Our Mission</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              To identify pressing challenges in Sri Lanka and develop practical, sustainable engineering solutions that make a meaningful impact on communities and industries.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg">
            <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-xl font-bold">Our Approach</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Combining mechanical and mechatronics expertise to create interdisciplinary solutions. We focus on innovation, sustainability, and real-world applicability.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg">
            <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-xl font-bold">Our Team</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A diverse group of mechanical and mechatronics engineering students bringing together different perspectives, skills, and experiences to tackle complex problems.
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-16 lg:grid-cols-2">
          {/* Detailed Context */}
          <div className="space-y-8">
            <section>
              <h2 className="mb-6 text-3xl font-bold philosopher">Project Context</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This project is part of our undergraduate engineering degree program at the Open University of Sri Lanka (OUSL), where we are tasked with identifying a &quot;Big Idea&quot; - a broad area worthy of investigation to uncover meaningful challenges that require innovative solutions.
                </p>
                <p>
                  Our focus is on Sri Lanka, where we aim to address local challenges through the lens of mechanical and mechatronics engineering. By combining our diverse skill sets and perspectives, we strive to develop solutions that are not only technically sound but also practical and sustainable for implementation in our country.
                </p>
                <p>
                  Throughout this project, we are documenting our journey - from initial ideation and research to design, prototyping, and testing. This platform serves as our collaborative workspace and public portfolio, showcasing our progress and findings.
                </p>
              </div>
            </section>

            {/* Engineering Toolbox */}
            <section className="rounded-2xl border border-border bg-muted/30 p-8">
              <h2 className="mb-6 text-2xl font-bold philosopher flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                Engineering Toolbox
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Design & CAD", icon: HardDrive, items: ["SolidWorks", "AutoCAD", "Fusion 360"] },
                  { title: "Mechatronics", icon: Cpu, items: ["Arduino", "Raspberry Pi", "ROS"] },
                  { title: "Analysis", icon: Target, items: ["ANSYS", "MATLAB", "Simulation"] },
                  { title: "Standards", icon: ShieldCheck, items: ["ISO", "SLS", "Safety Protocols"] },
                ].map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-foreground">
                      <category.icon className="h-4 w-4 text-primary" />
                      {category.title}
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
                      {category.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Project Roadmap */}
          <section>
            <h2 className="mb-8 text-3xl font-bold philosopher flex items-center gap-3">
              Project Roadmap
            </h2>
            <div className="rounded-2xl border border-border bg-card p-8">
              <Roadmap />
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <section className="mt-24 rounded-3xl bg-primary/5 border border-primary/20 p-12 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-3xl font-bold philosopher">Interested in our work?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Explore our latest project logs, technical articles, and demonstrations as we work towards developing innovative engineering solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/team" 
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Meet the Team
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-8 py-3 font-semibold transition-all hover:bg-muted"
            >
              Read Project Blog
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
