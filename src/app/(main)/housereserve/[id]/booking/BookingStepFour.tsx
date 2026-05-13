"use client";
import React from "react";
import BookingSummaryTwo from "../components/BookingSummaryTwo";
import Link from "next/link";
import SatisfactionTike from "@/app/(main)/housereserve/[id]/booking/icon/peyment/SatisfactionTike";
import SatisfactioMain from "@/app/(main)/housereserve/[id]/booking/icon/peyment/SatisfactioMain";
import PaymentHandOne from "@/app/(main)/housereserve/[id]/booking/icon/peyment/PaymentHandOne";
import PaymentHandTwo from "@/app/(main)/housereserve/[id]/booking/icon/peyment/PaymentHandTwo";

const BookingStepFour = ({
  hotelData,
  passengers,
  bookingSummary,
  checkInDate,
  checkOutDate,
  step,
}: any) => {
  if (step === 5) {
    return (
      <div className="h-300 max-[1280px]:h-375 pb-10" dir="rtl">
        <div className="w-full  mx-auto ">
          <div className="flex flex-col xl:flex-row  gap-20 w-full pt-6 md:pt-10">
            <div className=" flex justify-center  order-2 lg:order-1">
              <BookingSummaryTwo
                hotelData={hotelData}
                bookingSummary={bookingSummary}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                passengers={passengers}
              />
            </div>

            <div className="flex-1 min-h-screen w-full flex flex-col items-center justify-center space-y-6   lg:order-2">
              <div className="">
                <div className=" relative w-100 flex justify-end  ">
                  <div className="">
                    <SatisfactionTike />
                  </div>
                  <div className="absolute w-120 h-100 -top-30   ">
                    <SatisfactioMain />
                  </div>
                  <div className="  mt-30">
                    <div className="absolute right-95 mt-5 text-black dark:text-white  "><PaymentHandOne/></div>
                    <div className=" absolute left-45 dark:text-white "><PaymentHandTwo/></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-center">
                <h2 className="text-xl dark:text-white  md:text-2xl font-black text-[rgb(6,4,37)]">
                  رزرو بلیط شما با موفقیت انجام شد!
                </h2>
                <p className="text-gray-500 dark:text-white  text-sm md:text-base">
                  جزئیات رزرو به ایمیل و شماره همراه شما ارسال گردید.
                </p>
              </div>

              <div className="flex flex-col w-full max-w-xl gap-3 md:gap-4">
                <Link href="/" className="w-full">
                  <button className="w-full dark:text-white  bg-[rgb(16,8,143)] text-white py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold md:font-black shadow-md hover:bg-blue-900 transition-all active:scale-[0.98]">
                    بازگشت به صفحه اصلی
                  </button>
                </Link>

                <button className="w-full dark:text-white  bg-[rgb(21,151,125)] text-white py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold md:font-black shadow-md hover:bg-[#12806a] transition-all active:scale-[0.98]">
                  بلیط های من
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BookingStepFour;
