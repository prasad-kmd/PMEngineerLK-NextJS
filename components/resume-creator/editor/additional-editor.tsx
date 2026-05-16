"use client";

import React from "react";
import { Plus, X, Globe, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "../pdf-template/resume-pdf";
import { EditablePanel } from "./editable-panel";
import { cn } from "@/lib/utils";

interface AdditionalEditorProps {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function AdditionalEditor({ resume, setResume }: AdditionalEditorProps) {
  const addStringItem = (field: "languages") => {
    setResume((prev) => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  const removeStringItem = (field: "languages", index: number) => {
    setResume((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateStringItem = (field: "languages", index: number, value: string) => {
    const newList = [...resume[field]];
    newList[index] = value;
    setResume((prev) => ({ ...prev, [field]: newList }));
  };

  const addExtraCurricular = () => {
    setResume((prev) => ({
      ...prev,
      extraCurricular: [
        ...(prev.extraCurricular || []),
        { company: "", role: "", period: "", description: "" },
      ],
    }));
  };

  const removeExtraCurricular = (index: number) => {
    setResume((prev) => ({
      ...prev,
      extraCurricular: prev.extraCurricular.filter((_, i) => i !== index),
    }));
  };

  const updateExtraCurricular = (index: number, field: string, value: string) => {
    const newList = [...resume.extraCurricular];
    newList[index] = { ...newList[index], [field]: value };
    setResume((prev) => ({ ...prev, extraCurricular: newList }));
  };

  return (
    <div className="space-y-12">
      {/* Languages */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold amoriaregular">Languages</h3>
              <p className="text-xs text-muted-foreground">Languages you speak and your proficiency.</p>
            </div>
          </div>
          <Button onClick={() => addStringItem("languages")} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px]">
            <Plus className="h-3.5 w-3.5" /> Add Language
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {(resume.languages || []).map((lang, idx) => (
            <div key={idx} className="flex items-center gap-1 group animate-in zoom-in-95 duration-200">
              <Input
                className="h-9 w-40 md:w-48 bg-background/50"
                placeholder="e.g. English (Fluent)"
                value={lang}
                onChange={(e) => updateStringItem("languages", idx, e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeStringItem("languages", idx)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          {(resume.languages || []).length === 0 && (
            <p className="text-sm text-muted-foreground italic py-4">No languages added yet.</p>
          )}
        </div>
      </div>

      {/* Extra Curriculum Activities */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold amoriaregular">Extra Curriculum Activities</h3>
              <p className="text-xs text-muted-foreground">Clubs, sports, community service, and other activities.</p>
            </div>
          </div>
          <Button onClick={addExtraCurricular} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px]">
            <Plus className="h-3.5 w-3.5" /> Add Entry
          </Button>
        </div>
        
        <div className="space-y-4">
          {(resume.extraCurricular || []).map((vol, idx) => (
            <EditablePanel
              key={idx}
              title={vol.role || "Activity Role"}
              subtitle={vol.company}
              period={vol.period}
              onRemove={() => removeExtraCurricular(idx)}
              defaultExpanded={idx === (resume.extraCurricular || []).length - 1}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest">Organisation/Institution</Label>
                  <Input
                    placeholder="e.g. Chess Club"
                    value={vol.company}
                    onChange={(e) => updateExtraCurricular(idx, "company", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest">Role/Position</Label>
                  <Input
                    placeholder="e.g. Captain"
                    value={vol.role}
                    onChange={(e) => updateExtraCurricular(idx, "role", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest">Period</Label>
                  <Input
                    placeholder="e.g. 2022 - 2023"
                    value={vol.period}
                    onChange={(e) => updateExtraCurricular(idx, "period", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-[10px] font-black uppercase tracking-widest">Contribution/Details</Label>
                  <span className={cn("text-[9px] local-jetbrains-mono", vol.description.length > 500 ? "text-destructive" : "text-muted-foreground")}>
                    {vol.description.length}/500
                  </span>
                </div>
                <Textarea
                  placeholder="Describe your achievements and activities..."
                  value={vol.description}
                  onChange={(e) => updateExtraCurricular(idx, "description", e.target.value)}
                  rows={3}
                  className="resize-none"
                  maxLength={500}
                />
              </div>
            </EditablePanel>
          ))}
          {(resume.extraCurricular || []).length === 0 && (
            <p className="text-sm text-muted-foreground italic py-4">No activities added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
