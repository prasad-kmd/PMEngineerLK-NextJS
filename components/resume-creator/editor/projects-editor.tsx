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

interface ProjectsEditorProps {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function ProjectsEditor({ resume, setResume }: ProjectsEditorProps) {
  const addItem = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { name: "", description: "", link: "" },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newList = [...resume.projects];
    newList[index] = { ...newList[index], [field]: value };
    setResume((prev) => ({ ...prev, projects: newList }));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...resume.projects];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setResume((prev) => ({ ...prev, projects: newList }));
  };

  const moveDown = (index: number) => {
    if (index === resume.projects.length - 1) return;
    const newList = [...resume.projects];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setResume((prev) => ({ ...prev, projects: newList }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground leading-relaxed font-local-inter">
          Highlight your best projects, including open source work or personal experiments.
        </p>
        <Button onClick={addItem} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px] font-google-sans">
          <Plus className="h-3.5 w-3.5" /> Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {resume.projects.map((proj, idx) => (
          <EditablePanel
            key={idx}
            title={proj.name || "Unnamed Project"}
            subtitle={proj.link}
            onRemove={() => removeItem(idx)}
            onMoveUp={idx > 0 ? () => moveUp(idx) : undefined}
            onMoveDown={idx < resume.projects.length - 1 ? () => moveDown(idx) : undefined}
            defaultExpanded={idx === resume.projects.length - 1}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Project Name</Label>
                <Input
                  placeholder="e.g. Portfolio Website"
                  value={proj.name}
                  onChange={(e) => updateItem(idx, "name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Project Link (Optional)</Label>
                <Input
                  placeholder="e.g. github.com/user/repo"
                  value={proj.link}
                  onChange={(e) => updateItem(idx, "link", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Project Description</Label>
                <span className={cn("text-[9px] local-jetbrains-mono", proj.description.length > 500 ? "text-destructive" : "text-muted-foreground")}>
                  {proj.description.length}/500
                </span>
              </div>
              <Textarea
                placeholder="What did you build? What technologies were used?"
                value={proj.description}
                onChange={(e) => updateItem(idx, "description", e.target.value)}
                rows={4}
                className="resize-none"
                maxLength={500}
              />
            </div>
          </EditablePanel>
        ))}
      </div>
    </div>
  );
}
