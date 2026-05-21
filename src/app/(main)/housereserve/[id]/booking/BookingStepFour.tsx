"use client";
import React from "react";

import Link from "next/link";
import SatisfactionTike from "@/app/(main)/housereserve/[id]/booking/icon/peyment/SatisfactionTike";
import SatisfactioMain from "@/app/(main)/housereserve/[id]/booking/icon/peyment/SatisfactioMain";
import PaymentHandOne from "@/app/(main)/housereserve/[id]/booking/icon/peyment/PaymentHandOne";
import PaymentHandTwo from "@/app/(main)/housereserve/[id]/booking/icon/peyment/PaymentHandTwo";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import BookingSummaryTwo from "../components/BookingSummaryTwo";

const BookingStepFour = ({
  hotelData,
  passengers,
  checkInDate,
  checkOutDate,
  step,
  finalTotal,
  bookingResult,
  description
}: any) => {
  if (step !== 5) return null;

  return (
    <div className="h-300 max-[1280px]:h-375 pb-10" dir="rtl">
      <div className="w-full mx-auto">
        <div className="flex flex-col max-[888]:left-5 relative xl:flex-row gap-20 w-full pt-6 md:pt-10">
          
            <div className="flex justify-center order-2 lg:order-1">
              <BookingSummaryTwo
                finalTotal={finalTotal}
                hotelData={hotelData}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                passengers={passengers}
                bookingResult={bookingResult}
                description={description}
              />
            </div>

          <div className="flex-1 w-full flex flex-col items-center justify-center space-y-6 lg:order-2">
            
              <div className="">
                <div className="relative w-100 flex justify-end">
                  <div className="max-[508]:hidden">
                    <SatisfactionTike />
                  </div>
                  <div className="absolute w-120 h-100 max-[508]:w- max-[508]:relative max-[508]:h-40 -top-30 max-[508]:-top-20 max-[508]:-left-10">
                    <SatisfactioMain />
                  </div>
                  <div className="mt-30 max-[508]:hidden">
                    <div className="absolute right-95 mt-5 text-black dark:text-white">
                      <PaymentHandOne />
                    </div>
                    <div className="absolute left-45 dark:text-white">
                      <PaymentHandTwo />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-center">
                <h2 className="text-xl dark:text-white md:text-2xl font-black text-[rgb(6,4,37)]">
                  رزرو بلیط شما با موفقیت انجام شد!
                </h2>
                <p className="text-gray-500 dark:text-white text-sm md:text-base">
                  جزئیات رزرو به ایمیل و شماره همراه شما ارسال گردید.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl text-center space-y-2 w-full max-w-md">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  تاریخ ورود: {checkInDate} | تاریخ خروج: {checkOutDate}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  تعداد مسافران: {passengers?.length || 0} نفر
                </p>
                <p className="text-[#15977D] font-black text-xl">
                  مبلغ پرداختی: {finalTotal} تومان
                </p>
              </div>

              <div className="flex flex-col w-full max-w-xl gap-3 md:gap-4">
                <Link href="/" className="w-full">
                  <button className="w-full dark:text-white bg-[rgb(16,8,143)] text-white py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold md:font-black shadow-md hover:bg-blue-900 transition-all active:scale-[0.98]">
                    بازگشت به صفحه اصلی
                  </button>
                </Link>

                <Link href="/dashboard/bookings" className="w-full">
                  <button className="w-full dark:text-white bg-[rgb(21,151,125)] text-white py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold md:font-black shadow-md hover:bg-[#12806a] transition-all active:scale-[0.98]">
                    مشاهده بلیط‌های من
                  </button>
                </Link>

                <button 
                  onClick={() => window.print()}
                  className="w-full dark:text-white bg-gray-100 text-gray-700 py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold shadow-md hover:bg-gray-200 transition-all"
                >
                  چاپ اطلاعات رزرو
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStepFour;