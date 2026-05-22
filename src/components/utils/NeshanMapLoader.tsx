    "use client"; 

    import Script from "next/script";
    import { useEffect } from "react";

    export default function NeshanMapLoader() {
      useEffect(() => {
        // این تابع زمانی اجرا میشه که کامپوننت mount بشه و اسکریپت نشان هم بارگذاری شده باشه
        if (window.L && window.L.Api) { // چک می‌کنیم که API نشان در دسترس هست
          console.log("Neshan Maps SDK loaded successfully!");
          // اینجا می‌تونی کارهای دیگه‌ای که بعد از لود شدن SDK نیاز داری انجام بدی
        }
      }, []); // این useEffect فقط یک بار بعد از اولین رندر اجرا میشه

      return (
        <Script
          src="https://static.neshan.org/sdk/v1/neshan-maps-sdk.v1.0.3.min.js"
          strategy="beforeInteractive"
          onLoad={() => console.log("Neshan Maps SDK script tag loaded")} // این فقط نشون میده خود تگ script لود شده
        />
      );
    }
