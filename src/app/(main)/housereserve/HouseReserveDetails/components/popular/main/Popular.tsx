"use client";

import React from "react";
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Popular');

  if (!data) {
    return (
      <div className="w-full max-[844px]:max-w-100 h-40 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-3xl" />
    );
  }

  const amenities = [
    {
      id: "rooms",
      label: `${data?.rooms || 0} ${t('bedrooms')}`,
      icon: <DoorOpen size={24} />,
    },
    {
      id: "bathrooms",
      label: `${data?.bathrooms || 0} ${t('bathrooms')}`,
      icon: <Bath size={24} />,
    },
    {
      id: "parking",
      label: `${data?.parking || 0} ${t('parkingCapacity')}`,
      icon: <Car size={24} />,
    },
    {
      id: "capacity",
      label: `${t('capacity')} ${data?.capacity || 0} ${t('people')}`,
      icon: <Users size={24} />,
    },
    {
      id: "transaction_type",
      label: data?.transaction_type === "sell" ? t('readyToSell') : t('readyToRent'),
      icon: <ShieldCheck size={24} />,
    },
    {
      id: "tags",
      label: data?.tags === "penthouse" ? t('penthouse') : t('modernUnit'),
      icon: <Mountain size={24} />,
    },
    {
      id: "rate",
      label: `${t('rating')} ${data?.rate || 0} ${t('outOf5')}`,
      icon: <Sparkles size={24} />,
    },
    
  ];

  return (
    <div
      className="w-full max-w-7xl mx-auto p-4 lg:p-8 flex flex-col gap-6 relative max-[888px]:right-3"
      dir="rtl"
    >
      <div className="w-full lg:bg-transparent rounded-[32px] p-6 lg:p-0">
        <h2 className="text-blue-400 max-[844px]:text-center text-[16px] font-bold mb-8 text-right dark:text-blue-300">
          {t('title')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-[844px]:max-w-100 max-[844px]:justify-center mx-auto">
          {amenities.map((item) => {
            const isSelected =
              (typeof data[item.id] === "number" && data[item.id] > 0) ||
              (typeof data[item.id] === "string" && data[item.id] !== "");

            return (
              <div
                key={item.id}
                className={`
                  flex items-center gap-3 p-3 transition-all duration-300 h-[65px] rounded-2xl border 
                  ${isSelected
                    ? "bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 shadow-[0_8px_20px_rgba(8,135,202,0.15)] dark:shadow-[0_8px_20px_rgba(8,135,202,0.08)] scale-105 border-[#0887CA44] dark:border-[#0887CA33] hover:shadow-[0_8px_25px_rgba(8,135,202,0.2)] dark:hover:shadow-[0_8px_25px_rgba(8,135,202,0.12)]"
                    : "bg-gray-50/50 dark:bg-gray-800/30 border-transparent opacity-60 grayscale-[0.3] dark:grayscale-[0.5]"
                  }
                `}
              >
                <div
                  className={`
                    ${isSelected 
                      ? "text-[#0887CA] dark:text-[#28A5E6]" 
                      : "text-gray-400 dark:text-gray-600"
                    } 
                    flex-shrink-0 transition-colors duration-300
                  `}
                >
                  {item.icon}
                </div>
                <span
                  className={`
                    ${isSelected 
                      ? "text-[#475569] dark:text-gray-300" 
                      : "text-gray-400 dark:text-gray-600"
                    } 
                    text-xs cursor-pointer lg:text-sm font-medium whitespace-nowrap truncate transition-colors duration-300
                  `}
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