import Loaction from "@/components/HouseDetails/icon/icon/Loaction";
import { Stars, ChevronDown, ChevronUp } from "lucide-react"; // آیکون‌ها
import Link from "next/link";
import React, { useState } from "react";

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
  bookingSummary: {
    priceAfterDiscount: string;
    finalTotal: string;
    count: number;
    description?: string;
  };
  checkInDate: string;
  checkOutDate: string;
  passengers: Passenger[];
}

const BookingSummaryTwo = ({
  hotelData,
  bookingSummary,
  checkInDate,
  checkOutDate,
  passengers,
  
}: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full lg:w-[500px] sticky top-10 space-y-4">
      <div className="">
        <div className="w-full mb-6 flex gap-3  ">
          <img
            src={hotelData?.photo || ImageFallback}
            className="w-[240px] h-[170px] object-cover rounded-[32px]"
            alt="hotel"
          />
          <div className="h-40 flex flex-col justify-center ">
            <h2 className="font-black text-xl flex items-center whitespace-nowrap text-[#060425] dark:text-white  mb-2 gap-2">
              {hotelData?.title}
              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                <span className="text-xs font-bold text-gray-700 ">
                  {hotelData?.rate || hotelData?.rating || 0}
                </span>
                <Stars size={14} className="text-yellow-400 fill-yellow-400 " />
              </div>
            </h2>

            <div className="flex items-center gap-1 text-gray-400 text-sm mb-6 ">
              <Loaction />
              <span>{hotelData?.address}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-100 pt-6">
          <div className="flex justify-between text-sm font-bold">
            <span className=" text-gray-900 dark:text-white ">تاریخ ورود به هتل</span>
            <span className="text-gray-500 dark:text-white ">{checkInDate}</span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span className=" text-gray-900 dark:text-white ">تاریخ خروج از هتل</span>
            <span className="text-gray-500 dark:text-white ">{checkOutDate}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500 text-sm font-bold dark:text-white ">
              قیمت با تخفیف
            </span>
            <div className="text-left">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-gray-300 line-through text-xs">
                  {hotelData?.price.toLocaleString()}
                </span>
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-lg font-black">
                  ٪۵
                </span>
              </div>
              <div className="text-blue-600 font-black text-xl">
                {bookingSummary.finalTotal}
                <span className="text-xs">تومان</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center text-[#060425] mb-4"
          >
            <span className="font-black text-sm dark:text-white ">
              مشخصات مسافران ({passengers.length} مسافر)
            </span>
            {isOpen ? <ChevronUp className="dark:text-white " size={20} /> : <ChevronDown className="dark:text-white " size={20} />}
          </button>

          {isOpen && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {passengers.map((p, index) => (
                <div
                  key={index}
                  className="text-xs space-y-3  p-4 rounded-2xl"
                >
                  <div className="flex justify-between">
                    <span className="text-gray-500">بازه سنی</span>
                    <span className="font-bold">بزرگسال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">نام و نام خانوادگی</span>
                    <span className="font-bold">{p.fullName || "---"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">جنسیت</span>
                    <span className="font-bold">
                      {p.gender === "male" ? "مرد" : "زن"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      کد ملی / شماره پاسپورت
                    </span>
                    <span className="font-bold text-[#15977D]">
                      {p.nationalCode || "---"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">تاریخ تولد</span>
                    <span className="font-bold">{p.birthDate || "-"}</span>
                  </div>
                        <div className="flex justify-between">
                    <span className="text-gray-500  "> خدمات</span>
                    <span className="font-bold dark:text-white ">{ "-"}</span>
                  </div>
                        <div className="flex justify-between">
                    <span className="text-gray-500"> مبلغ خدمات</span>
                    <span className="font-bold">{ "-"}</span>
                  </div>
                        <div className="flex justify-between">
                    <span className="text-gray-500  "> قیمت</span>
                    <span className="font-bold text-[#0887CA] ">  {bookingSummary.finalTotal}</span>
                  </div>
                </div>
              ))}

              <button
                onClick={() => window.scrollTo(0, 500)}
                className="w-full h-[48px] py-3 bg-blue-900 text-white rounded-2xl font-bold text-xs hover:bg-blue-800 transition-colors"
              >
                ویرایش مسافران
              </button>
              
                 
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default BookingSummaryTwo;
