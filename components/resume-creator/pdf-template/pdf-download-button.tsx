"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { type ResumeData } from "./resume-pdf";

interface PDFDownloadButtonProps {
  resume: ResumeData;
}

const ResumePDFLink = dynamic(() => import("./pdf-link"), {
  ssr: false,
  loading: () => (
    <Button
      size="lg"
      className="rounded-full px-12 font-bold shadow-lg shadow-primary/20"
      disabled
    >
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Loading...
    </Button>
  ),
});

export function PDFDownloadButton({ resume }: PDFDownloadButtonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    return (
      <Button
        size="lg"
        className="rounded-full px-12 font-bold shadow-lg shadow-primary/20"
        onClick={() => setIsLoaded(true)}
      >
        <Download className="mr-2 h-5 w-5" />
        Generate PDF
      </Button>
    );
  }

  return <ResumePDFLink resume={resume} />;
}
