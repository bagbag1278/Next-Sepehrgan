"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchFilter from "../../Icon/IconAndd/Search/SearchFilter";
import * as Slider from "@radix-ui/react-slider"; // اضافه شد

const FilterModalRes = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "amenities",
  );
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // اضافه کردن استیت برای اسلایدر رنج
  const [priceRange, setPriceRange] = useState([0, 100]);

  const [filters, setFilters] = useState({
    priceSort: "",
    destination: "مقصد یا هتل شما",
    sortType: "جدیدترین",
    beds: 0,
    baths: 2,
    toilets: 0,
    parking: 0,
  });

  const handleSelect = (cat: string, val: any) => {
    setFilters((prev) => ({ ...prev, [cat]: val }));
    if (cat === "destination") setIsDestOpen(false);
    if (cat === "sortType") setIsSortOpen(false);
  };

  const clearAll = () => {
    setFilters({
      priceSort: "",
      destination: "مقصد یا هتل شما",
      sortType: "جدیدترین",
      beds: 0,
      baths: 0,
      toilets: 0,
      parking: 0,
    });
    setPriceRange([0, 100]);
  };

  const handleSearch = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal?.close();
    router.push("/HouseResever");
  };

  return (
    <div dir="rtl">
      <button
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          ).showModal()
        }
        className="focus:outline-none"
      >
        <div className="bg-blue-400 w-9 h-9 rounded-lg relative bottom-0.5 flex items-center justify-center shadow-lg hover:bg-blue-500 transition-all">
          <SearchFilter />
        </div>
      </button>

      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 bg-white dark:bg-slate-900 w-full max-w-[400px] h-[90vh] flex flex-col overflow-hidden rounded-t-[30px]">
          <div className="px-6 py-5 flex justify-between items-center border-b bg-white sticky top-0 z-50 dark:bg-slate-900 ">
            <h2 className="text-[20px] font-black text-[#0887CA]">فیلتر ها</h2>
            <button
              onClick={clearAll}
              className="text-[14px] text-[#0887CA] font-bold hover:underline"
            >
              پاک کردن فیلتر ها (
              {
                Object.values(filters).filter(
                  (v) =>
                    v !== 0 &&
                    v !== "" &&
                    v !== "مقصد یا هتل شما" &&
                    v !== "جدیدترین",
                ).length
              }
              )
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="relative z-40">
              <label className="text-[14px] font-bold text-gray-500 pr-2 mb-2 block text-right">
                مقصد
              </label>
              <div
                onClick={() => {
                  setIsDestOpen(!isDestOpen);
                  setIsSortOpen(false);
                }}
                className="w-full h-[60px] bg-white dark:bg-slate-800 border border-[#60A5FA] rounded-tl-[8px] rounded-tr-[32px] rounded-br-[8px] rounded-bl-[32px] px-5 flex items-center justify-between cursor-pointer shadow-sm"
              >
                <span
                  className={`text-[#60A5FA] transition-transform ${isDestOpen ? "rotate-180" : ""}`}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
                <span className="text-[#0887CA] font-bold ">
                  {filters.destination}
                </span>
              </div>
              {isDestOpen && (
                <div className="absolute top-[90px] w-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden z-50">
                  {["تهران", "مازندران", "گیلان"].map((city) => (
                    <div
                      key={city}
                      onClick={() => handleSelect("destination", city)}
                      className="px-5 py-4 hover:bg-blue-50 dark:hover:bg-slate-700 text-[#0887CA] dark:text-blue-300 font-medium cursor-pointer border-b dark:border-slate-700 text-right"
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative z-30">
              <label className="text-[14px] font-bold text-gray-500 pr-2 mb-2 block text-right">
                مرتب‌سازی بر اساس
              </label>
              <div
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                  setIsDestOpen(false);
                }}
                className="w-full h-[60px] bg-white dark:bg-slate-800 border border-[#60A5FA] rounded-tl-[32px] rounded-tr-[8px] rounded-br-[32px] rounded-bl-[8px] px-5 flex items-center justify-between cursor-pointer shadow-sm"
              >
                <span
                  className={`text-[#60A5FA] transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
                <span className="text-[#0887CA] font-bold">
                  {filters.sortType}
                </span>
              </div>
              {isSortOpen && (
                <div className="absolute top-[90px] w-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden z-50">
                  {["جدیدترین", "ارزان‌ترین", "گران‌ترین", "محبوب‌ترین"].map(
                    (sort) => (
                      <div
                        key={sort}
                        onClick={() => handleSelect("sortType", sort)}
                        className="px-5 py-4 hover:bg-blue-50 dark:hover:bg-slate-700 text-[#0887CA] dark:text-blue-300 font-medium cursor-pointer border-b dark:border-slate-700 text-right"
                      >
                        {sort}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* ۳. اسلایدر قیمت حرفه‌ای Radix */}
            <div className="space-y-6 py-2">
              <div className="flex justify-between items-center px-2">
                <div className="flex gap-1 text-[#0887CA] font-bold text-[14px]">
                  <span>{priceRange[0]}</span>
                  <span>تا</span>
                  <span>{priceRange[1]}</span>
                  <span className="text-[10px] mt-1">میلیون</span>
                </div>
                <label className="text-[14px] font-bold text-gray-500">محدوده بودجه</label>
              </div>
              
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={priceRange}
                onValueChange={setPriceRange}
                max={10}
                step={1}
                dir="rtl"
              >
                <Slider.Track className="bg-gray-200 dark:bg-slate-700 relative grow rounded-full h-[6px]">
                  <Slider.Range className="absolute bg-[#0887CA] rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white border-2 border-[#0887CA] shadow-md rounded-full hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                  aria-label="Min Price"
                />
                <Slider.Thumb
                  className="block w-5 h-5 bg-white border-2 border-[#0887CA] shadow-md rounded-full hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                  aria-label="Max Price"
                />
              </Slider.Root>
            </div>

            <div
              onClick={() =>
                setActiveCategory(
                  activeCategory === "amenities" ? null : "amenities",
                )
              }
              className="w-full h-[60px] bg-white border dark:bg-slate-900 border-[#60A5FA] rounded-tl-[8px] rounded-tr-[32px] rounded-br-[8px] rounded-bl-[32px] px-5 flex items-center justify-between cursor-pointer"
            >
              <span
                className={`text-[#60A5FA] transition-transform ${activeCategory === "amenities" ? "rotate-180" : ""}`}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
              <span className="text-[#0887CA] font-bold">امکانات هتل</span>
            </div>

            {activeCategory === "amenities" && (
              <div className="space-y-8 bg-[#F8FAFC] p-5 rounded-[24px] border dark:bg-slate-900 border-[#E2E8F0] animate-in fade-in zoom-in duration-300">
                {["beds", "baths", "toilets", "parking"].map((item) => (
                  <div key={item} className="space-y-4">
                    <label className="text-[17px] font-bold text-[#4B4B4B] dark:text-gray-300 block text-right">
                      {item === "beds"
                        ? "تعداد تخت"
                        : item === "baths"
                          ? "تعداد حمام"
                          : item === "toilets"
                            ? "تعداد دستشویی"
                            : "تعداد پارکینگ"}
                    </label>
                    <div className="flex flex-row-reverse gap-3 justify-start">
                      {[0, 1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() => handleSelect(item, n)}
                          className={`w-10 h-9 rounded-full border-2 flex items-center justify-center font-bold text-[15px] transition-all
                            ${
                              filters[item as keyof typeof filters] === n
                                ? "bg-[#60A5FA] text-white border-[#60A5FA] scale-110 shadow-md"
                                : "bg-white dark:bg-slate-800 text-[#60A5FA] border-[#E5E7EB] dark:border-slate-700 hover:border-[#60A5FA]"
                            }`}
                        >
                          {n === 0 ? "○" : n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 border-t flex gap-4 bg-white z-50 dark:bg-slate-900 ">
            <button
              onClick={handleSearch}
              className="btn bg-[#0F172A]  text-white flex-[2] rounded-2xl h-14 border-none text-[17px] font-bold dark:bg-blue-950 dark:hover:bg-blue-800 hover:bg-black transition-all"
            >
              جستجو
            </button>
            <form method="dialog" className="flex-1">
              <button className="btn btn-outline border-[#E2E8F0] text-[#64748B] w-full rounded-2xl h-14 dark:bg-blue-950 dark:hover:bg-blue-800 dark:border-none dark:text-white">
                بستن
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FilterModalRes;