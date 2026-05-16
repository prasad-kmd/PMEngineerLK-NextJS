"use client";

import React from "react";
import { Plus, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeData } from "../pdf-template/resume-pdf";

interface SkillsEditorProps {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function SkillsEditor({ resume, setResume }: SkillsEditorProps) {
  const addItem = (field: "technicalSkills" | "personalSkills" | "certifications") => {
    setResume((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeItem = (field: "technicalSkills" | "personalSkills" | "certifications", index: number) => {
    setResume((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateItem = (field: "technicalSkills" | "personalSkills" | "certifications", index: number, value: string) => {
    const newList = [...resume[field]];
    newList[index] = value;
    setResume((prev) => ({ ...prev, [field]: newList }));
  };

  return (
    <div className="space-y-12">
      {/* Technical Skills */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-lg font-bold amoriaregular">Technical Skills</h3>
            <p className="text-xs text-muted-foreground">List your core technical expertise.</p>
          </div>
          <Button onClick={() => addItem("technicalSkills")} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px]">
            <Plus className="h-3.5 w-3.5" /> Add Skill
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {(resume.technicalSkills || []).map((skill, idx) => (
            <div key={idx} className="flex items-center gap-1 group animate-in zoom-in-95 duration-200">
              <Input
                className="h-9 w-32 md:w-40 bg-background/50"
                placeholder="e.g. React"
                value={skill}
                onChange={(e) => updateItem("technicalSkills", idx, e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeItem("technicalSkills", idx)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          {(resume.technicalSkills || []).length === 0 && (
            <p className="text-sm text-muted-foreground italic py-4">No technical skills added yet.</p>
          )}
        </div>
      </div>

      {/* Personal Skills */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-lg font-bold amoriaregular">Personal Skills</h3>
            <p className="text-xs text-muted-foreground">Soft skills, leadership, and personal traits.</p>
          </div>
          <Button onClick={() => addItem("personalSkills")} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px]">
            <Plus className="h-3.5 w-3.5" /> Add Skill
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {(resume.personalSkills || []).map((skill, idx) => (
            <div key={idx} className="flex items-center gap-1 group animate-in zoom-in-95 duration-200">
              <Input
                className="h-9 w-32 md:w-40 bg-background/50"
                placeholder="e.g. Leadership"
                value={skill}
                onChange={(e) => updateItem("personalSkills", idx, e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeItem("personalSkills", idx)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          {(resume.personalSkills || []).length === 0 && (
            <p className="text-sm text-muted-foreground italic py-4">No personal skills added yet.</p>
          )}
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-lg font-bold amoriaregular">Certifications</h3>
            <p className="text-xs text-muted-foreground">Professional certificates and awards.</p>
          </div>
          <Button onClick={() => addItem("certifications")} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px]">
            <Plus className="h-3.5 w-3.5" /> Add Certification
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(resume.certifications || []).map((cert, idx) => (
            <div key={idx} className="flex items-center gap-2 group animate-in slide-in-from-left-2 duration-200">
              <Input
                className="h-9 bg-background/50"
                placeholder="e.g. AWS Certified Developer"
                value={cert}
                onChange={(e) => updateItem("certifications", idx, e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeItem("certifications", idx)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          {(resume.certifications || []).length === 0 && (
            <p className="text-sm text-muted-foreground italic py-4 col-span-2">No certifications added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

