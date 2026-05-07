/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-6 h-6" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className=""
    >
      {resolvedTheme === "dark" ? (
        <Image className="" src={"/auth/light.png"} width={20} height={20} alt="light  " />
      ) : (
        <Image className=" "  src={"/auth/DarkMode.png"} width={20} height={20} alt="dark" />
      )}
    </button>
  );
}
