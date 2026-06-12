"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const HouseSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("house_name") || "");
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set("house_name", debouncedValue);
    } else {
      params.delete("house_name");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }, [debouncedValue]);

  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="نام ملک مورد نظر ...."
        className="w-112.5 h-12 text-sm border dark:border-blue-300 dark:text-blue-300 placeholder:text-blue-300/70 border-blue-300/70 py-1 px-4 outline-0 text-blue-300 rounded-2xl"
      />
      <div className="absolute top-3.5 left-4 bg-[#f5f5f5] dark:bg-slate-900 pointer-events-none">
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.4167 17.4167L13.6667 13.6667M15.75 8.25C15.75 12.3921 12.3921 15.75 8.25 15.75C4.10786 15.75 0.75 12.3921 0.75 8.25C0.75 4.10786 4.10786 0.75 8.25 0.75C12.3921 0.75 15.75 4.10786 15.75 8.25Z"
            stroke="#0887CA"
            strokeOpacity="0.8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default HouseSearch;
