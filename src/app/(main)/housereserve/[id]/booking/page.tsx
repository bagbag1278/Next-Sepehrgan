"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Bread from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Header/Bread";
import BookingSummary from "../components/BookingSummary";
import Stepper from "../components/Stepper";
import BookingStepThree from "./BookingStepThree";
import BookingStepFour from "./BookingStepFour";
import { toast } from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

const BookingPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [hotelData, setHotelData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(2);
  const [extraEmail, setExtraEmail] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openGenderIndex, setOpenGenderIndex] = useState<number | null>(null);

  const checkInDate = searchParams.get("in") || "۱۴۰۴/۰۶/۱۶";
  const checkOutDate = searchParams.get("out") || "۱۴۰۴/۰۶/۱۷";
  const initialGuests = Number(searchParams.get("guests")) || 1;

  const [passengers, setPassengers] = useState(
    Array.from({ length: initialGuests }, () => ({
      id: Math.random(),
      fullName: "",
      nationalCode: "",
      gender: "جنسیت",
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
    console.log(" شروع فرآیند رزرو...");

    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");

    if (!token) {
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
      router.push("/login");
      return;
    }

    let userId = null;
    if (userData) {
      try {
        const user = JSON.parse(userData);
        userId = user.id;
      } catch (e) {
        console.error("خطا در parse user:", e);
      }
    }

    if (!userId) {
      toast.error("اطلاعات کاربر یافت نشد");
      return;
    }

    const traveler_details = [];
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];

      const nameParts = p.fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      if (!firstName) {
        toast.error(`لطفاً نام مسافر شماره ${i + 1} را وارد کنید`);
        return;
      }

      if (!p.nationalCode || p.nationalCode.length !== 10) {
        toast.error(`لطفاً کد ملی مسافر شماره ${i + 1} را به درستی وارد کنید`);
        return;
      }

      if (!p.gender || p.gender === "جنسیت") {
        toast.error(`لطفاً جنسیت مسافر شماره ${i + 1} را انتخاب کنید`);
        return;
      }

      if (!p.birthDate) {
        toast.error(`لطفاً تاریخ تولد مسافر شماره ${i + 1} را وارد کنید`);
        return;
      }

      const formattedBirthDate = p.birthDate.replace(/\//g, "-");

      traveler_details.push({
        firstName: firstName,
        lastName: lastName || firstName,
        gender: p.gender === "male" ? "مرد" : "زن",
        birthDate: formattedBirthDate,
        nationalId: Number(p.nationalCode),
      });
    }

    try {
      setLoading(true);

      const bookingPayload = {
        houseId: Number(params.id),
        user_id: userId,
        reservedDates: [
          persianToGregorian(checkInDate),
          persianToGregorian(checkOutDate),
        ],
        traveler_details: traveler_details,
        totalPrice: Number(finalTotal.replace(/,/g, "")),
        guestsCount: passengers.length,
      };

      console.log(" Payload:", JSON.stringify(bookingPayload, null, 2));

      const response = await fetch(`http://next.genzuni.website/api/bookings`, {
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
        console.error(" پاسخ JSON نیست:", responseText);
        throw new Error("پاسخ سرور نامعتبر است");
      }

      if (!response.ok) {
        console.error("خطای سرور:", result);
        throw new Error(result.message || "خطا در ثبت رزرو");
      }

      console.log("✅ نتیجه موفقیت:", result);

      setBookingResult(result.booking);
      setStep(5);
      toast.success(`رزرو با موفقیت ثبت شد! شماره رزرو: ${result.booking?.id}`);
    } catch (error: any) {
      console.error(" خطا:", error);
      toast.error(error.message || "متاسفانه رزرو ثبت نشد. دوباره تلاش کنید.");
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
        p.gender !== "جنسیت" &&
        p.birthDate.length > 0
      );
    });
  }, [passengers]);

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        id: Date.now(),
        fullName: "",
        nationalCode: "",
        gender: "جنسیت",
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

        const response = await fetch(
          `http://next.genzuni.website/api/houses/${params.id}`,
        );

        if (response.status === 401) {
          toast.error("نشست شما منقضی شده است. لطفاً مجدداً وارد شوید");
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
      <div className="text-center mt-20 font-bold">
        در حال بارگذاری اطلاعات هتل...
      </div>
    );

  if (!hotelData)
    return (
      <div className="text-center mt-20 font-bold">اطلاعات هتل یافت نشد.</div>
    );

  return (
    <div className="w-11/12 px-4" dir="rtl">
      <div className="space-y-4 md:space-y-6">
        <AdvancedScrollAnimation type="slide-up" delay={0.1}>
          <div className="pt-10 ">
            <Bread
              items={[
                { title: "رزرو هتل", href: "/housereserve" },
                { title: hotelData?.title },
              ]}
            />
          </div>
        </AdvancedScrollAnimation>

        <div className="rounded-2xl p-4 md:p-6">
          <div className="space-y-6">
            {step === 2 && (
              <div className="">
                <div className="ml-20 max-[888]:left-5 max-[888]:ml-0 relative flex gap-50 mx-auto justify-center max-[1360px]:flex-col">
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
                    <div className="rounded-[40px] p-10">
                      <div className="rounded-[40px]">
                        <h3 className="font-bold text-gray-800 whitespace-nowrap text-lg mb-20 dark:text-white">
                          مسافران انتخاب شده ({passengers.length})
                        </h3>
                      </div>
                      <h2 className="text-xl font-black mb-10 whitespace-nowrap text-[hsl(244,80%,8%)] dark:text-white">
                        مشخصات مسافران
                      </h2>
                      <div className="space-y-12">
                        {passengers.map((passenger, index) => (
                          <AdvancedScrollAnimation
                            key={passenger.id}
                            type="slide-up"
                            delay={0.1 + index * 0.05}
                            duration={0.4}
                          >
                            <div className="space-y-6 border-b border-gray-50 pb-8 last:border-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  <span className="font-bold text-gray-700">
                                    مسافر شماره {index + 1}
                                  </span>
                                </div>
                                {passengers.length > 1 && (
                                  <button
                                    onClick={() => removePassenger(passenger.id)}
                                    className="text-red-500 text-xs font-bold hover:underline"
                                  >
                                    حذف مسافر ×
                                  </button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                  name="fullName"
                                  required
                                  type="text"
                                  placeholder="نام و نام خانوادگی"
                                  value={passenger.fullName}
                                  onChange={(e) =>
                                    updatePassenger(
                                      index,
                                      "fullName",
                                      e.target.value,
                                    )
                                  }
                                  className="text-[#0887CAB2] border border-[#0887CAB2] p-4 rounded-2xl outline-none focus:ring-1 ring-blue-200"
                                />
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  placeholder="کد ملی"
                                  value={passenger.nationalCode}
                                  onChange={(e) =>
                                    updatePassenger(
                                      index,
                                      "nationalCode",
                                      e.target.value,
                                    )
                                  }
                                  className="text-[#0887CAB2] border border-[#0887CAB2] p-4 rounded-2xl outline-none focus:ring-1 ring-blue-200"
                                />
                                <div className="relative">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenGenderIndex(
                                        openGenderIndex === index ? null : index,
                                      )
                                    }
                                    className="w-full dark:text-white dark:bg-[#060425] hover:dark:bg-[#0b0747] text-[#0887CAB2] border border-[#0887CAB2] p-4 rounded-2xl flex items-center justify-between"
                                  >
                                    <span>
                                      {passenger.gender === "male"
                                        ? "مرد"
                                        : passenger.gender === "female"
                                          ? "زن"
                                          : "جنسیت"}
                                    </span>
                                    <ChevronDown
                                      size={18}
                                      className={`transition-transform ${openGenderIndex === index ? "rotate-180" : ""}`}
                                    />
                                  </button>

                                  {openGenderIndex === index && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#060425] border border-[#0887CAB2] rounded-2xl overflow-hidden z-20 shadow-lg">
                                      <button
                                        onClick={() => {
                                          updatePassenger(index, "gender", "male");
                                          setOpenGenderIndex(null);
                                        }}
                                        className="w-full text-right p-3 hover:bg-gray-100 dark:hover:bg-[#0b0747] transition-colors"
                                      >
                                        مرد
                                      </button>
                                      <button
                                        onClick={() => {
                                          updatePassenger(
                                            index,
                                            "gender",
                                            "female",
                                          );
                                          setOpenGenderIndex(null);
                                        }}
                                        className="w-full text-right p-3 hover:bg-gray-100 dark:hover:bg-[#0b0747] transition-colors"
                                      >
                                        زن
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  placeholder="تاریخ تولد"
                                  value={passenger.birthDate}
                                  onChange={(e) =>
                                    updatePassenger(
                                      index,
                                      "birthDate",
                                      e.target.value,
                                    )
                                  }
                                  className="text-[#0887CAB2] border border-[#0887CAB2] p-4 rounded-2xl outline-none"
                                />
                              </div>
                            </div>
                          </AdvancedScrollAnimation>
                        ))}
                      </div>
                      
                      <AdvancedScrollAnimation type="scale" delay={0.3}>
                        <button
                          onClick={addPassenger}
                          className="w-full py-5 mt-10 whitespace-nowrap border-2 border-dashed border-blue-100 rounded-3xl text-[rgb(16,8,143)] font-black hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                        >
                          + افزودن مسافر جدید
                        </button>
                      </AdvancedScrollAnimation>

                      <AdvancedScrollAnimation type="fade" delay={0.2}>
                        <div className="rounded-[40px] p-10">
                          <h3 className="font-bold text-[rgb(6,4,37)] whitespace-nowrap mb-8 text-lg dark:text-white">
                            ارسال بلیط به دیگران
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-black">
                            <input
                              type="email"
                              placeholder="ایمیل (example@mail.com)"
                              value={extraEmail}
                              onChange={(e) => {
                                const val = e.target.value
                                  .replace(/[^\x00-\x7F]/g, "")
                                  .replace(/\s/g, "");
                                setExtraEmail(val);
                              }}
                              className={`bg-[#F8FAFC] border p-4 rounded-2xl outline-none transition-all ${
                                extraEmail &&
                                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(extraEmail)
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-100"
                              }`}
                            />
                            <input
                              type="text"
                              placeholder="شماره تماس (۰۹xxxxxxxxx)"
                              value={extraPhone}
                              inputMode="numeric"
                              maxLength={11}
                              onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/g, "");
                                setExtraPhone(val);
                              }}
                              className={`bg-[#F8FAFC] border p-4 rounded-2xl outline-none transition-all dark:text-black ${
                                extraPhone && !/^09\d{9}$/.test(extraPhone)
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-100"
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
                                ? "bg-[rgb(21,151,125)] text-white hover:bg-[#12806a] shadow-lg cursor-pointer"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                            }`}
                          >
                            ثبت اطلاعات
                          </button>
                          
                          <div className="mt-12 pt-6 border-t border-gray-100">
                            <div className="flex justify-between max-[888]:flex-col items-center mb-6">
                              <span className="text-gray-400 text-xs font-black whitespace-nowrap">
                                قیمت نهایی
                              </span>
                              <span className="font-black whitespace-nowrap max-[888]:mt-4 text-[rgb(16,8,143)] text-xl">
                                {bookingPrices.discountedTotal.toLocaleString()} تومان
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
                                  ? "bg-[rgb(21,151,125)] text-white hover:bg-[#12806a] cursor-pointer"
                                  : "bg-gray-300 whitespace-nowrap text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              تأیید و ادامه فرآیند
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
                    handelFinalBooking={handelFinalBooking}
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