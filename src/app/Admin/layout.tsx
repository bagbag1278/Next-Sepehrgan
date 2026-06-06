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
  User,
  Phone,
  Wallet,
  ChevronDown,
  Mail,
  AlertTriangle,
} from "lucide-react";
import HeaderIcon1Mini from "@/components/header/Icon/HeaderIcon1Mini";
import HeaderIcon2Mini from "@/components/header/Icon/HeaderIcon2Mini";
import RezaBakhshian from "./Icon/RezaBakhshian";
import MiniRezaBakhshian from "./Icon/MiniRezaBakhshian";
import toast from "react-hot-toast";

interface IChildren {
  children: ReactNode;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  exp?: number;
}

const LogoutModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertTriangle size={32} className="text-red-300" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">
            خروج از حساب
          </h3>
          
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            آیا از خروج خود اطمینان دارید؟ برای ورود مجدد باید اطلاعات خود را وارد کنید.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all font-medium"
            >
              خروج
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-medium"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminLayout: FC<IChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileAside, setProfileAside] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const decodeJWT = (token: string): UserData | null => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      
      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      const parsed = JSON.parse(decoded);
      
      return {
        id: parsed.id || parsed.userId || parsed.sub,
        name: parsed.name || parsed.fullName || parsed.username || "ادمین",
        email: parsed.email || "",
        phone: parsed.phone || parsed.mobile || parsed.phoneNumber || "",
        role: parsed.role || parsed.userRole || "admin",
        exp: parsed.exp,
      };
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const isTokenExpired = (token: string): boolean => {
    try {
      const userData = decodeJWT(token);
      if (!userData || !userData.exp) return true;
      
      const currentTime = Math.floor(Date.now() / 1000);
      return userData.exp < currentTime;
    } catch {
      return true;
    }
  };

  const getUserInfo = () => {
    try {
      const token = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");
      
      if (!token) {
        router.push("/login");
        return null;
      }
      
      if (isTokenExpired(token)) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        toast.error("نشست شما منقضی شده است. لطفا دوباره وارد شوید.");
        router.push("/login");
        return null;
      }
      
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed.name || parsed.phone) {
            return parsed;
          }
        } catch (e) {
          console.error("Error parsing stored user:", e);
        }
      }
      
      const decodedUser = decodeJWT(token);
      if (decodedUser) {
        localStorage.setItem("user", JSON.stringify(decodedUser));
        return decodedUser;
      }
      
      return null;
    } catch (error) {
      console.error("Error getting user info:", error);
      return null;
    }
  };

  const fetchUserFromAPI = async (userId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";
      
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        const user = result.data || result;
        const fullUserData = {
          id: user.id,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email?.split("@")[0] || "ادمین",
          email: user.email || "",
          phone: user.mobile || user.phone || "",
          role: user.role || "admin",
        };
        
        localStorage.setItem("user", JSON.stringify(fullUserData));
        setUserData(fullUserData);
        return fullUserData;
      }
    } catch (error) {
      console.error("Error fetching user from API:", error);
    }
    return null;
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    
    if (isTokenExpired(token)) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      toast.error("نشست شما منقضی شده است. لطفا دوباره وارد شوید.");
      router.push("/login");
      return;
    }
    
    const user = getUserInfo();
    if (user) {
      setUserData(user);
      
      if ((!user.phone || !user.name || user.name === "ادمین") && user.id) {
        fetchUserFromAPI(user.id);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const MenuItems = [
    {
      id: 1,
      icon: LayoutDashboard,
      label: "پنل ادمین",
      href: "/admin",
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
      label: "مدریت مالی",
      href: "/admin/PaymentsManagement",
    },
    {
      id: 7,
      icon: MessageSquare,
      label: "مدیریت چت",
      href: "/admin/ChatsManagement",
    },
  ];

  const handleLinkClick = () => setSidebarOpen(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setProfileOpen(false);
    setProfileAside(false);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.success("با موفقیت خارج شدید");
    setShowLogoutModal(false);
    router.push("/login");
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "---";
    if (phone.startsWith("0") && phone.length === 11) {
      return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7, 11)}`;
    }
    return phone;
  };

  return (
    <div dir="rtl" className="min-h-screen  p-6">
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />

      <div className="hidden lg:grid grid-cols-[280px_1fr] gap-6">
        <aside className="row-span-2 h-[680px] top-6 rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10 bg-white dark:bg-[#060425] p-4 flex flex-col">
          <div className="flex justify-center py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="dark:hidden">
              <HeaderIcon1Mini />
            </div>
            <div className="hidden dark:block">
              <HeaderIcon2Mini />
            </div>
          </div>

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
          
          <div className="relative">
            <div className="flex justify-center w-full mb-10">
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
      />
      <div className="flex justify-center w-full flex-col absolute mt-17">
        <p className="text-[12px] font-normal flex justify-center items-center text-gray-500 dark:text-gray-400">
          {userData?.role === "admin" ? "ادمین سیستم" : "کاربر"}
        </p>
        <h1
          onClick={() => setProfileAside(!profileAside)}
          className="text-[18px] text-blue-600 dark:text-blue-300 flex justify-center items-center font-bold cursor-pointer"
        >
          {userData?.name || "کاربر"}
        </h1>
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
          </div>
        </aside>

        <header className="rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 dark:shadow-blue-500/10 bg-white dark:bg-[#060425] p-4">
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
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                      <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
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

        <main className="rounded-tl-[40px] rounded-br-[40px] shadow-[0_0_8px] shadow-blue-300/15 dark:shadow-blue-500/5 bg-white dark:bg-[#060425] p-4 sm:p-6">
          {children}
        </main>
      </div>

      {/* موبایل */}
      <div className="lg:hidden">
        <header className="rounded-2xl shadow-[0_0_8px] shadow-blue-300/30 bg-white dark:bg-[#060425] p-4 mb-4">
          <div className="flex justify-between items-center">
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
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute mt-8 top-full w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
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
            <div className="dark:hidden">
              <HeaderIcon1Mini />
            </div>
            <div className="hidden dark:block">
              <HeaderIcon2Mini />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full dark:bg-blue-200 shadow-md cursor-pointer">
                <DarkModeHero />
              </div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <Menu size={22} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </header>

        <main className="rounded-tl-[40px] rounded-br-[40px] shadow-[0_0_8px] shadow-blue-300/15 bg-white dark:bg-[#060425] p-4">
          {children}
        </main>

        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-[#060425] shadow-xl z-50 overflow-y-auto animate-slide-in-right">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="dark:hidden">
                  <HeaderIcon1Mini />
                </div>
                <div className="hidden dark:block">
                  <HeaderIcon2Mini />
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
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
      </div>
    </div>
  );
};

export default AdminLayout;