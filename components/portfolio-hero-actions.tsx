"use client";

import { Mail, FileDown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export function PortfolioHeroActions() {
  const handleDownloadCV = () => {
    const url = "/cv/PrasadM_CV_2025.pdf";
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.target = "_blank";
    //   a.rel = "noopener noreferrer";
    // document.body.appendChild(a);
    // a.click();
    // a.remove();
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening CV in a new tab...");
  };

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
      {/* Primary CTA – 3D gradient button */}
      <Button
        className="rounded-[5px] px-8 text-sm font-semibold
                   bg-linear-to-b from-primary/95 via-primary to-primary/80
                   shadow-[0_18px_40px_rgba(15,23,42,0.45)]
                   hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(15,23,42,0.7)]
                   active:translate-y-0 active:shadow-[0_12px_26px_rgba(15,23,42,0.55)]
                   transition duration-150 ease-out"
        asChild
      >
        <Link href={siteConfig.socialLinks.email}>
          <Mail className="mr-2 h-4 w-4" />
          Contact Me
        </Link>
      </Button>
      {/* Secondary CTA – 3D “glass” button */}
      <Button
        variant="outline"
        className="rounded-[5px] px-8
                   border border-primary/30 bg-card/80 text-foreground/90
                   shadow-[0_14px_30px_rgba(15,23,42,0.25)]
                   hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/5
                   hover:shadow-[0_20px_38px_rgba(15,23,42,0.35)]
                   active:translate-y-0 active:shadow-[0_10px_22px_rgba(15,23,42,0.35)]
                   transition duration-150 ease-out"
        onClick={handleDownloadCV}
      >
        <FileDown className="mr-2 h-4 w-4" />
        View / Download CV
      </Button>
      {/* Social icons – compact 3D chips */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-[5px]
                     border border-primary/30 bg-card/70 text-foreground/80
                     shadow-[0_10px_22px_rgba(15,23,42,0.35)]
                     hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary
                     hover:shadow-[0_16px_30px_rgba(15,23,42,0.5)]
                     active:translate-y-0 active:shadow-[0_8px_16px_rgba(15,23,42,0.45)]
                     transition duration-150 ease-out"
          asChild
        >
          <Link
            href={siteConfig.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </Link>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-[5px]
                     border border-primary/30 bg-card/70 text-foreground/80
                     shadow-[0_10px_22px_rgba(15,23,42,0.35)]
                     hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary
                     hover:shadow-[0_16px_30px_rgba(15,23,42,0.5)]
                     active:translate-y-0 active:shadow-[0_8px_16px_rgba(15,23,42,0.45)]
                     transition duration-150 ease-out"
          asChild
        >
          <Link
            href={siteConfig.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
