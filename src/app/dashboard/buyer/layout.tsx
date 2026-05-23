import BaseImg from "@/components/Dashboard/buyer/Image";
import SideBarLinks from "@/components/Dashboard/buyer/SideBarLinks";
import Title from "@/components/Dashboard/buyer/Title";
import UserDropdown from "@/components/Dashboard/buyer/UserDropdown";
import DashboardHeader from "@/components/Dashboard/header";
import DarkModeHero from "@/components/landing/components/HeroSction/HeroFilter/DarkModeHero";
import Image from "next/image";
import { FC, ReactNode } from "react";
import { LuChevronRight } from "react-icons/lu";

interface IChildren {
  children: ReactNode;
}

const BuyerDashLayout: FC<IChildren> = ({ children }) => {
  return (
    <div className="relative grid grid-cols-[204px_1020px] grid-rows-[72px_1fr] gap-6 ">
      {/* <div className="absolute inset-y-0 -right-24 w-360 pointer-events-none">
        <BaseImg />
      </div> */}
      {/* Sidebar */}
      <aside className="row-span-2 relative z-20 w-51 h-170 rounded-2xl flex shadow-[0_0_8px] shadow-blue-300/30 py-6 px-3.5">
        <div className="w-43 h-158 flex justify-between flex-col">
          <div className="h-98.25 flex flex-col gap-6 items-center">
            {/* img */}
            <div className="w-33.25 h-10.25">
              <Image
                src={"/HeroSction/logo.png"}
                width={131}
                height={41}
                alt=""
              />
            </div>
            {/* vector */}
            <div className="w-18.5 h-5 mb-4">
              <Image
                src={"/HeroSction/vec.png"}
                width={131}
                height={41}
                alt=""
              />
            </div>
            {/* links */}
            <SideBarLinks />
          </div>
          {/*  */}
          <div className="h-52 flex flex-col gap-2">
            <div className="bg-blue-300/10 rounded-3xl h-35 py-2.5 flex flex-col items-center gap-1">
              {/* img */}
              <div className="size-16 rounded-4xl border-2 overflow-hidden border-green-200/50">
                <Image
                  src={"/FastReserve/images.jfif"}
                  width={64}
                  height={64}
                  alt=""
                />
              </div>
              <div className="w-23 h-12 flex flex-col gap-1 items-center">
                <span className="text-[12px] font-normal opacity-80">
                  خریدار
                </span>
                <UserDropdown />
              </div>
            </div>
            <div className="bg-blue-300/10 rounded-3xl h-15.5 "></div>
          </div>
        </div>
      </aside>

      {/* Header */}
      <header className="w-255 relative z-10 h-18 rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 py-5 px-6">
        <div className="h-8 flex justify-between items-center">
          <DashboardHeader />
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
      <main className="w-255 relative z-10 rounded-tr-sm rounded-bl-sm rounded-tl-[40px] rounded-br-[40px] shadow-[0_0_8px] shadow-blue-300/15">
        <div className="h-7 absolute top-4 right-6 flex gap-2 items-center">
          <Image
            src={"/FastReserve/Frame57.png"}
            width={22}
            height={8}
            alt=""
            className="rotate-180 "
          />
          <div>
            <Title />
          </div>
          <Image
            src={"/FastReserve/Frame57.png"}
            width={22}
            height={8}
            alt=""
          />
        </div>
        {children}
      </main>
    </div>
  );
};

export default BuyerDashLayout;
