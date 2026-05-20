"use client";

import { useEffect, useState, useRef } from "react";

type Theme = "light" | "dark";

interface UseThemeResult {
  theme: Theme | null;
  toggleTheme: () => void;
  isTransitioning: boolean; 
}

export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const themeRef = useRef<Theme | null>(null); 

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    let initialTheme: Theme;
    if (storedTheme) {
      initialTheme = storedTheme;
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      initialTheme = systemDark ? "dark" : "light";
    }

    setTheme(initialTheme);
    themeRef.current = initialTheme; 
    root.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    if (!theme) return;

    const newTheme: Theme = theme === "dark" ? "light" : "dark";

    // شروع انیمیشن
    setIsTransitioning(true);
    themeRef.current = newTheme; // تم جدید را در ref ثبت کن

    // اعمال کلاس "dark" روی documentElement (این کار را در useEffect بعدی انجام می‌دهیم)
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);

    // وقتی تم تغییر کرد (بعد از انیمیشن)، وضعیت isTransitioning را false کن
    // این کار را می‌توانیم با یک setTimeout بر اساس مدت زمان انیمیشن CSS انجام دهیم
    // یا با گوش دادن به رویداد end انیمیشن CSS
  };

  // مدیریت اعمال کلاس dark و پایان انیمیشن
  useEffect(() => {
    const root = document.documentElement;
    const currentThemeIsDark = themeRef.current === "dark";

    // اعمال کلاس dark/light بر اساس تم فعلی (که در ref ذخیره شده)
    root.classList.toggle("dark", currentThemeIsDark);


    if (isTransitioning) {
     
      const animationDuration = 600;
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, animationDuration);

      return () => clearTimeout(timer); // پاکسازی تایمر در صورت unmount شدن کامپوننت
    }
  }, [isTransitioning, theme]); // وقتی isTransitioning یا theme تغییر می‌کند، این useEffect اجرا شود

  return { theme, toggleTheme, isTransitioning };
}
