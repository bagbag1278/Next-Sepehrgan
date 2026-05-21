"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchField from "./components/SearchField";
import SortFilter from "./components/SortFilter";
import BedRoomsFilter from "./components/BedRoomsFilter";
import { BarChart2 } from "lucide-react";

type SortByType = "--" | "last_updated" | "price";

interface CompareItem {
  id: number;
  title: string;
  price: number;
  rooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  image: string;
  address: string;
}

type FastFilterProps = {
  query: string;
  setQuery: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  selectedRooms: number;
  setSelectedRooms: (value: number) => void;
  selectedBathrooms: number;
  setSelectedBathrooms: (value: number) => void;
  selectedToilets: number;
  setSelectedToilets: (value: number) => void;
  selectedParking: number;
  setSelectedParking: (value: number) => void;
  sortBy: SortByType;
  setSortBy: (sortBy: SortByType) => void;
  onCompare?: () => void;
  compareCount?: number;
  onClearAllFilters?: () => void;
};

const FastFilter = ({
  query,
  setQuery,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedRooms,
  setSelectedRooms,
  selectedBathrooms,
  setSelectedBathrooms,
  selectedToilets,
  setSelectedToilets,
  selectedParking,
  setSelectedParking,
  onCompare,
  compareCount = 0,
  onClearAllFilters,
}: FastFilterProps) => {
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [minPriceValue, setMinPriceValue] = useState(0);
  const [maxPriceValue, setMaxPriceValue] = useState(10000000000);

  // هماهنگ‌سازی مقادیر
  useEffect(() => {
    if (minPrice === "") {
      setMinPriceValue(0);
    }
  }, [minPrice]);

  useEffect(() => {
    if (maxPrice === "") {
      setMaxPriceValue(10000000000);
    }
  }, [maxPrice]);

  return (
    <div dir="rtl" className="flex flex-col gap-6">
      <div className="h-8.5 flex flex-col gap-2">
        <div className="flex justify-between h-6">
          <h2 className="text-blue-200">فیلتر ها</h2>
          <button
            onClick={onClearAllFilters}
            className="text-[12px] opacity-50 dark:text-gra hover:opacity-100 transition-opacity"
          >
            پاک کردن فیلتر ها
          </button>
        </div>
        <span className="h-px bg-blue-300/50 rounded-full"></span>
      </div>

      <div className="w-62 flex flex-col gap-6 mx-auto">
        <SearchField query={query} setQuery={setQuery} />
        <SortFilter sortBy={sortBy} setSortBy={setSortBy} />

        <button
          onClick={() => onCompare?.()}
          disabled={compareCount !== 2}
          className={`flex items-center justify-between w-full p-3 rounded-2xl border transition-all duration-300 group ${
            compareCount === 2
              ? "border-green-500 bg-green-50 dark:bg-green-900/20 cursor-pointer"
              : "border-blue-300 opacity-60 cursor-not-allowed"
          }`}
        >
          <div className="flex items-center gap-2">
            <BarChart2 size={18} className={compareCount === 2 ? "text-green-500" : "text-blue-300 group-hover:text-blue-500"} />
            <span className={`text-sm font-medium ${compareCount === 2 ? "text-green-600 dark:text-green-400" : "text-blue-300/70"}`}>
              {compareCount === 2 ? "مقایسه دو ملک" : "انتخاب دو ملک برای مقایسه"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-xs ${compareCount === 2 ? "text-green-600 dark:text-green-400" : "text-blue-300"}`}>
              {compareCount}/2
            </span>
            {compareCount === 2 && (
              <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">✓</span>
            )}
          </div>
        </button>

        <details onToggle={(e) => setIsAmenitiesOpen(e.currentTarget.open)} className="group w-full transition-all duration-150 max-w-sm rounded-2xl border border-blue-300 p-3">
          <summary className="flex cursor-pointer list-none items-center text-sm justify-between font-medium text-blue-300/70">
            امکانات هتل
            <span className="transition-transform group-open:rotate-180">
              <Image src={"/FastReserve/arow.png"} width={12} height={12} alt="" />
            </span>
          </summary>
          <div className="mt-3 transition-all duration-150">
            <BedRoomsFilter
              selectedRooms={selectedRooms}
              setSelectedRooms={setSelectedRooms}
              selectedBathrooms={selectedBathrooms}
              setSelectedBathrooms={setSelectedBathrooms}
              selectedToilets={selectedToilets}
              setSelectedToilets={setSelectedToilets}
              selectedParking={selectedParking}
              setSelectedParking={setSelectedParking}
            />
          </div>
        </details>

        <div className={`flex ${isAmenitiesOpen ? "flex-row gap-2" : "flex-col gap-6"}`}>
          <details className="group w-full transition-all duration-150 max-w-sm rounded-2xl border border-blue-300 p-3">
            <summary className="flex cursor-pointer list-none items-center text-sm justify-between font-medium text-blue-300/70">
              حداقل قیمت
              <span className="transition-transform group-open:rotate-180">
                <Image src={"/FastReserve/arow.png"} width={12} height={12} alt="" />
              </span>
            </summary>
            <div className="mt-3 space-y-2 transition-all duration-150">
              <input
                type="range"
                min={0}
                max={10000000000}
                step={1000000000}
                value={minPriceValue}
                onChange={(e) => {
                  setMinPriceValue(Number(e.target.value));
                  setMinPrice(Number(e.target.value).toString());
                }}
              />
              <div className="text-sm text-blue-200 mt-2">
                حداقل قیمت : {minPriceValue.toLocaleString("fa-IR")} تومان
              </div>
            </div>
          </details>

          <details className="group w-full transition-all duration-150 max-w-sm rounded-2xl border border-blue-300 p-3">
            <summary className="flex cursor-pointer list-none items-center text-sm justify-between font-medium text-blue-300/70">
              حداکثر قیمت
              <span className="transition-transform group-open:rotate-180">
                <Image src={"/FastReserve/arow.png"} width={12} height={12} alt="" />
              </span>
            </summary>
            <div className="mt-3 space-y-2 transition-all duration-150">
              <input
                type="range"
                min={0}
                max={10000000000}
                step={1000000000}
                value={maxPriceValue}
                onChange={(e) => {
                  setMaxPriceValue(Number(e.target.value));
                  setMaxPrice(Number(e.target.value).toString());
                }}
              />
              <div className="text-sm text-blue-200 mt-2">
                حداکثر قیمت : {maxPriceValue.toLocaleString("fa-IR")} تومان
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default FastFilter;