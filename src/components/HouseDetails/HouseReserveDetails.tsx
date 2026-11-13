"use client";
import { useTranslations } from "next-intl";
import Foarward from "@/components/HouseDetails/icon/icon/Foarward";
import Link from "@/components/HouseDetails/icon/icon/Link";
import Star from "@/components/HouseDetails/icon/icon/Star";
import Bread from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Header/Bread";
import CommentsSection from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Comment/CommentsSection";
import Popular from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/main/Popular";
import { apiUrl } from "@/core/api/baseUrl";
import Reserve from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Reserve";
import React, { useEffect, useState } from "react";
import SwiperGalery from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/main/Slider/SwiperGalery";
import { useParams } from "next/navigation";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import SimilarProperties from "../../../src/app/(main)/housereserve/HouseReserveDetails/components/popular/main/SimilarProperties";
import { MapPin } from "lucide-react";
import Like from "@/app/(main)/houserent/MortgageRentDetails/components/HouseRent/Like";
import SkeletonDetail from "../common/loading/SkeletonDetail";





const HouseReserveDetails = () => {
    const t = useTranslations("HouseReserveDetails");
      const params = useParams();
      const houseId = params.id ? Number(params.id) : null;
    
      const [data, setData] = useState<any>(null);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchHotelDetails = async () => {
          try {
            setLoading(true);
            const response = await fetch(apiUrl(`houses/${houseId}`));
            const result = await response.json();
            setData(result.data || result);
          } catch (error) {
            console.error("Error:", error);
          } finally {
            setLoading(false);
          }
        };
    
        if (params.id) {
          fetchHotelDetails();
        }
      }, [houseId, params.id]);
    
      const breadcrumbItems = [
        { title: t("hotelReserve"), href: "/housereserve" },
        { title: `${t("hotelReserve")} ${data?.city || "..."}`, href: "/search" },
        { title: data?.title || t("loading") },
      ];
    
      if (loading)
        return (
          <SkeletonDetail/>
        );
      if (!data)
        return (
          <div className="text-center py-20 dark:text-white">
            {t("dataNotFound")}
          </div>
        );
    
  const houseImages: string[] = (data.photos?.length ? data.photos : data.images || []).filter((image: unknown): image is string => typeof image === "string" && image.length > 0);
  if (!houseImages.length && data.image) houseImages.push(data.image);

  return (
    <div className=" min-h-screen">
      <div className="w-11/12 m-auto flex flex-col items-center gap-10 mt-10 relative dark:text-white">
        <AdvancedScrollAnimation type="slide-up" delay={0.1}>
          <div className="w-full">
            <Bread items={breadcrumbItems} />
          </div>
        </AdvancedScrollAnimation>

        <AdvancedScrollAnimation type="scale" delay={0.1}>
          <div className="w-full h-102 flex">
            <div className="w-full">
              <SwiperGalery images={data.photos?.length ? data.photos : data.images || []} image={data.image} />
            </div>
          </div>
        </AdvancedScrollAnimation>

        <div dir="ltr" className="mt-14 max-[1300]:mt-1 whitespace-nowrap ">
          <AdvancedScrollAnimation type="slide-up" delay={0.1}>
            <AdvancedScrollAnimation type="slide-up" delay={0.1}>
              <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
                {/* دکمه‌ها */}
                <div className="flex gap-2 order-2 md:order-1 max-[1024]:w-full max-[1024]:justify-center">
                  <div className="w-8 h-8 bg-[#F5F5F5] dark:bg-gray-800 rounded-lg flex items-center justify-center border border-blue-400 dark:border-gray-500">
                    <Link />
                  </div>
                          <div className="w-8 h-8 bg-[#F5F5F5] dark:bg-gray-800 rounded-lg flex items-center justify-center border border-blue-400 dark:border-gray-500">
                  <Like
                    houseId={data?.id}
                    onLikeChange={(liked) =>
                      console.log("Like changed:", liked)
                    }
                  />
                </div>
                </div>

                <div
                  className="flex flex-col gap-2 w-full md:w-auto order-1 md:order-2"
                  dir="rtl"
                >
                  <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-blue-400 flex flex-wrap items-center justify-center md:justify-start gap-2">
                    {data.title}
                    <div className="text-[12px] sm:text-[14px] font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <div className="relative w-4 h-4">
                        <Star />
                      </div>
                      {data.rate}
                    </div>
                  </h2>

                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="text-blue-500 sm:w-4.5" />
                    <span className="text-[12px] sm:text-[14px] font-bold wrap-break-word text-center md:text-right">
                      {data.address}
                    </span>
                  </div>
                </div>
              </div>
            </AdvancedScrollAnimation>
          </AdvancedScrollAnimation>

          <div className="flex justify-between gap-4 max-[1300px]:flex-col mt-10">
            <div className="flex gap-10 flex-col items-center w-full lg:w-auto">
              <div className="w-107 max-[600px]:w-90 h-auto">
                <Reserve
                  price={data.price}
                  discountedPrice={data.discounted_price}
                  maxCapacity={data.capacity}
                />
              </div>

              <div className="w-107 flex-col max-[600px]:w-90">
                <SimilarProperties currentId={houseId} />
              </div>
            </div>

            <div className="flex-1 w-full max-w-200 max-[450px]:w-90 h-auto rounded-2xl flex flex-col items-center gap-6 bg-white dark:bg-gray-800 shadow-lg p-6 mx-auto">
              <div className="w-full relative left-4">
                <AdvancedScrollAnimation type="fade" delay={0.1}>
                  <Popular data={data} />
                </AdvancedScrollAnimation>
              </div>

              <AdvancedScrollAnimation type="slide-up" delay={0.2}>
                <div
                  className="w-full flex flex-col justify-start items-end gap-2"
                  dir="rtl"
                >
                  <div className="flex flex-col justify-start w-full relative  max-[1024px]:pr-8">
                    <h2 className="text-blue-100 dark:text-white font-bold text-[14px] ml-12 mb-4">
                      {t("about")} {data.title}
                    </h2>

                    <div className="w-full max-w-180">
                      <p className="leading-8 text-justify text-gray-600 dark:text-gray-400 whitespace-pre-line wrap-break-word">
                        {data.caption}
                      </p>
                    </div>
                  </div>

                  <div className="w-full max-w-180"></div>
                </div>
              </AdvancedScrollAnimation>

              <div className="w-full flex mt-5 gap-2 justify-center" dir="rtl">
                <div className="w-1/3 max-[844px]:w-30 flex flex-col gap-2">
                  <div className="relative h-43 max-[888px]:h-33 rounded-lg rounded-tr-[42px] shadow-sm overflow-hidden">
                    {houseImages[0] && <img src={houseImages[0]} alt={data.title} className="absolute inset-0 h-full w-full object-cover" />}
                  </div>
                  <div className="relative h-43 rounded-lg shadow-sm overflow-hidden">
                    {houseImages[0] && <img src={houseImages[1] || houseImages[0]} alt={data.title} className="absolute inset-0 h-full w-full object-cover" />}
                  </div>
                </div>
                <div className="relative w-94 max-[888px]:w-58.5 max-[888px]:h-78 h-88 rounded-lg rounded-bl-[42px] shadow-sm overflow-hidden">
                  {houseImages[0] && <img src={houseImages[2] || houseImages[0]} alt={data.title} className="absolute inset-0 h-full w-full object-cover" />}
                </div>
              </div>

              <AdvancedScrollAnimation type="slide-up" delay={0.4}>
                <div className="w-full" dir="rtl">
                  <h3 className="font-bold text-[20px] mt-10 text-right dark:text-white">
                    {t("why")} {data.title}؟
                  </h3>
                  <p className="font-medium text-[16px] text-gray-600 dark:text-gray-400 mt-5 text-right leading-loose whitespace-pre-line wrap-break-word">
                    {data.whydescription ||
                      data.caption ||
                      "توضیحاتی موجود نیست"}
                  </p>
                </div>
              </AdvancedScrollAnimation>

              <AdvancedScrollAnimation type="slide-up" delay={0.6}>
                <div className="w-full ">
                  {houseId && <CommentsSection houseId={houseId} />}
                </div>
              </AdvancedScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseReserveDetails
