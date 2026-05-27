"use client";

import DashboardHeader from "@/components/Dashboard/header";
import DarkModeHero from "@/components/landing/components/HeroSction/HeroFilter/DarkModeHero";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, ReactNode, useEffect, useState } from "react";

import {
  LayoutDashboard,
  Hotel,
  Users,
  CalendarCheck,
  TicketPercent,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// import HeaderIcon1Mini from "@/components/header/Icon/HeaderIcon1Mini";
// import HeaderIcon2Mini from "@/components/header/Icon/HeaderIcon2Mini"; رهن کده

interface IChildren {
  children: ReactNode;
}

const AdminLayout: FC<IChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const MenuItems = [
    {
      id: 1,
      icon: LayoutDashboard,
      label: "پنل ادمین",
      href: "/admin/PanelAdmin",
    },
    {
      id: 2,
      icon: Hotel,
      label: "مدیریت هتل‌ها",
      href: "/admin/HotelsManagement",
    },
    {
      id: 3,
      icon: Users,
      label: "مدیریت کاربران",
      href: "/admin/UsersManagment",
    },
    {
      id: 4,
      icon: CalendarCheck,
      label: "مدیریت رزروها",
      href: "/admin/BookingsManagement",
    },
    {
      id: 5,
      icon: MessageSquare,
      label: "مدیریت نظرات",
      href: "/admin/CommentsManagement",
    },
    {
      id: 6,
      icon: TicketPercent,
      label: "تخفیف‌ها",
      href: "/admin/discounts",
    },
    {
      id: 7,
      icon: FileText,
      label: "مقالات",
      href: "/admin/blogs",
    },
    {
      id: 8,
      icon: Settings,
      label: "تنظیمات",
      href: "/admin/settings",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6"
    >
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="row-span-2 h-[calc(100vh-3rem)] rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10 bg-white dark:bg-[#060425] p-4 overflow-y-auto">
          <div className="flex justify-center py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="dark:hidden">
              {/* <HeaderIcon1Mini /> */}
            </div>

            <div className="hidden dark:block">
              {/* <HeaderIcon2Mini /> */}
            </div>
          </div>

          <nav className="mt-4 space-y-1">
            {MenuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    }`}
                >
                  <item.icon size={20} />

                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={logoutHandler}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                <LogOut size={20} />

                <span className="text-sm font-medium">خروج</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Header */}
        <header className="rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10 bg-white dark:bg-[#060425] p-4">
          <div className="flex justify-between items-center">
            <DashboardHeader />

            <div className="flex items-center gap-3">
              {/* Notification */}
              <div className="relative cursor-pointer">
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 17 19"
                  fill="none"
                  className="text-gray-600 dark:text-gray-300"
                >
                  <path
                    d="M10.6553 16.5833C8.98516 17.6944 6.79424 17.6944 5.12409 16.5833M12.8906 0.75C14.0344 1.60937 14.9499 2.75625 15.5297 4.08333M2.05646 7.41667C2.05646 4.19501 4.66813 1.58333 7.8898 1.58333C11.1115 1.58333 13.7231 4.19501 13.7231 7.41667V9.56483C13.7231 10.881 14.1127 12.1677 14.8428 13.2628L14.9579 13.4355C15.1425 13.7124 14.944 14.0833 14.6112 14.0833H1.16834C0.835554 14.0833 0.637058 13.7124 0.821656 13.4355L0.936797 13.2628C1.66688 12.1677 2.05646 10.881 2.05646 9.56483V7.41667Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                  3
                </span>
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-center w-9 h-9 rounded-full dark:bg-blue-200 shadow-md cursor-pointer">
                <DarkModeHero />
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="rounded-tl-[40px] rounded-br-[40px] shadow-[0_0_8px] shadow-blue-300/15 dark:shadow-blue-500/5 bg-white dark:bg-[#060425] p-4 sm:p-6">
          {children}
        </main>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <header className="rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 bg-white dark:bg-[#060425] p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="dark:hidden">
              {/* <HeaderIcon1Mini /> */}
            </div>

            <div className="hidden dark:block">
              {/* <HeaderIcon2Mini /> */}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full dark:bg-blue-200 shadow-md cursor-pointer">
                <DarkModeHero />
              </div>

              <button
                onClick={() => setSidebarOpen(true)}
                className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <Menu
                  size={22}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>
            </div>
          </div>
        </header>

        <main className="rounded-tl-[40px] rounded-br-[40px] shadow-[0_0_8px] shadow-blue-300/15 bg-white dark:bg-[#060425] p-4">
          {children}
        </main>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />

            <div className="fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-[#060425] shadow-xl z-50 overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="dark:hidden">
                  {/* <HeaderIcon1Mini /> */}
                </div>

                <div className="hidden dark:block">
                  {/* <HeaderIcon2Mini /> */}
                </div>

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X
                    size={20}
                    className="text-gray-600 dark:text-gray-400"
                  />
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
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        }`}
                    >
                      <item.icon size={20} />

                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut size={20} />

                    <span className="text-sm font-medium">
                      خروج
                    </span>
                  </button>
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLayout;