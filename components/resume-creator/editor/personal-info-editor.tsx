"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Camera, X, Plus, Trash2, Globe } from "lucide-react";
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
  setResume?: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function PersonalInfoEditor({ resume, updateField, setResume }: PersonalInfoEditorProps) {
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

  const addCustomLink = () => {
    if (!setResume) return;
    setResume((prev) => ({
      ...prev,
      customLinks: [...(prev.customLinks || []), { url: "", username: "" }],
    }));
  };

  const removeCustomLink = (index: number) => {
    if (!setResume) return;
    setResume((prev) => ({
      ...prev,
      customLinks: (prev.customLinks || []).filter((_, i) => i !== index),
    }));
  };

  const updateCustomLink = (index: number, field: "url" | "username", value: string) => {
    if (!setResume) return;
    setResume((prev) => {
      const newLinks = [...(prev.customLinks || [])];
      newLinks[index] = {
        ...newLinks[index],
        [field]: value,
      };
      return { ...prev, customLinks: newLinks };
    });
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
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-google-sans">Upload</span>
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
          <p className="text-xs text-muted-foreground font-google-sans">JPG or PNG. Max size 2MB.</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 text-xs font-google-sans"
            >
              {resume.image ? "Change" : "Select File"}
            </Button>
            {resume.image && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-destructive flex items-center gap-1 font-google-sans"
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
          <Label className="text-xs font-bold uppercase tracking-widest font-noto-sans-display">Full Name</Label>
          <Input
            placeholder="John Doe"
            value={resume.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest font-noto-sans-display">Professional Title</Label>
          <Input
            placeholder="Full Stack Engineer"
            value={resume.role}
            onChange={(e) => updateField("role", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest font-noto-sans-display">Email Address</Label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={resume.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest font-noto-sans-display">Phone Number</Label>
          <Input
            placeholder="+1 (555) 000-0000"
            value={resume.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest font-noto-sans-display">Location</Label>
          <Input
            placeholder="New York, NY"
            value={resume.location}
            onChange={(e) => updateField("location", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest font-noto-sans-display">Website / Portfolio</Label>
          <Input
            placeholder="johndoe.com"
            value={resume.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest font-noto-sans-display">LinkedIn Username</Label>
          <Input
            placeholder="e.g. johndoe"
            value={resume.linkedin}
            onChange={(e) => updateField("linkedin", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest font-noto-sans-display">GitHub Username</Label>
          <Input
            placeholder="e.g. johndoe"
            value={resume.github}
            onChange={(e) => updateField("github", e.target.value)}
          />
        </div>
      </div>

      {/* Custom Portfolio / Social Links */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-bold uppercase tracking-widest font-noto-sans-display">
              Custom Social & Portfolio Links
            </h4>
          </div>
          <Button
            type="button"
            onClick={addCustomLink}
            size="sm"
            variant="outline"
            className="h-8 gap-1.5 font-bold uppercase tracking-widest text-[10px] font-noto-sans-display"
          >
            <Plus className="h-3.5 w-3.5" /> Add Link
          </Button>
        </div>

        <div className="space-y-3">
          {(resume.customLinks || []).map((link, idx) => (
            <div
              key={idx}
              className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-end bg-muted/30 p-3 rounded-xl border border-border animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-noto-sans-display">
                  Base URL / Link Prefix
                </Label>
                <Input
                  placeholder="e.g. leetcode.com/u/"
                  value={link.url}
                  onChange={(e) => updateCustomLink(idx, "url", e.target.value)}
                  className="h-9 bg-background/50 font-google-sans"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-noto-sans-display">
                  Username / Handle
                </Label>
                <Input
                  placeholder="e.g. johndoe"
                  value={link.username}
                  onChange={(e) => updateCustomLink(idx, "username", e.target.value)}
                  className="h-9 bg-background/50 font-google-sans"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeCustomLink(idx)}
                className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {(resume.customLinks || []).length === 0 && (
            <p className="text-xs text-muted-foreground italic font-noto-sans-display py-2 text-center bg-muted/10 rounded-xl border border-dashed border-border/50">
              No custom social or portfolio links added yet. Click "Add Link" to display platforms like LeetCode or Behance!
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold uppercase tracking-widest font-noto-sans-display">Professional Summary</Label>
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
