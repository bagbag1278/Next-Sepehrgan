"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Dashboard/header";
import DarkModeHero from "@/components/landing/components/HeroSction/HeroFilter/DarkModeHero";
import { User, ChevronDown, Phone, Mail, Wallet, LogOut } from "lucide-react";
import RezaBakhshian from "@/app/admin/Icon/RezaBakhshian";


interface AdminHeaderProps {
  userData: any;
  handleLogoutClick: () => void;
  formatPhoneNumber: (phone: string) => string;
  MenuItems: any[];
}

export const AdminHeader = ({ userData,  MenuItems , handleLogoutClick, formatPhoneNumber }: AdminHeaderProps) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10 bg-white dark:bg-[#060425] p-4 flex-shrink-0">
      <div className="flex justify-between items-center">
        <DashboardHeader />
        <div className="flex items-center gap-3">

          <div className="flex items-center justify-center w-9 h-9 rounded-full dark:bg-blue-200 shadow-md cursor-pointer">
            <DarkModeHero />
          </div>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden">
                <User size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                } text-gray-500 dark:text-gray-400`}
              />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                  <div className="p-4 bg-indigo-700 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <RezaBakhshian />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{userData?.name || "ادمین"}</p>
                        <p className="text-xs text-blue-100">
                          {userData?.role === "admin" ? "ادمین سیستم" : "کاربر"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-sm">{formatPhoneNumber(userData?.phone || "")}</span>
                    </div>
                    {userData?.email && (
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-sm">{userData.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Wallet size={16} className="text-gray-400" />
                      <span className="text-sm font-medium">موجودی قابل برداشت</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-700" />

                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">خروج از حساب</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};