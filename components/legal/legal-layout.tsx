"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";

interface LegalSection {
  id: string;
  title: string;
  icon?: LucideIcon;
  content: React.ReactNode;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  imageSrc: string;
  breadcrumbs: { label: string; href: string; active?: boolean }[];
  sections: LegalSection[];
  atGlance?: React.ReactNode;
  children?: React.ReactNode;
}

export function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  imageSrc,
  breadcrumbs,
  sections,
  atGlance,
  children,
}: LegalLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileTOCOpen, setIsMobileTOCOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionElements = sections.map((s) =>
        document.getElementById(s.id)
      );
      const currentSection = sectionElements.find((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= 200;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileTOCOpen(false);
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Hero Section */}
      <section className="relative h-[35vh] min-h-[300px] w-full overflow-hidden border-b border-border">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl amoriaregular">
              {title}
            </h1>
            <p className="mt-4 text-lg text-gray-200 google-sans">
              {subtitle}
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-primary/50" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 local-jetbrains-mono">
                Last updated: {lastUpdated}
              </p>
              <span className="h-px w-8 bg-primary/50" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-12" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Desktop TOC */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm shadow-sm">
                <h2 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                  On this page
                </h2>
                <nav className="flex flex-col gap-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all hover:bg-muted",
                        activeSection === section.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {section.icon && (
                        <section.icon className="h-4 w-4 shrink-0" />
                      )}
                      <span className="truncate">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <div className="space-y-12">
              {atGlance && (
                <div className="rounded-3xl border border-border bg-card/30 p-8 backdrop-blur-xl shadow-2xl">
                  {atGlance}
                </div>
              )}

              {children}

              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="group relative rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 shadow-sm scroll-mt-24"
                >
                  <div className="mb-6 flex items-center gap-4">
                    {section.icon && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner shadow-primary/20">
                        <section.icon className="h-6 w-6" />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold tracking-tight philosopher lg:text-3xl">
                      {section.title}
                    </h2>
                  </div>
                  <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile TOC Button */}
      {/* <div className="fixed bottom-24 right-6 z-40 lg:hidden">
        <Button
          onClick={() => setIsMobileTOCOpen(!isMobileTOCOpen)}
          className="h-12 w-12 rounded-full shadow-lg"
          size="icon"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div> */}

      {/* Mobile TOC Overlay */}
      {isMobileTOCOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-6 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest local-jetbrains-mono">
                Contents
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileTOCOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all hover:bg-muted",
                    activeSection === section.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {section.icon && (
                    <section.icon className="h-4 w-4 shrink-0" />
                  )}
                  <span>{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
