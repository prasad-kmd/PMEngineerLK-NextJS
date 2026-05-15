"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  User,
  Layout,
  AlertTriangle,
  Trash2,
  Plus,
  Camera,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { usePersistentState } from "@/hooks/use-persistent-state";
import { AIContentIndicator } from "@/components/ai-content-indicator";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PDFDownloadButton } from "@/components/resume-creator/pdf-template/pdf-download-button";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  period: string;
  grade: string;
}

interface Project {
  name: string;
  description: string;
  link: string;
}

interface ResumeData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  image: string | null;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  projects: Project[];
}

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
    },
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Docker",
  ],
  certifications: ["AWS Certified Developer", "Google Cloud Professional"],
  projects: [
    {
      name: "E-commerce Platform",
      description:
        "Built a headless commerce solution using Next.js and Shopify API.",
      link: "https://shop.example.com",
    },
  ],
};

export default function ResumeCreator() {
  const [resume, setResume] = usePersistentState<ResumeData>(
    "resume-data",
    initialResume,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (
    field: keyof ResumeData,
    value: string | Experience[] | Education[] | Project[] | string[] | null,
  ) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        updateField("image", event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    updateField("image", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addItem = (
    field:
      | "experiences"
      | "education"
      | "projects"
      | "skills"
      | "certifications",
  ) => {
    const newItem = {
      experiences: { company: "", role: "", period: "", description: "" },
      education: { school: "", degree: "", period: "", grade: "" },
      projects: { name: "", description: "", link: "" },
      skills: "",
      certifications: "",
    }[field];
    setResume((prev) => ({ ...prev, [field]: [...prev[field], newItem] }));
  };

  const removeItem = (
    field:
      | "experiences"
      | "education"
      | "projects"
      | "skills"
      | "certifications",
    index: number,
  ) => {
    setResume((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateListItem = (
    field: "experiences" | "education" | "projects",
    index: number,
    subfield: string,
    value: string,
  ) => {
    const newList = [...resume[field]];
    newList[index] = { ...newList[index], [subfield]: value };
    setResume((prev) => ({ ...prev, [field]: newList }));
  };

  const updateStringList = (
    field: "skills" | "certifications",
    index: number,
    value: string,
  ) => {
    const newList = [...resume[field]];
    newList[index] = value;
    setResume((prev) => ({ ...prev, [field]: newList }));
  };

  return (
    <div className="min-h-screen pb-20 px-6 lg:px-8 pt-12 bg-background">
      <div className="mx-auto max-w-7xl">
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
        <header className="mb-12 text-center print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Layout className="h-3 w-3" />
            Professional Tools
          </div>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4 mozilla-headline">
            Resume Architect
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Craft a high-impact, professional resume. Fill in your details below
            and generate a precision PDF.
          </p>
        </header>

        {/* Mobile Warning */}
        <div className="lg:hidden p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-8 print:hidden">
          <p className="text-amber-500 font-bold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Desktop Recommended
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            This tool is optimized for large screens to ensure the best
            editing experience. Please use a desktop for the best results.
          </p>
        </div>

        {/* Editor */}
        <div className="space-y-8 print:hidden">
          {/* Personal Info */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 google-sans">
                <User className="h-5 w-5 text-primary" /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-6">
                <Label className="block mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Profile Photo
                </Label>
                <div className="flex items-center gap-4">
                  <div
                    className="relative h-20 w-20 rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {resume.image ? (
                      <Image
                        src={resume.image}
                        alt="Profile"
                        className="h-full w-full object-cover"
                        width={80}
                        height={80}
                        unoptimized
                      />
                    ) : (
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div className="space-y-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {resume.image ? "Change Photo" : "Upload Photo"}
                    </Button>
                    {resume.image && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive flex items-center gap-1"
                        onClick={removeImage}
                      >
                        <X className="h-3 w-3" /> Remove
                      </Button>
                    )}
                    <p className="text-[10px] text-muted-foreground">
                      JPG, PNG (max 2MB)
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={resume.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Professional Title</Label>
                  <Input
                    value={resume.role}
                    onChange={(e) => updateField("role", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={resume.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={resume.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={resume.location}
                    onChange={(e) => updateField("location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input
                    value={resume.website}
                    onChange={(e) => updateField("website", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input
                    value={resume.linkedin}
                    onChange={(e) => updateField("linkedin", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GitHub</Label>
                  <Input
                    value={resume.github}
                    onChange={(e) => updateField("github", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Professional Summary</Label>
                <Textarea
                  value={resume.summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2 google-sans">
                <Briefcase className="h-5 w-5 text-blue-500" /> Work
                Experience
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem("experiences")}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resume.experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="space-y-4 p-4 rounded-lg bg-muted/30 relative group"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeItem("experiences", idx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        updateListItem(
                          "experiences",
                          idx,
                          "company",
                          e.target.value,
                        )
                      }
                    />
                    <Input
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) =>
                        updateListItem(
                          "experiences",
                          idx,
                          "role",
                          e.target.value,
                        )
                      }
                    />
                    <Input
                      placeholder="Period (e.g. 2021 - Present)"
                      value={exp.period}
                      onChange={(e) =>
                        updateListItem(
                          "experiences",
                          idx,
                          "period",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="Description..."
                    value={exp.description}
                    onChange={(e) =>
                      updateListItem(
                        "experiences",
                        idx,
                        "description",
                        e.target.value,
                      )
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2 google-sans">
                <GraduationCap className="h-5 w-5 text-green-500" /> Education
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem("education")}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resume.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="space-y-4 p-4 rounded-lg bg-muted/30 relative group"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeItem("education", idx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      placeholder="School/University"
                      value={edu.school}
                      onChange={(e) =>
                        updateListItem(
                          "education",
                          idx,
                          "school",
                          e.target.value,
                        )
                      }
                    />
                    <Input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        updateListItem(
                          "education",
                          idx,
                          "degree",
                          e.target.value,
                        )
                      }
                    />
                    <Input
                      placeholder="Period"
                      value={edu.period}
                      onChange={(e) =>
                        updateListItem(
                          "education",
                          idx,
                          "period",
                          e.target.value,
                        )
                      }
                    />
                    <Input
                      placeholder="Grade/GPA"
                      value={edu.grade}
                      onChange={(e) =>
                        updateListItem(
                          "education",
                          idx,
                          "grade",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2 google-sans">
                <Code2 className="h-5 w-5 text-orange-500" /> Technical Skills
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem("skills")}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {resume.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-1 group">
                    <Input
                      className="w-32"
                      value={skill}
                      onChange={(e) =>
                        updateStringList("skills", idx, e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeItem("skills", idx)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2 google-sans">
                <Award className="h-5 w-5 text-sky-500" /> Certifications
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem("certifications")}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {resume.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 group">
                  <Input
                    value={cert}
                    onChange={(e) =>
                      updateStringList("certifications", idx, e.target.value)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeItem("certifications", idx)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2 google-sans">
                <Code2 className="h-5 w-5 text-purple-500" /> Key Projects
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem("projects")}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resume.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="space-y-4 p-4 rounded-lg bg-muted/30 relative group"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeItem("projects", idx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={(e) =>
                        updateListItem(
                          "projects",
                          idx,
                          "name",
                          e.target.value,
                        )
                      }
                    />
                    <Input
                      placeholder="Link (optional)"
                      value={proj.link}
                      onChange={(e) =>
                        updateListItem(
                          "projects",
                          idx,
                          "link",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="Description..."
                    value={proj.description}
                    onChange={(e) =>
                      updateListItem(
                        "projects",
                        idx,
                        "description",
                        e.target.value,
                      )
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Generate PDF Button */}
          <div className="flex justify-center pt-4 pb-8">
            <PDFDownloadButton resume={resume} />
          </div>
        </div>
      </div>
      <AIContentIndicator />
    </div>
  );
}
