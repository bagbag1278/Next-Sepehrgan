"use client";
import React, { useState } from "react";
import BookingSummaryTwo from "../components/BookingSummaryTwo";
import { ChevronDown, ChevronUp } from "lucide-react";
import TallerFlash from "./icon/flesh/TallerFlash";
import SmallFlash from "./icon/flesh/SmallFlash";
import SmallTwo from "./icon/flesh/SmallTwo";

const BookingStepThree = ({
  hotelData,
  passengers,
  bookingSummary,
  setStep,
  checkInDate,
  checkOutDate,
  step,
  extraEmail,
  extraPhone,
  description,
}: any) => {
  const [coupon, setCoupon] = useState("");
  const [isOpenn, setIsOpenn] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="h-268 max-[1280px]:h-375" dir="rtl">
      <div className="relative bottom-16 left-3 max-[1280px]:hidden ">
        <div className="absolute left-5 top-150  ">
          <TallerFlash />
        </div>
        <div className="absolute left-16 top-150 ">
          <div className="absolute">
            <SmallFlash />
          </div>
          <div className="absolute mb-2 -mr-1">
            <SmallTwo />
          </div>
        </div>
      </div>
      <div className="w-11/12  mx-auto">
        <div className="flex  items-start">
          <div
            className={`flex-1 flex w-full order-3 ${step === 3 ? "lg:order-1" : "lg:order-2"}`}
          >
            <div className="flex  max-[1330px]:flex-col  gap-8 items-start w-full">
              <div className="flex-1 w-full space-y-6 order-2 lg:order-1">
                <div className=" rounded-[40px] p-8 ">
                  <div className="w-139 ">
                    {" "}
                    <button
                      onClick={() => setIsOpenn(!isOpenn)}
                      className="w-full flex flex-col items-center p-4 justify-center"
                    >
                      <div className="flex items-center justify-center gap-2 mb-4 ml-10 w-full ">
                        <h3 className="font-bold text-lg w-full whitespace-nowrap">
                          اطلاع رسانی سفر
                        </h3>{" "}
                        <p className="text-gray-500   whitespace-nowrap text-[12px]  ">
                          (اطلاعات بلیط و اطلاع رسانی بعدی به این آدرس ارسال می
                          شود){" "}
                        </p>
                        <div className="flex items-center gap-1">
                          {" "}
                          {isOpenn ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>

                      {isOpenn && (
                        <div className="flex flex-col gap-4 w-full max-w-114">
                          {" "}
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">ایمیل</span>
                            <span>{extraPhone || "example@gmail.com"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">موبایل</span>
                            <span>{extraPhone || "09114456598"}</span>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="w-full mb-8">
                    {" "}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center justify-between w-full text-sm "
                    >
                      <span className="font-bold">کد تخفیف</span>
                      {isOpen ? (
                        <span className="text-red-500">بستن</span>
                      ) : (
                        <span className="text-green-500">باز کردن</span>
                      )}
                    </button>
                    {isOpen && (
                      <div className="mt-4 flex flex-col gap-4">
                        {" "}
                        <input
                          type="text"
                          placeholder="کد تخفیف"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          className="flex-1 border border-[#0887CAB2] text-[#0887CAB2] p-4 rounded-2xl outline-none"
                        />
                        <button
                          onClick={() => {}}
                          className="w-full h-12 bg-[hsl(168,76%,34%)] text-white px-8 rounded-2xl font-bold"
                        >
                          اعمال کد تخفیف
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="border-b-2 w-full mt-10   border-gray-300 flex justify-center"></div>
                </div>
                <div className=" rounded-[40px] p-8 relative bottom-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[rgb(0,94,164)] font-bold">قیمت هتل</span>
                    <span className="text-blue-900 font-black text-2xl">
                      {bookingSummary.finalTotal} تومان
                    </span>
                  </div>
                  <button
                    onClick={() => setStep(5)}
                    className="w-full bg-[rgb(16,8,143)] text-white py-5 rounded-3xl font-black mb-4"
                  >
                    پرداخت آنلاین
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full border-2 border-blue-900 text-blue-900 py-4 rounded-3xl font-bold"
                  >
                    مرحله قبل
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-235  relative mb-10 flex max-[1330px]:justify-center ">
                <BookingSummaryTwo
                  hotelData={hotelData}
                  bookingSummary={bookingSummary}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  passengers={passengers}
                />

                <div className="absolute top-200  flex-col gap-7 flex justify-center w-116">
                  <div className="border-b-2 w-124    border-gray-300 flex justify-center"></div>
                  <div className="">
                    <h3 className="font-bold text-[16px] text-[rgb(0,94,164)] ">
                      هزینه جانبی
                    </h3>
                    <p className="font-normal text-[14px] text-[rgba(6,4,37,0.5)] mt-3">
                      {" "}
                      { description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStepThree;
