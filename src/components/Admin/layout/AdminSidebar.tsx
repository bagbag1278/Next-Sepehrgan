"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Hotel,
  Users,
  CalendarCheck,
  TicketPercent,
  MessageSquare,
  MessageCircleMore,
  Bell,
  LogOut,
  ChevronDown,
  Wallet,
} from "lucide-react";
import HeaderIcon1Mini from "@/components/header/Icon/HeaderIcon1Mini";
import HeaderIcon2Mini from "@/components/header/Icon/HeaderIcon2Mini";
import RezaBakhshian from "@/app/admin/Icon/RezaBakhshian";
import MiniRezaBakhshian from "@/app/admin/Icon/MiniRezaBakhshian";


interface AdminSidebarProps {
  userData: any;
  profileAside: boolean;
  setProfileAside: (value: boolean) => void;
  handleLogoutClick: () => void;
  formatPhoneNumber: (phone: string) => string;
}

const MenuItems = [
  { id: 1, icon: LayoutDashboard, label: "پنل ادمین", href: "/admin" },
  { id: 2, icon: Hotel, label: "مدیریت هتل‌ها", href: "/admin/HotelsManagement" },
  { id: 3, icon: Users, label: "مدیریت کاربران", href: "/admin/UsersManagment" },
  { id: 4, icon: CalendarCheck, label: "مدیریت رزروها", href: "/admin/BookingsManagement" },
  { id: 5, icon: MessageSquare, label: "مدیریت نظرات", href: "/admin/CommentsManagement" },
  { id: 6, icon: TicketPercent, label: "مدریت مالی", href: "/admin/PaymentsManagement" },
  { id: 7, icon: MessageCircleMore, label: "مدیریت چت", href: "/admin/ChatsManagement" },
  { id: 8, icon: Bell, label: "مدیریت اعلان ها", href: "/admin/AdminNotifications" },
];

export const AdminSidebar = ({
  userData,
  profileAside,
  setProfileAside,
  handleLogoutClick,
  formatPhoneNumber,
}: AdminSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="row-span-2 h-[680px] top-6 rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10 bg-white dark:bg-[#060425] p-4 flex flex-col">
      {/* لوگو */}
      <div className="flex justify-center py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="dark:hidden"><HeaderIcon1Mini /></div>
        <div className="hidden dark:block"><HeaderIcon2Mini /></div>
      </div>

      {/* منو */}
      <nav className="mt-4 space-y-1 flex-1">
        {MenuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* پروفایل سایدبار */}
      <div className="relative">
        <div className="flex justify-center w-full mb-2">
          <div className="flex flex-col justify-center bg-[#0886ca32] dark:bg-[#0886ca15] w-[202px] h-[160px] rounded-2xl">
            <div className="w-full justify-center flex">
              <div className="items-center w-[64px] h-[64px] mb-10 flex justify-center border-4 border-[#05ED6A80] rounded-full">
                <RezaBakhshian />
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 absolute ml-17 mt-23 ${
                  profileAside ? "rotate-180" : ""
                } text-[#005EA4] dark:text-[#005EA4]`}
                onClick={() => setProfileAside(!profileAside)}
              />
              <div className="flex justify-center w-full flex-col absolute mt-17">
                <p className="text-[12px] font-normal flex justify-center items-center text-gray-500 dark:text-gray-400">
                  {userData?.role === "admin" ? "ادمین سیستم" : "کاربر"}
                </p>
                <h1 className="text-[18px] text-blue-600 dark:text-blue-300 flex justify-center items-center font-bold cursor-pointer">
                  {userData?.name || "کاربر"}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {profileAside && (
          <div className="w-[200px] h-[130px] absolute top-43 flex flex-col rounded-2xl bg-[#F5F5F5] dark:bg-gray-800 shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10">
            <div className="pr-4 pt-2 relative">
              <div className="items-center w-[48px] h-[47px] border-4 border-[#05ED6A80] rounded-full">
                <MiniRezaBakhshian />
              </div>
              <div className="mr-14 bottom-0 absolute">
                <p className="font-medium text-[16px] text-[#060425] dark:text-white ml-7">
                  {userData?.name || "کاربر"}
                </p>
                <p className="text-[12px] font-normal text-gray-400 dark:text-gray-500">
                  {formatPhoneNumber(userData?.phone || "")}
                </p>
              </div>
              <div className="absolute mt-2 mr-8 flex flex-col gap-2">
                <p className="text-[14px] text-[#060425] dark:text-gray-300">
                  موجودی قابل برداشت
                  <Wallet className="absolute left-35 bottom-8" size={18} />
                </p>
                <div className="relative left-5">
                  <button
                    onClick={handleLogoutClick}
                    className="text-[14px] text-[#060425] dark:text-gray-300 items-start hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    <div className="relative right-5">خروج از حساب</div>
                    <LogOut className="absolute bottom-0 right-0" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};