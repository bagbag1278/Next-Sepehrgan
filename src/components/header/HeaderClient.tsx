"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, Home, Search, FileText, Phone } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";
import NavDesktop from "./components/NavDesktop";
import ThemeToggle from "./components/ThemeToggle";
import UserDropdown from "./components/UserDropdown";
import AuthButtons from "./components/AuthButtons";
import MobileSidebar from "./components/MobileSidebar";
import Logo from "./components/Logo";

const HeaderClient = () => {
  const t = useTranslations("Header");
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  const nav = [
    { title: t("home"), href: "/", icon: <Home size={20} /> },
    { title: t("quickReserve"), href: "/housereserve", icon: <Search size={20} /> },
    { title: t("mortgage"), href: "/houserent", icon: <FileText size={20} /> },
    { title: t("blog"), href: "/blog", icon: <FileText size={20} /> },
    { title: t("aboutUs"), href: "/contactus", icon: <Phone size={20} /> },
  ];

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("accessToken");
      const userStr = localStorage.getItem("user");
      
      if (token && userStr) {
        const user = JSON.parse(userStr);
        setUserRole(user.role);
        const name = user.fullName || [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email?.split("@")[0] || "کاربر";
        setUserName(name);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
        setUserName("");
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      <div className="w-full items-center flex justify-center">
        <div dir="rtl" className="flex justify-between w-full max-w-400  mt-6 dark:text-white px-4 lg:px-8 gap-35 max-[780]:gap-0 max-[1224]:gap-8">
          <NavDesktop nav={nav} />
          <Logo />
          <div className="hidden lg:flex items-center gap-4 z-50">
            <div className="relative"><LanguageSwitcher /></div>
            <ThemeToggle />
            {isLoggedIn ? (
              <UserDropdown userName={userName} userRole={userRole} onLogout={handleLogout} />
            ) : (
              <AuthButtons />
            )}
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all relative right-5">
            <Menu size={24} />
          </button>
        </div>
      </div>
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userRole={userRole}
        nav={nav}
        onLogout={handleLogout}
      />
    </>
  );
};

export default HeaderClient;
