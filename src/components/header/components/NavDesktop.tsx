"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import HeaderIcon3 from "../Icon/HeaderIcon3";

interface NavDesktopProps {
  nav: { title: string; href: string; icon: ReactNode }[];
}

const NavDesktop = ({ nav }: NavDesktopProps) => {
  const pathname = usePathname();

  return (
    <div className="lg:flex xl:flex z-30 items-center whitespace-nowrap gap-5 hidden">
      {nav.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

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
  );
};

export default NavDesktop;