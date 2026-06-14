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
import moment from 'moment-jalaali';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

const BookingPage = () => {
  const t = useTranslations("Booking");
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  moment.loadPersian();

  const [hotelData, setHotelData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(2);
  const [extraEmail, setExtraEmail] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [openGenderIndex, setOpenGenderIndex] = useState<number | null>(null);

  const checkInDate = searchParams.get("in") || moment().format('jYYYY/jMM/jDD');
  const checkOutDate = searchParams.get("out") || moment().add(1, 'days').format('jYYYY/jMM/jDD');
  const initialGuests = Number(searchParams.get("guests")) || 1;

  const [passengers, setPassengers] = useState(
    Array.from({ length: initialGuests }, () => ({
      id: Math.random(),
      fullName: "",
      nationalCode: "",
      gender: "male",
      birthDate: "",
      number: "",
    })),
  );

const persianToGregorian = (persianDate: string) => {
  console.log("تبدیل تاریخ:", persianDate);
  
  if (!persianDate || persianDate === "" || persianDate === "نامشخص") {
    console.log("تاریخ خالی یا نامشخص است");
    return null;
  }
  
  try {
    let cleanDate = persianDate.replace(/[^0-9/]/g, "");
    console.log("cleanDate بعد از حذف کاراکترهای غیر عددی:", cleanDate);
    
    if (!cleanDate || cleanDate === "") {
      console.log("cleanDate خالی شد");
      return null;
    }
    
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    
    persianDigits.forEach((p, i) => {
      cleanDate = cleanDate.replace(new RegExp(p, "g"), englishDigits[i]);
    });
    
    console.log("cleanDate بعد از تبدیل ارقام فارسی به انگلیسی:", cleanDate);
    
    const parts = cleanDate.split("/");
    console.log("parts:", parts);
    
    if (parts.length !== 3) {
      console.log("فرمت تاریخ نامعتبر، تعداد بخش‌ها:", parts.length);
      return null;
    }
    
    let year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    
    console.log("year:", year, "month:", month, "day:", day);
    
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      console.log("اعداد نامعتبر");
      return null;
    }
        if (year > 2000) {
      console.log("تاریخ میلادی تشخیص داده شد");
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    
    if (year >= 1300 && year <= 1500) {
      console.log("تاریخ شمسی تشخیص داده شد");
      const m = moment(`${year}/${month}/${day}`, 'jYYYY/jMM/jDD');
      if (!m.isValid()) {
        console.log("تاریخ شمسی نامعتبر");
        return null;
      }
      const result = m.format('YYYY-MM-DD');
      console.log("نتیجه تبدیل شمسی به میلادی:", result);
      return result;
    }
    
    console.log("سال نامعتبر:", year);
    return null;
  } catch (error) {
    console.error("خطا در تبدیل تاریخ:", error);
    return null;
  }
};

  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate || inDate === "نامشخص" || outDate === "نامشخص") return 1;
    
    const start = persianToGregorian(inDate);
    const end = persianToGregorian(outDate);
    
    if (!start || !end) return 1;
    
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 1;
      
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return nights > 0 ? nights : 1;
    } catch (error) {
      return 1;
    }
  };

  const finalTotal = useMemo(() => {
    if (!hotelData) return "۰";
    const nights = calculateNights(checkInDate, checkOutDate);
    const pricePerNight = hotelData.discounted_price || hotelData.price || 0;
    const total = Number(pricePerNight) * nights * passengers.length;
    return total.toLocaleString();
  }, [hotelData, checkInDate, checkOutDate, passengers.length]);

  const bookingPrices = useMemo(() => {
    const originalPricePerNight = Number(hotelData?.price) || 0;
    const discountedPricePerNight = Number(hotelData?.discounted_price) || originalPricePerNight;
    const nights = calculateNights(checkInDate, checkOutDate);
    const guestCount = passengers.length;
    return {
      originalPricePerNight,
      discountedPricePerNight,
      nights,
      originalTotal: originalPricePerNight * nights * guestCount,
      discountedTotal: discountedPricePerNight * nights * guestCount,
    };
  }, [hotelData, checkInDate, checkOutDate, passengers.length]);

  const updatePassenger = (index: number, field: string, newValue: string) => {
    let finalValue = newValue;
    if (field === "nationalCode") {
      finalValue = newValue.replace(/[^0-9]/g, "").slice(0, 10);
    }
    if (field === "birthDate") {
      const numbers = newValue.replace(/[^0-9]/g, "");
      finalValue = "";
      for (let i = 0; i < numbers.length && i < 8; i++) {
        if (i === 4 || i === 6) finalValue += "/";
        finalValue += numbers[i];
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
    return (extraEmail === "" || emailRegex.test(extraEmail)) && 
           (extraPhone === "" || phoneRegex.test(extraPhone));
  }, [extraEmail, extraPhone]);

  const isAllFormsValid = useMemo(() => {
    return passengers.every((p) => {
      const nameParts = p.fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      return firstName.length > 0 &&
        lastName.length > 0 &&
        p.nationalCode.length === 10 &&
        p.gender !== "selectGender" &&
        p.birthDate.length > 0;
    });
  }, [passengers]);

  const addPassenger = () => {
    setPassengers([...passengers, {
      id: Date.now(),
      fullName: "",
      nationalCode: "",
      gender: "male",
      birthDate: "",
      number: "",
    }]);
  };

  const removePassenger = (id: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((p) => p.id !== id));
    }
  };

const handelFinalBooking = async () => {
  console.log("===== شروع رزرو =====");
  
  const token = localStorage.getItem("accessToken");
  console.log("1. توکن:", token ? "وجود دارد" : "ندارد");
  
  if (!token) {
    toast.error(t("loginRequired"));
    router.push("/login");
    return;
  }

  const startDate = persianToGregorian(checkInDate);
  const endDate = persianToGregorian(checkOutDate);
  console.log("2. تاریخ تبدیل شده:", { startDate, endDate, checkInDate, checkOutDate });
  
  if (!startDate || !endDate) {
    toast.error("تاریخ انتخاب شده معتبر نیست");
    return;
  }

  const traveler_details = [];
  for (let i = 0; i < passengers.length; i++) {
    const p = passengers[i];
    
    const nameParts = p.fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    let lastName = nameParts.slice(1).join(" ");
    
    if (!lastName) {
      lastName = "ناشناس";
    }
    
    let birthDateGregorian = null;
    if (p.birthDate) {
      birthDateGregorian = persianToGregorian(p.birthDate);
      if (!birthDateGregorian) {
        toast.error(`تاریخ تولد مسافر ${i + 1} معتبر نیست`);
        return;
      }
    }

    traveler_details.push({
      firstName: firstName,
      lastName: lastName,
      gender: p.gender === "male" ? "male" : "female",
      birthDate: birthDateGregorian || "2000-01-01",
      nationalId: p.nationalCode || "1234567890",
    });
  }
  console.log("3. مسافران:", traveler_details);

  const bookingPayload = {
    houseId: Number(params.id),
    reservedDates: [startDate, endDate],
    traveler_details: traveler_details,
    sharedEmail: extraEmail || undefined,
    sharedMobile: extraPhone || undefined,
  };

  console.log("4. payload نهایی:", JSON.stringify(bookingPayload, null, 2));

  try {
    setLoading(true);
    
    const url = `${API_BASE_URL}/bookings`;
    console.log("5. آدرس درخواست:", url);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingPayload),
    });

    console.log("6. وضعیت پاسخ:", response.status);
    
    const result = await response.json();
    console.log("7. پاسخ سرور:", result);

    if (!response.ok) {
      toast.error(result.message || result.error || "خطا در ثبت رزرو");
      return;
    }

    const bookingData = result.booking || result.data || result;
    setBookingResult(bookingData);
    setStep(5);
    toast.success("موفقیت امیز بود");
    window.scrollTo({ top: 0, behavior: "smooth" });
    
  } catch (error: any) {
    console.error("8. خطا:", error);
    toast.error(error.message || t("bookingFailed"));
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (!params.id) return;
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/houses/${params.id}`);
        if (!response.ok) throw new Error(`خطای سرور: ${response.status}`);
        const result = await response.json();
        setHotelData(result);
      } catch (error) {
        toast.error("خطا در دریافت اطلاعات هتل");
      } finally {
        setLoading(false);
      }
    };
    fetchHotelDetails();
  }, [params.id]);

  const description = hotelData?.caption || "توضیحاتی برای این هتل ثبت نشده است.";

  if (loading) return <div className="text-center mt-20 font-bold dark:text-white">{t("loadingHotel")}</div>;
  if (!hotelData) return <div className="text-center mt-20 font-bold dark:text-white">{t("hotelNotFound")}</div>;

  return (
    <div className="w-11/12 px-4 mx-auto" dir="rtl">
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

        <div className="rounded-2xl p-4 md:p-6  ">
          <div className="space-y-6">
            {step === 2 && (
              <div className="ml-20 max-[888px]:left-5 max-[888px]:ml-0 relative flex gap-50 mx-auto justify-center max-[1360px]:flex-col">
                <AdvancedScrollAnimation type="slide-right" delay={0.2}>
                  <BookingSummary
                    hotelData={hotelData}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    prices={bookingPrices}
                    guestsCount={passengers.length}
                    extraEmail={extraEmail}
                    extraPhone={extraPhone}
                  />
                </AdvancedScrollAnimation>

                <AdvancedScrollAnimation type="slide-left" delay={0.2}>
                  <div className="rounded-[40px] p-10 bg-white dark:bg-gray-800">
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
                        <AdvancedScrollAnimation key={passenger.id} type="slide-up" delay={0.1 + index * 0.05} duration={0.4}>
                          <div className="space-y-6 border-b border-gray-100 dark:border-gray-700 pb-8 last:border-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                  {t("passengerNumber")} {index + 1}
                                </span>
                              </div>
                              {passengers.length > 1 && (
                                <button onClick={() => removePassenger(passenger.id)} className="text-red-500 text-xs font-bold hover:underline">
                                  {t("removePassenger")} ×
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <input
                                type="text"
                                placeholder={t("fullName")}
                                value={passenger.fullName}
                                onChange={(e) => updatePassenger(index, "fullName", e.target.value)}
                                className="text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                              />
                              <input
                                type="text"
                                inputMode="numeric"
                                placeholder={t("nationalCode")}
                                value={passenger.nationalCode}
                                onChange={(e) => updatePassenger(index, "nationalCode", e.target.value)}
                                className="text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                              />
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => setOpenGenderIndex(openGenderIndex === index ? null : index)}
                                  className="w-full text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 p-4 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800"
                                >
                                  <span>
                                    {passenger.gender === "male" ? t("male") : 
                                     passenger.gender === "female" ? t("female") : t("selectGender")}
                                  </span>
                                  <ChevronDown size={18} className={`transition-transform text-gray-500 ${openGenderIndex === index ? "rotate-180" : ""}`} />
                                </button>
                                {openGenderIndex === index && (
                                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl overflow-hidden z-20 shadow-lg">
                                    <button onClick={() => { updatePassenger(index, "gender", "male"); setOpenGenderIndex(null); }} className="w-full text-right p-3 hover:bg-gray-50">
                                      {t("male")}
                                    </button>
                                    <button onClick={() => { updatePassenger(index, "gender", "female"); setOpenGenderIndex(null); }} className="w-full text-right p-3 hover:bg-gray-50">
                                      {t("female")}
                                    </button>
                                  </div>
                                )}
                              </div>
                              <input
                                type="text"
                                placeholder={t("birthDate")}
                                value={passenger.birthDate}
                                onChange={(e) => updatePassenger(index, "birthDate", e.target.value)}
                                className="text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                              />
                            </div>
                          </div>
                        </AdvancedScrollAnimation>
                      ))}
                    </div>

                    <button onClick={addPassenger} className="w-full py-5 mt-10 border-2 border-dashed border-blue-200 rounded-3xl text-blue-700 font-black hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                      + {t("addPassenger")}
                    </button>

                    <div className="rounded-[40px] p-10 mt-4">
                      <h3 className="font-bold text-gray-800 dark:text-white whitespace-nowrap mb-8 text-lg">
                        {t("sendTicketToOthers")}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                          type="email"
                          placeholder={t("email")}
                          value={extraEmail}
                          onChange={(e) => setExtraEmail(e.target.value)}
                          className="bg-gray-50 dark:bg-gray-900 border p-4 rounded-2xl outline-none text-gray-700 dark:text-white"
                        />
                        <input
                          type="text"
                          placeholder={t("phone")}
                          value={extraPhone}
                          onChange={(e) => setExtraPhone(e.target.value.replace(/[^0-9]/g, ""))}
                          maxLength={11}
                          className="bg-gray-50 dark:bg-gray-900 border p-4 rounded-2xl outline-none text-gray-700 dark:text-white"
                        />
                      </div>
                      <button
                        disabled={!isAllFormsNotif}
                        onClick={() => window.scrollTo(0, 0)}
                        className={`w-full py-5 rounded-3xl font-black mt-10 transition-all ${
                          isAllFormsNotif
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg cursor-pointer"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {t("saveInfo")}
                      </button>

                      <div className="mt-12 pt-6 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-gray-500 text-xs font-black">{t("finalPrice")}</span>
                          <span className="font-black text-blue-700 text-xl">
                            {bookingPrices.discountedTotal.toLocaleString()} {t("toman")}
                          </span>
                        </div>
                        <button
                          disabled={!isAllFormsValid}
                          onClick={() => { if (isAllFormsValid) { setStep(3); window.scrollTo(0, 0); } }}
                          className={`w-full py-5 rounded-3xl font-black mt-10 transition-all ${
                            isAllFormsValid
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {t("confirmAndContinue")}
                        </button>
                      </div>
                    </div>
                  </div>
                </AdvancedScrollAnimation>
              </div>
            )}

            {step === 3 && (
              <AdvancedScrollAnimation type="fade" delay={0.1}>
                <BookingStepThree
                  setStep={setStep}
                  hotelData={hotelData}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  passengers={passengers}
                  extraEmail={extraEmail}
                  extraPhone={extraPhone}
                  description={description}
                  handelFinalBooking={handelFinalBooking}
                  isAllFormsValid={isAllFormsValid}
                  finalTotal={finalTotal}
                  loading={loading}
                  bookingPrices={bookingPrices}
                />
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
                  extraEmail={extraEmail}
                  extraPhone={extraPhone}
                  bookingResult={bookingResult}
                  description={description}
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