"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ResumeData } from "../pdf-template/resume-pdf";
import { cn } from "@/lib/utils";

interface PersonalInfoEditorProps {
  resume: ResumeData;
  updateField: (field: keyof ResumeData, value: string | null) => void;
}

export function PersonalInfoEditor({ resume, updateField }: PersonalInfoEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div
          className="relative h-24 w-24 rounded-2xl bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden cursor-pointer hover:bg-muted/80 transition-all hover:border-primary/50 group shadow-inner"
          onClick={() => fileInputRef.current?.click()}
        >
          {resume.image ? (
            <Image
              src={resume.image}
              alt="Profile"
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              width={96}
              height={96}
              unoptimized
            />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Camera className="h-6 w-6 text-muted-foreground" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Upload</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground local-jetbrains-mono">Profile Photo</h3>
          <p className="text-xs text-muted-foreground">JPG or PNG. Max size 2MB.</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 text-xs"
            >
              {resume.image ? "Change" : "Select File"}
            </Button>
            {resume.image && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-destructive flex items-center gap-1"
                onClick={removeImage}
              >
                <X className="h-3 w-3" /> Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest">Full Name</Label>
          <Input
            placeholder="John Doe"
            value={resume.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest">Professional Title</Label>
          <Input
            placeholder="Full Stack Engineer"
            value={resume.role}
            onChange={(e) => updateField("role", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest">Email Address</Label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={resume.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest">Phone Number</Label>
          <Input
            placeholder="+1 (555) 000-0000"
            value={resume.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest">Location</Label>
          <Input
            placeholder="New York, NY"
            value={resume.location}
            onChange={(e) => updateField("location", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest">Website / Portfolio</Label>
          <Input
            placeholder="johndoe.com"
            value={resume.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest">LinkedIn Profile</Label>
          <Input
            placeholder="linkedin.com/in/johndoe"
            value={resume.linkedin}
            onChange={(e) => updateField("linkedin", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest">GitHub Profile</Label>
          <Input
            placeholder="github.com/johndoe"
            value={resume.github}
            onChange={(e) => updateField("github", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold uppercase tracking-widest">Professional Summary</Label>
          <span className={cn("text-[10px] local-jetbrains-mono", resume.summary.length > 500 ? "text-destructive" : "text-muted-foreground")}>
            {resume.summary.length}/500
          </span>
        </div>
        <Textarea
          placeholder="Briefly describe your career background and key strengths..."
          value={resume.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          rows={5}
          className="resize-none"
          maxLength={500}
        />
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Focus on your most impactful achievements and unique value proposition. Keep it concise.
        </p>
      </div>
    </div>
  );
}
