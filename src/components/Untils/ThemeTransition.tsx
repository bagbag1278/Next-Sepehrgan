// components/utils/ThemeManager.tsx
"use client";

import React, { useState, useRef, useCallback } from "react";
import { useTheme as useNextThemes } from "next-themes";
import ThemeTransition from "./ThemeTransition";

const ThemeManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme, setTheme } = useNextThemes();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<"light" | "dark" | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTransition = useCallback((newTheme: "light" | "dark") => {
    if (isTransitioning) return;
    
    setTargetTheme(newTheme);
    setIsTransitioning(true);
    setTheme(newTheme);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setTargetTheme(null);
    }, 600);
  }, [isTransitioning, setTheme]);

  const ThemeToggleButton = () => (
    <button
      onClick={() => {
        const newTheme = resolvedTheme === "dark" ? "light" : "dark";
        startTransition(newTheme);
      }}
      className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all"
    >
      {resolvedTheme === "dark" ? "🌞 حالت روشن" : "🌙 حالت تیره"}
    </button>
  );

  return (
    <>
      <ThemeTransition
        isTransitioning={isTransitioning}
        theme={targetTheme}
        animationDuration={600}
        origin={{ x: "50%", y: "50%" }}
      />
      {children}
    </>
  );
};

export default ThemeManager;