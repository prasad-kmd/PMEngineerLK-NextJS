"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animateBy?: "words" | "letters";
}

export function BlurText({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
  animateBy = "words",
}: BlurTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animateBy === "words" ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 10 },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: { duration, ease: "easeOut" },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {elements.map((el, idx) => (
        <motion.span
          key={idx}
          variants={itemVariants}
          className="inline-block"
        >
          {el === " " ? "\u00A0" : el}
          {animateBy === "words" && idx < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}
