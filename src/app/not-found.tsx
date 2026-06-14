"use client";
import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen  flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#0887CA_1px,transparent_1px)] bg-[length:40px_40px] opacity-10" />
      
      <div className="text-center z-10">
        <div className="mb-8 animate-bounce">
          <span className="text-[160px] font-black text-[#0887CA]/10">404</span>
        </div>
        <h2 className="text-4xl font-bold mb-6">چیزی پیدا نشد!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10">خانه‌تون کجاست؟ بیا کمکتون کنیم پیداش کنیم.</p>

        <div className="flex gap-4 justify-center">
          <Link href="/" className="bg-[#0887CA] text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-medium">
            <Home /> خانه
          </Link>
          <Link href="/search" className="border border-[#0887CA] text-[#0887CA] px-8 py-4 rounded-2xl flex items-center gap-3 font-medium hover:bg-[#0887CA]/5">
            <Search /> جستجوی ملک
          </Link>
        </div>
      </div>
    </div>
  );
}