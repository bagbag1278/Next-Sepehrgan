import DarkModeHero from "@/components/landing/components/HeroSction/HeroFilter/DarkModeHero";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface IChildren {
  children: ReactNode;
}

const BuyerDashLayout: FC<IChildren> = ({ children }) => {
  return (
    <div className="grid grid-cols-[204px_1020px] grid-rows-[72px_1fr] gap-6 ">
      {/* Sidebar */}
      <aside className="row-span-2 w-51 h-170 rounded-2xl flex shadow-[0_0_8px] shadow-blue-300/30 py-6 px-3.5">
        <div className="border border-black w-43 h-158"></div>
      </aside>

      {/* Header */}
      <header className="w-255 h-18 rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 py-5 px-6">
        <div className="h-8 flex justify-between items-center">
          <div className="h-6.25 flex gap-6 text-[15px]">
            <Link
              href={"/"}
              className="hover:text-blue-200 hover:font-bold transition-all duration-150"
            >
              صفحه اصلی
            </Link>
            <Link
              href={"/housereserve"}
              className="hover:text-blue-200 hover:font-bold transition-all duration-150"
            >
              رزرو سریع
            </Link>
            <Link
              href={"/mortgage"}
              className="hover:text-blue-200 hover:font-bold transition-all duration-150"
            >
              رهن و اجاره
            </Link>
            <Link
              href={"/blog"}
              className="hover:text-blue-200 hover:font-bold transition-all duration-150"
            >
              وبلاگ
            </Link>
            <Link
              href={"/contactus"}
              className="hover:text-blue-200 hover:font-bold transition-all duration-150"
            >
              درباره ما
            </Link>
          </div>
          <div dir="ltr" className="h-8 w-15 flex gap-2 items-center">
            <div className=" flex items-center justify-center size-8 rounded-full dark:bg-blue-200 shadow-[0_0_2px] shadow-blue-400/20 cursor-pointer">
              <DarkModeHero />
            </div>
            <svg
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6553 16.5833C8.98516 17.6944 6.79424 17.6944 5.12409 16.5833M12.8906 0.75C14.0344 1.60937 14.9499 2.75625 15.5297 4.08333M2.05646 7.41667C2.05646 4.19501 4.66813 1.58333 7.8898 1.58333C11.1115 1.58333 13.7231 4.19501 13.7231 7.41667V9.56483C13.7231 10.881 14.1127 12.1677 14.8428 13.2628L14.9579 13.4355C15.1425 13.7124 14.944 14.0833 14.6112 14.0833H1.16834C0.835554 14.0833 0.637058 13.7124 0.821656 13.4355L0.936797 13.2628C1.66688 12.1677 2.05646 10.881 2.05646 9.56483V7.41667Z"
                stroke="#060425"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="w-255 rounded-tr-sm rounded-bl-sm rounded-tl-[40px] rounded-br-[40px] shadow-[0_0_8px] shadow-blue-300/15">
        {children}
      </main>
    </div>
  );
};

export default BuyerDashLayout;
