"use client";

import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, Users, ChevronDown, ChevronLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface ReserveProps {
  price: string;
  discountedPrice: string;
  maxCapacity: number;
}

const Reserve = ({ price, discountedPrice, maxCapacity }: ReserveProps) => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

const handleReserveClick = () => {
  const currentParams = searchParams.toString();
  const targetUrl = `/housereserve/${params.id}/booking?${currentParams}`;
  router.push(targetUrl);
};


  const [checkIn, setCheckIn] = useState<any>(searchParams.get("in") || null);
  const [checkOut, setCheckOut] = useState<any>(
    searchParams.get("out") || null,
  );
  const [guests, setGuests] = useState(Number(searchParams.get("guests")) || 1);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatPrice = (num: string) => {
    return Number(num).toLocaleString();
  };

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

  const updateUrl = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const toEnglishDigits = (str: string) => {
    return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
  };

  const handleCheckInChange = (date: any) => {
    setCheckIn(date);
    if (date) {
      const dateString = date.format("YYYY/MM/DD", "en");
      updateUrl("in", toEnglishDigits(dateString));
    }
  };

  const handleCheckOutChange = (date: any) => {
    setCheckOut(date);
    if (date) {
      const dateString = date.format("YYYY/MM/DD", "en");
      updateUrl("out", toEnglishDigits(dateString));
    }
  };

  const handleGuestsSelect = (num: number) => {
    setGuests(num);
    updateUrl("guests", num.toString());
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto" dir="rtl">
      <div className="bg-white dark:text-white dark:bg-[#060425] p-6 rounded-[32px] ">
        <h3 className="text-[#0887CA] text-[16px] font-black mb-8 text-center">
          رزرو هتل
        </h3>

        <div className="flex items-center gap-4 w-full border-b border-gray-100 pb-4 mb-4">
          <div className="flex-1  relative right-5">
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
                    <span>{value || "انتخاب"}</span>
                  </div>
                </button>
              )}
            />
          </div>
          <div className="w-[1px] h-8 bg-gray-200"></div>
          {/* بخش خروج */}
          <div className="flex-1 relative right-10">
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
                    <span>{value || "انتخاب"}</span>
                  </div>
                </button>
              )}
            />
          </div>
        </div>

        {/* مسافران */}
        <div
          className="relative border-b border-gray-100 mb-8"
          ref={dropdownRef}
        >
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-[60px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[#94A3B8] text-[11px]">تعداد مسافران</span>
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
            <div className="absolute top-full left-0 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 mt-2 max-h-48 overflow-y-auto">
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => handleGuestsSelect(num)}
                    className={`w-full text-right px-6 py-3 text-sm hover:bg-gray-50 ${guests === num ? "text-[#0887CA] font-bold" : "text-[#475569]"}`}
                  >
                    {num} نفر
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className="text-[#64748B] text-[12px]">قیمت کل با تخفیف</span>
            <span className="text-[#94A3B8] line-through text-[12px]">
              {formatPrice(price)}
            </span>
          </div>
          <div className="text-[#0887CA] text-[18px] font-black">
            {formatPrice(discountedPrice)}{" "}
            <span className="text-[12px]">تومان</span>
          </div>
        </div>
        <button 
         onClick={handleReserveClick}
        className="w-[317px] h-[48px] rounded-[16px] bg-[#15977D] text-white ">
          <span>همین الان رزرو کن</span>
        </button>
        <Link href="/houseresever">
          <button className="w-full mt-6 flex items-center justify-end gap-1 text-[#0887CA] text-xs font-bold hover:gap-2 transition-all">
            <span>مشاهده تمامی موارد</span>
            <ChevronLeft size={16} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Reserve;
