"use client";
import React, { useEffect } from "react";
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
  useEffect(() => {
    const importSwiperModules = async () => {
      await import("swiper/css/pagination");
      await import("swiper/css");
    };
    importSwiperModules();
  }, []);

  return (
    <div className={``}>
      {" "}
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
        className="mySwiper"
      >
        {images.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image src={slide.src} alt={slide.alt} width={688} height={700} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
