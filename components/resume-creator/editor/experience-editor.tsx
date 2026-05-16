"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "../pdf-template/resume-pdf";
import { EditablePanel } from "./editable-panel";
import { cn } from "@/lib/utils";

interface ExperienceEditorProps {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function ExperienceEditor({ resume, setResume }: ExperienceEditorProps) {
  const addItem = () => {
    setResume((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { company: "", role: "", period: "", description: "" },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newList = [...resume.experiences];
    newList[index] = { ...newList[index], [field]: value };
    setResume((prev) => ({ ...prev, experiences: newList }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
          List your relevant work experience starting with the most recent. 
          Use bullet points for better readability in the description.
        </p>
        <Button onClick={addItem} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px]">
          <Plus className="h-3.5 w-3.5" /> Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {resume.experiences.map((exp, idx) => (
          <EditablePanel
            key={idx}
            title={exp.role || "Professional Role"}
            subtitle={exp.company}
            period={exp.period}
            onRemove={() => removeItem(idx)}
            defaultExpanded={idx === resume.experiences.length - 1}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">Company / Organisation</Label>
                <Input
                  placeholder="e.g. Acme Corp"
                  value={exp.company}
                  onChange={(e) => updateItem(idx, "company", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">Job Role / Position</Label>
                <Input
                  placeholder="e.g. Senior Developer"
                  value={exp.role}
                  onChange={(e) => updateItem(idx, "role", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">Time Period</Label>
                <Input
                  placeholder="e.g. Jan 2021 - Present"
                  value={exp.period}
                  onChange={(e) => updateItem(idx, "period", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest">Key Responsibilities & Achievements</Label>
                <span className={cn("text-[9px] local-jetbrains-mono", exp.description.length > 1000 ? "text-destructive" : "text-muted-foreground")}>
                  {exp.description.length}/1000
                </span>
              </div>
              <Textarea
                placeholder="Describe your role and impact. Tip: Use new lines to create bullet points in the final PDF."
                value={exp.description}
                onChange={(e) => updateItem(idx, "description", e.target.value)}
                rows={5}
                className="resize-none"
                maxLength={1000}
              />
            </div>
          </EditablePanel>
        ))}
      </div>

      {resume.experiences.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-border rounded-3xl bg-muted/20">
          <p className="text-sm text-muted-foreground mb-4">No experience entries yet.</p>
          <Button onClick={addItem} size="sm" variant="secondary" className="gap-2">
            <Plus className="h-4 w-4" /> Add Your First Role
          </Button>
        </div>
      )}
    </div>
  );
}
