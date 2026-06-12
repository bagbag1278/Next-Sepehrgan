"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import LogOutModal from "./LogOutModal";
import NotificationSettingsModal from "./NotificationSettingsModal";
import Notif from "./icon/NotifSVG";
import Payment from "./icon/PaymentSVG";
import LogSVG from "./icon/LogSVG";
import { logout } from "@/core/api/auth/Logout.api";
interface UserDropdownProps {
  user: {
    name: string;
  };
}
const UserDropdown = ({ user }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (e: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();

      setIsModalOpen(false);
      setIsOpen(false);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="relative inline-block" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-20.5 h-6.5 flex gap-1 items-center cursor-pointer"
        >
          <LuChevronRight
            className={`transition-transform duration-300 ${
              isOpen ? "-rotate-90" : "rotate-90"
            } text-blue-200`}
          />

          <h4 className="text-blue-200 text-nowrap truncate font-bold text-[17px]">{user.name}</h4>
        </div>

        <div
          className={`absolute -top-20 right-35 py-3 pr-4.5 mt-2 w-57.5 h-48 dark:bg-slate-600 bg-white rounded-2xl shadow-[0_0_15px] shadow-blue-200/30 overflow-hidden transition-all duration-300 ease-out origin-top-right
          ${
            isOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }`}
        >
          <div className="flex flex-col gap-4 h-42">
            <div className="flex gap-2 h-12">
              <div className="size-12 rounded-full border-2 overflow-hidden border-green-200">
                <Image
                  src="/FastReserve/images.jfif"
                  width={64}
                  height={64}
                  alt=""
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[15px]">{user.name}</span>

                <span dir="ltr" className="text-[11px] text-blue-400 opacity-70">
                  +98 9119598397
                </span>
              </div>
            </div>

            {/* کیف پول */}
            <div className="flex gap-2 items-center hover:opacity-100 transition-opacity duration-150 cursor-pointer opacity-70 h-6">
              <Notif />
              <span className="text-[13px]">شارژ کردن کیف پول</span>
            </div>

            {/* تنظیمات نوتیفیکیشن */}
            <div
              onClick={() => {
                setIsNotificationModalOpen(true);
                setIsOpen(false);
              }}
              className="hover:opacity-100 transition-opacity duration-150 cursor-pointer flex opacity-70 gap-2 h-6"
            >
              <Payment />
              <span className="text-[13px]">تنظیمات نوتیفیکیشن</span>
            </div>

            {/* خروج */}
            <div
              onClick={() => {
                setIsLogoutModalOpen(true);
                setIsOpen(false);
              }}
              className="hover:opacity-100 transition-opacity duration-150 cursor-pointer opacity-70 flex gap-2 h-6"
            >
              <LogSVG />
              <span className="text-[13px]">خروج از حساب</span>
            </div>
          </div>
        </div>
      </div>

      <LogOutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />

      <NotificationSettingsModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </>
  );
};

export default UserDropdown;
