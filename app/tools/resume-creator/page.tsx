"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  GraduationCap,
  Code2,
  User,
  Layout,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Download,
  Database,
  Upload,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { usePersistentState } from "@/hooks/use-persistent-state";
import { AIContentIndicator } from "@/components/ai-content-indicator";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PDFDownloadButton } from "@/components/resume-creator/pdf-template/pdf-download-button";
import { ResumeData } from "@/components/resume-creator/pdf-template/resume-pdf";
import { cn } from "@/lib/utils";

// Import sub-editors
import { PersonalInfoEditor } from "@/components/resume-creator/editor/personal-info-editor";
import { ExperienceEditor } from "@/components/resume-creator/editor/experience-editor";
import { EducationEditor } from "@/components/resume-creator/editor/education-editor";
import { SkillsEditor } from "@/components/resume-creator/editor/skills-editor";
import { ProjectsEditor } from "@/components/resume-creator/editor/projects-editor";
import { AdditionalEditor } from "@/components/resume-creator/editor/additional-editor";
import { RefereesEditor } from "@/components/resume-creator/editor/referees-editor";

const initialResume: ResumeData = {
  name: "John Doe",
  role: "Full Stack Engineer",
  email: "john.doe@example.com",
  phone: "+1 234 567 890",
  location: "San Francisco, CA",
  website: "johndoe.com",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  image: null,
  summary:
    "Dedicated software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, architecture, and mentoring teams.",
  customLinks: [
    { url: "leetcode.com/u/", username: "johndoe" }
  ],
  experiences: [
    {
      company: "Tech Solutions Inc.",
      role: "Senior Software Engineer",
      period: "2021 - Present",
      description:
        "Leading the development of a cloud-native microservices architecture. Reduced system latency by 40% using Redis and Go.",
    },
  ],
  education: [
    {
      school: "University of Technology",
      degree: "B.S. in Computer Science",
      period: "2015 - 2019",
      grade: "3.9 GPA",
      description: "Focused on Software Engineering and Algorithms.",
    },
  ],
  technicalSkills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Docker",
  ],
  personalSkills: [
    "Problem Solving",
    "Team Leadership",
    "Effective Communication",
  ],
  coursework: [
    "Advanced Algorithms",
    "Distributed Systems",
    "Cloud Computing"
  ],
  certifications: ["AWS Certified Developer", "Google Cloud Professional"],
  awards: [
    { title: "Dean's List for Academic Excellence", description: "Awarded for keeping a 3.9 GPA or higher across consecutive semesters." }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description:
        "Built a headless commerce solution using Next.js and Shopify API.",
      link: "https://shop.example.com",
    },
  ],
  languages: ["English (Professional)", "Sinhala (Native)"],
  publications: [],
  extraCurricular: [],
  referees: [],
  interests: [
    { name: "Photography", details: "Landscape & street photography" },
    { name: "Open Source", details: "Contributing to developer tool ecosystems" },
  ],
};

type EditorSection = "personal" | "experience" | "education" | "skills" | "projects" | "additional" | "referees";

export default function ResumeCreator() {
  const [resume, setResume] = usePersistentState<ResumeData>(
    "resume-data",
    initialResume,
  );
  const [activeSection, setActiveSection] = useState<EditorSection>("personal");
  const [isSticky, setIsSticky] = useState(false);

  // Migration for new data structure fields
  useEffect(() => {
    const needsMigration =
      resume &&
      (!resume.technicalSkills ||
        !resume.personalSkills ||
        !resume.extraCurricular ||
        !resume.referees ||
        !resume.interests ||
        !resume.customLinks ||
        !resume.coursework ||
        !resume.awards ||
        !resume.publications);

    if (needsMigration) {
      setResume((prev) => {
        const migrated = { ...prev };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const prevAny = prev as any;

        if (!migrated.technicalSkills) {
          migrated.technicalSkills = prevAny.skills || [];
        }
        if (!migrated.personalSkills) {
          migrated.personalSkills = [];
        }
        if (!migrated.extraCurricular) {
          migrated.extraCurricular = prevAny.volunteering || [];
        }
        if (!migrated.interests) {
          migrated.interests = [];
        }
        if (!migrated.customLinks) {
          migrated.customLinks = [];
        }
        if (!migrated.coursework) {
          migrated.coursework = [];
        }
        if (!migrated.awards) {
          migrated.awards = [];
        }
        if (!migrated.publications) {
          migrated.publications = [];
        }
        if (!migrated.referees) {
          migrated.referees = [];
        } else {
          // Migrate old contactDetails to email/phone
          migrated.referees = migrated.referees.map((ref) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const refAny = ref as any;
            if (refAny.contactDetails && !ref.email && !ref.phone) {
              const details = refAny.contactDetails;
              if (details.includes("|")) {
                const parts = details.split("|");
                return {
                  ...ref,
                  email: parts[0].trim(),
                  phone: parts[1]?.trim() || "",
                };
              }
              if (details.includes("@")) {
                return { ...ref, email: details, phone: "" };
              }
              return { ...ref, email: "", phone: details };
            }
            return {
              ...ref,
              email: ref.email || "",
              phone: ref.phone || "",
            };
          });
        }

        // Migrate education to include description
        if (migrated.education) {
          migrated.education = migrated.education.map((edu) => ({
            ...edu,
            description: edu.description || "",
          }));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (migrated as any).skills;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (migrated as any).volunteering;

        return migrated;
      });
    }
  }, [resume, setResume]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateField = (field: keyof ResumeData, value: string | null) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      setResume(initialResume);
      toast.success("Editor reset successfully");
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `resume-${resume.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    toast.success("Resume data exported as JSON");
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setResume(json);
          toast.success("Resume data imported successfully");
        } catch (error) {
          toast.error("Failed to import JSON: Invalid format");
        }
      };
      reader.readAsText(file);
    }
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: User, color: "text-amber-500" },
    { id: "experience", label: "Work Experience", icon: Briefcase, color: "text-blue-500" },
    { id: "education", label: "Education", icon: GraduationCap, color: "text-emerald-500" },
    { id: "skills", label: "Skills & Awards", icon: Code2, color: "text-orange-500" },
    { id: "projects", label: "Key Projects", icon: Sparkles, color: "text-purple-500" },
    { id: "additional", label: "Extra Activities", icon: Globe, color: "text-sky-500" },
    { id: "referees", label: "Referees", icon: Database, color: "text-rose-500" },
  ] as const;

  const renderActiveSection = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoEditor resume={resume} updateField={updateField} setResume={setResume} />;
      case "experience":
        return <ExperienceEditor resume={resume} setResume={setResume} />;
      case "education":
        return <EducationEditor resume={resume} setResume={setResume} />;
      case "skills":
        return <SkillsEditor resume={resume} setResume={setResume} />;
      case "projects":
        return <ProjectsEditor resume={resume} setResume={setResume} />;
      case "additional":
        return <AdditionalEditor resume={resume} setResume={setResume} />;
      case "referees":
        return <RefereesEditor resume={resume} setResume={setResume} />;
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-12">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/tools" },
            {
              label: "Resume Architect",
              href: "/tools/resume-creator",
              active: true,
            },
          ]}
          className="mb-8"
        />

        {/* Page Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] local-jetbrains-mono">
              <Layout className="h-3 w-3" />
              Productivity Tool
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl amoriaregular">
              Resume Architect
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl google-sans">
              Build a clean, professional, ATS-friendly CV in minutes.
            </p>
          </div>

          {/* <div className="flex flex-wrap items-center gap-3">
             <div className="flex bg-card/50 backdrop-blur-md border border-border rounded-xl p-1 shadow-sm">
                <Button variant="ghost" size="sm" onClick={handleReset} title="Reset Data" className="h-9 px-3 text-xs font-bold gap-2">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
                <div className="w-px h-4 bg-border my-auto mx-1" />
                <Button variant="ghost" size="sm" onClick={handleExport} title="Export JSON" className="h-9 px-3 text-xs font-bold gap-2">
                  <Download className="h-3.5 w-3.5" /> Export
                </Button>
                <div className="w-px h-4 bg-border my-auto mx-1" />
                <label className="cursor-pointer">
                   <div className="h-9 px-3 inline-flex items-center justify-center rounded-md text-xs font-bold gap-2 hover:bg-muted transition-colors">
                      <Upload className="h-3.5 w-3.5" /> Import
                   </div>
                   <input type="file" className="hidden" accept=".json" onChange={handleImport} />
                </label>
             </div>
             <PDFDownloadButton resume={resume} />
          </div> */}
        </header>

        {/* Main Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
             <div className="rounded-2xl border border-border bg-card/30 backdrop-blur-xl p-6 shadow-2xl space-y-6">
                <div className="space-y-1">
                   <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono mb-4 px-2">Sections</h2>
                   <nav className="space-y-1">
                     {sections.map((section) => (
                       <button
                         key={section.id}
                         onClick={() => setActiveSection(section.id as EditorSection)}
                         className={cn(
                           "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-all group font-google-sans",
                           activeSection === section.id
                             ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                             : "text-muted-foreground hover:bg-muted hover:text-foreground"
                         )}
                       >
                         <section.icon className={cn("h-4.5 w-4.5", activeSection === section.id ? "text-white" : section.color)} />
                         {section.label}
                         {activeSection === section.id && <ChevronRight className="ml-auto h-4 w-4 animate-in slide-in-from-left-1" />}
                       </button>
                     ))}
                   </nav>
                </div>

                <div className="pt-6 border-t border-border/50">
                   <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4">
                      <div className="flex items-center gap-2 mb-2">
                         <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-primary local-jetbrains-mono">Template: Professional</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground google-sans leading-relaxed">
                        Your resume is using the ATS-optimized technical template.
                      </p>
                   </div>
                </div>
             </div>
          </aside>

          {/* Mobile Navigation (Horizontal Scroll) */}
          <nav className="lg:hidden flex overflow-x-auto pb-4 gap-2 no-scrollbar scroll-smooth">
             {sections.map((section) => (
               <button
                 key={section.id}
                 onClick={() => setActiveSection(section.id as EditorSection)}
                 className={cn(
                   "flex items-center gap-2 shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition-all border",
                   activeSection === section.id
                     ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/15"
                     : "bg-card border-border text-muted-foreground"
                 )}
               >
                 <section.icon className="h-4 w-4" />
                 {section.label}
               </button>
             ))}
          </nav>

          {/* Editor Content Area */}
          <main className="lg:col-span-9 space-y-8">
             <Card className="rounded-2xl border-border bg-card/50 backdrop-blur-sm p-8 md:p-10 shadow-xl transition-all border hover:border-primary/20">
                <div className="mb-10">
                   <div className="flex items-center gap-4 mb-2">
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl bg-muted shadow-inner")}>
                         {(() => {
                           const active = sections.find(s => s.id === activeSection);
                           const Icon = active?.icon || User;
                           return <Icon className={cn("h-6 w-6", active?.color)} />;
                         })()}
                      </div>
                      <div>
                         <h2 className="text-2xl font-bold tracking-tight font-mozilla-text">
                           {sections.find(s => s.id === activeSection)?.label}
                         </h2>
                         <p className="text-sm text-muted-foreground google-sans">
                           Fill in the details for this section below.
                         </p>
                      </div>
                   </div>
                   <hr className="mt-8 border-border/50" />
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                   {renderActiveSection()}
                </div>

                {/* Footer Navigation */}
                <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                   <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground google-sans">Editing Progress</p>
                      <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-primary transition-all duration-500" 
                           style={{ width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` }}
                         />
                      </div>
                   </div>
                    <div className="flex gap-3">
                       <Button
                         variant="secondary"
                         disabled={activeSection === "personal"}
                         onClick={() => {
                           const idx = sections.findIndex(s => s.id === activeSection);
                           setActiveSection(sections[idx - 1].id as EditorSection);
                           window.scrollTo({ top: 0, behavior: "smooth" });
                         }}
                         className="rounded-xl px-6 bg-secondary text-secondary-foreground shadow-[0_6px_0_0_hsl(216_20%_80%)] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none transition-all"
                       >
                         Previous
                       </Button>
                        <Button
                          disabled={activeSection === "referees"}
                          onClick={() => {
                            const idx = sections.findIndex(s => s.id === activeSection);
                            setActiveSection(sections[idx + 1].id as EditorSection);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="rounded-xl px-8 bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none transition-all"
                        >
                          Next Section
                        </Button>
                    </div>
                </div>
             </Card>

             {/* Secondary Actions (Mobile) */}
             <div className="lg:hidden grid grid-cols-2 gap-3 pb-8">
                <Button variant="outline" onClick={handleReset} className="rounded-xl gap-2 font-bold text-xs h-12">
                   <RotateCcw className="h-4 w-4" /> Reset
                </Button>
                <Button variant="outline" onClick={handleExport} className="rounded-xl gap-2 font-bold text-xs h-12">
                   <Download className="h-4 w-4" /> Export JSON
                </Button>
             </div>
          </main>

        </div>

        {/* Floating Action Bar */}
        <div className="sticky bottom-12 z-40 mt-12 mb-8">
           <div className="pointer-events-auto mx-auto max-w-2xl rounded-2xl bg-card/70 border border-border p-2 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-2 md:gap-4 px-4 md:px-6">
              
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-1 border-r border-border pr-4 mr-2">
                <Button variant="ghost" size="icon" onClick={handleReset} title="Reset Data" className="h-10 w-10 rounded-full hover:text-destructive transition-colors">
                  <RotateCcw className="h-4.5 w-4.5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleExport} title="Export JSON" className="h-10 w-10 rounded-full hover:text-primary transition-colors">
                  <Download className="h-4.5 w-4.5" />
                </Button>
                <label className="cursor-pointer">
                   <div className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-muted transition-colors hover:text-primary">
                      <Upload className="h-4.5 w-4.5" />
                   </div>
                   <input type="file" className="hidden" accept=".json" onChange={handleImport} />
                </label>
              </div>

              {/* Navigation Actions */}
              <div className="flex-1 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={activeSection === "personal"}
                  onClick={() => {
                    const idx = sections.findIndex(s => s.id === activeSection);
                    setActiveSection(sections[idx - 1].id as EditorSection);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-full h-9 px-3 text-[10px] font-bold gap-1.5 bg-background/50 transition-all"
                >
                  <ChevronRight className="h-3.5 w-3.5 rotate-180" /> <span className="hidden sm:inline font-local-jetbrains-mono">Previous</span>
                </Button>
                
                <div className="hidden md:flex flex-col items-center px-4">
                   <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground local-jetbrains-mono mb-1 ">Progress</span>
                   <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` }}
                      />
                   </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={activeSection === "referees"}
                  onClick={() => {
                    const idx = sections.findIndex(s => s.id === activeSection);
                    setActiveSection(sections[idx + 1].id as EditorSection);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-full h-9 px-3 text-[10px] font-bold gap-1.5 bg-background/50 transition-all"
                >
                  <span className="hidden sm:inline font-local-jetbrains-mono">Next</span> <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="flex items-center">
                <PDFDownloadButton resume={resume} size="sm" className="h-9 px-4 text-[10px]" />
              </div>
           </div>
        </div>

      </div>
      <AIContentIndicator />
    </div>
  );
}