"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, User, ChevronDown, Phone, Mail, Wallet } from "lucide-react";
import { useState } from "react";
import HeaderIcon1Mini from "@/components/header/Icon/HeaderIcon1Mini";
import HeaderIcon2Mini from "@/components/header/Icon/HeaderIcon2Mini";
import RezaBakhshian from "@/app/admin/Icon/RezaBakhshian";

interface AdminMobileMenuProps {
  MenuItems: any[];
  handleLogoutClick: () => void;
  userData?: any;
  formatPhoneNumber?: (phone: string) => string;
}

export const AdminMobileMenu = ({ 
  MenuItems, 
  handleLogoutClick, 
  userData, 
  formatPhoneNumber 
}: AdminMobileMenuProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setSidebarOpen(true)}
        className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md"
      >
        <Menu size={22} className="text-gray-700 dark:text-gray-300" />
      </button>

      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-[#060425] shadow-xl z-50 overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="dark:hidden"><HeaderIcon1Mini /></div>
              <div className="hidden dark:block"><HeaderIcon2Mini /></div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {userData && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <User size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm dark:text-white">{userData?.name || "ادمین"}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {userData?.role === "admin" ? "ادمین سیستم" : "کاربر"}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    } text-gray-500`}
                  />
                </button>

                {profileOpen && (
                  <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl space-y-3">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Phone size={14} className="text-gray-400" />
                      <span className="text-xs">
                        {formatPhoneNumber ? formatPhoneNumber(userData?.phone || "") : userData?.phone || "---"}
                      </span>
                    </div>
                    {userData?.email && (
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Mail size={14} className="text-gray-400" />
                        <span className="text-xs break-all">{userData.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Wallet size={14} className="text-gray-400" />
                      <span className="text-xs font-medium">موجودی: ۰ تومان</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <nav className="p-4 space-y-1">
              {MenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <LogOut size={20} />
                  <span className="text-sm font-medium">خروج از حساب</span>
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};