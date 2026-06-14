"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Reserve');
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [checkIn, setCheckIn] = useState<any>(searchParams.get("in") || null);
  const [checkOut, setCheckOut] = useState<any>(searchParams.get("out") || null);
  const [guests, setGuests] = useState(Number(searchParams.get("guests")) || 1);
  const [isOpen, setIsOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getDateString = (date: any): string => {
    if (!date) return "";
    if (typeof date === "string") return date;
    if (date && typeof date.format === "function") {
      return date.format("YYYY/MM/DD");
    }
    return "";
  };

  const convertPersianToGregorian = (persianDate: any): string => {
    const dateStr = getDateString(persianDate);
    if (!dateStr) return "";

    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let enDate = dateStr;
    persianDigits.forEach((p, i) => {
      enDate = enDate.replace(new RegExp(p, "g"), englishDigits[i]);
    });

    const parts = enDate.split("/");
    if (parts.length === 3) {
      const year = parseInt(parts[0]) + 621;
      const month = String(parts[1]).padStart(2, "0");
      const day = String(parts[2]).padStart(2, "0");
      return `${year}/${month}/${day}`;
    }
    return enDate;
  };

  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 1;

    const start = new Date(inDate);
    const end = new Date(outDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const originalPricePerNight = useMemo(() => {
    return Number(price) || 0;
  }, [price]);

  const discountedPricePerNight = useMemo(() => {
    return Number(discountedPrice) || originalPricePerNight * 0.95;
  }, [discountedPrice, originalPricePerNight]);

  const totalPrices = useMemo(() => {
    const inDateStr = getDateString(checkIn);
    const outDateStr = getDateString(checkOut);

    const gregorianIn = convertPersianToGregorian(inDateStr);
    const gregorianOut = convertPersianToGregorian(outDateStr);

    const nights = calculateNights(gregorianIn, gregorianOut);

    const originalTotal = originalPricePerNight * nights * guests;
    const discountedTotal = discountedPricePerNight * nights * guests;

    return {
      nights,
      originalTotal,
      discountedTotal,
      formattedOriginalTotal: originalTotal.toLocaleString(),
      formattedDiscountedTotal: discountedTotal.toLocaleString(),
    };
  }, [checkIn, checkOut, originalPricePerNight, discountedPricePerNight, guests]);

  const handleReserveClick = () => {
    const inDateStr = getDateString(checkIn);
    const outDateStr = getDateString(checkOut);
    const guestsCount = guests;

    const gregorianIn = convertPersianToGregorian(inDateStr);
    const gregorianOut = convertPersianToGregorian(outDateStr);

    const targetUrl = `/housereserve/${params.id}/booking?in=${gregorianIn}&out=${gregorianOut}&guests=${guestsCount}`;
    router.push(targetUrl);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      const dateString = date.format("YYYY/MM/DD");
      updateUrl("in", toEnglishDigits(dateString));
    } else {
      updateUrl("in", null);
    }
  };

  const handleCheckOutChange = (date: any) => {
    setCheckOut(date);
    if (date) {
      const dateString = date.format("YYYY/MM/DD");
      updateUrl("out", toEnglishDigits(dateString));
    } else {
      updateUrl("out", null);
    }
  };

  const handleGuestsSelect = (num: number) => {
    setGuests(num);
    updateUrl("guests", num.toString());
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto" dir="rtl">
      <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="p-6">
          <h3 className="text-[#0887CA] text-[16px] font-black mb-8 text-center flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#0887CA]"></span>
            {t('hotelReservation')}
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#0887CA]"></span>
          </h3>
          
          <div className="flex items-center gap-4 w-full border-b border-gray-100 dark:border-gray-700 pb-4 mb-4">
            <div className="flex-1 relative right-17">
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
                    className="w-full flex flex-col items-center gap-1 group"
                  >
                    <span className="text-[11px] text-[#94A3B8] dark:text-gray-500">{t('checkIn')}</span>
                    <div className="flex items-center gap-1 text-[#475569] dark:text-gray-300 font-bold text-[13px] group-hover:text-[#0887CA] transition-colors">
                      <Calendar size={14} className="text-[#0887CA]" />
                      <span>{value || t('select')}</span>
                    </div>
                  </button>
                )}
              />
            </div>
            <div className="w-[1px] h-8 bg-gray-200 dark:bg-gray-700"></div>
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
                    className="w-full flex flex-col items-center gap-1 group"
                  >
                    <span className="text-[11px] text-[#94A3B8] dark:text-gray-500">{t('checkOut')}</span>
                    <div className="flex items-center gap-1 text-[#475569] dark:text-gray-300 font-bold text-[13px] group-hover:text-[#0887CA] transition-colors">
                      <Calendar size={14} className="text-[#0887CA]" />
                      <span>{value || t('select')}</span>
                    </div>
                  </button>
                )}
              />
            </div></div>
          
          <div className="relative border-b border-gray-100 dark:border-gray-700 mb-6" ref={dropdownRef}>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-full h-[60px] flex items-center justify-between cursor-pointer group"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[#94A3B8] dark:text-gray-500 text-[11px]">{t('guests')}</span>
                <div className="flex items-start gap-2 text-[#475569] dark:text-gray-300 font-bold group-hover:text-[#0887CA] transition-colors">
                  <Users size={18} className="text-[#94A3B8] dark:text-gray-500" />
                  <span>{guests} {t('people')}</span>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-[#94A3B8] dark:text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </div>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 mt-2 max-h-48 overflow-y-auto">
                <div className="flex flex-col">
                  {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => handleGuestsSelect(num)}
                      className={`w-full text-center px-6 py-3 text-sm transition-all hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        guests === num 
                          ? "text-[#0887CA] font-bold bg-blue-50 dark:bg-blue-900/20" 
                          : "text-[#475569] dark:text-gray-400"
                      }`}
                    >
                      {num} {t('people')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#64748B] dark:text-gray-400 text-[12px]">{t('originalPricePerNight')}</span>
              <div className="text-[#94A3B8] dark:text-gray-400 text-[14px]">
                {originalPricePerNight.toLocaleString()} <span className="text-[10px]">{t('toman')}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#0887CA] text-[12px] font-bold flex items-center gap-1">
                <span className="w-2 h-2 bg-[#0887CA] rounded-full animate-pulse"></span>
                {t('discountedPricePerNight')}
              </span>
              <div className="text-[#0887CA] text-[16px] font-bold">
                {discountedPricePerNight.toLocaleString()} <span className="text-[10px]">{t('toman')}</span>
              </div>
            </div>
            
            {totalPrices.nights > 0 && (
              <div className="flex justify-between items-center mb-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-[#64748B] dark:text-gray-400 text-[12px]">{t('nightsCount')}</span>
                <div className="text-[#475569] dark:text-gray-300 text-[14px] font-bold">
                  {totalPrices.nights} {t('nights')}
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#64748B] dark:text-gray-400 text-[12px]">{t('totalWithoutDiscount')}</span>
              <div className="text-gray-400 dark:text-gray-500 line-through text-sm">
                {totalPrices.formattedOriginalTotal} <span className="text-[10px]">{t('toman')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="text-[#10088F] dark:text-blue-400 text-[14px] font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-[#10088F] to-[#0887CA] rounded-full"></span>
              {t('finalPrice')}
            </span>
            <div className="text-[#15977D] dark:text-green-400 text-[24px] font-black">
              {totalPrices.formattedDiscountedTotal} <span className="text-[12px]">{t('toman')}</span>
            </div>
          </div>
          
          <button
            onClick={handleReserveClick}
            className="w-full h-[52px] rounded-[16px] bg-gradient-to-r from-[#15977D] to-[#12806a] text-white font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 mt-6"
          >
            {t('reserveNow')}
          </button>
          
          <Link href="/housereserve">
            <button className="w-full mt-4 flex items-center justify-end gap-1 text-[#0887CA] text-xs font-bold hover:gap-3 transition-all duration-300 group">
              <span>{t('viewAll')}</span>
              <ChevronLeft size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reserve;