"use client";

import React from "react";

interface BorderGlowProps {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}

export function BorderGlow({
  children,
  glowColor = "rgba(var(--primary-rgb), 0.5)",
  className = "",
}: BorderGlowProps) {
  return (
    <div className={`relative p-[1px] rounded-3xl group overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 bg-linear-to-r from-transparent via-primary to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700 animate-pulse pointer-events-none"
        style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
      />
      <div className="relative rounded-[23px] bg-card h-full w-full">
        {children}
      </div>
    </div>
  );
}
