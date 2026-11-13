"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, User, LogOut, Sun, Moon, Shield, Store, User as UserIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  userName: string;
  userRole: string | null;
  nav: { title: string; href: string; icon: ReactNode }[];
  onLogout: () => void;
}

const MobileSidebar = ({ isOpen, onClose, isLoggedIn, userName, userRole, nav, onLogout }: MobileSidebarProps) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const getDashboardPath = () => {
    switch (userRole) {
      case "admin":
        return "/Admin";
      case "seller":
        return "/dashboard/seller";
      default:
        return "/dashboard/buyer";
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case "admin":
        return "مدیر سیستم";
      case "seller":
        return "فروشنده";
      default:
        return "کاربر عادی";
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case "admin":
        return <Shield size={14} className="text-purple-500" />;
      case "seller":
        return <Store size={14} className="text-blue-500" />;
      default:
        return <UserIcon size={14} className="text-green-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={onClose} />
      <div className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden animate-slide-in-right overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
          <h2 className="font-bold text-lg text-gray-800 dark:text-white">منو</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            <X size={22} />
          </button>
        </div>

        <div className="p-4">
          {isLoggedIn ? (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 dark:text-white">{userName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getRoleIcon()}
                    <p className="text-xs text-blue-600 dark:text-blue-400">{getRoleLabel()}</p>
                  </div>
                </div>
              </div>
              <Link
                href={getDashboardPath()}
                onClick={onClose}
                className="mt-3 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium pt-2 border-t border-blue-200 dark:border-blue-800/50"
              >
                <User size={14} />
                <span>{userRole === "admin" ? "پنل مدیریت" : "پنل کاربری"}</span>
              </Link>
            </div>
          ) : (
            <div className="mb-6 flex flex-col gap-3">
              <Link href="/login" onClick={onClose} className="w-full py-3 text-center bg-blue-600 text-white rounded-xl font-bold">
                ورود
              </Link>
              <Link href="/register" onClick={onClose} className="w-full py-3 text-center border-2 border-blue-600 text-blue-600 rounded-xl font-bold">
                ثبت نام
              </Link>
            </div>
          )}

          <div className="space-y-1">
            {nav.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-gray-700 dark:text-gray-300">حالت تاریک</span>
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
            {isLoggedIn && (
              <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <LogOut size={20} />
                <span className="font-medium">خروج</span>
              </button>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default MobileSidebar;