"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Slider from "@/components/HouseDetails/icon/Slider/Slider";

// ۱. تعریف تایپ برای پروپ‌هایی که کامپوننت می‌پذیرد
interface SwiperGaleryProps {
  images?: { url: string }[]; // فرض بر این است که API آرایه‌ای از اشیا شامل url برمی‌گرداند
}

const SwiperGalery = ({ images }: SwiperGaleryProps) => {
  // ۲. اگر عکس از API نیامد، از عکس‌های پیش‌فرض استفاده کن تا صفحه خالی نباشد
  const defaultImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
  ];

  // تبدیل دیتای API به آرایه‌ای از رشته‌ها برای استفاده راحت‌تر
  const displayImages = images && images.length > 0 
    ? images.map(img => img.url) 
    : defaultImages;

  return (
    <div className="w-full py-10 bg-white overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={40} 
        slidesPerView={1.3} 
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          1024: {
            slidesPerView: 1.7,
            spaceBetween: 50,
          },
        }}
        className="mySwiper !overflow-visible"
      >
        {displayImages.map((imgUrl, index) => (
          <SwiperSlide key={index}>
            {/* اینجا مطمئن شو کامپوننت Slider هم پروپ imageSrc را در تایپ خود دارد */}
            <Slider imageSrc={imgUrl} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-slide {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.85);
          filter: blur(2px);
          opacity: 0.6;
        }
        .swiper-slide-active {
          transform: scale(1) !important;
          filter: blur(0px) !important;
          opacity: 1 !important;
        }
        .swiper {
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
};

export default SwiperGalery;