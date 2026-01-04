import type { Metadata } from "next"
import Image from "next/image"
import { Users, Target, Award, Mail, Linkedin, Github } from "lucide-react"

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

const teamMembers = [
  {
    name: "Ashan Perera",
    role: "Team Lead - Mechatronics Engineering",
    image: "https://placehold.co/400x400/1e293b/14b8a6?text=AP",
    bio: "Specializing in automation systems and robotics. Passionate about IoT solutions for agricultural applications.",
    email: "ashan.perera@example.lk",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Nimal Fernando",
    role: "Mechanical Engineering",
    image: "https://placehold.co/400x400/1e293b/14b8a6?text=NF",
    bio: "Focused on mechanical design and manufacturing processes. Interested in sustainable engineering solutions.",
    email: "nimal.fernando@example.lk",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Sanduni Silva",
    role: "Mechatronics Engineering",
    image: "https://placehold.co/400x400/1e293b/14b8a6?text=SS",
    bio: "Expert in embedded systems and control theory. Working on smart sensor integration for industrial applications.",
    email: "sanduni.silva@example.lk",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Kasun Rajapaksa",
    role: "Mechanical Engineering",
    image: "https://placehold.co/400x400/1e293b/14b8a6?text=KR",
    bio: "Specializing in thermodynamics and energy systems. Passionate about renewable energy solutions for Sri Lanka.",
    email: "kasun.rajapaksa@example.lk",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Dilini Wickramasinghe",
    role: "Mechatronics Engineering",
    image: "https://placehold.co/400x400/1e293b/14b8a6?text=DW",
    bio: "Focused on machine learning and computer vision applications in industrial automation and quality control.",
    email: "dilini.wickramasinghe@example.lk",
    linkedin: "#",
    github: "#",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
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

      {/* Mission & Vision */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="mt-4 text-muted-foreground">
              To identify pressing challenges in Sri Lanka and develop practical, sustainable engineering solutions that
              make a meaningful impact on communities and industries.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Our Approach</h3>
            <p className="mt-4 text-muted-foreground">
              Combining mechanical and mechatronics expertise to create interdisciplinary solutions. We focus on
              innovation, sustainability, and real-world applicability.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Our Team</h3>
            <p className="mt-4 text-muted-foreground">
              A diverse group of mechanical and mechatronics engineering students bringing together different
              perspectives, skills, and experiences to tackle complex problems.
            </p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight philosopher">Meet Our Team</h2>
            <p className="mt-4 text-muted-foreground">
              Dedicated engineering students working together to create innovative solutions for Sri Lanka.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm text-primary">{member.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>

                <div className="mt-auto flex gap-2 pt-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="rounded-lg bg-muted p-2 transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href={member.linkedin}
                    className="rounded-lg bg-muted p-2 transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={member.github}
                    className="rounded-lg bg-muted p-2 transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Context */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight philosopher">Project Context</h2>
          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>
              This project is part of our undergraduate engineering degree program, where we are tasked with identifying
              a &quot;Big Idea&quot; - a broad area worthy of investigation to uncover meaningful challenges that require
              innovative solutions.
            </p>
            <p>
              Our focus is on Sri Lanka, where we aim to address local challenges through the lens of mechanical and
              mechatronics engineering. By combining our diverse skill sets and perspectives, we strive to develop
              solutions that are not only technically sound but also practical and sustainable for implementation in our
              country.
            </p>
            <p>
              Throughout this project, we are documenting our journey - from initial ideation and research to design,
              prototyping, and testing. This platform serves as our collaborative workspace and public portfolio,
              showcasing our progress and findings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}