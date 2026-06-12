"use client";

import React, { FC, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, LayoutDashboard, Hotel, Users, CalendarCheck, TicketPercent, MessageSquare, MessageCircleMore, Bell, Share2, FileText } from "lucide-react";
import toast from "react-hot-toast";

import DarkModeHero from "@/components/landing/components/HeroSction/HeroFilter/DarkModeHero";
import HeaderIcon1Mini from "@/components/header/Icon/HeaderIcon1Mini";
import HeaderIcon2Mini from "@/components/header/Icon/HeaderIcon2Mini";
import { AdminHeader } from "@/components/Admin/layout/AdminHeader";
import { AdminMobileMenu } from "@/components/Admin/layout/AdminMobileMenu";
import { AdminSidebar } from "@/components/Admin/layout/AdminSidebar";

interface IChildren {
  children: ReactNode;
  userData: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    profilePicture: string | null;
  } | null;
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

const LogoutModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertTriangle size={32} className="text-red-500" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">خروج از حساب</h3>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">آیا از خروج خود اطمینان دارید؟</p>
          <div className="flex gap-3">
            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all font-medium">خروج</button>
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-medium">انصراف</button>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminLayoutClient: FC<IChildren> = ({ children, userData }) => {
  const router = useRouter();
  const [profileAside, setProfileAside] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleLogoutConfirm = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    toast.success("با موفقیت خارج شدید");
    setShowLogoutModal(false);
    router.push("/login");
  };
  const handleLogoutCancel = () => setShowLogoutModal(false);

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "---";
    if (phone.startsWith("0") && phone.length === 11) {
      return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7, 11)}`;
    }
    return phone;
  };

  return (
    <div dir="rtl" className="bg-gray-100 dark:bg-gray-900">
      <LogoutModal isOpen={showLogoutModal} onClose={handleLogoutCancel} onConfirm={handleLogoutConfirm} />

      {/* دسکتاپ */}
      <div className="hidden lg:block w-full max-w-[1600px] mx-auto h-screen">
        <div className="flex gap-6 h-full">
          <div className="w-[280px] flex-shrink-0 h-full overflow-y-auto scrollbar-none">
            <AdminSidebar
              userData={userData}
              profileAside={profileAside}
              setProfileAside={setProfileAside}
              handleLogoutClick={handleLogoutClick}
              formatPhoneNumber={formatPhoneNumber}
            />
          </div>

          <div className="flex-1 flex flex-col h-full">
            <AdminHeader userData={userData} handleLogoutClick={handleLogoutClick} formatPhoneNumber={formatPhoneNumber} />
            <main className="flex-1 mt-4 rounded-tl-[40px] rounded-br-[40px] bg-white dark:bg-[#060425] p-6 shadow-[0_0_8px] shadow-blue-300/15 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {children}
            </main>
          </div>
        </div>
      </div>

      {/* موبایل */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center mb-4 px-4">
          <div className="dark:hidden"><HeaderIcon1Mini /></div>
          <div className="hidden dark:block"><HeaderIcon2Mini /></div>
          <div className="flex items-center gap-3">
            <DarkModeHero />
            <AdminMobileMenu MenuItems={MenuItems} handleLogoutClick={handleLogoutClick} />
          </div>
        </div>
        <main className="rounded-tl-[40px] rounded-br-[40px] bg-white dark:bg-[#060425] p-4 mx-4 shadow-[0_0_8px] shadow-blue-300/15">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayoutClient;