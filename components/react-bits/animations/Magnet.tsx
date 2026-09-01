"use client";

import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagnetProps {
  children: React.ReactNode;
  magnetStrength?: number;
  activeTransition?: object;
  inactiveTransition?: object;
  className?: string;
}

export function Magnet({
  children,
  magnetStrength = 0.3,
  activeTransition = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
  inactiveTransition = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
  className = "",
}: MagnetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * magnetStrength;
    const distanceY = (e.clientY - centerY) * magnetStrength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={isHovered ? activeTransition : inactiveTransition}
    >
      {children}
    </motion.div>
  );
}
