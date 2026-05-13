"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import styles from "./SwiperComponent.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Home from "../Icon/HomeImags/Home";
const SwiperComponent = () => {
  return (
    <div className="">
      {" "}
      <div className="w-[606px] h-[675px] relative justify-end rounded-tr-[50px] rounded-bl-[50px]  overflow-hidden">
        {" "}
        <div className="h-[4px] w-[359px] flex right-28 bg-gradient-to-r top-[60px] relative z-10 from-[#0887CA] to-white- sm:hidden hidden xl:block lg:block" />{" "}
        <div className="h-[4px] w-[180px] flex right-32 bg-white top-[60px] absolute z-10  sm:hidden hidden xl:block lg:block" />{" "}

          <Swiper
            className={styles.swiper}
            modules={[Autoplay, Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
          >
            {" "}
            <SwiperSlide>
              {" "}
              <Home />{" "}
            </SwiperSlide>{" "}
            <SwiperSlide>
              {" "}
              <Home />{" "}
            </SwiperSlide>{" "}
          </Swiper>{" "}
        </div>
      </div>
  );
};
export default SwiperComponent;
