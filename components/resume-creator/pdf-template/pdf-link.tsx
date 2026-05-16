"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF, type ResumeData } from "./resume-pdf";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumePDFLinkProps {
  resume: ResumeData;
}

export default function ResumePDFLink({ resume, className, size = "lg" }: ResumePDFLinkProps & { className?: string; size?: "default" | "sm" | "lg" | "icon" }) {
  return (
    <PDFDownloadLink
      document={<ResumePDF resume={resume} />}
      fileName={`${resume.name.replace(/\s+/g, "_")}_Resume.pdf`}
    >
      {({ loading }) => (
        <Button
          size={size}
          className={cn(
            "rounded-full px-6 font-bold transition-all duration-300",
            size === "sm"
              ? "bg-primary text-primary-foreground shadow-[0_8px_16px_-6px_hsl(var(--primary-h)_var(--primary-s)_var(--primary-l)/0.5)] border border-primary/20 hover:shadow-[0_12px_20px_-4px_hsl(var(--primary-h)_var(--primary-s)_var(--primary-l)/0.6)] hover:-translate-y-0.5 active:translate-y-0"
              : "bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none",
            className
          )}
          disabled={loading}
        >
          <Download className={cn("mr-2", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
          {loading ? <span className="hidden sm:inline">Generating...</span> : <span className="hidden sm:inline">{size === "sm" ? "Download" : "Download Resume (PDF)"}</span>}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
