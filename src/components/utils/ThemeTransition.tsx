// components/ThemeTransition.tsx
"use client"; // این کامپوننت باید client-side باشد

import React from "react";

interface ThemeTransitionProps {
  isTransitioning: boolean;
  theme: "light" | "dark" | null; // تم نهایی که صفحه به آن تغییر می‌کند
  animationDuration?: number; // مدت زمان انیمیشن بر حسب میلی‌ثانیه
  origin?: { x: string; y: string }; // نقطه شروع انیمیشن (مثلا 'top left')
}

const ThemeTransition: React.FC<ThemeTransitionProps> = ({
  isTransitioning,
  theme,
  animationDuration = 600, // پیش‌فرض 600 میلی‌ثانیه
  origin = { x: "0%", y: "0%" }, // پیش‌فرض گوشه بالا سمت چپ
}) => {
  // رنگ دایره بر اساس تم نهایی تعیین می‌شود
  // اگر داریم به دارک مود می‌رویم، دایره سیاه می‌شود. اگر به لایت، سفید.
  const overlayColor = theme === "dark" ? "#000000" : "#ffffff"; // رنگ سیاه برای دارک مود، سفید برای لایت مود

  // استایل‌ها برای افکت دایره‌ای
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: overlayColor,
    borderRadius: "50%",
    transform: isTransitioning ? "scale(200)" : "scale(0)", // بزرگ شدن از 0 به 200 (یا بیشتر)
    transformOrigin: `${origin.y} ${origin.x}`, // نقطه شروع انیمیشن
    opacity: isTransitioning ? 1 : 0, // نمایش یا عدم نمایش
    transition: `transform ${animationDuration}ms ease-out, opacity ${animationDuration}ms ease-out, background-color ${animationDuration}ms ease-out`,
    pointerEvents: isTransitioning ? "auto" : "none", // در حین انیمیشن، رویدادها را دریافت کند
    zIndex: 9999, // اطمینان از اینکه روی همه چیز قرار می‌گیرد
  };

  return <div style={overlayStyle}></div>;
};

export default ThemeTransition;
