"use client";
import HeroSction from "./Icon/HeaderIcon1";
import HeroSction2 from "./Icon/HeaderIcon2";
import HeaderIcon3 from "./Icon/HeaderIcon3";
import { usePathname } from "next/navigation";
import Link from "next/link";

const nav = [
  { title: "صفحه اصلی", href: "/" },
  { title: "رزرو سریع", href: "/reserve" },
  { title: " رهن اجاره", href: "/mortgage" },
  { title: "وبلاگ", href: "/blog" },
  { title: "درباره ما", href: "/about" },
];

const Header = () => {
  const pathname = usePathname();
  // max-w-[1300px] m-auto
  return (
    <div className="  w-full items-center flex justify-center m-auto  sm:w-[600px]  sm:flex sm:justify-center sm:self-center lg:w-full lg:items-center lg:flex lg:justify-center xl:w-full xl:items-center xl:flex xl:justify-center lg:block xl:block">
      <div className=""></div>
      <div
        dir="rtl"
        className="flex justify-between  w-350  mt-[24px] dark:text-white"
      >
        <div className="lg:flex xl:flex  items-center  whitespace-nowrap gap-5 hidden sm:hidden sm:flex sm:justify-end">
          {nav.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center "
              >
                <span
                  className={`text-[16px] font-medium transition-all ${
                    isActive
                      ? "text-blue-300 mb-3"
                      : "text-black dark:text-white"
                  }`}
                >
                  {item.title}
                </span>

                {isActive && (
                  <div className="absolute top-5 ">
                    <HeaderIcon3 />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="dark:hidden">
            <HeroSction />
          </div>

          <div className="hidden dark:block">
            <HeroSction2 />
          </div>
        </div>

        <div className="w-[278px] h-[48px]  xl:flex xl:justify-end lg:flex lg:justify-end items-center gap-8 sm:hidden hidden xl:block lg:block  ">
          <Link href="/login">
            <div className="text-blue-100 font-bold  cursor-pointer text-[18px] dark:text-[#28A5E6] ">
              ورود
            </div>
          </Link>
          <Link className="z-20" href="/register">
            <button className="bg-[#F5F5F5]  shadow-[8px_0px_20px_rgba(8,135,202,0.30)]  border-gray-200 w-35 h-12 rounded-2x1 text-blue-100 dark:text-[#28A5E6] font-bold cursor-pointer text-[18px] rounded-2xl ml-14">
              ثبت نام
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
