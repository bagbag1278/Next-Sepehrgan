"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import styles from "./SwiperComponent.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Home from "../Icon/HomeImags/Home";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SwiperComponent = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log("prevRef:", prevRef.current);
    console.log("nextRef:", nextRef.current);
  }, []);

  return (
    <div className="">
      {" "}
      <div className="w-[606px] h-[675px] relative  justify-end rounded-tr-[50px] rounded-bl-[50px]  overflow-hidden">
        {" "}
        <div className="h-[4px] w-[359px] flex right-28 bg-gradient-to-r top-[60px] relative z-10 from-[#0887CA] to-white- sm:hidden hidden xl:block lg:block" />{" "}
        <div className="h-[4px] w-[180px] flex right-32 bg-white top-[60px] absolute z-10  sm:hidden hidden xl:block lg:block" />{" "}

        <Swiper
          className={styles.swiper}
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <Home />
          </SwiperSlide>
          <SwiperSlide>
            <Home />
          </SwiperSlide>
        </Swiper>
        
     <div className="absolute bottom-75 left-7 flex gap-1 z-20 flex-col">
  <div className="z-20 h-9 bg-white dark:bg-gray-800 opacity-80 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
    <button ref={nextRef} className="next-btn"> 
      <ChevronRight size={20} className="text-blue-900 dark:text-blue-300" />
    </button>
  </div>
  <div className="z-20 h-9 bg-white dark:bg-gray-800 opacity-80 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
    <button ref={prevRef} className="prev-btn"> 
      <ChevronLeft size={20} className="text-blue-900 dark:text-blue-300" />
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default SwiperComponent;