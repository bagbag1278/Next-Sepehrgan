"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// وارد کردن استایل‌های Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "../icon/Slider";

const SwiperGalery = () => {
  return (
    <div className="w-full   py-5 bg-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} // فاصله بین اسلایدها
        slidesPerView={1.4} // نمایش بخشی از اسلایدهای کناری
        centeredSlides={true}
        loop={true} // تکرار اسلایدر
        autoplay={{ delay: 3000 }}
        breakpoints={{
          // برای دسکتاپ (شبیه تصویر فیگما)
          1024: {
            slidesPerView: 1.8,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="  relative   flex justify-center rounded-[40px]">
            <Slider />
            {/* دکمه مشاهده همه تصاویر (پایین سمت چپ در تصویر) */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="  relative   flex justify-center rounded-[40px]">
            <Slider />
            {/* دکمه مشاهده همه تصاویر (پایین سمت چپ در تصویر) */}
          </div>
        </SwiperSlide>

         <SwiperSlide>
          <div className="  relative   flex justify-center rounded-[40px]">
            <Slider />
            {/* دکمه مشاهده همه تصاویر (پایین سمت چپ در تصویر) */}
          </div>
        </SwiperSlide>
      </Swiper>

      {/* استایل سفارشی برای گرد کردن گوشه‌ها که Swiper گاهی حذف می‌کند */}
      <style jsx global>{`
        .swiper-slide {
          transition: transform 0.3s ease;
        }
        .swiper-slide-active {
          transform: scale(1.02); /* کمی بزرگتر شدن تصویر وسط */
        }
      `}</style>
    </div>
  );
};

export default SwiperGalery;
