"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import BookingSummaryTwo from "../components/BookingSummaryTwo";
import { ChevronDown, ChevronUp } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

const BookingStepThree = ({
  hotelData,
  passengers,
  setStep,
  checkInDate,
  checkOutDate,
  extraEmail,
  extraPhone,
  description,
  handelFinalBooking,
  loading,
  isAllFormsValid,
  finalTotal,
  bookingPrices,
}: any) => {
  const t = useTranslations("BookingStepThree");
  const [coupon, setCoupon] = useState("");
  const [isOpenn, setIsOpenn] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleApplyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscountAmount(10);
      setCouponApplied(true);
      alert(t("couponSuccess"));
    } else if (coupon === "") {
      alert(t("couponEmpty"));
    } else {
      alert(t("couponInvalid"));
    }
  };

  const discountedTotal = () => {
    const originalPrice = parseInt(finalTotal?.replace(/,/g, "")) || 0;
    if (couponApplied) {
      const discount = originalPrice * (discountAmount / 100);
      return (originalPrice - discount).toLocaleString();
    }
    return finalTotal || "۰";
  };

  const handleNextStep = () => {
    if (isAllFormsValid && !loading) {
      handelFinalBooking();
    }
  };

  return (
    <div
      className="h-278 w-full relative bottom-30 max-[1280px]:h-375"
      dir="rtl"
    >
     
      <div className="w-11/12">
        <div className="flex items-start">
          <div className="flex-1 flex w-full order-3 lg:order-1">
            <div className="flex max-[1330px]:flex-col gap-8 items-start w-full">
              <div className="flex-1 w-full space-y-6 order-2 lg:order-1">
                <div className="rounded-[40px] p-8">
                  <div className="">
                    <button
                      onClick={() => setIsOpenn(!isOpenn)}
                      className="w-full max-[888]:hidden flex flex-col items-center p-4 mt-20"
                    >
                      <div className="flex items-center relative gap-2 mb-4">
                        <h3 className="font-bold text-lg w-full whitespace-nowrap">
                          {t("travelNotification")}
                        </h3>
                        <p className="text-gray-500 whitespace-nowrap text-[12px]">
                          {t("notificationInfo")}
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
                        <div className="flex flex-col gap-4 w-full">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">{t("email")}:</span>
                            <span>{extraEmail || "example@gmail.com"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">
                              {t("mobile")}:
                            </span>
                            <span>{extraPhone || "09114456598"}</span>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="w-full">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center justify-between w-full text-sm"
                    >
                      <span className="font-bold">{t("discountCode")}</span>
                      {isOpen ? (
                        <span className="text-red-500">{t("close")}</span>
                      ) : (
                        <span className="text-green-500">{t("open")}</span>
                      )}
                    </button>
                    {isOpen && (
                      <div className="mt-4 flex flex-col gap-4">
                        <input
                          type="text"
                          placeholder={t("discountCodePlaceholder")}
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          className="flex-1 border border-[#0887CAB2] text-[#0887CAB2] p-4 rounded-2xl outline-none"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="w-full h-12 bg-[hsl(168,76%,34%)] text-white px-8 rounded-2xl font-bold"
                        >
                          {t("applyCoupon")}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="border-b-2 w-full mt-10 border-gray-300 flex justify-center"></div>
                </div>

                <div className="rounded-[40px] p-8 relative bottom-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[rgb(0,94,164)] font-bold">
                      {t("hotelPrice")}
                    </span>
                    <span className="text-blue-900 font-black text-2xl">
                      {bookingPrices?.discountedTotal?.toLocaleString() ||
                        finalTotal}{" "}
                      {t("toman")}
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between items-center mb-4 text-green-600">
                      <span className="font-bold">
                        {t("discount")} ({discountAmount}%)
                      </span>
                      <span className="font-bold">- {discountAmount}%</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-6">
                    <span className="font-bold text-gray-700">
                      {t("finalPrice")}
                    </span>
                    <span className="text-[#15977D] font-black text-2xl">
                      {discountedTotal()} {t("toman")}
                    </span>
                  </div>

                  <button
                    disabled={!isAllFormsValid || loading}
                    onClick={handleNextStep}
                    className={`w-full py-5 rounded-3xl font-black mt-10 transition-all ${
                      isAllFormsValid && !loading
                        ? "bg-[rgb(16,8,143)] text-white cursor-pointer hover:bg-[rgb(20,12,160)]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "در حال پردازش..." : t("onlinePayment")}
                  </button>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full border-2 border-blue-900 text-blue-900 mt-3 py-4 rounded-3xl font-bold"
                  >
                    {t("previousStep")}
                  </button>
                </div>
              </div>

              <div className="w-full relative mt-26 flex justify-center">
                <AdvancedScrollAnimation type="slide-up" delay={0.2}>
                  <BookingSummaryTwo
                    finalTotal={finalTotal}
                    hotelData={hotelData}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    passengers={passengers}
                    description={description}
                    showExtraCost={true}
                    extraEmail={extraEmail}
                    extraPhone={extraPhone}
                    prices={bookingPrices}
                    setStep={setStep}
                  />
                </AdvancedScrollAnimation>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStepThree;