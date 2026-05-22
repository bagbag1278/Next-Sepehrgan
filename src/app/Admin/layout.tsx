import DashboardHeader from "@/components/Dashboard/header";
import DarkModeHero from "@/components/landing/components/HeroSction/HeroFilter/DarkModeHero";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface IChildren {
  children: ReactNode;
}

const BuyerDashLayout: FC<IChildren> = ({ children }) => {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-start py-8">
      <div className="grid grid-cols-[204px_1020px] grid-rows-[72px_1fr] gap-6">
        
        {/* Sidebar - سمت راست */}
        <aside className="row-span-2 w-51 h-170 rounded-2xl flex shadow-[0_0_8px] shadow-blue-300/30 py-6 px-3.5 bg-white dark:bg-[#060425] row-start-1 col-start-1">
          <div className="border border-gray-200 dark:border-gray-700 w-43 h-158 rounded-2xl"></div>
        </aside>

        {/* Header */}
        <header className="w-255 h-18 rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 py-5 px-6 bg-white dark:bg-[#060425] row-start-1 col-start-2">
          <div className="h-8 flex justify-between items-center">
            <DashboardHeader />
            <div className="flex items-center gap-2">
              <div className="relative cursor-pointer">
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 17 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-600 dark:text-gray-300"
                >
                  <path
                    d="M10.6553 16.5833C8.98516 17.6944 6.79424 17.6944 5.12409 16.5833M12.8906 0.75C14.0344 1.60937 14.9499 2.75625 15.5297 4.08333M2.05646 7.41667C2.05646 4.19501 4.66813 1.58333 7.8898 1.58333C11.1115 1.58333 13.7231 4.19501 13.7231 7.41667V9.56483C13.7231 10.881 14.1127 12.1677 14.8428 13.2628L14.9579 13.4355C15.1425 13.7124 14.944 14.0833 14.6112 14.0833H1.16834C0.835554 14.0833 0.637058 13.7124 0.821656 13.4355L0.936797 13.2628C1.66688 12.1677 2.05646 10.881 2.05646 9.56483V7.41667Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full dark:bg-blue-200 shadow-[0_0_2px] shadow-blue-400/20 cursor-pointer">
                <DarkModeHero />
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="w-255 rounded-tr-sm rounded-bl-sm rounded-tl-[40px] rounded-br-[40px] shadow-[0_0_8px] shadow-blue-300/15 bg-white dark:bg-[#060425] row-start-2 col-start-2">
          {children}
        </main>

      </div>
    </div>
  );
};

export default BuyerDashLayout;