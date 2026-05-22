"use client";
import React, { useEffect, useState } from "react";
import { Star, MapPin, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import HomeReserve from "@/components/HouseDetails/icon/Home/HomeReserve";
import ReserveHome from "../../icon/ReserveHome";

interface Property {
  id: number;
  title: string;
  address: string;
  price: string | number;
  rate: string;
  photos: string[] | null;
  location: string;
}

const mockProperties: Property[] = [
  {
    id: 10,
    title: "ویلا مدرن خزر",
    address: "گیلان، رشت، انزلی",
    price: "250000000",
    rate: "4.8",
    photos: null,
    location: "گیلان، رشت"
  },
  {
    id: 11,
    title: "عمارت رویال",
    address: "تهران، لواسان",
    price: "850000000",
    rate: "4.9",
    photos: null,
    location: "تهران، لواسان"
  },
  {
    id: 12,
    title: "کلبه درختی",
    address: "مازندران، سوادکوه",
    price: "180000000",
    rate: "4.7",
    photos: null,
    location: "مازندران، سوادکوه"
  }
];

const SimilarProperties = ({ currentId: propId }: { currentId?: number | null }) => {
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
      
      const response = await fetch(`http://next.genzuni.website/api/houses`);
      
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
      <div className="w-full  mx-auto p-4 sm:p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-4"></div>
        <div className="space-y-3">
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full max-w-[430px] mx-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">املاکی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[430px] mx-auto p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#060425] shadow-sm border border-gray-100 dark:border-gray-700" dir="rtl">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-[#081F62] dark:text-white text-base sm:text-lg font-bold">موارد مشابه</h2>
        <div className="w-20 sm:w-24 h-0.5 bg-blue-100 dark:bg-blue-800 mx-auto mt-2"></div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {data.map((item) => (
          <Link
            href={`/housereserve/${item.id}`}
            key={item.id}
            className="block"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 flex gap-3 sm:gap-4 items-center border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 hover:shadow-md transition-all cursor-pointer group">
              
              <div className="relative w-[100px] sm:w-[130px] md:w-[150px] h-[80px] sm:h-[95px] md:h-[104px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                {item.photos && item.photos[0] ? (
                  <img
                    src={item.photos[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ReserveHome/>
                  </div>
                )}
                {/* امتیاز */}
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full flex items-center gap-1 text-[9px] sm:text-[10px]">
                  <Star size={9} className="fill-yellow-400 text-yellow-400" />
                  <span>{item.rate || "۰"}</span>
                </div>
              </div>

              {/* اطلاعات */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <h3 className="text-[#060425] dark:text-white text-xs sm:text-sm font-bold line-clamp-2 group-hover:text-[#0887CA] dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1 text-[#94A3B8] dark:text-gray-400 text-[9px] sm:text-[10px]">
                  <MapPin size={10}  className="flex-shrink-0" />
                  <span className="truncate">{item.location || item.address}</span>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 w-full my-1"></div>

                <div className="text-[#0887CA] dark:text-blue-400 text-[11px] sm:text-xs font-black mt-1">
                  {Number(item.price).toLocaleString("fa-IR")} تومان
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <Link href="/housereserve">
        <button className="w-full mt-4 sm:mt-6 flex items-center justify-end gap-1 text-[#0887CA] dark:text-blue-400 text-[10px] sm:text-xs font-bold hover:gap-2 transition-all">
          <span>مشاهده تمامی موارد</span>
          <ChevronLeft size={14}/>
        </button>
      </Link>
    </div>
  );
};

export default SimilarProperties;