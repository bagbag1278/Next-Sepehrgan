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

  const PlaceHolderImage = " بدون عکس"


  return (
    <div className="w-300 py-10 relative">
      <div className="relative ">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={3.5}
          spaceBetween={30}
          loop={true}
          onSwiper={handleSwiperInit}
        >
          {houses.map((house) => (
            <SwiperSlide key={house.id}>
              <div className="relative flex justify-center flex-wrap items-center w-82 h-94 border border-white overflow-hidden rounded-4xl bg-[#F5F5F5] shadow-lg transition-all scale-100">

                {/* تصویر */}
                <div className="w-81 h-50 overflow-hidden rounded-2xl flex jus bg-[#ccc]">
                  {Array.isArray(house.photos) && house.photos.length > 0 && house.photos[0] ? (
                    <img
                      src={house.photos[1]}
                      alt={house.title || "House image"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.replaceWith(document.createElement("div"));
                      }}
                    />
                  ) : (
                    <div>{PlaceHolderImage} </div>
                  )}


                </div>

                <div className="relative w-79.5 h-39 gap-1">
                  <div className="w-full h-19 border-b border-[#adadad] px-3 pt-2">
                    <div className="text-blue-100 font-bold text-[17px] mb-2">
                      {house.title}
                    </div>

                    <div className="flex items-center gap-1 text-blue-400 text-[13px]">
                      <LocationIconBlack />
                      <span> {house.address}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 w-full px-3 py-2">
                    <div className="flex justify-between text-[11px] text-gray-700 mb-2">
                      <div className="flex items-center gap-1">
                        <RoomIcon /> <span> خواب{house.rooms} </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MastersIcon /> <span> حمام{house.bathrooms} </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CarIcon /> <span>پارکینگ{house.parking} </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TreeIcon /> <span>کنجایش {house.capacity} </span>
                      </div>
                    </div>

                    <div className="text-blue-300 text-[15px] font-bold">
                      {Number(house.price).toLocaleString("fa-IR")} تومان
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

          {/* button ****** */}
        <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
          <button
            type="button"
            className="rounded-full bg-white/90 w-10 h-10 text-black transition hover:bg-white/60"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            ←
          </button>

          <button
            type="button"
            className="rounded-full bg-white/90 w-10 h-10 text-black transition hover:bg-white/60"
            onClick={() => swiperRef.current?.slideNext()}
          >
            →
          </button>
        </div>
      </div>


                {/* responsive ========== */}
                <div>
                  
                </div>

    </div>
  );
};

export default RealEstateSlider;
