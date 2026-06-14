"use client";
import Link from "next/link";
import { User, LogOut, ChevronDown, Shield, Store, User as UserIcon } from "lucide-react";
import { useState } from "react";

interface UserDropdownProps {
  userName: string;
  userRole: string | null;
  onLogout: () => void;
}

const UserDropdown = ({ userName, userRole, onLogout }: UserDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getDashboardPath = () => {
    switch (userRole) {
      case "admin":
        return "/admin";
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

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
      >
        <div className="relative z-40 overflow-hidden shadow-[8px_0px_20px_rgba(8,135,202,0.30)] w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <ChevronDown size={16} className={`text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>
      
      {dropdownOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
          <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">
                    {userName}
                  </p>
                  <div className="flex items-center gap-1">
                    {getRoleIcon()}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getRoleLabel()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href={getDashboardPath()}
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <User size={18} className="text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {userRole === "admin" ? "پنل مدیریت" : "پنل کاربری"}
              </span>
            </Link>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-100 dark:border-gray-700"
            >
              <LogOut size={18} className="text-red-600" />
              <span className="text-sm font-medium text-red-600">خروج</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;