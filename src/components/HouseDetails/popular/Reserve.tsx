"use client";

import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, Users, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"; // اصلاح شد

const Reserve = () => {
  // 1. استفاده از useRouter صحیح برای App Router
  const router = useRouter();
  const searchParams = useSearchParams();

  const [checkIn, setCheckIn] = useState<any>(searchParams.get("in") || null);
  const [checkOut, setCheckOut] = useState<any>(
    searchParams.get("out") || null,
  );
  const [guests, setGuests] = useState(Number(searchParams.get("guests")) || 1);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. اصلاح تابع آپدیت URL
  const updateUrl = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

    const toEnglishDigits = (str: string) => {
    return str
      .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
  };

  const handleCheckInChange = (date: any) => {
    setCheckIn(date);
    if (date) {
      const dateString = date.format("YYYY/MM/DD", "en");
      updateUrl("out", toEnglishDigits(dateString));
    }
  };



  const handleCheckOutChange = (date: any) => {
    setCheckOut(date);
    if (date) {
      const dateString = date.format("YYYY/MM/DD", "en");
      updateUrl("in", toEnglishDigits(dateString));
    }
  };
  // 3. تابع مدیریت تعداد مسافران
  const handleGuestsSelect = (num: number) => {
    setGuests(num);
    updateUrl("guests", num.toString());
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto" dir="rtl">
      <div className="bg-white p-6 rounded-[32px] shadow-sm ">
        <h3 className="text-[#0887CA] text-[16px] font-black mb-8 text-center">
          رزرو هتل
        </h3>

        <div className="flex items-center gap-4 w-full border-b border-gray-100 pb-4 mb-4 ">
          {/* بخش تاریخ ورود */}
          <div className="flex-1 relative right-4">
            <DatePicker
              value={checkIn}
              onChange={handleCheckInChange}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              render={(value, openCalendar) => (
                <button
                  type="button"
                  onClick={openCalendar}
                  className="w-full flex flex-col items-center gap-1"
                >
                  <span className="text-[11px] text-[#94A3B8]">تاریخ ورود</span>
                  <div className="flex items-center gap-1 text-[#475569] font-bold text-[13px]">
                    <Calendar size={14} className="text-[#0887CA]" />
                    <span>{value || "انتخاب کن"}</span>
                  </div>
                </button>
              )}
            />
          </div>

          <div className="w-[1px] h-8 bg-gray-200"></div>

          {/* بخش تاریخ خروج */}
          <div className="flex-1 relative right-8">
            <DatePicker
              value={checkOut}
              onChange={handleCheckOutChange}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              render={(value, openCalendar) => (
                <button
                  type="button"
                  onClick={openCalendar}
                  className="w-full flex flex-col items-center gap-1"
                >
                  <span className="text-[11px] text-[#94A3B8]">تاریخ خروج</span>
                  <div className="flex items-center gap-1 text-[#475569] font-bold text-[13px]">
                    <Calendar size={14} className="text-[#0887CA]" />
                    <span>{value || "انتخاب کن"}</span>
                  </div>
                </button>
              )}
            />
          </div>
        </div>

        {/* انتخاب تعداد مسافران */}
        <div
          className="relative border-b border-gray-100 mb-8"
          ref={dropdownRef}
        >
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-[60px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[#94A3B8] text-[11px]">
                انتخاب کن چند نفرین
              </span>
              <div className="flex items-center gap-2 text-[#475569] font-bold">
                <Users size={18} className="text-[#94A3B8]" />
                <span>{guests} نفر</span>
              </div>
            </div>
            <ChevronDown
              size={18}
              className={`text-[#94A3B8] transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 mt-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => handleGuestsSelect(num)}
                  className={`w-full text-right px-6 py-3 text-sm hover:bg-gray-50 ${guests === num ? "text-[#0887CA] font-bold" : "text-[#475569]"}`}
                >
                  {num} نفر
                </button>
              ))}
            </div>
          )}
        </div>

        {/* بخش قیمت و دکمه */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className="text-[#64748B] text-[12px]">قیمت کل با تخفیف</span>
            <span className="text-[#94A3B8] line-through text-[12px]">
              ۲۵۰,۰۰۰,۰۰۰
            </span>
          </div>
          <div className="text-[#0887CA] text-[20px] font-black">
            ۲۵۰,۰۰۰,۰۰۰ <span className="text-[12px]">تومان</span>
          </div>
        </div>

        <button className="w-full h-[55px] bg-[#10B981] text-white rounded-2xl text-[16px] font-black hover:bg-[#059669] transition-all active:scale-95 shadow-lg shadow-green-100">
          همین الان رزرو کن
        </button>
      </div>
    </div>
  );
};

export default Reserve;
