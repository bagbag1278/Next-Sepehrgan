"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { Car, MapPinIcon, ShowerHead, TreeDeciduous, Warehouse } from "lucide-react";

interface House {
  id: number;
  title: string;
  address: string;
  price: string;
  photos?: string[] | null;
  tags?: string[];
  rooms?: number;
  bathrooms?: number;
  parking?: number;
  capacity?: number;
}

interface Props {
  houses: House[];
}

const RealEstateSlider = ({ houses }: Props): React.JSX.Element => {
  const t = useTranslations("RealEstateSlider");
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSwiperInit = (swiper: SwiperType): void => {
    swiperRef.current = swiper;
  };

  const PlaceHolderImage = t("noImage");

  return (
    <div className="w-300 py-10 relative">
      <div className="w-400 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={4.25}
          spaceBetween={10}
          loop={true}
          onSwiper={handleSwiperInit}
        >
          {houses.map((house) => (
            <SwiperSlide key={house.id}>
              <div className="hover-3d group">
                <div className="relative flex justify-center flex-wrap items-center w-82 h-94 border border-white dark:border-gray-700 rounded-4xl bg-[#F5F5F5] dark:bg-[#1a1a2e] shadow-lg transition-all duration-300">
                  {/* image */}
                  <div className="w-81 h-50 overflow-hidden rounded-2xl flex justify-center">
                    <div className="w-75 overflow-hidden mt-3">
                      {(house.photos?.[0] || house.image) && <img src={house.photos?.[0] || house.image} width={324} height={200} alt={house.title} className="dark:opacity-70 w-full h-full object-cover" />}
                    </div>
                  </div>

                  <div className="relative w-79.5 h-39 gap-1">
                    <div className="w-full h-19 border-b border-[#adadad] dark:border-gray-600 px-3 pt-2">
                      <div className="text-blue-100 font-bold text-[17px] mb-2 dark:text-blue-300 line-clamp-1">
                        {house.title}
                      </div>

                      <div className="flex items-center gap-1 text-blue-400 text-[13px] dark:text-gray-300">
                        <MapPinIcon />
                        <span className="dark:text-gray-300 line-clamp-1">{house.address}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 w-full px-3 py-2">
                      <div className="flex justify-between text-[11px] text-gray-700 dark:text-gray-300 mb-2">
                        <div className="flex items-center gap-1">
                          <Warehouse size={16} />
                          <span>{house.rooms || 0} {t("rooms")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ShowerHead size={16} />
                          <span>{house.bathrooms || 0} {t("bathrooms")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Car size={16} />
                          <span>{house.parking || 0} {t("parking")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TreeDeciduous size={16} />
                          <span>{house.capacity || 0} {t("capacity")}</span>
                        </div>
                      </div>

                      <div className="text-blue-300 text-[15px] font-bold dark:text-blue-300">
                        {Number(house.price).toLocaleString("fa-IR")} {t("toman")}
                      </div>
                    </div>
                  </div>
                </div>
                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
          <button
            type="button"
            className="rounded-full bg-white/90 dark:bg-gray-800/90 w-10 h-10 text-black dark:text-white transition hover:bg-white/60 dark:hover:bg-gray-700/60 shadow-md"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={t("prev")}
          >
            ←
          </button>

          <button
            type="button"
            className="rounded-full bg-white/90 dark:bg-gray-800/90 w-10 h-10 text-black dark:text-white transition hover:bg-white/60 dark:hover:bg-gray-700/60 shadow-md"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={t("next")}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateSlider;