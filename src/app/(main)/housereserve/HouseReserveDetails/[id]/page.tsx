"use client";
import { useTranslations } from "next-intl";
import Foarward from "@/components/HouseDetails/icon/icon/Foarward";
import Link from "@/components/HouseDetails/icon/icon/Link";
import Star from "@/components/HouseDetails/icon/icon/Star";
import Bread from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Header/Bread";
import CommentsSection from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Comment/CommentsSection";
import Popular from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/main/Popular";
import Reserve from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Reserve";

import React, { useEffect, useState } from "react";
import SwiperGalery from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/main/Slider/SwiperGalery";
import { useParams } from "next/navigation";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import SimilarProperties from "../components/popular/main/SimilarProperties";
import { MapPin } from "lucide-react";

const fallbackImage =
  "data:image/jpeg;base64,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";
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
        const response = await fetch(`/api/houses/${houseId}`);
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
      <div className="text-center py-20 dark:text-white">{t("loading")}</div>
    );
  if (!data)
    return (
      <div className="text-center py-20 dark:text-white">
        {t("dataNotFound")}
      </div>
    );

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
              <SwiperGalery images={data.images || []} />
            </div>
          </div>
        </AdvancedScrollAnimation>

        <div className="mt-14 max-[1300]:mt-1 whitespace-nowrap ">
          <AdvancedScrollAnimation type="slide-up" delay={0.1}>
  <AdvancedScrollAnimation type="slide-up" delay={0.1}>
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
      {/* دکمه‌ها */}
      <div className="flex gap-2 order-2 md:order-1 max-[1024]:w-full max-[1024]:justify-center">
        <div className="w-8 h-8 bg-[#F5F5F5] dark:bg-gray-800 rounded-lg flex items-center justify-center border border-blue-400 dark:border-gray-500">
          <Link />
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-blue-400 dark:border-gray-500 bg-[#F5F5F5] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer">
          <Foarward />
        </div>
      </div>

      {/* عنوان و آدرس */}
      <div className="flex flex-col gap-2 w-full md:w-auto order-1 md:order-2" dir="rtl">
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
          <MapPin size={16} className="text-blue-500 sm:w-[18px]" />
          <span className="text-[12px] sm:text-[14px] font-bold break-words text-center md:text-right">
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
                  className="w-full flex flex-col justify-start items-end gap-2 mt-4 top-7"
                  dir="rtl"
                >
                  <div className="flex flex-col justify-start w-full relative top-10 max-[1024px]:pr-4">
                    <h2 className="text-blue-600 dark:text-white font-bold text-[14px] ml-12 mb-4">
                      {t("about")} {data.title}
                    </h2>
                    <p className="text-[16px] text-[#475569] dark:text-gray-600 font-black mb-4">
                      {data.caption}
                    </p>
                  </div>

                  <div className="w-full max-w-180">
                    <p className="leading-8 text-justify text-gray-600 dark:text-gray-400">
                      {data.description}
                    </p>
                  </div>
                </div>
              </AdvancedScrollAnimation>

              <div className="w-full flex mt-5 gap-2 justify-center" dir="rtl">
                <div className="w-1/3 max-[844px]:w-30 flex flex-col gap-2">
                  <img
                    src={data?.photo || fallbackImage}
                    alt={data.title}
                    className="rounded-lg h-43 max-[888px]:h-33 object-cover rounded-tr-[42px] shadow-sm"
                  />
                  <img
                    src={data?.photo || fallbackImage}
                    alt={data.title}
                    className="rounded-lg h-43 object-cover shadow-sm"
                  />
                </div>
                <img
                  src={data?.photo || fallbackImage}
                  alt={data.title}
                  className="w-94 rounded-bl-[42px] max-[888px]:w-[234px] max-[888px]:h-78 h-88 rounded-lg object-cover shadow-sm"
                />
              </div>

              <AdvancedScrollAnimation type="slide-up" delay={0.4}>
                <div className="flex justify-end w-full">
                  <h3 className="font-bold text-[20px] mt-10">
                    {t("why")} {data.title}
                  </h3>
                </div>
              </AdvancedScrollAnimation>

              <AdvancedScrollAnimation type="fade" delay={0.5}>
                <p
                  dir="rtl"
                  className="font-medium w-full relative   bottom-6 text-[16px] text-gray-600 mt-5"
                >
                  {data.caption}
                </p>
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
  );
};

export default HouseReserveDetails;
