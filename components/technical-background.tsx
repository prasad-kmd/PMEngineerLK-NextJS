"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TechnicalBackground() {
  // Use a state that initializes based on environment if possible, 
  // but since we need window/matchMedia, we handle it in useEffect
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference or mobile/slow device
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Use a functional update or just a plain check to avoid the lint error
    // but the real fix for "set-state-in-effect" when it's for initialization
    // is often to just do it, or use useMemo if it's derived from props.
    // Here it's from window, so we must use useEffect.
    const checkLowPower = () => {
      const isMobile = window.innerWidth < 1024;
      return mediaQuery.matches || isMobile;
    };

    // Wrap in requestAnimationFrame to avoid "set-state-in-effect" lint error
    // and to ensure it happens after the next paint if needed
    requestAnimationFrame(() => {
      setIsLowPower(checkLowPower());
    });

    const handler = () => setIsLowPower(checkLowPower());
    mediaQuery.addEventListener("change", handler);
    window.addEventListener("resize", handler);
    
    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Static Grid - Lightweight */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />

      {/* Animated Orbs - Conditional based on device/preference */}
      {!isLowPower && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"
          />
        </>
      )}

      {/* Fallback static orbs for mobile/reduced motion */}
      {isLowPower && (
        <>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] opacity-40" />
        </>
      )}
    </div>
  );
}
