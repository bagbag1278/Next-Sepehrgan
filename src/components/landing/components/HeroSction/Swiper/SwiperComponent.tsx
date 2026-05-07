"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Home from "../Icon/Home";

const SwiperComponent = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="w-[606px] h-[675px] relative">

      {/* prev */}
      <button
        ref={prevRef}
        className="absolute left-5 bottom-70 -translate-y-1/2
                   z-20 w-[40px] h-[40px] rounded-full
                   bg-white shadow-lg
                   flex items-center justify-center"
      >
        <span className="text-[#0887CA] text-xl">←</span>
      </button>

      {/* next */}
      <button
        ref={nextRef}
        className="absolute right-5 top-1/2 -translate-y-1/2
                   z-20 w-[40px] h-[40px] rounded-full
                   bg-white shadow-lg
                   flex items-center justify-center"
      >
        <span className="text-[#0887CA] text-xl">→</span>
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;

          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;

          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        <SwiperSlide>
          <Home />
        </SwiperSlide>

        <SwiperSlide>
          <Home />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;