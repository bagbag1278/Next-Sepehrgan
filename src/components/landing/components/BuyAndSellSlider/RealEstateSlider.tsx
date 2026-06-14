"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import LocationIconBlack from "@/components/Footer/Icon/LocationIconBlack";
import RoomIcon from "../../Icon/BuyAndSellSlider/RoomIcon";
import MastersIcon from "../../Icon/BuyAndSellSlider/MastersIcon";
import CarIcon from "../../Icon/BuyAndSellSlider/CarIcon";
import TreeIcon from "../../Icon/BuyAndSellSlider/TreeIcon";
import Image from "next/image";

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
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSwiperInit = (swiper: SwiperType): void => {
    swiperRef.current = swiper;
  };

  const PlaceHolderImage = " بدون عکس";

  return (
    <div className="w-300 py-10 relative">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={3.5}
          spaceBetween={30}
          loop={true}
          onSwiper={handleSwiperInit}
        >
          {houses.map((house) => (
            <SwiperSlide key={house.id}>
              <div className="hover-3d group">
                <div className="relative flex justify-center flex-wrap items-center w-82 h-94 border border-white dark:border-gray-700 overflow-hidden rounded-4xl bg-[#F5F5F5] dark:bg-[#1a1a2e] shadow-lg transition-all duration-300">
                  {/* image */}
                  <div className="w-81 h-50 overflow-hidden rounded-2xl flex justify-center">
                
                      <div className="w-75 overflow-hidden mt-3 ">
                        <img
                          src={"placeholder.png"}
                          width={324}
                          height={200}
                          alt=""
                          className="dark:opacity-70"
                        />
                      </div>

                  
                  </div>

                  <div className="relative w-79.5 h-39 gap-1">
                    <div className="w-full h-19 border-b border-[#adadad] dark:border-gray-600 px-3 pt-2">
                      <div className="text-blue-100 font-bold text-[17px] mb-2 dark:text-blue-300 line-clamp-1">
                        {house.title}
                      </div>

                      <div className="flex items-center gap-1 text-blue-400 text-[13px] dark:text-gray-300">
                        <LocationIconBlack />
                        <span className="dark:text-gray-300 line-clamp-1"> {house.address}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 w-full px-3 py-2">
                      <div className="flex justify-between text-[11px] text-gray-700 dark:text-gray-300 mb-2">
                        <div className="flex items-center gap-1">
                          <RoomIcon /> <span>{house.rooms || 0} خواب</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MastersIcon /> <span>{house.bathrooms || 0} حمام</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CarIcon /> <span>{house.parking || 0} پارکینگ</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TreeIcon /> <span>{house.capacity || 0} نفر</span>
                        </div>
                      </div>

                      <div className="text-blue-300 text-[15px] font-bold dark:text-blue-300">
                        {Number(house.price).toLocaleString("fa-IR")} تومان
                      </div>
                    </div>
                  </div>
                </div>
                {/* 8 empty divs for 3D effect */}
                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* button ****** */}
        <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
          <button
            type="button"
            className="rounded-full bg-white/90 dark:bg-gray-800/90 w-10 h-10 text-black dark:text-white transition hover:bg-white/60 dark:hover:bg-gray-700/60 shadow-md"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            ←
          </button>

          <button
            type="button"
            className="rounded-full bg-white/90 dark:bg-gray-800/90 w-10 h-10 text-black dark:text-white transition hover:bg-white/60 dark:hover:bg-gray-700/60 shadow-md"
            onClick={() => swiperRef.current?.slideNext()}
          >
            →
          </button>
        </div>
      </div>

      {/* responsive ========== */}
      <div></div>
    </div>
  );
};

export default RealEstateSlider;