"use client";

import React, { useState, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { type ResumeData } from "./resume-pdf";
import { cn } from "@/lib/utils";

interface PDFDownloadButtonProps {
  resume: ResumeData;
}

const ResumePDFLink = lazy(() => import("./pdf-link"));

function PDFLoadingButton({ size, className }: { size: "default" | "sm" | "lg" | "icon"; className?: string }) {
  return (
    <Button
      size={size}
      className={cn(
        "rounded-full px-6 font-bold transition-all duration-300",
        size === "sm"
          ? "bg-primary text-primary-foreground shadow-[0_8px_16px_-6px_hsl(var(--primary-h)_var(--primary-s)_var(--primary-l)/0.5)] border border-primary/20"
          : "bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))]",
        className
      )}
      disabled
    >
      <Loader2 className={cn("mr-2 h-4 w-4 animate-spin")} />
      <span className="hidden sm:inline">Loading...</span>
    </Button>
  );
}

export function PDFDownloadButton({ resume, className, size = "lg" }: PDFDownloadButtonProps & { className?: string; size?: "default" | "sm" | "lg" | "icon" }) {
  const [dataSnapshot, setDataSnapshot] = useState<ResumeData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Check if current data is different from what was used to generate the PDF
  const isDirty = dataSnapshot && JSON.stringify(resume) !== JSON.stringify(dataSnapshot);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Artificial delay to show loading state and prevent instant re-render blocking
    setTimeout(() => {
      setDataSnapshot(resume);
      setIsGenerating(false);
    }, 400);
  };

  if (!dataSnapshot || isDirty || isGenerating) {
    return (
      <Button
        size={size}
        className={cn(
          "rounded-full px-6 font-bold transition-all duration-300",
          size === "sm"
            ? "bg-primary text-primary-foreground shadow-[0_8px_16px_-6px_hsl(var(--primary-h)_var(--primary-s)_var(--primary-l)/0.5)] border border-primary/20 hover:shadow-[0_12px_20px_-4px_hsl(var(--primary-h)_var(--primary-s)_var(--primary-l)/0.6)] hover:-translate-y-0.5 active:translate-y-0"
            : "bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none",
          className
        )}
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className={cn("mr-2", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
        )}
        <span className="hidden sm:inline">
          {isGenerating 
            ? "Preparing..." 
            : isDirty 
              ? (size === "sm" ? "Update" : "Update Resume (PDF)") 
              : (size === "sm" ? "PDF" : "Generate Resume (PDF)")}
        </span>
      </Button>
    );
  }

  return (
    <Suspense fallback={<PDFLoadingButton size={size} className={className} />}>
      <ResumePDFLink resume={dataSnapshot} size={size} className={className} />
    </Suspense>
  );
}
