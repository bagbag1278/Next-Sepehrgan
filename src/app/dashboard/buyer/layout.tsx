import Notif from "@/components/Dashboard/buyer/icon/NotifSVG";
import BaseImg from "@/components/Dashboard/buyer/Image";
import PocketDropdown from "@/components/Dashboard/buyer/PocketDropdown";
import SideBarLinks from "@/components/Dashboard/buyer/SideBarLinks";
import Title from "@/components/Dashboard/buyer/Title";
import UserDropdown from "@/components/Dashboard/buyer/UserDropdown";
import DashboardHeader from "@/components/Dashboard/header";
import UserInfo from "@/components/Dashboard/UserInfo";
import HeroSction from "@/components/header/Icon/HeaderIcon1";
import HeroSction2 from "@/components/header/Icon/HeaderIcon2";
import DarkModeHero from "@/components/landing/components/HeroSction/HeroFilter/DarkModeHero";
import { getUserInfo } from "@/core/token/auth";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { LuBell } from "react-icons/lu";

interface IChildren {
  children: ReactNode;
}

const BuyerDashLayout: FC<IChildren> = async ({ children }) => {
  const user = await getUserInfo();
  return (
    <div className=" grid grid-cols-[204px_1020px] grid-rows-[72px_1fr] gap-6 ">
      {/* <div className="absolute inset-y-0 right-0 w-360 pointer-events-none">
        <BaseImg />
      </div> */}
      {/* Sidebar */}
      <aside className="row-span-2 relative z-10 w-51 h-170 rounded-2xl dark:bg-slate-900 flex shadow-[0_0_8px] shadow-blue-300/30 py-6 px-3.5">
        <div className="w-43 h-158 flex justify-between flex-col">
          <div className="h-98.25 flex flex-col justify-center gap-6 items-center">
            {/* img */}
            <div className="w-33.25 h-10.25 ml-6">
          <div className="dark:hidden">
            <HeroSction />
          </div>

          <div className="hidden dark:block">
            <HeroSction2 />
          </div>
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
                <UserInfo />
              </div>
            </div>
            <div className="bg-blue-300/10 rounded-3xl h-15.5 flex items-center justify-center gap-1">
              <Notif />
              <PocketDropdown />
            </div>
          </div>
        </div>
      </aside>

      {/* Header */}
      <header className="w-255 relative dark:bg-slate-900 h-18 rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 py-5 px-6">
        <div className="h-8 flex justify-between items-center">
          <DashboardHeader />
          <div dir="ltr" className="h-8 flex gap-2 items-center">
            <div className=" flex items-center justify-center size-8 rounded-full dark:bg-blue-200 shadow-[0_0_2px] shadow-blue-400/20 cursor-pointer">
              <DarkModeHero />
            </div>
            <Link href={"/dashboard/buyer/notification"}>
            <LuBell size={24} className="dark:text-white"/></Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="w-255 relative dark:bg-slate-900 rounded-tr-sm rounded-bl-sm rounded-tl-[40px] rounded-br-[40px] shadow-[0_0_8px] shadow-blue-300/15">
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
