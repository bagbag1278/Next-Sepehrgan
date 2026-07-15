"use client";
import React, { useEffect, useRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ModalForm = () => {
  const [departureDate, setDepartureDate] = useState<DateObject | null>(
    new DateObject({ calendar: persian, locale: persian_fa, date: new Date() })
  );
  const [returnDate, setReturnDate] = useState<DateObject | null>(null);

  const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
  const [propertyTypeValue, setPropertyTypeValue] = useState("");

  const [reservationStatusOpen, setReservationStatusOpen] = useState(false);
  const [reservationStatusValue, setReservationStatusValue] = useState("");

  const propertyTypeRef = useRef<HTMLDivElement>(null);
  const reservationStatusRef = useRef<HTMLDivElement>(null);

  const propertyOptions = ["ویلا", "آپارتمان", "سوئیت", "کلبه"];
  const reservationOptions = ["تایید شده", "در انتظار", "تایید نشده", "لغو شده"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (propertyTypeRef.current && !propertyTypeRef.current.contains(event.target as Node))
        setPropertyTypeOpen(false);
      if (reservationStatusRef.current && !reservationStatusRef.current.contains(event.target as Node))
        setReservationStatusOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownClass =
    "absolute top-[calc(100%+8px)] right-0 w-full bg-white dark:bg-slate-700 border border-blue-300/50 rounded-2xl shadow-xl z-20 p-2";
  const listItemClass =
    "p-2 hover:bg-blue-50 dark:hover:bg-slate-600 cursor-pointer rounded-lg transition-colors text-[13px] text-blue-300";

  const dateInputClass =
    "w-full border border-blue-300/50 text-blue-300 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl cursor-pointer transition-colors duration-300 bg-transparent text-right";

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* تاریخ رفت */}
      <div className="relative w-full">
        <DatePicker
          value={departureDate}
          onChange={(date) => setDepartureDate(date as DateObject)}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          render={(value, openCalendar) => (
            <input
              type="text"
              readOnly
              value={value}
              onClick={openCalendar}
              className={dateInputClass}
            />
          )}
        />
        <label
          className={`absolute right-4 text-blue-300/70 pointer-events-none px-1 bg-white dark:bg-slate-600 rounded-md transition-all duration-200
            ${departureDate ? "-top-2 text-[12px]" : "top-3.5 text-sm"}`}
        >
          تاریخ رفت
        </label>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7dd3e8" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* تاریخ برگشت */}
      <div className="relative w-full">
        <DatePicker
          value={returnDate}
          onChange={(date) => setReturnDate(date as DateObject)}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          minDate={departureDate || undefined}
          render={(value, openCalendar) => (
            <input
              type="text"
              readOnly
              value={value}
              onClick={openCalendar}
              className={dateInputClass}
            />
          )}
        />
        <label
          className={`absolute right-4 text-blue-300/70 pointer-events-none px-1 bg-white dark:bg-slate-600 rounded-md transition-all duration-200
            ${returnDate ? "-top-2 text-[12px]" : "top-3.5 text-sm"}`}
        >
          تاریخ برگشت
        </label>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7dd3e8" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* نوع ملک */}
      <div className="relative w-full" ref={propertyTypeRef}>
        <input
          type="text"
          placeholder=" "
          value={propertyTypeValue}
          readOnly
          onClick={() => { setPropertyTypeOpen(!propertyTypeOpen); setReservationStatusOpen(false); }}
          className="peer w-full border border-blue-300/50 text-blue-300 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl cursor-pointer transition-colors duration-300 bg-transparent"
        />
        <label
          className={`absolute right-4 text-blue-300/70 pointer-events-none px-1 bg-white dark:bg-slate-600 rounded-md transition-all duration-200
            ${propertyTypeValue ? "-top-2 text-[12px]" : "top-3.5 text-sm"}`}
        >
          نوع ملک
        </label>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7dd3e8" strokeWidth="2"
            className={`transition-transform duration-200 ${propertyTypeOpen ? "rotate-180" : ""}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {propertyTypeOpen && (
          <div className={dropdownClass}>
            <ul>
              {propertyOptions.map((item) => (
                <li key={item} onClick={() => { setPropertyTypeValue(item); setPropertyTypeOpen(false); }} className={listItemClass}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* وضعیت رزرو */}
      <div className="relative w-full" ref={reservationStatusRef}>
        <input
          type="text"
          placeholder=" "
          value={reservationStatusValue}
          readOnly
          onClick={() => { setReservationStatusOpen(!reservationStatusOpen); setPropertyTypeOpen(false); }}
          className="peer w-full border border-blue-300/50 text-blue-300 text-[13px] pt-1 px-4 h-12 outline-0 rounded-2xl cursor-pointer transition-colors duration-300 bg-transparent"
        />
        <label
          className={`absolute right-4 text-blue-300/70 pointer-events-none px-1 bg-white dark:bg-slate-600 rounded-md transition-all duration-200
            ${reservationStatusValue ? "-top-2 text-[12px]" : "top-3.5 text-sm"}`}
        >
          وضعیت رزرو
        </label>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7dd3e8" strokeWidth="2"
            className={`transition-transform duration-200 ${reservationStatusOpen ? "rotate-180" : ""}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {reservationStatusOpen && (
          <div className={dropdownClass}>
            <ul>
              {reservationOptions.map((item) => (
                <li key={item} onClick={() => { setReservationStatusValue(item); setReservationStatusOpen(false); }} className={listItemClass}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* دکمه‌ها */}
      <div className="flex gap-3 mt-2">
        <button
          type="button"
          className="flex-1 h-12 rounded-2xl bg-slate-800 dark:bg-slate-800 text-blue-300 text-sm font-semibold cursor-pointer hover:bg-slate-700 transition-colors"
        >
          اعمال فیلتر
        </button>
        <button
          type="button"
          className="flex-1 h-12 rounded-2xl border border-red-400 text-red-400 text-sm cursor-pointer hover:bg-red-50 dark:hover:bg-red-400/10 transition-colors flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          بستن
        </button>
      </div>
    </div>
  );
};

export default ModalForm;