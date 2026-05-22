"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


import HeaderIcon3 from "@/components/header/Icon/HeaderIcon3";
import LandingIcon from "../Icon/IconAndd/FramsIcon/LandingIcon";
import locationIcon from "../Icon/IconAndd/FramsIcon/locationIcon";
import SettingsIcon from "../Icon/IconAndd/FramsIcon/SettingsIcon";
import ProfileIcon from "../Icon/IconAndd/FramsIcon/ProfileIcon";
import HeaderIcon4 from "../Icon/IconAndd/HeaderIcon4";



const navItems = [
  
      {
    href: "/location",
    icon:locationIcon ,
  },
  {
    href: "/settings",
    icon: SettingsIcon,
  },
  {
    href: "/profile",
    icon: ProfileIcon,
  },
  {
    href: "/",
    icon: LandingIcon,
  },


];

const Frame = () => {
  const pathname = usePathname();

  return (
    <div
      className="
        w-[345px] h-[56px] bg-[#060425] rounded-2xl border z-50 absolute top-185 justify-center flex  gap-12
    "
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex items-center justify-center"
          >
            {/* ایکون */}
            <div className={`${isActive ? "text-white bottom-1 relative" : "text-gray-400"}`}>
              <Icon />
            </div>

            {/* خط زیر active */}
            {isActive && (
              <div className="absolute top-10 ">
                <HeaderIcon4 />
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Frame;