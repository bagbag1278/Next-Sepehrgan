import Loaction from "@/components/HouseDetails/icon/icon/Loaction";
import { Star, ChevronDown, ChevronUp, Stars } from "lucide-react";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';

const ImageFallback =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpuJf7I24w6edIXo-v3-bsSiwFJssmCby3A&s";

interface Passenger {
  fullName?: string;
  gender?: "male" | "female";
  nationalCode?: string;
  birthDate?: string;
}

interface Props {
  hotelData: {
    title: string;
    photo?: string;
    address: string;
    rate?: number;
    rating?: number;
    price: number;
    discounted_price?: number;
    passengers?: string;
  };
  bookingSummary: {
    priceAfterDiscount: string;
    finalTotal: string;
    count: number;
    description?: string;
  };
  checkInDate: string;
  checkOutDate: string;
  passengers: Passenger[];
  finalTotal: string;
  bookingResult?: any;
  description?: string;
  showExtraCost?: boolean;
  extraEmail?: string;
  extraPhone?: string;
}

const BookingSummaryTwo = ({
  hotelData,
  bookingSummary,
  checkInDate,
  checkOutDate,
  passengers,
  finalTotal,
  bookingResult,
  description,
  showExtraCost = false,
  extraEmail,
  extraPhone,
}: Props) => {
  const t = useTranslations('BookingSummaryTwo');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full lg:w-[500px] sticky top-10 space-y-4">
      <div className="">
        <div className="w-full mb-6 flex gap-3  ">
          <img
            src={hotelData?.photo || ImageFallback}
            className="w-[240px] h-[170px] object-cover rounded-[32px]"
            alt="hotel"
          />
          <div className="h-40 flex flex-col justify-center ">
            <h2 className="font-black text-xl flex items-center whitespace-nowrap text-[#060425] dark:text-white  mb-2 gap-2">
              {hotelData?.title}
              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                <span className="text-xs font-bold text-gray-700 ">
                  {hotelData?.rate || hotelData?.rating || 0}
                </span>
                <Stars size={14} className="text-yellow-400 fill-yellow-400 " />
              </div>
            </h2>

            <div className="flex items-center gap-1 text-gray-400 text-sm mb-6 ">
              <Loaction />
              <span>{hotelData?.address}</span>
            </div>
          </div>
        </div>

        {/* اطلاعات تاریخ و قیمت */}
        <div className="space-y-3 sm:space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-sm font-bold">
            <span className="text-gray-900 dark:text-white">{t('checkInDate')}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{checkInDate}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-sm font-bold">
            <span className="text-gray-900 dark:text-white">{t('checkOutDate')}</span>
            <span className="text-gray-500 dark:text-gray-400">{checkOutDate}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="text-gray-500 text-sm font-bold dark:text-gray-400">
              {t('finalPrice')}
            </span>
            <div className="text-left w-full sm:w-auto">
              {hotelData?.price && hotelData?.discounted_price && (
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="text-gray-300 line-through text-xs">
                    {hotelData?.price?.toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-lg font-black">
                    ٪۵
                  </span>
                </div>
              )}
              <div className="text-[#15977D] font-black text-lg sm:text-xl">
                {finalTotal}
                <span className="text-xs mr-1">{t('toman')}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* اطلاعات مسافران + ایمیل و تلفن */}
        <div className="mt-6 sm:mt-8 dark:border-gray-700 pt-4 sm:pt-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center text-[#060425] mb-4"
          >
            <span className="font-black text-sm">
              {t('passengerInfo')} ({passengers?.length || 0} {t('passenger')})
            </span>
            {isOpen ? <ChevronUp className="dark:text-white " size={20} /> : <ChevronDown className="dark:text-white " size={20} />}
          </button>

          {isOpen && (
            <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-300">
              {/* اطلاعات تماس */}
              {(extraEmail || extraPhone) && (
                <div className="text-xs sm:text-sm space-y-2 sm:space-y-3 bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                    <h4 className="font-bold text-blue-700 dark:text-blue-300">
                      {t('contactInfo') || "اطلاعات تماس"}
                    </h4>
                  </div>
                  {extraEmail && (
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        {t('email') || "ایمیل"}:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200 break-all">
                        {extraEmail}
                      </span>
                    </div>
                  )}
                  {extraPhone && (
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        {t('phone') || "تلفن"}:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-gray-200 dir-ltr">
                        {extraPhone}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {passengers?.map((p, index) => (
                <div
                  key={index}
                  className="text-xs space-y-3  p-4 rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-gray-500">{t('ageRange')}</span>
                    <span className="font-bold">{t('adult')}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-gray-500">{t('fullName')}</span>
                    <span className="font-bold break-words max-w-[200px] sm:max-w-none">
                      {p.fullName || "---"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-gray-500">{t('gender')}</span>
                    <span className="font-bold">
                      {p.gender === "male" ? t('male') : p.gender === "female" ? t('female') : "---"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-gray-500">{t('nationalCode')}</span>
                    <span className="font-bold text-[#15977D]">
                      {p.nationalCode || "---"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <span className="text-gray-500">{t('birthDate')}</span>
                    <span className="font-bold">{p.birthDate || "---"}</span>
                  </div>
                </div>
              ))}

              <button
                onClick={() => window.scrollTo(0, 500)}
                className="w-full h-[48px] py-3 bg-blue-900 text-white rounded-2xl font-bold text-xs hover:bg-blue-800 transition-colors"
              >
                {t('editPassengers')}
              </button>
              
                 
            </div>
          )}
        </div>

        {bookingResult?.id && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
            <p className="text-gray-500 text-xs">{t('bookingId')}</p>
            <p className="text-[#15977D] font-bold text-base sm:text-lg">{bookingResult.id}</p>
          </div>
        )}
      </div>

      {showExtraCost && description && (
        <div className="mt-4 flex flex-col gap-3">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          <div>
            <h3 className="font-bold text-[14px] md:text-[16px] text-[rgb(0,94,164)] dark:text-blue-400">
              {t('extraCost')}
            </h3>
            <p className="font-normal text-[12px] md:text-[14px] text-[rgba(6,4,37,0.5)] dark:text-gray-400 mt-2 leading-6 md:leading-7">
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummaryTwo;
