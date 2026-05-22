import Loaction from "@/components/HouseDetails/icon/icon/Loaction";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const ImageFallback =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpuJf7I24w6edIXo-v3-bsSiwFJssmCby3A&s";

interface Passenger {
  fullName?: string;
  gender?: "male" | "female";
  nationalCode?: string;
  birthDate?: string;
}

interface Props {
  hotelData: {
    title: string;
    photo?: string;
    address: string;
    rate?: number;
    rating?: number;
    price: number;
    discounted_price?: number;
    passengers?: string;
  };
  checkInDate: string;
  checkOutDate: string;
  passengers: Passenger[];
  finalTotal: string;
  bookingResult?: any;
  description?: string;
  showExtraCost?: boolean; 
}

const BookingSummaryTwo = ({
  hotelData,
  checkInDate,
  checkOutDate,
  passengers,
  finalTotal,
  bookingResult,
  description,
  showExtraCost = false, 
}: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const pricePerNight = hotelData?.discounted_price || hotelData?.price || 0;
  
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 1;
    return 1;
  };

  return (
    <div className="w-full mx-auto lg:mx-0 top-10 px-4 sm:px-0">
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg bg-white dark:bg-gray-800">
        {/* تصویر و عنوان */}
        <div className="w-full mb-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="relative w-full sm:w-[200px] lg:w-[240px] h-[160px] sm:h-[170px] rounded-2xl sm:rounded-[32px] overflow-hidden">
            <img
              src={hotelData?.photo || ImageFallback}
              className="w-full h-full object-cover"
              alt={hotelData?.title}
            />
          </div>
          <div className="flex flex-col justify-center text-center sm:text-right">
            <h2 className="font-black text-lg sm:text-xl flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[#060425] dark:text-white mb-2">
              {hotelData?.title}
              <div className="flex items-center gap-1 py-1 rounded-lg">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  {hotelData?.rate || hotelData?.rating || 0}
                </span>
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
              </div>
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-gray-400 text-xs sm:text-sm">
              <Loaction />
              <span className="line-clamp-1">{hotelData?.address}</span>
            </div>
          </div>
        </div>

        {/* اطلاعات تاریخ و قیمت */}
        <div className="space-y-3 sm:space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-sm font-bold">
            <span className="text-gray-900 dark:text-white">تاریخ ورود به هتل</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{checkInDate}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-sm font-bold">
            <span className="text-gray-900 dark:text-white">تاریخ خروج از هتل</span>
            <span className="text-gray-500 dark:text-gray-400">{checkOutDate}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="text-gray-500 text-sm font-bold dark:text-gray-400">
              قیمت نهایی
            </span>
            <div className="text-left w-full sm:w-auto">
              {hotelData?.price && hotelData?.discounted_price && (
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="text-gray-300 line-through text-xs">
                    {hotelData?.price?.toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-lg font-black">
                    ٪۵
                  </span>
                </div>
              )}
              <div className="text-[#15977D] font-black text-lg sm:text-xl">
                {finalTotal}
                <span className="text-xs mr-1">تومان</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 dark:border-gray-700 pt-4 sm:pt-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center text-[#060425] dark:text-white mb-4"
          >
            <span className="font-black text-sm">
              مشخصات مسافران ({passengers?.length || 0} مسافر)
            </span>
            {isOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>

          {isOpen && (
            <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-300">
              {passengers?.map((p, index) => (
                <div
                  key={index}
                  className="text-xs sm:text-sm space-y-2 sm:space-y-3 bg-gray-50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-gray-500">بازه سنی</span>
                    <span className="font-bold">بزرگسال</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-gray-500">نام و نام خانوادگی</span>
                    <span className="font-bold break-words max-w-[200px] sm:max-w-none">
                      {p.fullName || "---"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-gray-500">جنسیت</span>
                    <span className="font-bold">
                      {p.gender === "male" ? "مرد" : p.gender === "female" ? "زن" : "---"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-gray-500">کد ملی / شماره پاسپورت</span>
                    <span className="font-bold text-[#15977D]">
                      {p.nationalCode || "---"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-gray-500">تاریخ تولد</span>
                    <span className="font-bold">{p.birthDate || "---"}</span>
                  </div>
                </div>
              ))}

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-full h-11 sm:h-12 py-2 sm:py-3 bg-[rgb(16,8,143)] text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm hover:bg-blue-800 transition-colors"
              >
                ویرایش مسافران
              </button>
            </div>
          )}
        </div>

        {bookingResult?.id && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
            <p className="text-gray-500 text-xs">شماره رزرو</p>
            <p className="text-[#15977D] font-bold text-base sm:text-lg">{bookingResult.id}</p>
          </div>
        )}
      </div>

      {showExtraCost && description && (
        <div className="mt-4 flex flex-col gap-3">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          <div>
            <h3 className="font-bold text-[14px] md:text-[16px] text-[rgb(0,94,164)] dark:text-blue-400">
              هزینه جانبی
            </h3>
            <p className="font-normal text-[12px] md:text-[14px] text-[rgba(6,4,37,0.5)] dark:text-gray-400 mt-2 leading-6 md:leading-7">
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummaryTwo;