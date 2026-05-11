"use client";

import React from "react";
import {
  Layout,
  Bath,
  Car,
  Users,
  ShieldCheck,
  Mountain,
  Sparkles,
  ChefHat,
  DoorOpen,
  Waves,
} from "lucide-react";

interface PopularProps {
  data: any; 
}

const Popular = ({ data }: PopularProps) => {

  if (!data)
    return <div className="w-full h-40 animate-pulse bg-gray-50 rounded-3xl" />;

  const amenities = [
    {
      id: "rooms",
      label: `${data?.rooms || 0} اتاق خواب`,
      icon: <DoorOpen size={24} />,
    },
    {
      id: "bathrooms",
      label: `${data?.bathrooms || 0} حمام و سرویس`,
      icon: <Bath size={24} />,
    },
    {
      id: "parking",
      label: `${data?.parking || 0} ظرفیت پارکینگ`,
      icon: <Car size={24} />,
    },
    {
      id: "capacity",
      label: `ظرفیت ${data?.capacity || 0} نفر`,
      icon: <Users size={24} />,
    },
    {
      id: "transaction_type",
      label: data?.transaction_type === "sell" ? "آماده فروش" : "آماده اجاره",
      icon: <ShieldCheck size={24} />,
    },
    {
      id: "tags",
      label: data?.tags === "penthouse" ? "واحد پنت‌هاوس" : "واحد مدرن",
      icon: <Mountain size={24} />,
    },
    {
      id: "rate",
      label: `امتیاز ${data?.rate || 0} از ۵`,
      icon: <Sparkles size={24} />,
    },
    {
      id: "num_comments",
      label: `${data?.num_comments || 0} نظر ثبت شده`,
      icon: <ChefHat size={24} />,
    },
  ];

  return (
    <div
      className="w-full max-w-7xl mx-auto p-4 lg:p-8 flex flex-col gap-6"
      dir="rtl"
    >
      <div className="w-full lg:bg-transparent rounded-[32px] p-6 lg:p-0">
        <h2 className="text-blue-400 text-[16px] font-bold mb-8 text-right">
          تمامی امکانات رفاهی محبوب هتل ما
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {amenities.map((item) => {
            const isSelected =
              (typeof data[item.id] === "number" && data[item.id] > 0) ||
              (typeof data[item.id] === "string" && data[item.id] !== "");

            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 transition-all h-[65px] rounded-2xl border 
                ${
                  isSelected
                    ? "bg-white lg:bg-[#F5F5F5] shadow-[0_8px_20px_rgba(8,135,202,0.12)] scale-105 border-[#0887CA44]"
                    : "bg-gray-50/50 border-transparent opacity-50 grayscale-[0.5]"
                }
              `}
              >
                <div
                  className={`${isSelected ? "text-[#0887CA]" : "text-gray-400"} flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <span
                  className={`${isSelected ? "text-[#475569]" : "text-gray-400"} text-xs cursor-pointer lg:text-sm font-medium whitespace-nowrap truncate`}
                >
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
