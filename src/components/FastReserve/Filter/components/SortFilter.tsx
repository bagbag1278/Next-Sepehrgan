"use client";
import React, { useState } from "react";
import Image from "next/image";

// فرض می‌کنیم این نوع در جای دیگری تعریف شده و قابل دسترسی است
// type SortByType = "--" | "last_updated" | "price" | "newest";

interface SortOption {
  label: string;
  value: string; // value باید با مقدار مورد انتظار در SortByType مطابقت داشته باشد
}

const sortOptions: SortOption[] = [
  { label: "جدیدترین", value: "newest" },
  { label: "گرانترین", value: "price" },
  // اگر نیاز به مرتب‌سازی بر اساس تاریخ آپدیت دارید:
  // { label: "آخرین بروزرسانی", value: "last_updated" },
];

// تعریف propهای کامپوننت
interface SortFilterProps {
  sortBy: string; // یا نوع دقیق‌تر SortByType
  setSortBy: (value: string) => void; // یا (value: SortByType) => void
  // اگر لازم است وضعیت باز/بسته بودن dropdown را والد مدیریت کند
  isOpen?: boolean;
  onToggle?: () => void;
}

const SortFilter = ({
  sortBy,
  setSortBy,
  isOpen,
  onToggle,
}: SortFilterProps) => {
  // پیدا کردن لیبل گزینه انتخاب شده بر اساس sortBy دریافتی
  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ||
    "مرتب سازی براساس ...";

  const handleSelectSort = (optionValue: string) => {
    setSortBy(optionValue);
    // اگر والد وضعیت isOpen را مدیریت می‌کند، آن را ببندد
    if (onToggle) {
      onToggle(); // بستن dropdown
    }
  };

  return (
    <details
      className="group w-full transition-all duration-150 max-w-sm rounded-2xl border border-blue-300 p-3"
      open={isOpen} // استفاده از وضعیت isOpen دریافتی
      onChange={onToggle} // فراخوانی تابع والد برای تغییر وضعیت
    >
      <summary className="flex cursor-pointer list-none items-center text-sm justify-between font-medium text-blue-300/70">
        {selectedSortLabel}
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <Image
            src={"/FastReserve/arow.png"}
            width={12}
            height={12}
            alt="Arrow"
          />
        </span>
      </summary>

      <div className="mt-3 transition-all flex flex-col gap-0.5">
        {sortOptions.map((option) => (
          <span
            key={option.value}
            className="text-blue-100 text-[13px] hover:bg-gray-100 rounded-md pr-1 py-1 cursor-pointer"
            onClick={() => handleSelectSort(option.value)} // پاس دادن value به جای کل option
          >
            {option.label}
          </span>
        ))}
      </div>
    </details>
  );
};

export default SortFilter;
