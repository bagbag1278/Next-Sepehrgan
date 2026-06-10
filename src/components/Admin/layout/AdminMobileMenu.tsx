"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import HeaderIcon1Mini from "@/components/header/Icon/HeaderIcon1Mini";
import HeaderIcon2Mini from "@/components/header/Icon/HeaderIcon2Mini";

interface AdminMobileMenuProps {
  MenuItems: any[];
  handleLogoutClick: () => void;
}

export const AdminMobileMenu = ({ MenuItems, handleLogoutClick }: AdminMobileMenuProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut size={20} />
                  <span className="text-sm font-medium">خروج</span>
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};