"use client";

import React from "react";

interface ElectricBorderProps {
  children: React.ReactNode;
  color?: string;
  speed?: number;
  className?: string;
}

export function ElectricBorder({
  children,
  color = "var(--primary, #9333ea)",
  className = "",
}: ElectricBorderProps) {
  return (
    <div className={`relative p-[1px] group overflow-hidden rounded-2xl ${className}`}>
      <div
        className="absolute inset-0 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none"
        style={{ borderColor: color }}
      />
      <div className="relative rounded-[15px] bg-card h-full w-full">
        {children}
      </div>
    </div>
  );
}
