"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchFilter from "../../Icon/IconAndd/Search/SearchFilter";
import * as Slider from "@radix-ui/react-slider";

const FilterModalRes = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>("amenities");
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const [priceRange, setPriceRange] = useState([0, 100]);

  const [filters, setFilters] = useState({
    destination: "مقصد یا هتل شما",
    sortType: "جدیدترین",
    beds: 0,
    baths: 0,
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

    const query = new URLSearchParams();

    if (filters.destination !== "مقصد یا هتل شما") {
      query.set("location", filters.destination);
    }

    
    const sortValue = 
      filters.sortType === "ارزان‌ترین" ? "price_asc" : 
      filters.sortType === "گران‌ترین" ? "price_desc" : 
      "newest";
    query.set("sort", sortValue);

    query.set("min_price", (priceRange[0] * 1000000).toString());
    query.set("max_price", (priceRange[1] * 1000000).toString());

    if (filters.beds > 0) query.set("rooms", filters.beds.toString());
    if (filters.baths > 0) query.set("bathrooms", filters.baths.toString());
    if (filters.parking > 0) query.set("parking", filters.parking.toString());

    router.push(`/housereserve?${query.toString()}`);
  };

  return (
    <div dir="rtl">
      <button
        onClick={() => (document.getElementById("my_modal_3") as HTMLDialogElement).showModal()}
        className="focus:outline-none"
      >
        <div className="bg-blue-400 w-9 h-9 rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-500 transition-all">
          <SearchFilter />
        </div>
      </button>

      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle z-[999]">
        <div className="modal-box p-0 bg-white dark:bg-slate-900 w-full max-w-[400px] h-[90vh] flex flex-col overflow-hidden rounded-t-[30px]">
          
          {/* Header */}
          <div className="px-6 py-5 flex justify-between items-center border-b sticky top-0 z-50 bg-white dark:bg-slate-900">
            <h2 className="text-[20px] font-black text-[#0887CA]">فیلتر ها</h2>
            <button onClick={clearAll} className="text-[14px] text-[#0887CA] font-bold hover:underline">
              پاک کردن همه
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Destination Selection */}
            <div className="relative z-40">
              <label className="text-[14px] font-bold text-gray-500 mb-2 block text-right">مقصد</label>
              <div
                onClick={() => { setIsDestOpen(!isDestOpen); setIsSortOpen(false); }}
                className="w-full h-[60px] bg-white dark:bg-slate-800 border border-[#60A5FA] rounded-tl-[8px] rounded-tr-[32px] rounded-br-[8px] rounded-bl-[32px] px-5 flex items-center justify-between cursor-pointer"
              >
                <span className={`text-[#60A5FA] transition-transform ${isDestOpen ? "rotate-180" : ""}`}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
                </span>
                <span className="text-[#0887CA] font-bold">{filters.destination}</span>
              </div>
              {isDestOpen && (
                <div className="absolute top-[65px] w-full bg-white dark:bg-slate-800 border border-blue-100 rounded-2xl shadow-xl z-50 max-h-48 overflow-y-auto">
                  {["مازندران", "ساری", "بابلسر", "نوشهر", "رامسر"].map((city) => (
                    <div key={city} onClick={() => handleSelect("destination", city)} className="px-5 py-4 hover:bg-blue-50 dark:hover:bg-slate-700 text-[#0887CA] font-medium cursor-pointer border-b text-right">
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Slider */}
            <div className="space-y-6 py-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 text-[#0887CA] font-bold text-[14px]">
                  <span>{priceRange[0]}</span> <span>تا</span> <span>{priceRange[1]}</span> <span className="text-[10px] mt-1">میلیون</span>
                </div>
                <label className="text-[14px] font-bold text-gray-500">محدوده بودجه</label>
              </div>
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={priceRange}
                onValueChange={setPriceRange}
                max={100}
                step={1}
                dir="rtl"
              >
                <Slider.Track className="bg-gray-200 dark:bg-slate-700 relative grow rounded-full h-[6px]">
                  <Slider.Range className="absolute bg-[#0887CA] rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-[#0887CA] shadow-md rounded-full focus:outline-none cursor-pointer" />
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-[#0887CA] shadow-md rounded-full focus:outline-none cursor-pointer" />
              </Slider.Root>
            </div>

            {/* Amenities Section */}
            <div
              onClick={() => setActiveCategory(activeCategory === "amenities" ? null : "amenities")}
              className="w-full h-[60px] bg-white dark:bg-slate-800 border border-[#60A5FA] rounded-tl-[8px] rounded-tr-[32px] rounded-br-[8px] rounded-bl-[32px] px-5 flex items-center justify-between cursor-pointer"
            >
              <span className={`text-[#60A5FA] transition-transform ${activeCategory === "amenities" ? "rotate-180" : ""}`}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
              </span>
              <span className="text-[#0887CA] font-bold">امکانات و ویژگی‌ها</span>
            </div>

            {activeCategory === "amenities" && (
              <div className="space-y-6 bg-blue-50/30 p-5 rounded-[24px] border border-[#E2E8F0] dark:bg-slate-800">
                {["beds", "baths", "parking"].map((item) => (
                  <div key={item} className="space-y-3">
                    <label className="text-[15px] font-bold text-gray-600 dark:text-gray-300 block text-right">
                      {item === "beds" ? "تعداد اتاق" : item === "baths" ? "تعداد حمام" : "تعداد پارکینگ"}
                    </label>
                    <div className="flex flex-row-reverse gap-2 justify-start overflow-x-auto pb-1">
                      {[0, 1, 2, 3, 4, "5+"].map((n) => (
                        <button
                          key={n.toString()}
                          onClick={() => handleSelect(item, n === "5+" ? 5 : n)}
                          className={`min-w-[40px] h-9 rounded-full border-2 font-bold text-[14px] transition-all
                            ${filters[item as keyof typeof filters] === (n === "5+" ? 5 : n)
                              ? "bg-[#60A5FA] text-white border-[#60A5FA]"
                              : "bg-white text-[#60A5FA] border-gray-200"
                            }`}
                        >
                          {n === 0 ? "همه" : n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t flex gap-4 bg-white dark:bg-slate-900">
            <button
              onClick={handleSearch}
              className="btn bg-[#0F172A] text-white flex-[2] rounded-2xl h-14 border-none text-[17px] font-bold hover:bg-black"
            >
              اعمال فیلترها
            </button>
            <form method="dialog" className="flex-1">
              <button className="btn btn-outline border-gray-300 text-gray-500 w-full rounded-2xl h-14">
                انصراف
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FilterModalRes;