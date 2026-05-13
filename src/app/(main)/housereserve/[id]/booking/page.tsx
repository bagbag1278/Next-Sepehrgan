"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Bread from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Header/Bread";
import BookingSummary from "../components/BookingSummary";
import Stepper from "../components/Stepper";
import BookingStepThree from "./BookingStepThree";

import BookingStepFour from "./BookingStepFour";

const BookingPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const [hotelData, setHotelData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(2);
  const [extraEmail, setExtraEmail] = useState("");
  const [extraPhone, setExtraPhone] = useState("");
  const initialGuests = Number(searchParams.get("guests")) || 1;

  const [passengers, setPassengers] = useState(
    Array.from({ length: initialGuests }, () => ({
      id: Math.random(),
      fullName: "",
      nationalCode: "",
      gender: "جنسیت",
      birthDate: "",
      number: "",
      email: "",
    })),
  );
  // filter
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

    return passengers.every((p) => {
      const isEmailValid = p.email === "" || emailRegex.test(p.email);
      const isPhoneValid = p.number === "" || phoneRegex.test(p.number);

      return { isEmailValid, isPhoneValid };
    });
  }, [passengers]);

  const isAllFormsValid = useMemo(() => {
    return passengers.every(
      (p) =>
        p.fullName.length > 3 &&
        p.nationalCode.length === 10 &&
        p.gender !== "جنسیت",
    );
  }, [passengers]);

  //  قیمت
  const bookingSummary = useMemo(() => {
    if (!hotelData)
      return { count: 0, finalTotal: "۰", priceAfterDiscount: "۰" };
    const count = passengers.length;
    const basePrice = hotelData.price || 0;
    const priceAfterDiscount = basePrice * 0.95;
    const finalTotal = priceAfterDiscount * count;

    return {
      count,
      priceAfterDiscount: Math.round(priceAfterDiscount).toLocaleString(),
      finalTotal: Math.round(finalTotal).toLocaleString(),
    };
  }, [passengers.length, hotelData]);

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
        email: "",
      },
    ]);
  };

  const removePassenger = (id: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((p) => p.id !== id));
    }
  };
  console.log("Validation Status:", {
    passengersValid: passengers.every(
      (p) =>
        p.fullName.trim().length >= 5 &&
        p.nationalCode.length === 10 &&
        p.gender !== "جنسیت",
    ),
    extraEmailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(extraEmail),
    extraPhoneValid: /^09\d{9}$/.test(extraPhone),
    values: { extraEmail, extraPhone },
  });
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api-proxy/houses/${params.id}`);
        if (!response.ok) throw new Error(`خطای سرور: ${response.status}`);
        const result = await response.json();
        setHotelData(result);
      } catch (error) {
        console.error("Error details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchHotelDetails();
  }, [params.id]);

const description = hotelData?.description || "توضیحاتی برای این هتل ثبت نشده است.";

  const checkInDate = searchParams.get("in") || "۱۴۰۴/۰۶/۱۶";
  const checkOutDate = searchParams.get("out") || "۱۴۰۴/۰۶/۱۷";
 

  if (loading)
    return (
      <div className="text-center mt-20 font-bold">
        در حال بارگذاری اطلاعات هتل...
      </div>
    );

  if (!hotelData)
    return (
      <div className="text-center mt-20 font-bold ">اطلاعات هتل یافت نشد.</div>
    );
  return (
    <div className="w-11/12 px-4  " dir="rtl">
      <div className=" space-y-4 md:space-y-6   ">
        <div className="pt-10">
          <Bread
            items={[
              { title: "رزرو هتل", href: "/housereserve" },
              { title: hotelData?.title },
            ]}
          />
        </div>

        <div className="rounded-2xl  p-4 md:p-6">
          <div className="space-y-6 ">
            {step === 2 && (
              <div className=" ">
                <div className="ml-20 flex gap-50 mx-auto justify-center max-[1360px]:flex-col">
                  <div className="  ">
                    <BookingSummary
                      hotelData={hotelData}
                      bookingSummary={bookingSummary}
                      checkInDate={checkInDate}
                      checkOutDate={checkOutDate}
                    />
                  </div>

                  <div className="rounded-[40px] p-10  ">
                    <div className="rounded-[40px] ">
                      <h3 className="font-bold text-gray-800 text-lg mb-20 dark:text-white">
                        مسافران انتخاب شده ( {passengers.length} )
                      </h3>
                    </div>
                    <h2 className="text-xl font-black mb-10 text-[hsl(244,80%,8%)] dark:text-white">
                      مشخصات مسافران
                    </h2>
                    <div className="space-y-12">
                      {passengers.map((passenger, index) => (
                        <div
                          key={passenger.id}
                          className="space-y-6 border-b border-gray-50 pb-8 last:border-0"
                        >
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
                              pattern="^[آ-ی\s]+$"
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
                            <select
                              value={passenger.gender}
                              onChange={(e) =>
                                updatePassenger(index, "gender", e.target.value)
                              }
                              className="w-full dark:text-white dark:bg-[#060425] hover:dark:bg-[#0b0747]  text-[#0887CAB2] border border-[#0887CAB2] p-4 rounded-2xl appearance-none outline-none"
                            >
                              <option disabled>جنسیت</option>
                              <option value="male">مرد</option>
                              <option value="female">زن</option>
                            </select>
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
                      ))}
                    </div>
                    <button
                      onClick={addPassenger}
                      className="w-full py-5 mt-10 border-2 border-dashed border-blue-100 rounded-3xl text-[rgb(16,8,143)] font-black hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                      + افزودن مسافر جدید
                    </button>

                    <div className="rounded-[40px] p-10 ">
                      <h3 className="font-bold text-[rgb(6,4,37)] mb-8 text-lg dark:text-white">
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
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-gray-400 text-xs font-black">
                            قیمت بلیط
                          </span>

                          <span className="font-black text-[rgb(16,8,143)] text-xl">
                            {bookingSummary.finalTotal} تومان
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
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          تأیید و ادامه فرآیند
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="w-full  ">
                <BookingStepThree
                  step={step}
                  setStep={setStep}
                  hotelData={hotelData}
                  bookingSummary={bookingSummary}
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
                />
              </div>
            )}

            {step === 5 &&(
  

                      <BookingStepFour
                        step={step}
                        setStep={setStep}
                        hotelData={hotelData}
                        bookingSummary={bookingSummary}
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
                      />
           
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
