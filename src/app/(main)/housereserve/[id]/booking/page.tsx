"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Bread from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Header/Bread";
import BookingSummary from "../components/BookingSummary";
import Stepper from "../components/Stepper";
import BookingStepThree from "./BookingStepThree";
import BookingStepFour from "./BookingStepFour";
import { toast } from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";


const BookingPage = () => {
  const t = useTranslations("Booking");
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [hotelData, setHotelData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(2);
  const [extraEmail, setExtraEmail] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [openGenderIndex, setOpenGenderIndex] = useState<number | null>(null);

  const checkInDate = searchParams.get("in") || "۱۴۰۴/۰۶/۱۶";
  const checkOutDate = searchParams.get("out") || "۱۴۰۴/۰۶/۱۷";
  const initialGuests = Number(searchParams.get("guests")) || 1;

  const [passengers, setPassengers] = useState(
    Array.from({ length: initialGuests }, () => ({
      id: Math.random(),
      fullName: "",
      nationalCode: "",
      gender: t("selectGender"),
      birthDate: "",
      number: "",
    })),
  );

  const persianToGregorian = (persianDate: string) => {
    if (!persianDate) return null;

    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let englishDate = persianDate;
    persianDigits.forEach((p, i) => {
      englishDate = englishDate.replace(new RegExp(p, "g"), englishDigits[i]);
    });

    const parts = englishDate.split("/");
    if (parts.length === 3) {
      const persianYear = parseInt(parts[0]);
      const month = parts[1].padStart(2, "0");
      const day = parts[2].padStart(2, "0");
      const gregorianYear = persianYear + 621;
      return `${gregorianYear}/${month}/${day}`;
    }
    return persianDate;
  };

  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 1;

    const start = persianToGregorian(inDate);
    const end = persianToGregorian(outDate);

    if (!start || !end) return 1;

    const [startYear, startMonth, startDay] = start.split("/").map(Number);
    const [endYear, endMonth, endDay] = end.split("/").map(Number);

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays || 1;
  };

  const finalTotal = useMemo(() => {
    if (!hotelData) return "۰";

    const nights = calculateNights(checkInDate, checkOutDate);
    const pricePerNight = hotelData.discountedPrice || hotelData.price || 0;
    const total = pricePerNight * nights * passengers.length;

    return total.toLocaleString();
  }, [hotelData, checkInDate, checkOutDate, passengers.length]);

  const handelFinalBooking = async () => {
    console.log("🔵 شروع فرآیند رزرو...");

    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error(t("loginRequired"));
      router.push("/login");
      return;
    }

    const traveler_details = [];
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];

      const nameParts = p.fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      if (!firstName) {
        toast.error(t("firstNameRequired", { number: i + 1 }));
        return;
      }

      if (!p.nationalCode || p.nationalCode.length !== 10) {
        toast.error(t("nationalCodeRequired", { number: i + 1 }));
        return;
      }

      if (!p.gender || p.gender === t("selectGender")) {
        toast.error(t("genderRequired", { number: i + 1 }));
        return;
      }

      if (!p.birthDate) {
        toast.error(t("birthDateRequired", { number: i + 1 }));
        return;
      }

      const formattedBirthDate = p.birthDate.replace(/\//g, "-");

      traveler_details.push({
        firstName: firstName,
        lastName: lastName || firstName,
        gender: p.gender === t("male") ? "male" : "female",
        birthDate: formattedBirthDate,
        nationalId: p.nationalCode,
      });
    }

    try {
      setLoading(true);

      const bookingPayload = {
        houseId: Number(params.id),
        reservedDates: [
          persianToGregorian(checkInDate),
          persianToGregorian(checkOutDate),
        ],
        traveler_details: traveler_details,
        sharedEmail: extraEmail || undefined,
        sharedMobile: extraPhone || undefined,
      };

      const response = await fetch(`/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      const responseText = await response.text();
      console.log("📡 پاسخ خام:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("پاسخ JSON نیست:", responseText);
        throw new Error("پاسخ سرور نامعتبر است");
      }

      if (!response.ok) {
        console.error("خطای سرور:", result);
        throw new Error(result.message || "خطا در ثبت رزرو");
      }

      console.log("✅ نتیجه موفقیت:", result);

      setBookingResult(result.booking);
      setStep(5);
      toast.success(t("bookingSuccess", { id: result.booking?.id }));
    } catch (error: any) {
      console.error("خطا:", error);
      toast.error(error.message || t("bookingFailed"));
    } finally {
      setLoading(false);
    }
  };

  const updatePassenger = (index: number, field: string, newValue: string) => {
    let finalValue = newValue;
    if (field === "nationalCode") {
      finalValue = newValue.replace(/[^0-9]/g, "").slice(0, 10);
    }

    if (field === "birthDate") {
      const numbers = newValue.replace(/[^0-9]/g, "");
      const char: Record<number, string> = { 4: "/", 6: "/" };
      finalValue = "";
      for (let i = 0; i < numbers.length && i < 8; i++) {
        finalValue += (char[i] || "") + numbers[i];
      }
    }

    if (field === "fullName") {
      finalValue = newValue.replace(/[0-9]/g, "");
    }

    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: finalValue };
    setPassengers(newPassengers);
  };

  const isAllFormsNotif = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^09\d{9}$/;

    const extraEmailValid = extraEmail === "" || emailRegex.test(extraEmail);
    const extraPhoneValid = extraPhone === "" || phoneRegex.test(extraPhone);

    return extraEmailValid && extraPhoneValid;
  }, [extraEmail, extraPhone]);

  const isAllFormsValid = useMemo(() => {
    return passengers.every((p) => {
      const nameParts = p.fullName.trim().split(" ");
      const firstName = nameParts[0] || "";

      return (
        firstName.length > 0 &&
        p.nationalCode.length === 10 &&
        p.gender !== t("selectGender") &&
        p.birthDate.length > 0
      );
    });
  }, [passengers, t]);

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        id: Date.now(),
        fullName: "",
        nationalCode: "",
        gender: t("selectGender"),
        birthDate: "",
        number: "",
      },
    ]);
  };

  const removePassenger = (id: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((p) => p.id !== id));
    }
  };

  const bookingPrices = useMemo(() => {
    const originalPricePerNight = hotelData?.price || 0;
    const discountedPricePerNight =
      hotelData?.discounted_price || Math.floor(originalPricePerNight * 0.95);

    const gregorianIn = persianToGregorian(checkInDate);
    const gregorianOut = persianToGregorian(checkOutDate);

    const nights = calculateNights(gregorianIn || "", gregorianOut || "");
    const guestCount = passengers.length;

    const originalTotal = originalPricePerNight * nights * guestCount;
    const discountedTotal = discountedPricePerNight * nights * guestCount;

    return {
      originalPricePerNight,
      discountedPricePerNight,
      nights,
      originalTotal,
      discountedTotal,
    };
  }, [hotelData, checkInDate, checkOutDate, passengers.length]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (!params.id) {
        console.error("آیدی هتل وجود ندارد");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(`/api/houses/${params.id}`);

        if (response.status === 401) {
          toast.error(t("sessionExpired"));
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        if (response.status === 404) {
          toast.error("هتل مورد نظر یافت نشد");
          return;
        }

        if (!response.ok) {
          throw new Error(`خطای سرور: ${response.status}`);
        }

        const result = await response.json();
        setHotelData(result);
      } catch (error) {
        console.error("Error details:", error);
        toast.error("خطا در دریافت اطلاعات هتل");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [params.id]);

  const description =
    hotelData?.description || "توضیحاتی برای این هتل ثبت نشده است.";

  if (loading)
    return (
      <div className="text-center mt-20 font-bold dark:text-white">
        {t("loadingHotel")}
      </div>
    );

  if (!hotelData)
    return (
      <div className="text-center mt-20 font-bold dark:text-white">
        {t("hotelNotFound")}
      </div>
    );

  return (
    <div className="w-11/12 px-4" dir="rtl">
      <div className="space-y-4 md:space-y-6">
        <AdvancedScrollAnimation type="slide-up" delay={0.1}>
          <div className="pt-10 z-20">
            <Bread
              items={[
                { title: t("hotelReserve"), href: "/housereserve" },
                { title: hotelData?.title },
              ]}
            />
          </div>
        </AdvancedScrollAnimation>

        <div className="rounded-2xl p-4 md:p-6 800 shadow-lg">
          <div className="space-y-6">
            {step === 2 && (
              <div className="">
                <div className="ml-20 max-[888px]:left-5 max-[888px]:ml-0 relative flex gap-50 mx-auto justify-center max-[1360px]:flex-col">
                  <AdvancedScrollAnimation type="slide-right" delay={0.2}>
                    <div>
                      <BookingSummary
                        hotelData={hotelData}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        prices={bookingPrices}
                        guestsCount={passengers.length}
                      />
                    </div>
                  </AdvancedScrollAnimation>

                  <AdvancedScrollAnimation type="slide-left" delay={0.2}>
                    <div className="rounded-[40px] p-10 ">
                      <div className="rounded-[40px]">
                        <h3 className="font-bold text-gray-800 dark:text-white whitespace-nowrap text-lg mb-20">
                          {t("selectedPassengers")} ({passengers.length})
                        </h3>
                      </div>
                      <h2 className="text-xl font-black mb-10 whitespace-nowrap text-[hsl(244,80%,8%)] dark:text-white">
                        {t("passengerInfo")}
                      </h2>
                      <div className="space-y-12">
                        {passengers.map((passenger, index) => (
                          <AdvancedScrollAnimation
                            key={passenger.id}
                            type="slide-up"
                            delay={0.1 + index * 0.05}
                            duration={0.4}
                          >
                            <div className="space-y-6 border-b border-gray-100 dark:border-gray-700 pb-8 last:border-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  <span className="font-bold text-gray-700 dark:text-gray-300">
                                    {t("passengerNumber")} {index + 1}
                                  </span>
                                </div>
                                {passengers.length > 1 && (
                                  <button
                                    onClick={() =>
                                      removePassenger(passenger.id)
                                    }
                                    className="text-red-500 text-xs font-bold hover:underline"
                                  >
                                    {t("removePassenger")} ×
                                  </button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                  name="fullName"
                                  required
                                  type="text"
                                  placeholder={t("fullName")}
                                  value={passenger.fullName}
                                  onChange={(e) =>
                                    updatePassenger(
                                      index,
                                      "fullName",
                                      e.target.value,
                                    )
                                  }
                                  className="text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  placeholder={t("nationalCode")}
                                  value={passenger.nationalCode}
                                  onChange={(e) =>
                                    updatePassenger(
                                      index,
                                      "nationalCode",
                                      e.target.value,
                                    )
                                  }
                                  className="text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                                <div className="relative">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenGenderIndex(
                                        openGenderIndex === index
                                          ? null
                                          : index,
                                      )
                                    }
                                    className="w-full text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 p-4 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <span>
                                      {passenger.gender === t("male")
                                        ? t("male")
                                        : passenger.gender === t("female")
                                          ? t("female")
                                          : t("selectGender")}
                                    </span>
                                    <ChevronDown
                                      size={18}
                                      className={`transition-transform text-gray-500 dark:text-gray-400 ${
                                        openGenderIndex === index
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </button>

                                  {openGenderIndex === index && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden z-20 shadow-lg">
                                      <button
                                        onClick={() => {
                                          updatePassenger(
                                            index,
                                            "gender",
                                            t("male"),
                                          );
                                          setOpenGenderIndex(null);
                                        }}
                                        className="w-full text-right p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white"
                                      >
                                        {t("male")}
                                      </button>
                                      <button
                                        onClick={() => {
                                          updatePassenger(
                                            index,
                                            "gender",
                                            t("female"),
                                          );
                                          setOpenGenderIndex(null);
                                        }}
                                        className="w-full text-right p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white"
                                      >
                                        {t("female")}
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  placeholder={t("birthDate")}
                                  value={passenger.birthDate}
                                  onChange={(e) =>
                                    updatePassenger(
                                      index,
                                      "birthDate",
                                      e.target.value,
                                    )
                                  }
                                  className="text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                              </div>
                            </div>
                          </AdvancedScrollAnimation>
                        ))}
                      </div>

                      <AdvancedScrollAnimation type="scale" delay={0.3}>
                        <button
                          onClick={addPassenger}
                          className="w-full py-5 mt-10 whitespace-nowrap border-2 border-dashed border-blue-200 dark:border-gray-600 rounded-3xl text-blue-700 dark:text-blue-300 font-black hover:bg-blue-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                        >
                          + {t("addPassenger")}
                        </button>
                      </AdvancedScrollAnimation>

                      <AdvancedScrollAnimation type="fade" delay={0.2}>
                        <div className="rounded-[40px] p-10 ">
                          <h3 className="font-bold text-gray-800 dark:text-white whitespace-nowrap mb-8 text-lg">
                            {t("sendTicketToOthers")}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                              type="email"
                              placeholder={t("email")}
                              value={extraEmail}
                              onChange={(e) => {
                                const val = e.target.value
                                  .replace(/[^\x00-\x7F]/g, "")
                                  .replace(/\s/g, "");
                                setExtraEmail(val);
                              }}
                              className={`bg-gray-50 dark:bg-gray-900 border p-4 rounded-2xl outline-none transition-all text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                                extraEmail &&
                                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(extraEmail)
                                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                  : "border-gray-200 dark:border-gray-700"
                              }`}
                            />
                            <input
                              type="text"
                              placeholder={t("phone")}
                              value={extraPhone}
                              inputMode="numeric"
                              maxLength={11}
                              onChange={(e) => {
                                const val = e.target.value.replace(
                                  /[^0-9]/g,
                                  "",
                                );
                                setExtraPhone(val);
                              }}
                              className={`bg-gray-50 dark:bg-gray-900 border p-4 rounded-2xl outline-none transition-all text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                                extraPhone && !/^09\d{9}$/.test(extraPhone)
                                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                  : "border-gray-200 dark:border-gray-700"
                              }`}
                            />
                          </div>

                          <button
                            type="button"
                            disabled={!isAllFormsNotif}
                            onClick={() => {
                              if (isAllFormsNotif) {
                                window.scrollTo(0, 0);
                              }
                            }}
                            className={`w-full py-5 rounded-3xl font-black mt-10 transition-all duration-300 ${
                              isAllFormsNotif
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg cursor-pointer"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {t("saveInfo")}
                          </button>

                          <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between max-[888px]:flex-col items-center mb-6">
                              <span className="text-gray-500 dark:text-gray-400 text-xs font-black">
                                {t("finalPrice")}
                              </span>
                              <span className="font-black whitespace-nowrap max-[888px]:mt-4 text-blue-700 dark:text-blue-300 text-xl">
                                {bookingPrices.discountedTotal.toLocaleString()}{" "}
                                {t("toman")}
                              </span>
                            </div>

                            <button
                              disabled={!isAllFormsValid}
                              onClick={() => {
                                if (isAllFormsValid) {
                                  setStep(3);
                                  window.scrollTo(0, 0);
                                }
                              }}
                              className={`w-full py-5 rounded-3xl font-black mt-10 transition-all ${
                                isAllFormsValid
                                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {t("confirmAndContinue")}
                            </button>
                          </div>
                        </div>
                      </AdvancedScrollAnimation>
                    </div>
                  </AdvancedScrollAnimation>
                </div>
              </div>
            )}

            {step === 3 && (
              <AdvancedScrollAnimation type="fade" delay={0.1}>
                <div className="w-full">
                  <BookingStepThree
                    step={step}
                    setStep={setStep}
                    hotelData={hotelData}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    passengers={passengers}
                    updatePassenger={updatePassenger}
                    removePassenger={removePassenger}
                    addPassenger={addPassenger}
                    extraEmail={extraEmail}
                    setExtraEmail={setExtraEmail}
                    extraPhone={extraPhone}
                    setExtraPhone={setExtraPhone}
                    description={description}
                    handelFinalBooking={() => {
                      console.log(
                        " handelFinalBooking از BookingStepThree فراخوانی شد",
                      );
                      handelFinalBooking();
                    }}
                    isAllFormsValid={isAllFormsValid}
                    finalTotal={finalTotal}
                    loading={loading}
                    bookingPrices={bookingPrices}
                  />
                </div>
              </AdvancedScrollAnimation>
            )}


            {step === 5 && (
              <AdvancedScrollAnimation type="scale" delay={0.1}>
                <BookingStepFour
                  step={step}
                  setStep={setStep}
                  hotelData={hotelData}
                  finalTotal={finalTotal}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  passengers={passengers}
                  updatePassenger={updatePassenger}
                  removePassenger={removePassenger}
                  addPassenger={addPassenger}
                  extraEmail={extraEmail}
                  setExtraEmail={setExtraEmail}
                  extraPhone={extraPhone}
                  setExtraPhone={setExtraPhone}
                  bookingResult={bookingResult}
                />
              </AdvancedScrollAnimation>
            )}
          </div>

          <div className="left-0 top-30 absolute">
            <Stepper step={step} setStep={setStep} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
