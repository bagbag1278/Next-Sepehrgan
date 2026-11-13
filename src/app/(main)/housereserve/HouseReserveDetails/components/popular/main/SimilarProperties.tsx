"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { Star, MapPin, ChevronLeft, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import HomeReserve from "@/components/HouseDetails/icon/Home/HomeReserve";
import ReserveHome from "../../icon/ReserveHome";
// import ReserveHome from "../../icon/ReserveHome";

interface Property {
  id: number;
  title: string;
  address: string;
  price: string | number;
  rate: string;
  photos: string[] | null;
  location:
    | string
    | { lat?: number; lng?: number; address?: string }
    | null
    | undefined;
}

const getLocationLabel = (location: Property["location"], address: string) =>
  typeof location === "string" ? location : location?.address || address;

const mockProperties: Property[] = [
  {
    id: 110,
    title: "ویلا مدرن خزر",
    address: "گیلان، رشت، انزلی",
    price: "250000000",
    rate: "4.8",
    photos: null,
    location: "گیلان، رشت"
  },
  {
    id: 118,
    title: "عمارت رویال",
    address: "تهران، لواسان",
    price: "850000000",
    rate: "4.9",
    photos: null,
    location: "تهران، لواسان"
  },
  {
    id: 119,
    title: "کلبه درختی",
    address: "مازندران، سوادکوه",
    price: "180000000",
    rate: "4.7",
    photos: null,
    location: "مازندران، سوادکوه"
  }
];

const SimilarProperties = ({ currentId: propId }: { currentId?: number | null }) => {
  const t = useTranslations('SimilarProperties');
  const params = useParams();
  const currentId = propId || (params?.id ? Number(params.id) : null);

  const [data, setData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSimilar = async () => {
    if (!currentId) {
      setData(mockProperties);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/houses`);

      if (response.ok) {
        const result = await response.json();
        let allHouses: Property[] = [];
        if (result?.data && Array.isArray(result.data)) {
          allHouses = result.data;
        } else if (Array.isArray(result)) {
          allHouses = result;
        }

        if (allHouses.length > 0) {
          const similarData = allHouses
            .filter((item) => item.id !== currentId)
            .slice(0, 3);

          if (similarData.length > 0) {
            setData(similarData);
            return;
          }
        }
      }

      console.log("استفاده از داده آزمایشی");
      setData(mockProperties);

    } catch (err) {
      console.error("خطا در دریافت املاک مشابه:", err);
      setData(mockProperties);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimilar();
  }, [currentId]);

  if (loading) {
    return (
      <div className="w-full mx-auto p-4 sm:p-6 bg-gray-100 dark:bg-gray-800/50 rounded-2xl animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full max-w-[430px] mx-auto p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center border border-gray-100 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t('noProperties')}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[430px] mx-auto p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300" dir="rtl">
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={18} className="text-[#0887CA] dark:text-white" />
          <h2 className="text-[#081F62] dark:text-white text-base sm:text-lg font-bold">
            {t('similarProperties')}
          </h2>
          <TrendingUp size={18} className="text-[#0887CA] dark:text-white" />
        </div>
        <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#0887CA] dark:via-white to-transparent mx-auto mt-2"></div>
        <p className="text-[10px] text-gray-400 dark:text-gray-400 mt-2">{t('similarPropertiesDesc')}</p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {data.map((item) => (
          <Link
            href={`/housereserve/${item.id}`}
            key={item.id}
            className="block group"
          >
            <div className="relative bg-white dark:bg-gray-800/80 rounded-2xl p-3 flex gap-3 sm:gap-4 items-center border border-gray-100 dark:border-gray-700 hover:border-[#0887CA] dark:hover:border-white hover:shadow-lg dark:hover:shadow-white/10 transition-all duration-300 cursor-pointer overflow-hidden">
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#0887CA]/0 via-[#0887CA]/0 to-[#0887CA]/0 group-hover:from-[#0887CA]/5 group-hover:via-[#0887CA]/0 group-hover:to-[#0887CA]/10 transition-all duration-500"></div>
              
              <div className="relative w-[100px] sm:w-[130px] md:w-[150px] h-[80px] sm:h-[95px] md:h-[104px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300">
                {item.photos && item.photos[0] ? (
                  <img
                    src={item.photos[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    <ReserveHome />
                  </div>
                )}
                
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full flex items-center gap-1 text-[9px] sm:text-[10px] shadow-md">
                  <Star size={9} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{item.rate || "۰"}</span>
                </div>
                
                <div className="absolute bottom-2 left-2 bg-[#0887CA]/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-lg text-[9px] font-bold shadow-md">
                  {Number(item.price).toLocaleString("fa-IR")}
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <h3 className="text-[#060425] dark:text-white text-xs sm:text-sm font-bold line-clamp-2 group-hover:text-[#0887CA] dark:group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1 text-[#94A3B8] dark:text-gray-400 text-[9px] sm:text-[10px] group-hover:text-[#0887CA] dark:group-hover:text-white transition-colors duration-300">
                  <MapPin size={10} className="flex-shrink-0 text-[#94A3B8] dark:text-gray-400 group-hover:text-[#0887CA] dark:group-hover:text-white" />
                  <span className="truncate">
                    {getLocationLabel(item.location, item.address)}
                  </span>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 w-full my-1 group-hover:border-[#0887CA]/30 dark:group-hover:border-white/30 transition-colors duration-300"></div>

                <div className="flex items-center justify-between">
                  <div className="text-[#0887CA] dark:text-white text-[11px] sm:text-xs font-black">
                    {Number(item.price).toLocaleString("fa-IR")} {t('toman')}
                  </div>
                  <div className="text-[9px] text-gray-400 dark:text-gray-500 group-hover:text-[#0887CA] dark:group-hover:text-white transition-colors duration-300">
                    {t('viewDetails')}
                  </div>
                </div>
              </div>
              
              <div className="absolute left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <ChevronLeft size={16} className="text-[#0887CA] dark:text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <Link href="/housereserve">
        <button className="w-full mt-4 sm:mt-6 flex items-center justify-center gap-2 text-[#0887CA] dark:text-white text-[10px] sm:text-xs font-bold hover:gap-3 transition-all duration-300 group bg-gray-50 dark:bg-gray-800/50 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
          <span>{t('viewAll')}</span>
          <ChevronLeft size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </Link>
    </div>
  );
};

export default SimilarProperties;
