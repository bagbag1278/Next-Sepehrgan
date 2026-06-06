"use client";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import Image from "next/image";

interface SortOption {
  label: string;
  value: string;
}

interface SortFilterProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const SortFilter = ({
  sortBy,
  setSortBy,
  isOpen,
  onToggle,
}: SortFilterProps) => {
  const t = useTranslations('SortFilter');

  const sortOptions: SortOption[] = [
    { label: t('newest'), value: "newest" },
    { label: t('mostExpensive'), value: "price" },
  ];

  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ||
    t('defaultLabel');

  const handleSelectSort = (optionValue: string) => {
    setSortBy(optionValue);
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <details
      className="group w-full transition-all duration-150 max-w-sm rounded-2xl border border-blue-300 p-3"
      open={isOpen}
      onChange={onToggle}
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
            className="text-blue-100 dark:text-blue-300 text-[13px] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md pr-1 py-1 cursor-pointer"
            onClick={() => handleSelectSort(option.value)}
          >
            {option.label}
          </span>
        ))}
      </div>
    </details>
  );
};

export default SortFilter;