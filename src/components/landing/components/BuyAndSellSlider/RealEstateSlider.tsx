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


const RealEstateSlider = (): React.JSX.Element => {
  const swiperRef = useRef<SwiperType | null>(null);

  const Items = [
    {
      id: 1,
      imageUrl: "/images/slide1.jpg",
      title: "آپارتمان دوبلکس",
      location: "رامسر، شهریار ۳",
      price: "۲۵۰,۰۰۰,۰۰۰ تومان",
      features: ["v", "v", "v"],
    },
    {
      id: 2,
      imageUrl: "/images/slide2.jpg",
      title: "ویلا مدرن",
      location: "چالوس، خیابان دریا",
      price: "۳۴۰,۰۰۰,۰۰۰ تومان",
      features: ["c", "", "c"],
    },
    {
      id: 3,
      imageUrl: "/images/slide3.jpg",
      title: "خانه ساحلی",
      location: "نوشهر، منطقه ۱",
      price: "۱۸۰,۰۰۰,۰۰۰ تومان",
      features: ["v", "v", "v"],
    },
    {
      id: 4,
      imageUrl: "/images/slide4.jpg",
      title: "پنت‌هاوس لوکس",
      location: "تهران، سعادت‌آباد",
      price: "۷۵۰,۰۰۰,۰۰۰ تومان",
      features: ["v", "v", "v"],
    },
    {
      id: 5,
      imageUrl: "/images/slide5.jpg",
      title: "آپارتمان نوساز",
      location: "کرج، گوهردشت",
      price: "۲۱۰,۰۰۰,۰۰۰ تومان",
      features: ["v", "v", "v"],
    },
  ];

  const handleSwiperInit = (swiper: SwiperType): void => {
    swiperRef.current = swiper;
  };

  return (
    <div className=" w-300 py-10">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={3.5}
          spaceBetween={30}
          loop={true}
          onSwiper={handleSwiperInit}
          className="mySwiper"
        >
          {Items.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative flex justify-center flex-wrap items-center w-82 h-94 border border-white overflow-hidden rounded-4xl bg-[#F5F5F5] shadow-lg transition-all scale-100">
                <div className="w-81 h-50 border rounded-tr-2xl rounded-br-[5px] rounded-bl-[5px] rounded-tl-2xl border-white bg-[#ccc] overflow-hidden">
                </div>

                <div className="relative w-79.5 h-39 gap-1">
                  <div className="w-full h-19 border-b border-[#adadad] px-3 pt-2">
                    <div className="text-blue-100 font-bold text-[17px] mb-2">
                      {slide.title}
                    </div>
                    <div className="flex items-center gap-1 text-blue-400 text-[13px]">
                      <LocationIconBlack />
                      <span>{slide.location}</span>
                    </div>
                  </div>

                  {/* اطلاعات ویلا */}
                  <div className="absolute bottom-0 w-full px-3 py-2">
                    <div className="flex justify-between text-[11px] text-gray-700 mb-2">
                      <div className="flex items-center gap-1">
                        <RoomIcon /> <span>۲ خواب</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MastersIcon /> <span>۱ حمام</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CarIcon /> <span>پارکینگ</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TreeIcon /> <span>حیاط</span>
                      </div>
                    </div>
                    <div className="text-blue-300 text-[15px] font-bold">
                      {slide.price}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
          <button
            type="button"
            className="rounded-full bg-white/90 w-10 h-10  text-black transition hover:bg-white/60"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            ←
          </button>

          <button
            type="button"
            className="rounded-full bg-white/90 w-10 h-10 text-black transition hover:bg-white/60"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateSlider;
