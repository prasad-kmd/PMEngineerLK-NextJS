"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  duration?: number;
  className?: string;
  splitBy?: "words" | "characters" | "none";
}

export function RotatingText({
  texts,
  duration = 3000,
  className = "",
  splitBy = "none",
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, duration);
    return () => clearInterval(interval);
  }, [texts, duration]);

  const currentText = texts[index] || "";

  return (
    <span className={`inline-flex overflow-hidden vertical-align-middle ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="inline-block"
        >
          {splitBy === "none" ? (
            currentText
          ) : splitBy === "words" ? (
            currentText.split(" ").map((w, i) => (
              <span key={i} className="inline-block mr-1">
                {w}
              </span>
            ))
          ) : (
            currentText.split("").map((c, i) => (
              <span key={i} className="inline-block">
                {c === " " ? "\u00A0" : c}
              </span>
            ))
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
