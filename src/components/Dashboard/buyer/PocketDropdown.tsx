"use client";
import { useEffect, useRef, useState } from "react";
import BankSVG from "./icon/BankSVG";
import FishSVG from "./icon/FishSVG";
import Notif from "./icon/NotifSVG";
const PocketDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); 


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-19 h-12 flex flex-col items-center mt-1 "
      >
        <h4 className="text-blue-200 text-[15px]">کیف پول</h4>
        <span className="text-[13px] text-nowrap ">عدم موجودی</span>
      </div>
      {/* dropdown */}
      <div
        className={`absolute -top-16 right-32 py-3 pr-4.5 mt-2 w-57.5 dark:bg-slate-600 bg-white rounded-2xl shadow-[0_0_15px] shadow-blue-200/30 overflow-hidden transition-all duration-300 ease-out origin-top-right
          ${
            isOpen
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }`}
      >
        <div className="flex flex-col gap-4">
          {/* pocket */}
          <div className="flex gap-2 items-center hover:opacity-100 transition-opacity duration-150 cursor-pointer opacity-70 h-6">
            <Notif/>
            <span className="text-[13px]">شارژ کردن کیف پول</span>
          </div>
          {/* notification */}
          <div className="hover:opacity-100 transition-opacity duration-150 cursor-pointer flex opacity-70 gap-2 h-6">
            <FishSVG/>
            <span className="text-[13px]">لیست تراکنش ها</span>
          </div>
          {/* log out */}
          <div className="hover:opacity-100 transition-opacity duration-150 cursor-pointer opacity-70 flex gap-2 h-6">
            <BankSVG/>
            <span className="text-[13px]">برداشت وجه</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PocketDropdown;
