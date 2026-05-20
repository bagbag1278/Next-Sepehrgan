"use client";
import Link from "@/components/HouseDetails/icon/icon/Link";
import Loaction from "@/components/HouseDetails/icon/icon/Loaction";
import Star from "@/components/HouseDetails/icon/icon/Star";
import CommentsSection from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Comment/CommentsSection";
import FleshHome from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/FleshHome";
import Popular from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/main/Popular";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";
import SwiperGalery from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/main/Slider/SwiperGalery";
import Seller from "@/app/(main)/houserent/MortgageRentDetails/components/HouseRent/Seller";
import Like from "@/app/(main)/houserent/MortgageRentDetails/components/HouseRent/Like";
import Bread from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Header/Bread";
import { useParams } from "next/navigation";
import RentSimilarProperties from "@/app/(main)/houserent/MortgageRentDetails/components/HouseRent/RentSimilarProperties";

const MapRent = dynamic(
  () => import("@/app/(main)/houserent/MortgageRentDetails/components/HouseRent/MapRent"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[307px] bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">
        <span className="text-gray-400">در حال بارگذاری نقشه...</span>
      </div>
    ),
  }
);

const MortgageRentDetails = () => {
  const params = useParams();
  const houseId = params?.id ? Number(params.id) : null;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [locationData, setLocationData] = useState<any>(null);
  const [locationLoading, setLocationLoading] = useState(true);

  // ✅ گرفتن اطلاعات لوکیشن
  useEffect(() => {
    const fetchLocation = async () => {
      if (!houseId) return;
      
      try {
        setLocationLoading(true);
        // ✅ اصلاح آدرس: استفاده از houseId
        const response = await fetch(
          `http://next.genzuni.website/api/locations/${houseId}`
        );
        
        if (!response.ok) {
          // اگر لوکیشن پیدا نشد، از مختصات پیشفرض استفاده کن
          console.warn(`لوکیشن با آیدی ${houseId} یافت نشد. از مختصات پیشفرض استفاده می‌شود.`);
          setLocationData({
            id: houseId,
            lat: "36.5633", // مختصات ساری
            lng: "53.0601",
          });
        } else {
          const result = await response.json();
          console.log("📍 دیتای لوکیشن:", result);
          setLocationData(result);
        }
      } catch (error) {
        console.error("خطا در گرفتن لوکیشن:", error);
        // در صورت خطا هم مختصات پیشفرض بده
        setLocationData({
          id: houseId,
          lat: "36.5633",
          lng: "53.0601",
        });
      } finally {
        setLocationLoading(false);
      }
    };

    fetchLocation();
  }, [houseId]);

  // ✅ گرفتن اطلاعات هتل
  useEffect(() => {
    const fetchRentData = async () => {
      if (!houseId) return;
      
      try {
        setLoading(true);
        const response = await fetch(
          `http://next.genzuni.website/api/houses/${houseId}`
        );
        
        if (!response.ok) throw new Error("مورد یافت نشد");
        
        const result = await response.json();
        console.log("🏠 دیتای هتل:", result);
        setData(result);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentData();
  }, [houseId]);

  if (loading && !data) {
    return (
      <div className="text-center mt-20 animate-pulse">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-20">اطلاعاتی برای این شناسه یافت نشد.</div>
    );
  }

  const breadcrumbItems = [
    { title: "رزرو هتل", href: "/housereserve" },
    { title: `رزرو هتل ${data.city || "نامشخص"}`, href: "/search" },
    { title: data.title },
  ];

  return (
    <div>
      <div className="w-11/12 m-auto flex flex-col items-center gap-10 mt-10 relative dark:text-white">
        <div className="w-full">
          <Bread items={breadcrumbItems} />
        </div>

        <div className="w-full h-102 flex">
          <div className="w-full">
            <SwiperGalery images={data.images || []} />
          </div>
        </div>

        <div className="mt-20">
          <div className="w-full max-w-7xl flex justify-between items-center">
            <div className="w-18 h-8 flex flex-wrap gap-1 relative max-[1300px]:left-30">
              <div className="w-8 h-8 bg-[#F5F5F5] rounded-lg flex items-center justify-center border border-blue-400">
                <Link />
              </div>
              <div>
                <Like />
              </div>
            </div>

            <div
              className="flex flex-col gap-4 -mt-8 pr-5 relative max-[1300px]:bottom-8 max-[1300px]:m-auto"
              dir="rtl"
            >
              <h2 className="text-2xl font-bold dark:text-white text-blue-400 flex gap-3 max-[1300px]:justify-center">
                {data.title}
                <div className="text-[14px] w-20 font-bold text-gray-600 -mt-2">
                  <div className="dark:text-white relative right-4.5 top-4">
                    <Star />
                  </div>
                  {data.rate}
                </div>
              </h2>

              <div className="flex items-center gap-2 text-gray-500">
                <Loaction />
                <span className="text-[14px] font-bold">{data.address}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 max-[1300px]:flex-col mt-10">
            <div className="flex gap-16 flex-col items-center w-full lg:w-auto">
              <div className="w-107 h-117 rounded-[40px] justify-center flex p-8 shadow-lg">
                <Seller
                  sellerName={data.sellerName}
                  sellerId={data.sellerId}
                  price={data.price}
                  discountedPrice={data.discounted_price}
                  lastUpdated={data.last_updated}
                />
              </div>
              <div className="w-107 flex-col shadow-lg">
                <RentSimilarProperties currentId={data.id} />
              </div>
              <div className="absolute -left-35 bottom-120 transform rotate-[-10deg] min-[1600px]:hidden opacity-70 max-[1300px]:hidden">
                <FleshHome />
              </div>
            </div>

            <div className="flex-1 w-full max-w-200 h-auto rounded-2xl flex flex-col items-center gap-6 bg-white dark:text-white dark:bg-[#060425] shadow-lg p-6 mx-auto">
              <div className="flex flex-wrap gap-10 justify-center w-full">
                <div className="w-full">
                  <Popular data={data} />
                </div>

                <div className="w-full flex flex-col justify-start items-end gap-2 mt-16 top-7" dir="rtl">
                  <div className="flex flex-col justify-start w-full relative top-10 max-[888px]:pr-7">
                    <h2 className="text-blue-100 font-bold text-[14px] ml-12 mb-4">
                      درباره {data.title}
                    </h2>
                    <p className="text-[16px] text-[#475569] font-black mb-4">
                      {data.caption}
                    </p>
                  </div>

                  <div className="w-full max-w-180">
                    <p className="leading-8 text-justify">{data.description}</p>
                  </div>
                </div>

                {/* ✅ بخش نقشه - اصلاح شده */}
                <div className="w-full mt-10 flex flex-col gap-6" dir="rtl">
                  <h3 className="text-[rgb(16,8,143)] dark:text-white font-bold text-[18px] pr-7">
                    موقعیت مکانی
                  </h3>
                  
                  {locationLoading ? (
                    <div className="w-full h-[307px] bg-gray-200 animate-pulse rounded-2xl" />
                  ) : (
                    <MapRent
                      lat={locationData?.lat}
                      lng={locationData?.lng}
                      address={data?.address}
                    />
                  )}

                  <div className="w-full max-w-177 mt-2 max-[888px]:pr-8">
                    <h4 className="text-[rgb(6,4,37)] dark:text-white font-bold text-[16px] mb-3">
                      محل دقیق
                    </h4>
                    <p className="text-[#475569] text-[15px] leading-8 max-[888px]:w-90 text-justify">
                      این ملک در یکی از بهترین نقاط شهر قرار گرفته و دسترسی عالی
                      به مراکز رفاهی دارد.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full max-[888px]:pr-6" dir="rtl">
                <h3 className="font-bold text-[20px] mt-10 text-right">
                  چرا {data.title}؟
                </h3>
                <p className="font-medium text-[16px] text-gray-600 mt-5 text-right leading-8">
                  {data.whydescription || data.caption}
                </p>
              </div>

              <div className="w-full flex mt-8">
                {houseId && <CommentsSection houseId={houseId} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageRentDetails;