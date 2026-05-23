"use client";
import Image from "next/image";
import React, { useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import LogOutModal from "./LogOutModal";
import Notif from "./icon/NotifSVG";
import Payment from "./icon/PaymentSVG";
import LogSVG from "./icon/LogSVG";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLogout = () => {
    console.log("Logged out");
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="relative inline-block">
        {/* دکمه شما */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-20.5 h-6.5 flex gap-1 items-center cursor-pointer"
        >
          <LuChevronRight
            className={`transition-transform duration-300 ${isOpen ? "-rotate-90" : "rotate-90"} text-blue-200`}
          />
          <h4 className="text-blue-200 font-bold text-[17px]">غلامعلی</h4>
        </div>

        {/* دراپ‌داون */}
        <div
          className={`absolute top-0 right-32 py-3 pr-4.5 mt-2 w-57.5 h-48 bg-white rounded-2xl shadow-[0_0_15px] shadow-blue-200/30 overflow-hidden transition-all duration-300 ease-out origin-top-right
          ${
            isOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }`}
        >
          <div className="flex flex-col gap-4 h-42">
            <div className="flex gap-2 h-12">
              <div className="size-12 rounded-4xl border-2 overflow-hidden border-green-200">
                <Image
                  src={"/FastReserve/images.jfif"}
                  width={64}
                  height={64}
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                {" "}
                <span className="text-[15px]">علیرضا بخشیان </span>
                <span className="text-[11px] text-blue-400 opacity-70">
                  +98 9115556666
                </span>
              </div>
            </div>
            {/* pocket */}
            <div className="flex gap-2 items-center hover:opacity-100 transition-opacity duration-150 cursor-pointer opacity-70 h-6">
              <Notif />
              <span className="text-[13px]">شارژ کردن کیف پول</span>
            </div>
            {/* notification */}
            <div className="hover:opacity-100 transition-opacity duration-150 cursor-pointer flex opacity-70 gap-2 h-6">
              <Payment />
              <span className="text-[13px]">تنظیمات نوتیفیکیشن</span>
            </div>
            {/* log out */}
            <div
              onClick={() => {
                setIsModalOpen(true);
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default UserDropdown;
