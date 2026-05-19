    // components/ThemeManager.tsx
    "use client";

    import React, { useState, useRef, useEffect } from "react";
    import { useTheme as useNextThemes } from "next-themes"; // تغییر نام برای جلوگیری از تداخل
    import ThemeTransition from "./ThemeTransition"; // کامپوننت Overlay

    // const animationDuration = 600; // ms - مدت زمان انیمیشن CSS

    const ThemeManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const { theme: nextTheme, resolvedTheme, setTheme } = useNextThemes();
      const [isTransitioning, setIsTransitioning] = useState(false);
      const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

      // تم فعلی که برای تعیین رنگ دایره استفاده می‌شود
      // در ابتدا ممکن است resolvedTheme هنوز تنظیم نشده باشد، پس از nextTheme استفاده می‌کنیم
      const currentThemeForOverlay = resolvedTheme || nextTheme || "light"; // پیش‌فرض light

      // تابع برای شروع انیمیشن
      const startTransition = (newTheme: "light" | "dark") => {
        // 1. وضعیت انیمیشن را فعال کن
        setIsTransitioning(true);
        // 2. تم جدید را برای next-themes تنظیم کن (این باعث تغییر کلاس dark/light در <html> می‌شود)
        setTheme(newTheme);

        // 3. پاک کردن تایمر قبلی اگر وجود داشت (برای جلوگیری از تداخل تایمرها)
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }

        // 4. تنظیم تایمر برای پایان انیمیشن
        // این تایمر باید همزمان با پایان انیمیشن CSS اجرا شود
        animationTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false); // وضعیت انیمیشن را غیرفعال کن
        }, 600); // باید با animationDuration در ThemeTransition یکی باشد
      };

     
      const ThemeToggleButton = () => (
        <button
          onClick={() => {
            
            const newTheme = resolvedTheme === "dark" ? "light" : "dark";
            startTransition(newTheme);
          }}
          
          className="p-2 rounded-md bg-purple-500 text-white fixed top-4 left-4 z-40"
          disabled={isTransitioning} // غیرفعال کردن دکمه در حین انیمیشن
        >
          {resolvedTheme === "dark" ? "حالت روشن" : "حالت تیره"}
        </button>
      );

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
