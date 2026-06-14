"use client";
import { useTranslations } from "next-intl";
import Link from "@/components/HouseDetails/icon/icon/Link";
import Star from "@/components/HouseDetails/icon/icon/Star";
import CommentsSection from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Comment/CommentsSection";
import FleshHome from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/FleshHome";
import Popular from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/main/Popular";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";
import SwiperGalery from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/main/Slider/SwiperGalery";

import Bread from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/Header/Bread";
import { useParams } from "next/navigation";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import Like from "../components/HouseRent/Like";
import Seller from "../components/HouseRent/Seller";
import SimilarProperties from "@/app/(main)/housereserve/HouseReserveDetails/components/popular/main/SimilarProperties";
import { MapPin } from "lucide-react";
import NotFound from "@/app/not-found";

const LoadingComponent = () => {
  const t = useTranslations("MortgageRentDetails");
  return (
    <div className="w-full h-[307px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl flex items-center justify-center">
      <span className="text-gray-400 dark:text-gray-500">
        {t("loadingMap")}
      </span>
    </div>
  );
};

const MapRent = dynamic(() => import("../components/HouseRent/MapRent"), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

const MortgageRentDetails = () => {
  const t = useTranslations("MortgageRentDetails");
  const params = useParams();
  const houseId = params?.id ? Number(params.id) : null;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [locationData, setLocationData] = useState<any>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchLocation = async () => {
    if (!houseId) return;

    try {
      setLocationLoading(true);

      const response = await fetch(`/api/locations`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      const locations = result.data || [];

      let foundLocation = null;

      foundLocation = locations.find((loc: any) => loc.id === houseId);

      if (!foundLocation && locations.length > 0) {
        foundLocation = locations[0];
      }

      if (foundLocation && foundLocation.lat && foundLocation.lng) {
        const lat = parseFloat(foundLocation.lat);
        const lng = parseFloat(foundLocation.lng);

        const isValidLat = !isNaN(lat) && lat >= -90 && lat <= 90;
        const isValidLng = !isNaN(lng) && lng >= -180 && lng <= 180;

        if (isValidLat && isValidLng) {
          setLocationData({
            id: foundLocation.id,
            lat: lat.toString(),
            lng: lng.toString(),
            areaName: foundLocation.areaName,
          });
        } else {
          setLocationData({
            id: houseId,
            lat: "35.6892",
            lng: "51.3890",
            areaName: foundLocation.areaName || "تهران، مرکز",
          });
        }
      } else {
        setLocationData({
          id: houseId,
          lat: "35.6892",
          lng: "51.3890",
          areaName: "تهران، مرکز",
        });
      }
    } catch (error) {
      console.error("خطا در گرفتن لوکیشن:", error);
      setLocationData({
        id: houseId,
        lat: "35.6892",
        lng: "51.3890",
        areaName: "تهران، مرکز",
      });
    } finally {
      setLocationLoading(false);
    }
  };
  const fetchRentData = async () => {
    if (!houseId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/houses/${houseId}`);

      if (!response.ok) throw new Error("مورد یافت نشد");

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchRentData();
  }, [houseId]);

  if (loading && !data) {
    return (
      <div className="text-center mt-20 animate-pulse text-gray-500 dark:text-gray-400">
        {t("loading")}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
        {t("noData")}
      </div>
    );
  }

  const breadcrumbItems = [
    { title: t("hotelReserve"), href: "/housereserve" },
    {
      title: `${t("hotelReserve")} ${data.city || t("unknown")}`,
      href: "/search",
    },
    { title: data.title },
  ];

  if (notFound || !data) {
    return (
      <>
        <NotFound />
      </>

    );
  }

  return (
    <div>
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

        <div className="mt-24 max-[1300]:mt-14 max-[600]:mt-0 ">
          <AdvancedScrollAnimation type="slide-up" delay={0.1}>
            <div className="w-full max-w-7xl flex justify-between items-center flex-wrap gap-4">
              <div className="w-20 h-8 flex flex-wrap gap-1 relative max-[1300px]:left-28 max-[600px]:top-15 ">
                <div className="w-8 h-8 bg-[#F5F5F5] dark:bg-gray-800 rounded-lg flex items-center justify-center border border-blue-400 dark:border-gray-500">
                  <Link />
                </div>
                <div>
                  <Like
                    houseId={data?.id}
                    onLikeChange={(liked) =>
                      console.log("Like changed:", liked)
                    }
                  />
                </div>
              </div>

              <div
                className="flex flex-col gap-4 -mt-8 bottom-5 pr-5 max-[1024px]:pr-16 relative max-[1300px]:bottom-8 max-[1300px]:m-auto"
                dir="rtl"
              >
                <h2 className="text-2xl font-bold dark:text-white text-blue-400 flex gap-3 max-[1300px]:justify-center flex-wrap">
                  {data.title}
                  <div className="text-[14px] w-20 font-bold text-gray-600 dark:text-gray-400 -mt-2">
                    <div className="relative right-4.5 top-4">
                      <Star />
                    </div>
                    {data.rate}
                  </div>
                </h2>

                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <MapPin size={18} className="text-blue-500" />
                  <span className="text-[14px] font-bold">{data.address}</span>
                </div>
              </div>
            </div>
          </AdvancedScrollAnimation>

          <div className="flex justify-between gap-4 max-[1300px]:flex-col ">
            <div className="flex gap-10 flex-col items-center w-full lg:w-auto">
              <div className="w-107 h-150 justify-center flex p-8">
                <Seller
                  sellerName={data.sellerName}
                  sellerId={data.sellerId}
                  price={data.price}
                  discountedPrice={data.discounted_price}
                  lastUpdated={data.last_updated}
                />
              </div>

              <div className="w-107 flex-col max-[600px]:w-90">
                <SimilarProperties currentId={data.id} />
              </div>

              <div className="absolute -left-35 bottom-120 transform rotate-[-10deg] min-[1600px]:hidden opacity-70 max-[1300px]:hidden">
                <FleshHome />
              </div>
            </div>

            <div className="flex-1 w-full max-w-200 max-[450]:w-90 h-auto rounded-2xl flex flex-col items-center gap-6 bg-white dark:bg-gray-800 shadow-lg p-6 mx-auto">
              <div className="flex flex-wrap gap-10 justify-center w-full">
                <AdvancedScrollAnimation type="fade" delay={0.1}>
                  <div className="w-full relative left-4">
                    <Popular data={data} />
                  </div>
                </AdvancedScrollAnimation>

                <AdvancedScrollAnimation type="slide-up" delay={0.2}>
                  <div
                    className="w-full flex flex-col justify-start items-end gap-2"
                    dir="rtl"
                  >
                    <div className="flex flex-col justify-start w-full relative  max-[1024px]:pr-8">
                      <h2 className="text-blue-100 dark:text-white font-bold text-[14px] ml-12 mb-4">
                        {t("about")} {data.title}
                      </h2>
                      <p className="text-[16px] text-[#475569]  font-black mb-4">
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

                <AdvancedScrollAnimation type="slide-up" delay={0.3}>
                  <div className="w-full pl-3 mt-10 flex flex-col gap-6" dir="rtl">
                    <h3 className="text-[rgb(16,8,143)] dark:text-white font-bold text-[18px] pr-2 max-[1024px]:pr-12">
                      {t("location")}
                    </h3>

                    {locationLoading ? (
                      <div className="w-full h-[307px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl" />
                    ) : (
                      <MapRent
                        lat={locationData?.lat}
                        lng={locationData?.lng}
                        address={data?.address}
                      />
                    )}

                 
                    <div className="w-full mt-2 ">
                      <h4 className="text-[rgb(6,4,37)] dark:text-white font-bold text-[16px] mb-3 flex items-center gap-2">
                        <MapPin size={18} className="text-blue-500" />
                        {t("exactLocation")}
                      </h4>
                      <p className="text-[#475569] dark:text-gray-400 text-[15px] leading-8 w-full text-justify">
                        {t("locationDescription")}
                      </p>
                    </div>
                  </div>
                </AdvancedScrollAnimation>
              </div>
              <AdvancedScrollAnimation type="slide-up" delay={0.4}>
                <div className="w-full " dir="rtl">
                  <h3 className="font-bold text-[20px] mt-10 text-right dark:text-white">
                    {t("why")} {data.title}؟
                  </h3>
                  <p className=" font-medium text-[16px] text-gray-600 dark:text-gray-400 mt-5 text-right leading-8">
                    {data.whydescription || data.caption}
                  </p>
                </div>
              </AdvancedScrollAnimation>

              <AdvancedScrollAnimation type="slide-up" delay={0.5}>
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

export default MortgageRentDetails;