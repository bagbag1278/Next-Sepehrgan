"use client";
import React, { useState } from "react";
import BookingSummaryTwo from "../components/BookingSummaryTwo";
import { ChevronDown, ChevronUp } from "lucide-react";
import TallerFlash from "./icon/flesh/TallerFlash";
import SmallFlash from "./icon/flesh/SmallFlash";
import SmallTwo from "./icon/flesh/SmallTwo";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

const BookingStepThree = ({
  hotelData,
  passengers,
  setStep,
  checkInDate,
  checkOutDate,
  step,
  extraEmail,
  extraPhone,
  description,
  handelFinalBooking,
  loading,
  isAllFormsValid,
  finalTotal,
  bookingPrices,
}: any) => {
  const [coupon, setCoupon] = useState("");
  const [isOpenn, setIsOpenn] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleApplyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscountAmount(10);
      setCouponApplied(true);
      alert("کد تخفیف با موفقیت اعمال شد!");
    } else if (coupon === "") {
      alert("لطفاً کد تخفیف را وارد کنید");
    } else {
      alert("کد تخفیف نامعتبر است");
    }
  };

  const discountedTotal = () => {
    const originalPrice = parseInt(finalTotal?.replace(/,/g, "0")) || 0;
    if (couponApplied) {
      const discount = originalPrice * (discountAmount / 100);
      return (originalPrice - discount).toLocaleString();
    }
    return finalTotal || "۰";
  };

  return (
    <div
      className="h-278 w-full relative bottom-30 max-[1280px]:h-375"
      dir="rtl"
    >
      <div className="relative -bottom-23 left-12 max-[1280px]:hidden">
        <div className="absolute left-5 top-150">
          <TallerFlash />
        </div>
        <div className="absolute left-16 top-150">
          <div className="absolute">
            <SmallFlash />
          </div>
          <div className="absolute mb-2 -mr-1">
            <SmallTwo />
          </div>
        </div>
      </div>
      <div className="w-11/12">
        <div className="flex items-start">
          <div
            className={`flex-1 flex w-full order-3 ${step === 3 ? "lg:order-1" : "lg:order-2"}`}
          >
            <div className="flex max-[1330px]:flex-col gap-8 items-start w-full">
              <div className="flex-1 w-full space-y-6 order-2 lg:order-1">
                <div className="rounded-[40px] p-8">
                  <div className="">
                    <button
                      onClick={() => setIsOpenn(!isOpenn)}
                      className="w-full max-[888]:hidden flex flex-col items-center p-4 mt-20 "
                    >
                      <div className="flex items-center  relative left- max-[888]:left-0 gap-2 mb-4">
                        <h3 className="font-bold text-lg w-full whitespace-nowrap">
                          اطلاع رسانی سفر
                        </h3>
                        <p className="text-gray-500 whitespace-nowrap text-[12px]">
                          (اطلاعات بلیط و اطلاع رسانی بعدی به این آدرس ارسال می
                          شود)
                        </p>
                        <div className="flex items-center gap-1">
                          {isOpenn ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>

                      {isOpenn && (
                        <div className="flex flex-col gap-4 w-full ">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">ایمیل:</span>
                            <span>{extraEmail || "example@gmail.com"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">موبایل:</span>
                            <span>{extraPhone || "09114456598"}</span>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="w-full  max-[888]:mt-40">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center justify-between w-full text-sm"
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
                        <input
                          type="text"
                          placeholder="کد تخفیف"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          className="flex-1 border border-[#0887CAB2] text-[#0887CAB2] p-4 rounded-2xl outline-none"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="w-full h-12 bg-[hsl(168,76%,34%)] text-white px-8 rounded-2xl font-bold"
                        >
                          اعمال کد تخفیف
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="border-b-2 w-full mt-10 border-gray-300 flex justify-center"></div>
                </div>

                <div className="rounded-[40px] p-8 relative bottom-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[rgb(0,94,164)] font-bold">
                      قیمت هتل
                    </span>
                    <span className="text-blue-900 font-black text-2xl">
                      {bookingPrices?.discountedTotal.toLocaleString() ||
                        finalTotal}{" "}
                      تومان
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between items-center mb-4 text-green-600">
                      <span className="font-bold">
                        تخفیف ({discountAmount}%)
                      </span>
                      <span className="font-bold">- {discountAmount}%</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-6">
                    <span className="font-bold text-gray-700">قیمت نهایی</span>
                    <span className="text-[#15977D] font-black text-2xl">
                      {discountedTotal()} تومان
                    </span>
                  </div>

                  <button
                    disabled={!isAllFormsValid || loading}
                    onClick={handelFinalBooking}
                    className={`w-full py-5 rounded-3xl font-black mt-10 transition-all ${
                      isAllFormsValid && !loading
                        ? "bg-[rgb(16,8,143)] text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {loading ? "در حال ثبت..." : "پرداخت آنلاین"}
                  </button>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full border-2 border-blue-900 text-blue-900 mt-3 py-4 rounded-3xl font-bold"
                  >
                    مرحله قبل
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-235 relative mt-26 flex max-[1024]:left-0 max-[1100]:left-20 max-[1330px]:justify-center">
                <AdvancedScrollAnimation type="slide-up" delay={0.2}>
                  <BookingSummaryTwo
                    finalTotal={finalTotal}
                    hotelData={hotelData}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    passengers={passengers}
                  />
                </AdvancedScrollAnimation>
                <div className="absolute max-[888]:mr-30  -bottom-30 flex-col  gap-5 flex justify-center w-122">
                  <div className="border-b border-gray-200 w-full"></div>
                  <div>
                    <h3 className="font-bold text-[16px] text-[rgb(0,94,164)]">
                      هزینه جانبی
                    </h3>
                    <p className="font-normal text-[14px] text-[rgba(6,4,37,0.5)] mt-3 leading-7">
                      {description}
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
