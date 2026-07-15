"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme as useNextThemes } from "next-themes";
import ThemeTransition from "../utils/ThemeTransition";
const ThemeManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme: nextTheme, resolvedTheme, setTheme } = useNextThemes();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentThemeForOverlay = resolvedTheme || nextTheme || "light";

  const startTransition = (newTheme: "light" | "dark") => {
    setIsTransitioning(true);
    setTheme(newTheme);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <>
      <ThemeTransition
        isTransitioning={isTransitioning}
        theme={currentThemeForOverlay as "light" | "dark"}
        animationDuration={600}
        origin={{ x: "0%", y: "0%" }}
      />
      {children}
    </>
  );
};

export default ThemeManager;