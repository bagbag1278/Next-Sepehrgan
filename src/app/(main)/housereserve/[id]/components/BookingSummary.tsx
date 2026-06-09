import Loaction from "@/components/HouseDetails/icon/icon/Loaction";
import { Star } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from "lucide-react";

const ImageFallback =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpuJf7I24w6edIXo-v3-bsSiwFJssmCby3A&s";

interface PricesProps {
  originalPricePerNight: number;
  discountedPricePerNight: number;
  nights: number;
  originalTotal: number;
  discountedTotal: number;
}

interface Props {
  hotelData: {
    title: string;
    photo?: string;
    address: string;
    rate?: number;
    rating?: number;
  };
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  prices: PricesProps;
  extraEmail?: string;
  extraPhone?: string;
}

const BookingSummary = ({
  hotelData,
  checkInDate,
  checkOutDate,
  guestsCount,
  prices,
  extraEmail,
  extraPhone,
}: Props) => {
  const t = useTranslations('BookingSummary');
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  const {
    originalPricePerNight,
    discountedPricePerNight,
    nights,
    originalTotal,
    discountedTotal,
  } = prices;

  return (
    <div className="w-full top-10">
      <div className="rounded-[40px]">
        <div className="w-full flex justify-center relative mb-6">
          <img
            src={hotelData?.photo || ImageFallback}
            className="w-[509px] h-[315px] object-cover rounded-[32px]"
            alt={hotelData?.title}
          />
        </div>

        <h2 className="font-black text-xl justify-center flex items-center text-[#060425] dark:text-white mb-2 gap-2">
          {hotelData?.title}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {hotelData?.rate || hotelData?.rating || 0}
            </span>
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
          </div>
        </h2>

        <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-4">
          <Loaction />
          <span>{hotelData?.address}</span>
        </div>
      </div>

      {/* اطلاعات تماس */}
      {(extraEmail || extraPhone) && (
        <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
          <button
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="w-full flex justify-between items-center text-[#060425] dark:text-white mb-3"
          >
            <span className="font-black text-sm">
              {t('contactInfo') || "اطلاعات تماس"}
            </span>
            {isContactOpen ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {isContactOpen && (
            <div className="space-y-2 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
              {extraEmail && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{t('email') || "ایمیل"}:</span>
                  <span className="text-gray-800 dark:text-gray-300">{extraEmail}</span>
                </div>
              )}
              {extraPhone && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{t('phone') || "تلفن"}:</span>
                  <span className="text-gray-800 dark:text-gray-300">{extraPhone}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4 border-t border-gray-100 dark:border-gray-800 pt-6 mt-4">
        <div className="flex justify-between text-sm font-bold">
          <span className="text-[#060425CC] dark:text-gray-300">{t('checkInDate')}</span>
          <span className="text-gray-500 dark:text-gray-400">{checkInDate}</span>
        </div>
        
        <div className="flex justify-between text-sm font-bold">
          <span className="text-[#060425CC] dark:text-gray-300">{t('checkOutDate')}</span>
          <span className="text-gray-500 dark:text-gray-400">{checkOutDate}</span>
        </div>

        <div className="flex justify-between text-sm font-bold">
          <span className="text-[#060425CC] dark:text-gray-300">{t('nightsCount')}</span>
          <span className="text-gray-500 dark:text-gray-400">{nights} {t('nights')}</span>
        </div>

        <div className="flex justify-between text-sm font-bold">
          <span className="text-[#060425CC] dark:text-gray-300">{t('passengersCount')}</span>
          <span className="text-gray-500 dark:text-gray-400">{guestsCount} {t('people')}</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-500 text-xs">{t('originalPricePerNight')}</span>
          <span className="text-gray-400 text-xs line-through">
            {originalPricePerNight.toLocaleString()} {t('toman')}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#0887CA] text-xs font-bold">{t('discountedPricePerNight')}</span>
          <span className="text-[#0887CA] text-sm font-bold">
            {discountedPricePerNight.toLocaleString()} {t('toman')}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs">{t('totalWithoutDiscount')}</span>
          <span className="text-gray-400 text-xs line-through">
            {originalTotal.toLocaleString()} {t('toman')}
          </span>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-[#10088F] text-sm font-bold">{t('finalPrice')}</span>
          <span className="text-[#15977D] text-xl font-black">
            {discountedTotal.toLocaleString()} <span className="text-xs">{t('toman')}</span>
          </span>
        </div>
      </div>

      <Link href="/housereserve">
        <button className="w-full border border-blue-200 text-blue-500 py-4 rounded-[20px] mt-8 font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-950 transition-all">
          {t('changeHotel')}
        </button>
      </Link>
    </div>
  );
};

export default BookingSummary;