"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        { school: "", degree: "", period: "", grade: "" },
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Add your educational background, including degrees and certifications.
        </p>
        <Button onClick={addItem} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px]">
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
            defaultExpanded={idx === resume.education.length - 1}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">Institution / School</Label>
                <Input
                  placeholder="e.g. Stanford University"
                  value={edu.school}
                  onChange={(e) => updateItem(idx, "school", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">Degree / Qualification</Label>
                <Input
                  placeholder="e.g. B.S. in Computer Science"
                  value={edu.degree}
                  onChange={(e) => updateItem(idx, "degree", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">Period</Label>
                <Input
                  placeholder="e.g. 2015 - 2019"
                  value={edu.period}
                  onChange={(e) => updateItem(idx, "period", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">Grade / GPA (Optional)</Label>
                <Input
                  placeholder="e.g. 3.9 GPA"
                  value={edu.grade}
                  onChange={(e) => updateItem(idx, "grade", e.target.value)}
                />
              </div>
            </div>
          </EditablePanel>
        ))}
      </div>
    </div>
  );
}
