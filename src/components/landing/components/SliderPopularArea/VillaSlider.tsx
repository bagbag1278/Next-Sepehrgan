"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useRef } from "react";
import MountainsSun from "../../Icon/ThirdContainer/mountainsSun";

function VillaSlider() {
  const swiperRef = useRef<any>(null);

  const items = [
    { title: "ویلای سنگده", img: "/v1.jpg" },
    { title: "ویلای مازندران", img: "/v2.jpg" },
    { title: "ویلای یزد", img: "/v3.jpg" },
    { title: "ویلای مشهد", img: "/v4.jpg" },
    { title: "ویلای اصفهان", img: "/v5.jpg" },
    { title: "ویلای یزد", img: "/v3.jpg" },
    { title: "ویلای مشهد", img: "/v4.jpg" },
    { title: "ویلای اصفهان", img: "/v5.jpg" },
  ];

  return (
    <div className="w-full hidden lg:flex justify-center overflow-x-hidden">
      <div className="flex flex-wrap justify-center h-100 w-312 overflow-x-hidden">
        <div className="w-79 h-15 border border-white flex justify-center flex-wrap">
          <div className="flex gap-3 dark:text-[#28A5E6] text-blue-200 text-[12px]">
            <MountainsSun />
            <div>جدید ترین ها را با ما کشف کنید لذت ببرید</div>
            <MountainsSun />
          </div>
          <div className="dark:text-[#F5F5F5] text-blue-400">
            جدید ترین مناطق تفریحی
          </div>
        </div>

        {/* ✅ فقط در lg و بزرگ‌تر نمایش داده می‌شود */}
        <div className="hidden lg:block relative h-80 w-312 py-5 overflow-hidden">
          {/* دکمه‌ها */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full shadow-lg w-10 h-10 flex items-center justify-center"
            type="button"
          >
            ←
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full shadow-lg w-10 h-10 flex items-center justify-center"
            type="button"
          >
            →
          </button>

          <Swiper
            modules={[Navigation]}
            slidesPerView={5}
            centeredSlides
            loop
            spaceBetween={30}
            watchSlidesProgress
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onProgress={(swiper) => {
              swiper.slides.forEach((slide: any) => {
                const progress = slide.progress;
                const absProgress = Math.abs(progress);
                const scale = 1 - absProgress * 0.2;
                slide.style.transform = `scale(${scale})`;
                slide.style.opacity = String(1 - absProgress * 0.4);
              });
            }}
            className="villa-swiper overflow-x-hidden"
          >
            {items.map((item, idx) => (
              <SwiperSlide
                key={idx}
                className="flex items-center justify-center border border-white transition-all duration-300"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={420}
                    height={260}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ✅ زیر lg کاملاً حذف می‌شود (هیچی رندر/نمایش داده نمی‌شود) */}
      </div>
    </div>
  );
}

export default VillaSlider;
