import Loaction from "@/components/HouseDetails/icon/icon/Loaction";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const ImageFallback =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpuJf7I24w6edIXo-v3-bsSiwFJssmCby3A&s";

interface PricesProps {
  originalPricePerNight: number;
  discountedPricePerNight: number;
  nights: number;
  originalTotal: number;
  discountedTotal: number;
}

interface Props {
  hotelData: {
    title: string;
    photo?: string;
    address: string;
    rate?: number;
    rating?: number;
  };
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  prices: PricesProps;
  
}

const BookingSummary = ({
  hotelData,
  checkInDate,
  checkOutDate,
  guestsCount,
  prices,
}: Props) => {
  const {
    originalPricePerNight,
    discountedPricePerNight,
    nights,
    originalTotal,
    discountedTotal,
    
  } = prices;

  return (
    <div className="w-full top-10">
      <div className="rounded-[40px]">
        {/* تصویر هتل */}
        <div className="w-full flex justify-center relative mb-6">
          <img
            src={hotelData?.photo || ImageFallback}
            className="w-[509px] h-[315px] object-cover rounded-[32px]"
            alt={hotelData?.title}
          />
        </div>

        {/* عنوان و امتیاز */}
        <h2 className="font-black text-xl justify-center flex items-center text-[#060425] dark:text-white mb-2 gap-2">
          {hotelData?.title}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {hotelData?.rate || hotelData?.rating || 0}
            </span>
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
          </div>
        </h2>

        {/* آدرس */}
        <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-4">
          <Loaction />
          <span>{hotelData?.address}</span>
        </div>
      </div>

      {/* اطلاعات قیمت */}
      <div className="space-y-4 border-t border-gray-100 dark:border-gray-800 pt-6 mt-4">
        {/* تاریخ‌ها */}
        <div className="flex justify-between text-sm font-bold">
          <span className="text-[#060425CC] dark:text-gray-300">تاریخ ورود</span>
          <span className="text-gray-500 dark:text-gray-400">{checkInDate}</span>
        </div>
        
        <div className="flex justify-between text-sm font-bold">
          <span className="text-[#060425CC] dark:text-gray-300">تاریخ خروج</span>
          <span className="text-gray-500 dark:text-gray-400">{checkOutDate}</span>
        </div>

        <div className="flex justify-between text-sm font-bold">
          <span className="text-[#060425CC] dark:text-gray-300">تعداد شب‌ها</span>
          <span className="text-gray-500 dark:text-gray-400">{nights} شب</span>
        </div>

        <div className="flex justify-between text-sm font-bold">
          <span className="text-[#060425CC] dark:text-gray-300">تعداد مسافران</span>
          <span className="text-gray-500 dark:text-gray-400">{guestsCount} نفر</span>
        </div>

        {/* قیمت هر شب (اصلی) */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-500 text-xs">قیمت هر شب (اصلی)</span>
          <span className="text-gray-400 text-xs line-through">
            {originalPricePerNight.toLocaleString()} تومان
          </span>
        </div>

        {/* قیمت هر شب (با تخفیف) */}
        <div className="flex justify-between items-center">
          <span className="text-[#0887CA] text-xs font-bold">قیمت هر شب (با تخفیف ۵٪)</span>
          <span className="text-[#0887CA] text-sm font-bold">
            {discountedPricePerNight.toLocaleString()} تومان
          </span>
        </div>

        {/* قیمت کل (بدون تخفیف) */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs">قیمت کل (بدون تخفیف)</span>
          <span className="text-gray-400 text-xs line-through">
            {originalTotal.toLocaleString()} تومان
          </span>
        </div>

        {/* قیمت نهایی */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-[#10088F] text-sm font-bold">قیمت نهایی</span>
          <span className="text-[#15977D] text-xl font-black">
            {discountedTotal.toLocaleString()} <span className="text-xs">تومان</span>
          </span>
        </div>
      </div>

      {/* دکمه تغییر هتل */}
      <Link href="/housereserve">
        <button className="w-full border border-blue-200 text-blue-500 py-4 rounded-[20px] mt-8 font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-950 transition-all">
          تغییر هتل
        </button>
      </Link>
    </div>
  );
};

export default BookingSummary;