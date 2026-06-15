"use client";

import React, { useEffect, useState } from "react";

interface ThemeTransitionProps {
  isTransitioning: boolean;
  theme: "light" | "dark" | null;
  animationDuration?: number;
  origin?: { x: string; y: string };
}

const ThemeTransition: React.FC<ThemeTransitionProps> = ({
  isTransitioning,
  theme,
  animationDuration = 600,
  origin = { x: "0%", y: "0%" },
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  if (!mounted) {
    return null;
  }

  const overlayColor = currentTheme === "dark" ? "#000000" : "#ffffff";

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: overlayColor,
    borderRadius: "50%",
    transform: isTransitioning ? "scale(200)" : "scale(0)",
    transformOrigin: `${origin.y} ${origin.x}`,
    opacity: isTransitioning ? 1 : 0,
    transition: `transform ${animationDuration}ms ease-out, opacity ${animationDuration}ms ease-out, background-color ${animationDuration}ms ease-out`,
    pointerEvents: isTransitioning ? "auto" : "none",
    zIndex: 9999,
  };

  return <div style={overlayStyle}></div>;
};

export default ThemeTransition;