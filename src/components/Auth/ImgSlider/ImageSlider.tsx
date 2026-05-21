"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface SlideImage {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: SlideImage[];
  delay?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, delay = 5000 }) => {
  return (
    <div className="relative w-full h-full">
      <style jsx>{`
        :global(.mySwiper .swiper-pagination-bullet) {
          background-color: white !important;
          opacity: 0.7;
          width: 10px;
          height: 10px;
        }
        :global(.mySwiper .swiper-pagination-bullet-active) {
          background-color: #0887CA !important;
          opacity: 1;
        }
      `}</style>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
        }}
        className="mySwiper h-full w-full"
      >
        {images.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image 
              src={slide.src} 
              alt={slide.alt} 
              fill
              className="object-cover"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;