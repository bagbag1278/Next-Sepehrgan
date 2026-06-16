"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const images = [
  "/FastReserve/70d5c5d366cb68e16976f49d2f69092f0f0ba422.png",
  "/FastReserve/a4f246f8d2ea30ef9ea9b6de5662f1c91a273d10.png",
  "/FastReserve/70d5c5d366cb68e16976f49d2f69092f0f0ba422.png",
];

export default function AvatarSlider() {
  return (
    <div className="w-82 py-3 px-2 ">
      <p className="text-center text-[14px] text-gray-700 mb-4">
        یا میتونی یکی از عکس های زیر رو انتخاب کنی
      </p>

      <div className="relative avatar-swiper">
        <button className="custom-prev absolute right-auto -left-2.5 top-1/2 z-10 -translate-y-1/2 size-9 rounded-full border bg-white shadow-md flex items-center justify-center">
          <ChevronLeft size={18} />
        </button>

        <button className="custom-next absolute left-auto -right-2.5 top-1/2 z-5 -translate-y-1/2 size-9 rounded-full border bg-white shadow-md flex items-center justify-center">
          <ChevronRight size={18} />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          slidesPerView={3}
          centeredSlides
          spaceBetween={12}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center">
                <Image
                  src={image}
                  alt=""
                  width={92}
                  height={92}
                  className={`rounded-full object-cover transition-all duration-300 ${
                    index === 1
                      ? "size-[92px]"
                      : "size-[58px]"
                  }`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}