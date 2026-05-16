"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF, type ResumeData } from "./resume-pdf";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResumePDFLinkProps {
  resume: ResumeData;
}

export default function ResumePDFLink({ resume }: ResumePDFLinkProps) {
  return (
    <PDFDownloadLink
      document={<ResumePDF resume={resume} />}
      fileName={`${resume.name.replace(/\s+/g, "_")}_Resume.pdf`}
    >
      {({ loading }) => (
        <Button
          size="lg"
          className="rounded-full px-12 font-bold shadow-lg shadow-primary/20"
          disabled={loading}
        >
          <Download className="mr-2 h-5 w-5" />
          {loading ? <span className="hidden sm:inline">Generating PDF...</span> : <span className="hidden sm:inline">Download Resume (PDF)</span>}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
