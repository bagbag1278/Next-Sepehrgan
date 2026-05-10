"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Refrigerator,
  Waves,
  ArrowUpCircle,
  Car,
  Bath,
  Sparkles,
  Mountain,
  ChefHat,
  Layout,
  ShieldCheck,
} from "lucide-react";

const Popular = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const activeId = searchParams.get("amenity");

  const amenities = [
    { id: 1, label: "خط تلفن دارد", icon: <Refrigerator size={24} /> },
    { id: 2, label: "استخر دارد", icon: <Waves size={24} /> },
    { id: 3, label: "کولر دارد", icon: <Waves size={24} /> },
    { id: 4, label: "خط تلفن دارد", icon: <Refrigerator size={24} /> },
    { id: 5, label: "۴ حمامه", icon: <Bath size={24} /> },
    { id: 6, label: "۸ خوابه", icon: <Layout size={24} /> },
    { id: 7, label: "پارکینگ دارد", icon: <Car size={24} /> },
    { id: 8, label: "آسانسور دارد", icon: <ArrowUpCircle size={24} /> },
    { id: 9, label: "سن بنا نوساز", icon: <Sparkles size={24} /> },
    { id: 10, label: "اوپن سنگی", icon: <ChefHat size={24} /> },
    { id: 11, label: "نما رومی", icon: <Mountain size={24} /> },
    { id: 12, label: "بالکن دارد", icon: <Layout size={24} /> },
    { id: 13, label: "خط تلفن دارد", icon: <Refrigerator size={24} /> },
    { id: 14, label: "استخر دارد", icon: <Waves size={24} /> },
    { id: 15, label: "شوفاژ دارد", icon: <ShieldCheck size={24} /> },
  ];

  const handelSelect = (id: number) => {
    const params = new URLSearchParams(searchParams.toString());
    const stringId = id.toString();

    if (activeId === stringId) {
      params.delete("amenity"); 
    } else {
      params.set("amenity", stringId); 
    }

    // آپدیت URL
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-8 flex flex-col gap-6" dir="rtl">
      <div className="w-full lg:bg-transparent rounded-[32px] p-6 lg:p-0">
        <h2 className="text-blue-100 text-[16px] font-bold mb-8 text-right">
          تمامی امکانات رفاهی محبوب هتل ما
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-6">
          {amenities.map((item) => {
        
            const isSelected = activeId === item.id.toString();

            return (
              <div
                key={item.id}
                onClick={() => handelSelect(item.id)}
                className={`flex items-center gap-3 p-3 transition-all cursor-pointer h-[65px] w-38 rounded-2xl border 
                ${
                  isSelected
                    ? "bg-white lg:bg-[#F5F5F5] shadow-[0_8px_20px_rgba(8,135,202,0.15)] scale-105 border-[#0887CA44]"
                    : "hover:bg-gray-50 border-transparent"
                }
              `}
              >
                <div className="text-[#10088F] flex-shrink-0 transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="text-[#626262] text-xs lg:text-sm font-medium whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Popular;