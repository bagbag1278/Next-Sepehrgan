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
  Share2,
  FileText,
} from "lucide-react";
import HeaderIcon1Mini from "@/components/header/Icon/HeaderIcon1Mini";
import HeaderIcon2Mini from "@/components/header/Icon/HeaderIcon2Mini";
import RezaBakhshian from "@/app/admin/Icon/RezaBakhshian";
import MiniRezaBakhshian from "@/app/admin/Icon/MiniRezaBakhshian";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  profilePicture: string | null;
}

interface AdminSidebarProps {
  userData: UserData | null;
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
  { id: 9, icon: Share2, label: "لینک‌های اجتماعی", href: "/admin/SocialLink" },  
  { id: 10, icon: FileText, label: "مدیریت وبلاگ", href: "/admin/AdminBlog" },
];

export const AdminSidebar = ({
  userData,
  profileAside,
  setProfileAside,
  handleLogoutClick,
  formatPhoneNumber,
}: AdminSidebarProps) => {
  const pathname = usePathname();

  const toggleProfile = () => {
    setProfileAside(!profileAside);
  };

  return (
    <aside className="row-span-2 min-h-screen top-6 rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10 bg-white dark:bg-[#060425] p-4 flex flex-col">
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
      <div className="relative mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center w-full">
          <div className="flex justify-center w-full mb-2">
            <div
              className="flex flex-col justify-center bg-[#0886ca32] dark:bg-[#0886ca15] w-[202px] h-[160px] rounded-2xl cursor-pointer"
              onClick={toggleProfile}
            >
              <div className="w-full justify-center flex">
                <div className="items-center w-[64px] h-[64px] mb-10 flex justify-center border-4 border-[#05ED6A80] rounded-full">
                  <RezaBakhshian />
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 absolute ml-17 mt-23 ${
                    profileAside ? "rotate-180" : ""
                  } text-[#005EA4] dark:text-[#005EA4] cursor-pointer`}
                />
                <div className="flex justify-center w-full flex-col absolute mt-17 pointer-events-none">
                  <p className="text-[12px] font-normal flex justify-center items-center text-gray-500 dark:text-gray-400">
                    {userData?.role === "admin" ? "ادمین سیستم" : "کاربر"}
                  </p>
                  <h1 className="text-[18px] text-blue-600 dark:text-blue-300 flex justify-center items-center font-bold">
                    {userData?.name || "کاربر"}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {profileAside && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setProfileAside(false)} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[200px] bg-[#F5F5F5] dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#05ED6A80] flex items-center justify-center overflow-hidden">
                  <MiniRezaBakhshian />
                </div>
                <div>
                  <p className="font-medium text-sm text-[#060425] dark:text-white">{userData?.name || "کاربر"}</p>
                  <p className="text-[11px] text-gray-500">{formatPhoneNumber(userData?.phone || "")}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogoutClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-600 py-2 transition-colors"
                >
                  <LogOut size={16} />
                  خروج از حساب
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};