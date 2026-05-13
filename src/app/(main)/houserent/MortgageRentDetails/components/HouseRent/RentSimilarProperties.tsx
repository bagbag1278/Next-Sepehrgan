"use client";
import React, { useEffect, useState } from 'react';
import { MapPin, Star, ChevronLeft } from 'lucide-react';
import HomeReserve from "@/components/HouseDetails/icon/Home/HomeReserve";
import Link from "next/link";

interface RentSimilarPropertiesProps {
  currentId?: string | number;
}

const RentSimilarProperties = ({ currentId }: RentSimilarPropertiesProps) => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://next.genzuni.website/api/houses');
        const result = await response.json();
        
        const rawList = Array.isArray(result) ? result : (result.houses || []);

        const filtered = rawList
          .filter((item: any) => {
            if (!item || !item.id) return false;
            return item.id.toString() !== currentId?.toString();
          })
          .slice(0, 3);

        setProperties(filtered);
      } catch (error) {
        console.error("Error fetching similar properties:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentId) fetchSimilar();
    else setLoading(false);
  }, [currentId]);

  if (loading) return <div className="w-full h-64 bg-gray-100  animate-pulse rounded-2xl" />;

  return (
    <div className="w-full max-w-[430px] mx-auto p-6 rounded-[16px] bg-white dark:text-white dark:bg-[#060425] dark:border-none border border-[#F1F5F9]" dir="rtl">
      <div className="text-center mb-6">
        <h2 className="text-[#081F62] dark:text-white  text-lg font-bold">موارد مشابه</h2>
        <div className="w-24 h-0.5 bg-blue-100 mx-auto mt-2"></div>
      </div>

      <div className="flex flex-col gap-4">
        {properties.length > 0 ? (
          properties.map((item) => (
            <Link 
              href={`/houserent/MortgageRentDetails/${item.id}`} 
              key={item.id}
              className="block "
            >
              <div className="bg-white w-[370px] h-[120px]  shadow-[8px_0px_20px_rgba(8,135,202,0.30)] rounded-[16px] p-3 flex gap-4 items-center border border-transparent hover:border-blue-200 transition-all cursor-pointer shadow-sm group">
                
                <div className="relative rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                  {item.photos ? (
                    <img src={item.photos} alt={item.title} className="w-[127px] h-[104px] " />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-blue-50">
                       <HomeReserve />
                    </div>
                  )}
                  
                  <div className="absolute top-1 right-1 bg-black/50 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-lg flex items-center gap-1 text-[10px]">
                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                    <span>{item.rate || '5'}</span>
                  </div>
                </div>

                {/* بخش متون */}
                <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                  <h3 className="text-[#060425]  text-sm font-bold truncate group-hover:text-[#0887CA] transition-colors">
                    {item.title || "بدون عنوان"}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-[#94A3B8] mt-1 text-[10px]">
                    <MapPin size={12} />
                    <span className="truncate">{item.address || "آدرس نامشخص"}</span>
                  </div>
                    <div className='border w-full border-gray-300'></div>
                  <div className="text-[#0887CA] text-xs font-black mt-3">
                    {item.price ? `${Number(item.price).toLocaleString()} تومان` : "اجاره توافقی"}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm">موردی یافت نشد.</p>
        )}
      </div>

      <Link href="/houserent">
        <button className="w-full mt-6 flex items-center justify-end gap-1 text-[#0887CA] text-xs font-bold hover:gap-2 transition-all">
          <span>مشاهده تمامی موارد</span>
          <ChevronLeft size={16} />
        </button>
      </Link>
    </div>
  );
};

export default RentSimilarProperties;