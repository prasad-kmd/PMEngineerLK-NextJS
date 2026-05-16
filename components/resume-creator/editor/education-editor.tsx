"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "../pdf-template/resume-pdf";
import { EditablePanel } from "./editable-panel";

interface EducationEditorProps {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function EducationEditor({ resume, setResume }: EducationEditorProps) {
  const addItem = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { school: "", degree: "", period: "", grade: "", description: "" },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newList = [...resume.education];
    newList[index] = { ...newList[index], [field]: value };
    setResume((prev) => ({ ...prev, education: newList }));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...resume.education];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setResume((prev) => ({ ...prev, education: newList }));
  };

  const moveDown = (index: number) => {
    if (index === resume.education.length - 1) return;
    const newList = [...resume.education];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setResume((prev) => ({ ...prev, education: newList }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground leading-relaxed font-local-inter">
          Add your educational background, including degrees and certifications.
        </p>
        <Button onClick={addItem} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px] font-noto-sans-display">
          <Plus className="h-3.5 w-3.5" /> Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {resume.education.map((edu, idx) => (
          <EditablePanel
            key={idx}
            title={edu.degree || "Qualification"}
            subtitle={edu.school}
            period={edu.period}
            onRemove={() => removeItem(idx)}
            onMoveUp={idx > 0 ? () => moveUp(idx) : undefined}
            onMoveDown={idx < resume.education.length - 1 ? () => moveDown(idx) : undefined}
            defaultExpanded={idx === resume.education.length - 1}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Institution / School</Label>
                <Input
                  placeholder="e.g. Stanford University"
                  value={edu.school}
                  onChange={(e) => updateItem(idx, "school", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Degree / Qualification</Label>
                <Input
                  placeholder="e.g. B.S. in Computer Science"
                  value={edu.degree}
                  onChange={(e) => updateItem(idx, "degree", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Period</Label>
                <Input
                  placeholder="e.g. 2015 - 2019"
                  value={edu.period}
                  onChange={(e) => updateItem(idx, "period", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Grade / GPA (Optional)</Label>
                <Input
                  placeholder="e.g. 3.9 GPA"
                  value={edu.grade}
                  onChange={(e) => updateItem(idx, "grade", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Responsibilities / Key Learnings</Label>
              <Textarea
                placeholder="Describe your achievements or focus areas. Tip: Use new lines for bullet points."
                value={edu.description}
                onChange={(e) => updateItem(idx, "description", e.target.value)}
                rows={3}
                className="resize-none font-google-sans"
              />
            </div>
          </EditablePanel>
        ))}
      </div>
    </div>
  );
}
