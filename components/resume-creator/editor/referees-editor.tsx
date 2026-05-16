"use client";

import React from "react";
import { Plus, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeData } from "../pdf-template/resume-pdf";
import { EditablePanel } from "./editable-panel";

interface RefereesEditorProps {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function RefereesEditor({ resume, setResume }: RefereesEditorProps) {
  const addReferee = () => {
    setResume((prev) => ({
      ...prev,
      referees: [
        ...(prev.referees || []),
        { name: "", position: "", workingPlacement: "", email: "", phone: "" },
      ],
    }));
  };

  const removeReferee = (index: number) => {
    setResume((prev) => ({
      ...prev,
      referees: (prev.referees || []).filter((_, i) => i !== index),
    }));
  };

  const updateReferee = (index: number, field: string, value: string) => {
    const newList = [...(resume.referees || [])];
    if (newList[index]) {
      newList[index] = { ...newList[index], [field]: value };
    }
    setResume((prev) => ({ ...prev, referees: newList }));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...(resume.referees || [])];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setResume((prev) => ({ ...prev, referees: newList }));
  };

  const moveDown = (index: number) => {
    const refs = resume.referees || [];
    if (index === refs.length - 1) return;
    const newList = [...refs];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setResume((prev) => ({ ...prev, referees: newList }));
  };

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-mozilla-headline">Non Related Referees</h3>
              <p className="text-xs text-muted-foreground font-local-inter">List people who can provide a professional reference.</p>
            </div>
          </div>
          <Button onClick={addReferee} size="sm" variant="outline" className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px] font-google-sans">
            <Plus className="h-3.5 w-3.5" /> Add Referee
          </Button>
        </div>
        
        <div className="space-y-4">
          {(resume.referees || []).map((ref, idx) => (
            <EditablePanel
              key={idx}
              title={ref.name || "Referee Name"}
              subtitle={ref.position}
              onRemove={() => removeReferee(idx)}
              onMoveUp={idx > 0 ? () => moveUp(idx) : undefined}
              onMoveDown={idx < (resume.referees || []).length - 1 ? () => moveDown(idx) : undefined}
              defaultExpanded={idx === (resume.referees || []).length - 1}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Full Name</Label>
                  <Input
                    placeholder="e.g. Dr. Jane Smith"
                    value={ref.name}
                    onChange={(e) => updateReferee(idx, "name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Position</Label>
                  <Input
                    placeholder="e.g. Senior Manager"
                    value={ref.position}
                    onChange={(e) => updateReferee(idx, "position", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Working Placement</Label>
                  <Input
                    placeholder="e.g. Tech Solutions Inc."
                    value={ref.workingPlacement}
                    onChange={(e) => updateReferee(idx, "workingPlacement", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Email Address</Label>
                  <Input
                    placeholder="e.g. jane.smith@email.com"
                    value={ref.email}
                    onChange={(e) => updateReferee(idx, "email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest font-noto-sans-display">Phone Number</Label>
                  <Input
                    placeholder="e.g. +123 456 789"
                    value={ref.phone}
                    onChange={(e) => updateReferee(idx, "phone", e.target.value)}
                  />
                </div>
              </div>
            </EditablePanel>
          ))}
          {(resume.referees || []).length === 0 && (
            <p className="text-sm text-muted-foreground italic py-4">No referees added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
