"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-background text-foreground transition-colors",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            `
          [--white-gradient:radial-gradient(at_50%_0%,rgba(255,255,255,0.15)_0px,transparent_50%)]
          [--dark-gradient:radial-gradient(at_50%_0%,rgba(var(--primary-rgb),0.12)_0px,transparent_50%)]
          [--aurora:linear-gradient(to_right,rgba(var(--primary-rgb),0.15),rgba(var(--secondary-rgb),0.15))]
          opacity-50
          dark:opacity-30
          bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
          from-primary/20 via-secondary/10 to-transparent
          filter blur-[60px]
          absolute -inset-[10px]
          will-change-transform
          animate-pulse
          `
          )}
        />
      </div>
      {children}
    </div>
  );
}
