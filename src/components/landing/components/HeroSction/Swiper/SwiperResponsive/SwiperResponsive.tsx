"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import styles from "../SwiperResponsive/SwiperResponsive.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Homeee from "../../Icon/HomeImags/Homeee";
const SwiperResponsive = () => {
  return (
    <div className="">
      {" "}
      <div className="w-[606px] h-[675px] relative  rounded-tr-[50px] rounded-bl-[50px]">
        {" "}
      
        <Swiper
          className={styles.swiper}
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{ clickable: true }}
          
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {" "}
          <SwiperSlide>
            {" "}
            <Homeee />{" "}
          </SwiperSlide>{" "}
          <SwiperSlide>
            {" "}
            <Homeee />{" "}
          </SwiperSlide>{" "}
        </Swiper>{" "}
      </div>
    </div>
  );
};
export default SwiperResponsive;
