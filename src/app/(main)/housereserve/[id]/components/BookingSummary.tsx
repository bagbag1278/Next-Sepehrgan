import Loaction from "@/components/HouseDetails/icon/icon/Loaction";
import Star from "@/components/HouseDetails/icon/icon/Star"; // استفاده از کامپوننت ستاره خودت
import { Stars } from "lucide-react";
import Link from "next/link";
import React from "react";

const ImageFallback =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpuJf7I24w6edIXo-v3-bsSiwFJssmCby3A&s";

interface Props {
  hotelData: {
    title: string;
    photo?: string;
    address: string;
    rate?: number;
    rating?: number;
    price: number;
    discounted_price?: number;
  };
  bookingSummary: {
    priceAfterDiscount: string;
    finalTotal: string;
    count: number;
  };
  checkInDate: string;
  checkOutDate: string;
}

const BookingSummary = ({
  hotelData,
  bookingSummary,
  checkInDate,
  checkOutDate,
}: Props) => {
  

  
  return (
    <div className="w-full  top-10 ">
      <div className=" rounded-[40px]  ">
        <div className="w-full flex justify-center relative mb-6">
          <img
            src={hotelData?.photo || ImageFallback}
            className="w-[509px] h-[315px] object-cover rounded-[32px]"
            alt="hotel"
          />
        </div>

        <h2 className="font-black text-xl justify-center flex items-center text-[#060425] dark:text-white  mb-2 gap-2">
          {hotelData?.title}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-gray-700 dark:text-white ">
              {hotelData?.rate || hotelData?.rating || 0}
            </span>
            <Stars size={14} className="text-yellow-400 fill-yellow-400" />
          </div>
        </h2>

        <div className="flex items-start gap-1 justify-center text-gray-400 text-xs mb-8 leading-5 text-center">
      
        </div>

        <span className="w-full justify-center relative bottom-7 flex dark:text-white "><Loaction />{hotelData?.address}  </span>
      </div>

      <div className="space-y-5 border-t border-gray-100 pt-6">
        <div className="flex justify-between text-sm font-bold">
          <span className="text-[#060425CC] dark:text-white ">تاریخ ورود به هتل</span>
          <span className="text-gray-400 italic dark:text-white " >{checkInDate}</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span className="text-[#060425CC] dark:text-white ">تاریخ خروج از هتل</span>
          <span className="text-gray-400 italic dark:text-white " >{checkOutDate}</span>
        </div>

        <div className="flex justify-between items-center mt-8 pt-4">
          <span className="text-gray-400 text-sm font-bold dark:text-white ">قیمت با تخفیف</span>
          <div className="flex flex-col items-end gap-1">
            {hotelData?.price && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-xs">
                  {hotelData.price.toLocaleString()}
                </span>
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-lg font-black">
                  ٪۵
                </span>
              </div>
            )}
            <span className="text-blue-600 font-black text-xl">
             {bookingSummary.finalTotal} {" "}
              <span className="text-xs font-bold">تومان</span>
            </span>
          </div>
        </div>
      </div>
              
      <Link href={`/housereserve`}>
        <button className="w-full border border-blue-200 text-blue-500 py-4 rounded-[20px] mt-8 font-bold text-sm hover:bg-blue-50 transition-all">
          تغییر هتل
        </button>
      </Link>
    </div>
  );
};

export default BookingSummary;
