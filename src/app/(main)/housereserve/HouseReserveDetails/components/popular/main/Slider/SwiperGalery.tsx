"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Slider from "@/components/HouseDetails/icon/Slider/Slider";

type GalleryImage = string | { url?: string | null } | null | undefined;
interface SwiperGaleryProps { images?: GalleryImage[] | null; image?: string | null; }

const SwiperGalery = ({ images, image }: SwiperGaleryProps) => {
  const displayImages = (images ?? []).map((item) => typeof item === "string" ? item : item?.url).filter((url): url is string => Boolean(url?.trim()));
  if (!displayImages.length && image) displayImages.push(image);
  if (!displayImages.length) return <div className="w-full h-full min-h-64 rounded-2xl bg-gray-100 dark:bg-gray-800" aria-label="تصویری برای این اقامتگاه ثبت نشده است" />;
  return (
    <div className="w-full py-10 overflow-hidden dark:text-white">
      <Swiper modules={[Navigation, Autoplay]} spaceBetween={40} slidesPerView={1.3} centeredSlides loop={displayImages.length > 1} autoplay={displayImages.length > 1 ? { delay: 4000 } : false} breakpoints={{ 1024: { slidesPerView: 1.7, spaceBetween: 50 } }} className="mySwiper !overflow-visible">
        {displayImages.map((url, index) => <SwiperSlide key={`${url}-${index}`}><Slider imageSrc={url} /></SwiperSlide>)}
      </Swiper>
      <style jsx global>{`
        .swiper-slide { transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform: scale(0.85); filter: blur(2px); opacity: 0.6; }
        .swiper-slide-active { transform: scale(1) !important; filter: blur(0px) !important; opacity: 1 !important; }
        .swiper { overflow: visible !important; }
      `}</style>
    </div>
  );
};
export default SwiperGalery;
