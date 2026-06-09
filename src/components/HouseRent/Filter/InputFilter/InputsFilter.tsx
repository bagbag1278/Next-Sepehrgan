// ./Filter/InputsFilter.tsx
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { ChevronDownIcon } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

import SearchIcon from "../../Icon/SearchIcon";
import { debounce } from "lodash";
import VoiceInput from "@/components/common/voice/VoiceInput";

type Filters = {
  transactionType?: string;
  location?: string;
  sort?: string;
  search?: string;
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function InputsFilter({ filters, setFilters }: Props) {
  const t = useTranslations("FilterInputs");

  const transactionTypes = [
    t("buy"),
    t("sell"),
    t("rent"),
    t("mortgage"),
    t("daily"),
  ];

  const locations = [
    t("tehran"),
    t("mashhad"),
    t("isfahan"),
    t("shiraz"),
    t("tabriz"),
    t("karaj"),
    t("rasht"),
    t("kish"),
  ];

  const sortOptions = [
    t("newest"),
    t("oldest"),
    t("cheapest"),
    t("mostExpensive"),
  ];

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const [searchValue, setSearchValue] = useState(filters.search || "");

  const dropdownRef1 = useRef<HTMLDivElement>(null);
  const dropdownRef2 = useRef<HTMLDivElement>(null);
  const dropdownRef3 = useRef<HTMLDivElement>(null);

  const debouncedUpdateSearch = useMemo(
    () =>
      debounce((value: string) => {
        setFilters((prev) => ({
          ...prev,
          search: value,
        }));
      }, 500),
    [setFilters],
  );

  useEffect(() => {
    return () => {
      debouncedUpdateSearch.cancel();
    };
  }, [debouncedUpdateSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (dropdownRef1.current && !dropdownRef1.current.contains(target)) {
        setOpen1(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(target)) {
        setOpen2(false);
      }
      if (dropdownRef3.current && !dropdownRef3.current.contains(target)) {
        setOpen3(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedUpdateSearch(value);
  };

  const handleVoiceInput = (text: string) => {
    setSearchValue(text);
    debouncedUpdateSearch(text);
  };

  const Dropdown = ({
    options,
    selected,
    onSelect,
    isOpen,
    setIsOpen,
    dropdownRef,
  }: {
    options: string[];
    selected: string;
    onSelect: (item: string) => void;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
  }) => (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center justify-between gap-3 px-5 py-3 border border-[#0887CAB2] dark:border-[#0887CA]/50 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 active:scale-[0.985] transition-all w-full group bg-white dark:bg-gray-800"
        dir="rtl"
      >
        <span className="text-[#0887CAB2] dark:text-[#0887CA]/70 text-sm font-medium truncate">
          {selected}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 max-h-56 overflow-y-auto">
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              className="px-5 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full p-4 flex justify-center" dir="ltr">
      <div className="w-full max-w-7xl p-4 flex flex-col lg:flex-row lg:flex-nowrap gap-4">
        <div className="flex flex-col gap-3 lg:w-135 w-full lg:flex-row lg:shrink-0">
          <Dropdown
            options={transactionTypes}
            selected={filters.transactionType || t("transactionType")}
            onSelect={(item) =>
              setFilters((prev) => ({
                ...prev,
                transactionType: item,
              }))
            }
            isOpen={open1}
            setIsOpen={setOpen1}
            dropdownRef={dropdownRef1}
          />

          <Dropdown
            options={locations}
            selected={filters.location || t("location")}
            onSelect={(item) =>
              setFilters((prev) => ({
                ...prev,
                location: item,
              }))
            }
            isOpen={open2}
            setIsOpen={setOpen2}
            dropdownRef={dropdownRef2}
          />

          <Dropdown
            options={sortOptions}
            selected={filters.sort || t("sortBy")}
            onSelect={(item) =>
              setFilters((prev) => ({
                ...prev,
                sort: item,
              }))
            }
            isOpen={open3}
            setIsOpen={setOpen3}
            dropdownRef={dropdownRef3}
          />
        </div>

        {/* search section with debounce and voice input */}
        <div className="relative w-full">
          <VoiceInput
            onTranscript={handleVoiceInput}
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={t("searchPlaceholder")}
            lang="fa"
            dir="rtl"
            icon={<SearchIcon />}
            className="w-full outline-none border border-[#0887CAB2] dark:border-[#0887CA]/50 rounded-2xl py-3 pr-10 pl-10 text-sm placeholder:text-[#0887CAB2] dark:placeholder:text-[#0887CA]/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
         
        </div>
      </div>
    </div>
  );
}
