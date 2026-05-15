"use client";
import Image from "next/image";

import { useState } from "react";
import SearchField from "./components/SearchField";
import SortFilter from "./components/SortFilter";
import BedRoomsFilter from "./components/BedRoomsFilter";


type SortByType = "--" | "last_updated" | "price";

type FastFilterProps = {
  query: string;
  setQuery: (value: string) => void;

  sortBy: SortByType;
  setSortBy: (sortBy: SortByType) => void;
};

const FastFilter = ({
  query,
  setQuery,
  sortBy,
  setSortBy,
}: FastFilterProps) => {
  console.log("Props passed from FastFilter to SearchField:", {
    query,
    setQuery,
  });
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);

  return (
    <div dir="rtl" className=" flex flex-col gap-6 ">
      <div className="h-8.5 flex flex-col gap-2">
        <div className="flex justify-between h-6">
          <h2 className="text-blue-200 ">فیلتر ها</h2>
          <button className="text-[12px] opacity-50 dark:text-gra">
            پاک کردن فیلتر ها
          </button>
        </div>
        <span className="h-px bg-blue-300/50 rounded-full"></span>
      </div>
      <div className="w-62 flex flex-col gap-6 mx-auto">
        {/* search */}
        <SearchField query={query} setQuery={setQuery} />
        {/* sorting */}

        <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
        {/*  */}
        <details
          onToggle={(e) => setIsAmenitiesOpen(e.currentTarget.open)}
          className="group w-full transition-all duration-150 max-w-sm rounded-2xl border border-blue-300 p-3"
        >
          <summary className="flex cursor-pointer list-none items-center text-sm justify-between font-medium text-blue-300/70">
            امکانات هتل
            <span className="transition-transform group-open:rotate-180">
              <Image
                src={"/FastReserve/arow.png"}
                width={12}
                height={12}
                alt=""
              />
            </span>
          </summary>
          <div className="mt-3  transition-all duration-150">
            <BedRoomsFilter />
          </div>
        </details>
        {/* at least price*/}
        <div
          className={`flex  ${isAmenitiesOpen ? "flex-row gap-2" : "flex-col gap-6"}`}
        >
          {" "}
          <details className="group w-full transition-all  duration-150 max-w-sm rounded-2xl border border-blue-300 p-3">
            <summary className="flex cursor-pointer list-none items-center text-sm justify-between font-medium text-blue-300/70">
              حداقل قیمت
              <span className="transition-transform group-open:rotate-180 ">
                <Image
                  src={"/FastReserve/arow.png"}
                  width={12}
                  height={12}
                  alt=""
                />
              </span>
            </summary>
            <div className="mt-3 space-y-2 transition-all duration-150"></div>
          </details>
          {/* at most price*/}
          <details className="group w-full transition-all  duration-150 max-w-sm rounded-2xl border border-blue-300 p-3">
            <summary className="flex cursor-pointer list-none items-center text-sm justify-between font-medium text-blue-300/70">
              حداکثر قیمت
              <span className="transition-transform group-open:rotate-180 ">
                <Image
                  src={"/FastReserve/arow.png"}
                  width={12}
                  height={12}
                  alt=""
                />
              </span>
            </summary>
            <div className="mt-3 space-y-2 transition-all duration-150"></div>
          </details>
        </div>
        {/*  */}
      </div>

    </div>
  );
};

export default FastFilter;
