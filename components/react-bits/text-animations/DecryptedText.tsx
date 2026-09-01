"use client";

import React, { useState, useEffect, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover";
}

export function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  className = "",
  encryptedClassName = "opacity-60 font-mono text-primary",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const getRandomChar = (targetChar: string) => {
    if (useOriginalCharsOnly) {
      return text[Math.floor(Math.random() * text.length)];
    }
    return characters[Math.floor(Math.random() * characters.length)];
  };

  useEffect(() => {
    if (animateOn === "hover" && !isHovered) {
      setDisplayText(text);
      return;
    }

    if (animateOn === "view" && hasAnimated) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((current) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (sequential) {
              if (index < iteration / maxIterations) return text[index];
            } else {
              if (Math.random() < iteration / (maxIterations * 2)) return text[index];
            }
            return getRandomChar(char);
          })
          .join("")
      );

      iteration++;
      if (iteration > maxIterations * (sequential ? text.length : 2)) {
        setDisplayText(text);
        setHasAnimated(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isHovered, text, speed, maxIterations, sequential, animateOn, hasAnimated]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={char === text[i] ? "" : encryptedClassName}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
