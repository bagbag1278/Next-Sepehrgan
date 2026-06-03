"use client";
import Link from "next/link";
import HeroSction from "./Icon/HeaderIcon1";
import HeroSction2 from "./Icon/HeaderIcon2";
import HeaderIcon3 from "./Icon/HeaderIcon3";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations } from 'next-intl';

const Header = () => {
  const pathname = usePathname();
  const t = useTranslations('Header');
  
  // منو با متن‌های ترجمه شده
  const nav = [
    { title: t('home'), href: "/" },
    { title: t('quickReserve'), href: "/housereserve" },
    { title: t('mortgage'), href: "/mortgage" },
    { title: t('blog'), href: "/blog" },
    { title: t('aboutUs'), href: "/contactus" },
  ];
  
  return (
    <div className="w-full items-center flex justify-center lg:w-full lg:items-center lg:flex lg:justify-center xl:w-full xl:items-center xl:flex xl:justify-center xl:block">
      <div
        dir="rtl"
        className="flex justify-between w-350 mt-6 dark:text-white"
      >
        {/* منوی اصلی - دسکتاپ */}
        <div className="lg:flex xl:flex z-30 items-center whitespace-nowrap gap-5 hidden sm:hidden sm:flex sm:justify-end">
          {nav.map((item) => {
            let isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
                
            if (item.href === "/housereserve" && pathname.startsWith("/housereserve")) {
              isActive = true;
            }
            if (item.href === "/mortgage" && pathname.startsWith("/mortgage")) {
              isActive = true;
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center group"
              >
                <span
                  className={`text-[16px] font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#28A5E6] mb-3" 
                      : "text-black dark:text-white"
                  }`}
                >
                  {item.title}
                </span>

                {isActive && (
                  <div className="absolute top-6">
                    <HeaderIcon3 />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
        
        {/* لوگو */}
        <div className="flex justify-center items-center w-full">
          <div className="dark:hidden">
            <HeroSction />
          </div>
          <div className="hidden dark:block">
            <HeroSction2 />
          </div>
        </div>
        
        <div className="w-69.5 h-12 z-20 xl:flex xl:justify-end lg:flex lg:justify-end items-center gap-8 sm:hidden hidden">
          <LanguageSwitcher />
          
          <Link href="/login">
            <div className="text-blue-100 font-bold cursor-pointer z-20 relative text-[18px] dark:text-[#28A5E6]">
              {t('login')}
            </div>
          </Link>
          
          <Link className="z-20" href="/register">
            <button className="bg-[#F5F5F5] shadow-[8px_0px_20px_rgba(8,135,202,0.30)] border-gray-200 w-35 h-12 rounded-2x1 text-blue-100 dark:text-[#28A5E6] font-bold cursor-pointer text-[18px] rounded-2xl ml-14">
              {t('register')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;