"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";
import SearchFilter from "../../Icon/IconAndd/Search/SearchFilter";
import * as Slider from "@radix-ui/react-slider";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterModalRes = () => {
  const t = useTranslations('FilterModal');
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>("amenities");
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // بازه قیمت (به میلیون تومان)
  const [priceRange, setPriceRange] = useState([0, 100]);

  const [filters, setFilters] = useState({
    destination: t('defaultDestination'),
    sortType: t('newest'),
    beds: 0,
    baths: 0,
    toilets: 0,
    parking: 0,
  });

  const destRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // بستن دراپ‌داون با کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setIsDestOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const destinationOptions = [t('mazandaran'), t('sari'), t('babolsar'), t('nowshahr'), t('ramsar')];
  const sortOptions = [t('newest'), t('cheapest'), t('mostExpensive')];

  const handleSelect = (cat: string, val: any) => {
    setFilters((prev) => ({ ...prev, [cat]: val }));
    if (cat === "destination") setIsDestOpen(false);
    if (cat === "sortType") setIsSortOpen(false);
  };

  const clearAll = () => {
    setFilters({
      destination: t('defaultDestination'),
      sortType: t('newest'),
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

    if (filters.destination !== t('defaultDestination')) {
      query.set("location", filters.destination);
    }
    
    const sortValue = 
      filters.sortType === t('cheapest') ? "price_asc" : 
      filters.sortType === t('mostExpensive') ? "price_desc" : 
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
        <div className="bg-blue-400 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-500 transition-all dark:bg-blue-600 dark:hover:bg-blue-700">
          <SearchFilter />
        </div>
      </button>

      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle z-[999]">
        <div className="modal-box p-0 bg-white dark:bg-slate-900 w-full max-w-[95%] sm:max-w-[400px] md:max-w-[450px] max-[700]:left-3.5 max-[700]:bottom-15 relative h-[90vh] flex flex-col overflow-hidden rounded-t-[30px]">
          
          {/* Header */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center border-b sticky top-0 z-50 bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-800">
            <h2 className="text-[18px] sm:text-[20px] font-black text-[#0887CA] dark:text-[#28A5E6]">{t('filters')}</h2>
            <button onClick={clearAll} className="text-[12px] sm:text-[14px] text-[#0887CA] dark:text-[#28A5E6] font-bold hover:underline">
              {t('clearAll')}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            
            {/* Destination Selection */}
            <div className="relative z-40" ref={destRef}>
              <label className="text-[13px] sm:text-[14px] font-bold text-gray-500 dark:text-gray-400 mb-2 block text-right">
                {t('destination')}
              </label>
              <div
                onClick={() => { setIsDestOpen(!isDestOpen); setIsSortOpen(false); }}
                className="w-full h-[50px] sm:h-[60px] bg-white dark:bg-slate-800 border border-[#60A5FA] dark:border-[#28A5E6]/50 rounded-tl-[8px] rounded-tr-[32px] rounded-br-[8px] rounded-bl-[32px] px-4 sm:px-5 flex items-center justify-between cursor-pointer"
              >
                {isDestOpen ? (
                  <ChevronUp size={18} className="text-[#60A5FA] dark:text-[#28A5E6]" />
                ) : (
                  <ChevronDown size={18} className="text-[#60A5FA] dark:text-[#28A5E6]" />
                )}
                <span className="text-[#0887CA] dark:text-[#28A5E6] font-bold text-[13px] sm:text-[14px]">{filters.destination}</span>
              </div>
              {isDestOpen && (
                <div className="absolute top-[55px] sm:top-[70px] left-0 right-0  w-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-gray-700 rounded-2xl shadow-xl z-50 max-h-48 overflow-y-auto mt-5">
                  {destinationOptions.map((city) => (
                    <div
                      key={city}
                      onClick={() => handleSelect("destination", city)}
                      className="px-4 sm:px-5 py-3 sm:py-4 hover:bg-blue-50 dark:hover:bg-slate-700 text-[#0887CA] dark:text-[#28A5E6] font-medium cursor-pointer border-b border-gray-100 dark:border-gray-700 text-right text-[13px] sm:text-[14px]"
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Selection */}
            <div className="relative z-30" ref={sortRef}>
              <label className="text-[13px] sm:text-[14px] font-bold text-gray-500 dark:text-gray-400 mb-2 block text-right">
                {t('sortBy')}
              </label>
              <div
                onClick={() => { setIsSortOpen(!isSortOpen); setIsDestOpen(false); }}
                className="w-full h-[50px] sm:h-[60px] bg-white dark:bg-slate-800 border border-[#60A5FA] dark:border-[#28A5E6]/50 rounded-tl-[8px] rounded-tr-[32px] rounded-br-[8px] rounded-bl-[32px] px-4 sm:px-5 flex items-center justify-between cursor-pointer"
              >
                {isSortOpen ? (
                  <ChevronUp size={18} className="text-[#60A5FA] dark:text-[#28A5E6]" />
                ) : (
                  <ChevronDown size={18} className="text-[#60A5FA] dark:text-[#28A5E6]" />
                )}
                <span className="text-[#0887CA] dark:text-[#28A5E6] font-bold text-[13px] sm:text-[14px]">{filters.sortType}</span>
              </div>
              {isSortOpen && (
                <div className="absolute top-[55px] sm:top-[70px] left-0 right-0 w-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-gray-700 rounded-2xl shadow-xl z-50 max-h-48 overflow-y-auto mt-2">
                  {sortOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSelect("sortType", option)}
                      className="px-4 sm:px-5 py-3 sm:py-4 hover:bg-blue-50 dark:hover:bg-slate-700 text-[#0887CA] dark:text-[#28A5E6] font-medium cursor-pointer border-b border-gray-100 dark:border-gray-700 text-right text-[13px] sm:text-[14px]"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Slider */}
            <div className="space-y-4 sm:space-y-6 py-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 text-[#0887CA] dark:text-[#28A5E6] font-bold text-[12px] sm:text-[14px]">
                  <span>{priceRange[0]}</span> 
                  <span>{t('to')}</span> 
                  <span>{priceRange[1]}</span> 
                  <span className="text-[9px] sm:text-[10px] mt-1">{t('million')}</span>
                </div>
                <label className="text-[13px] sm:text-[14px] font-bold text-gray-500 dark:text-gray-400">{t('budgetRange')}</label>
              </div>
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={priceRange}
                onValueChange={setPriceRange}
                max={100}
                step={1}
                dir="rtl"
              >
                <Slider.Track className="bg-gray-200 dark:bg-gray-700 relative grow rounded-full h-[6px]">
                  <Slider.Range className="absolute bg-[#0887CA] dark:bg-[#28A5E6] rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-4 h-4 sm:w-5 sm:h-5 bg-white dark:bg-slate-800 border-2 border-[#0887CA] dark:border-[#28A5E6] shadow-md rounded-full focus:outline-none cursor-pointer" />
                <Slider.Thumb className="block w-4 h-4 sm:w-5 sm:h-5 bg-white dark:bg-slate-800 border-2 border-[#0887CA] dark:border-[#28A5E6] shadow-md rounded-full focus:outline-none cursor-pointer" />
              </Slider.Root>
            </div>

            {/* Amenities Section */}
            <div
              onClick={() => setActiveCategory(activeCategory === "amenities" ? null : "amenities")}
              className="w-full h-[50px] sm:h-[60px] bg-white dark:bg-slate-800 border border-[#60A5FA] dark:border-[#28A5E6]/50 rounded-tl-[8px] rounded-tr-[32px] rounded-br-[8px] rounded-bl-[32px] px-4 sm:px-5 flex items-center justify-between cursor-pointer"
            >
              {activeCategory === "amenities" ? (
                <ChevronUp size={18} className="text-[#60A5FA] dark:text-[#28A5E6]" />
              ) : (
                <ChevronDown size={18} className="text-[#60A5FA] dark:text-[#28A5E6]" />
              )}
              <span className="text-[#0887CA] dark:text-[#28A5E6] font-bold text-[13px] sm:text-[14px]">{t('amenities')}</span>
            </div>

            {activeCategory === "amenities" && (
              <div className="space-y-4 sm:space-y-6 bg-blue-50/30 dark:bg-slate-800/50 p-4 sm:p-5 rounded-[24px] border border-[#E2E8F0] dark:border-gray-700">
                {/* Rooms */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[14px] sm:text-[15px] font-bold text-gray-600 dark:text-gray-400 block text-right">
                    {t('rooms')}
                  </label>
                  <div className="flex flex-row-reverse gap-2 justify-start overflow-x-auto pb-1">
                    {[0, 1, 2, 3, 4, "5+"].map((n) => (
                      <button
                        key={n.toString()}
                        onClick={() => handleSelect("beds", n === "5+" ? 5 : n)}
                        className={`min-w-[36px] sm:min-w-[40px] h-8 sm:h-9 rounded-full border-2 font-bold text-[12px] sm:text-[14px] transition-all
                          ${filters.beds === (n === "5+" ? 5 : n)
                            ? "bg-[#60A5FA] dark:bg-[#28A5E6] text-white border-[#60A5FA] dark:border-[#28A5E6]"
                            : "bg-white dark:bg-slate-800 text-[#60A5FA] dark:text-[#28A5E6] border-gray-200 dark:border-gray-700"
                          }`}
                      >
                        {n === 0 ? t('all') : n}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Bathrooms */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[14px] sm:text-[15px] font-bold text-gray-600 dark:text-gray-400 block text-right">
                    {t('bathrooms')}
                  </label>
                  <div className="flex flex-row-reverse gap-2 justify-start overflow-x-auto pb-1">
                    {[0, 1, 2, 3, 4, "5+"].map((n) => (
                      <button
                        key={n.toString()}
                        onClick={() => handleSelect("baths", n === "5+" ? 5 : n)}
                        className={`min-w-[36px] sm:min-w-[40px] h-8 sm:h-9 rounded-full border-2 font-bold text-[12px] sm:text-[14px] transition-all
                          ${filters.baths === (n === "5+" ? 5 : n)
                            ? "bg-[#60A5FA] dark:bg-[#28A5E6] text-white border-[#60A5FA] dark:border-[#28A5E6]"
                            : "bg-white dark:bg-slate-800 text-[#60A5FA] dark:text-[#28A5E6] border-gray-200 dark:border-gray-700"
                          }`}
                      >
                        {n === 0 ? t('all') : n}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Parking */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[14px] sm:text-[15px] font-bold text-gray-600 dark:text-gray-400 block text-right">
                    {t('parking')}
                  </label>
                  <div className="flex flex-row-reverse gap-2 justify-start overflow-x-auto pb-1">
                    {[0, 1, 2, 3, 4, "5+"].map((n) => (
                      <button
                        key={n.toString()}
                        onClick={() => handleSelect("parking", n === "5+" ? 5 : n)}
                        className={`min-w-[36px] sm:min-w-[40px] h-8 sm:h-9 rounded-full border-2 font-bold text-[12px] sm:text-[14px] transition-all
                          ${filters.parking === (n === "5+" ? 5 : n)
                            ? "bg-[#60A5FA] dark:bg-[#28A5E6] text-white border-[#60A5FA] dark:border-[#28A5E6]"
                            : "bg-white dark:bg-slate-800 text-[#60A5FA] dark:text-[#28A5E6] border-gray-200 dark:border-gray-700"
                          }`}
                      >
                        {n === 0 ? t('all') : n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 border-t flex gap-3 sm:gap-4 bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-800">
            <button
              onClick={handleSearch}
              className="btn bg-[#0F172A] dark:bg-[#1E293B] text-white flex-[2] rounded-2xl h-12 sm:h-14 border-none text-[15px] sm:text-[17px] font-bold hover:bg-black dark:hover:bg-slate-800 transition-all"
            >
              {t('applyFilters')}
            </button>
            <form method="dialog" className="flex-1">
              <button className="btn btn-outline border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 w-full rounded-2xl h-12 sm:h-14 text-[14px] sm:text-[16px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                {t('cancel')}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FilterModalRes;