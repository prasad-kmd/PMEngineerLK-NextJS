import type { Metadata } from "next";
import Image from "next/image";
import { Briefcase, GraduationCap, Award, Dna } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
import { getContentByType } from "@/lib/content";
// import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { PortfolioHeroActions } from "@/components/portfolio-hero-actions";
import SkillMatrix from "@/components/skill-matrix";

const title = "Portfolio | PrasadM";
const description =
  "Showcasing the professional journey, technical expertise, and engineering projects of PrasadM, a Mechatronics and Mechanical Engineering undergraduate.";

export const metadata: Metadata = {
  title,
  description,
};

export default async function PortfolioPage() {
  const dynamicProjects = await getContentByType("projects");
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-border bg-card/30 py-24 lg:py-32">
        {/* Ray animated background */}
        <div aria-hidden="true" className="ray-hero-bg" />
        {/* <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--primary)_0%,transparent_100%)] opacity-[0.03]"
        /> */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
            <div className="portfolio-hero-avatar h-64 w-64 shrink-0 lg:h-80 lg:w-80">
              <div className="portfolio-hero-avatar-inner">
                <Image
                  src="/img/prasadm-title-img.webp"
                  alt="Profile Photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl amoriaregular">
                Prasad<span className="text-primary"> Madhuranga</span>
              </h1>
              <p className="mt-4 text-xl font-medium text-muted-foreground philosopher">
                Mechatronics Engineering Undergraduate
              </p>
              <p className="mt-6 max-w-[80ch] text-md leading-relaxed text-muted-foreground font-google-sans">
                I am a highly motivated and results-oriented Mechatronics Engineering student with a strong foundation in mechanical engineering principles and a passion for automation and robotics. I am a quick learner with the ability to grasp complex concepts and apply them effectively in practical scenarios. My academic background, combined with my hands-on project experience and dedication to continuous improvement, has equipped me with the skills and mindset to excel in the fast-paced world of engineering.
              </p>
              <PortfolioHeroActions />
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Advanced Skill Matrix */}
        <section className="mb-24">
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary font-local-jetbrains-mono">
              <Dna className="h-4 w-4" />
              Competency Framework
            </div>
            <h2 className="text-3xl font-bold mozilla-headline sm:text-4xl">
              Technical Expertise Matrix
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground font-google-sans">
              A comprehensive overview of my engineering competencies across
              hardware, software, and interdisciplinary domains.
            </p>
          </div>
          <SkillMatrix />
        </section>

        <div className="grid gap-16 lg:grid-cols-3">
          {/* Left Column: Experience & Education */}
          <div className="lg:col-span-2 space-y-16">
            {/* Featured Projects */}
            <section>
              <div className="mb-8 flex items-center gap-3 border-b border-border pb-4">
                <Briefcase className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold mozilla-headline">
                  Featured Engineering Projects
                </h2>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                {dynamicProjects.map((project) => (
                  <ContentCard
                    key={project.slug}
                    post={project}
                    basePath="/projects"
                  />
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <div className="mb-8 flex items-center gap-3 border-b border-border pb-4">
                <Award className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold mozilla-headline">
                  Professional Milestones
                </h2>
              </div>
              <div className="space-y-8 font-google-sans">
                <div className="relative pl-8 border-l-2 border-primary/20">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-border" />
                  {/* <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" /> */}
                  {/* <span className="text-sm font-bold text-primary"> */}
                  <span className="text-sm font-bold text-muted-foreground">
                    2024 (Jun - Oct)
                  </span>
                  <h3 className="text-lg font-bold mt-1">
                    Customer Service Assistant
                  </h3>
                  <p className="text-muted-foreground text-sm">People's Bank, Mutwal</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Handling customer inquiries, providing information about
                    products and services, and resolving issues.
                  </p>
                </div>
                <div className="relative pl-8 border-l-2 border-primary/20">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-border" />
                  <span className="text-sm font-bold text-muted-foreground">
                    2024 (Jan -Jun)
                  </span>
                  <h3 className="text-lg font-bold mt-1">
                    Trainee Draughtsperson
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Department of Engineering Services, Central Province Council, Kandy
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Created detailed technical drawings and schematics for building construction projects using CAD software.
                    Collaborated with engineers to ensure designs met project requirements and standards.
                    Assisted in site inspections and field verification to ensure accuracy of drawings.
                  </p>
                </div>
                <div className="relative pl-8 border-l-2 border-primary/20">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-border" />
                  <span className="text-sm font-bold text-muted-foreground">
                    2022 (Mar - May)
                  </span>
                  <h3 className="text-lg font-bold mt-1">
                    Cashier
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Hemantha Glass Center, Anamaduwa
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Handling customer inquiries, providing information about
                    products and services, and resolving issues.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Info & Interests */}
          <div className="space-y-12">
            {/* Education */}
            <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold font-mozilla-headline">
                  Education
                </h3>
              </div>
              <div className="space-y-6 text-sm font-google-sans">
                <div>
                  <p className="font-bold">
                    BSc (Hons) in Mechatronics Engineering
                  </p>
                  <p className="text-muted-foreground">
                    The Open University of Sri Lanka
                  </p>
                  <p className="text-xs text-primary mt-1 font-medium">
                    Reading
                  </p>
                </div>
                <hr className="border-border/50" />
                <div>
                  <p className="font-bold">
                    National Certificate in Engineering Draftsmanship (NCED)
                  </p>
                  <p className="text-muted-foreground">
                    Techinal College, Pathadumbara, Kandy
                  </p>
                  <p className="text-xs text-primary mt-1 font-medium">
                    Completed
                  </p>
                </div>
                <hr className="border-border/50" />
                <div>
                  <p className="font-bold">
                    G.C.E. Advanced Level
                  </p>
                  <p className="text-muted-foreground">
                    Sri Rahula College, Katugasthota
                  </p>
                  <p className="text-xs text-primary mt-1 font-medium">
                    Completed
                  </p>
                </div>
              </div>
            </section>

            {/* Research Interests */}
            <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4 font-mozilla-headline">
                Research Interests
              </h3>
              <div className="space-y-3 font-google-sans">
                {[
                  "Bio-Inspired Robotics",
                  "Autonomous Navigation",
                  "Renewable Energy Systems",
                  "Smart Materials",
                  "Artificial Intelligence & Machine Vision",
                  "Mobile Robotics"
                ].map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {interest}
                  </div>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4 font-mozilla-headline">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2 text-xs font-google-sans">
                <span className="px-3 py-1 bg-muted rounded-full">
                  Sinhala (Native)
                </span>
                <span className="px-3 py-1 bg-muted rounded-full">
                  English (Professional)
                </span>
                {/* <span className="px-3 py-1 bg-muted rounded-full">
                  German (Basic)
                </span> */}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer Call to Action */}
      <section className="bg-primary/5 py-16 text-center border-t border-border">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-bold amoriaregular mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-muted-foreground font-google-sans mb-8 leading-relaxed">
            I am always open to discussing new projects, creative ideas or
            opportunities to be part of your visions.
          </p>
          <Button
            size="lg"
            className="font-space-mono rounded-full px-12 transition-transform hover:scale-105"
          >
            Get In Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
