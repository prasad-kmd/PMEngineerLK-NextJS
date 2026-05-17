"use client";

import React from "react";
import { Plus, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
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

  const addInterest = () => {
    setResume((prev) => ({
      ...prev,
      interests: [...(prev.interests || []), { name: "", details: "" }],
    }));
  };

  const removeInterest = (index: number) => {
    setResume((prev) => ({
      ...prev,
      interests: (prev.interests || []).filter((_, i) => i !== index),
    }));
  };

  const updateInterest = (index: number, field: "name" | "details", value: string) => {
    setResume((prev) => {
      const newInterests = [...(prev.interests || [])];
      newInterests[index] = {
        ...newInterests[index],
        [field]: value,
      };
      return { ...prev, interests: newInterests };
    });
  };

  return (
    <div className="space-y-12">
      {/* Technical Skills */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-lg font-bold font-mozilla-headline">Technical Skills</h3>
            <p className="text-xs text-muted-foreground font-local-inter">List your core technical expertise.</p>
          </div>
          <Button onClick={() => addItem("technicalSkills")} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px] font-google-sans">
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
            <p className="text-sm text-muted-foreground italic py-4 font-local-inter">No technical skills added yet.</p>
          )}
        </div>
      </div>

      {/* Personal Skills */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-lg font-bold font-mozilla-headline">Personal Skills</h3>
            <p className="text-xs text-muted-foreground font-local-inter">Soft skills, leadership, and personal traits.</p>
          </div>
          <Button onClick={() => addItem("personalSkills")} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px] font-google-sans">
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
            <p className="text-sm text-muted-foreground italic py-4 font-local-inter">No personal skills added yet.</p>
          )}
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-lg font-bold font-mozilla-headline">Certifications</h3>
            <p className="text-xs text-muted-foreground font-local-inter">Professional certificates and awards.</p>
          </div>
          <Button onClick={() => addItem("certifications")} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px] font-google-sans">
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
            <p className="text-sm text-muted-foreground italic py-4 col-span-2 font-local-inter">No certifications added yet.</p>
          )}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-lg font-bold font-mozilla-headline">Interests</h3>
            <p className="text-xs text-muted-foreground font-local-inter">Your hobbies, passions, or interests (with optional details).</p>
          </div>
          <Button onClick={addInterest} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px] font-google-sans">
            <Plus className="h-3.5 w-3.5" /> Add Interest
          </Button>
        </div>
        <div className="space-y-4">
          {(resume.interests || []).map((interest, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl border border-border/60 bg-muted/20 group animate-in slide-in-from-left-2 duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground local-jetbrains-mono">Interest Name</label>
                  <Input
                    className="h-9 bg-background/50"
                    placeholder="e.g. Photography"
                    value={interest.name}
                    onChange={(e) => updateInterest(idx, "name", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground local-jetbrains-mono">Additional Details (Optional)</label>
                  <Input
                    className="h-9 bg-background/50"
                    placeholder="e.g. Landscape & street photography"
                    value={interest.details || ""}
                    onChange={(e) => updateInterest(idx, "details", e.target.value)}
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-destructive sm:mt-5 shrink-0 transition-opacity"
                onClick={() => removeInterest(idx)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {(resume.interests || []).length === 0 && (
            <p className="text-sm text-muted-foreground italic py-4 font-local-inter">No interests added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

