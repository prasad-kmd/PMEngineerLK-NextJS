"use client";

import React, { useState, useRef } from "react";

interface GlareHoverProps {
  children: React.ReactNode;
  glareColor?: string;
  glareMaxOpacity?: number;
  className?: string;
  borderRadius?: string;
}

export function GlareHover({
  children,
  glareColor = "rgba(255, 255, 255, 0.4)",
  glareMaxOpacity = 0.5,
  className = "",
  borderRadius = "1rem",
}: GlareHoverProps) {
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x, y });
  };

  const handleMouseEnter = () => setOpacity(glareMaxOpacity);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-20"
        style={{
          opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
