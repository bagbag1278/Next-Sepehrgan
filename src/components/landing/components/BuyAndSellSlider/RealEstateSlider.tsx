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

  const PlaceHolderImage = "data:image/png;base64,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"


  return (
    <div className="w-300 py-10">
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
                        <MastersIcon /> <span>۱ حمام{house.bathrooms} </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CarIcon /> <span>پارکینگ{house.parking} </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TreeIcon /> <span>کنجایش </span>
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
    </div>
  );
};

export default RealEstateSlider;
