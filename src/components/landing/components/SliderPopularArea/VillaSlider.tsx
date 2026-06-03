"use client";

import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useRef } from "react";
import MountainsSun from "../../Icon/ThirdContainer/mountainsSun";
import StarIcon from "../../Icon/FirstContainer/StarIcon";

function VillaSlider() {
  const t = useTranslations('VillaSlider');
  const swiperRef = useRef<any>(null);

  const items = [
    { img: "/v1.jpg", point: "4.5", place: t('villaMashhad') },
    { img: "/v2.jpg", point: "4.6", place: t('villaIsfahan') },
    { img: "/v3.jpg", point: "4.12", place: t('villaGahrdasht') },
    { img: "/v4.jpg", point: "4.6", place: t('villaSari') },
    { img: "/v5.jpg", point: "4.9", place: t('villaMashhad') },
    { img: "/v3.jpg", point: "4.2", place: t('villaTehran') },
    { img: "/v4.jpg", point: "4.1", place: t('villaMashhad') },
    { img: "/v5.jpg", point: "4.3", place: t('villaIsfahan') },
  ];

  return (
    <div className="w-full hidden lg:flex justify-center overflow-x-hidden">
      <div className="flex flex-wrap justify-center h-100 w-312 overflow-x-hidden">
        <div className="w-79 h-15 flex justify-center flex-wrap">
          <div className="flex gap-3 dark:text-[#28A5E6] text-blue-200 text-[12px]">
            <MountainsSun />
            <div>{t('discoverWithUs')}</div>
            <MountainsSun />
          </div>
          <div className="dark:text-[#F5F5F5] text-blue-400">{t('latestRecreationalAreas')}</div>
        </div>

        <div className="hidden lg:block relative h-80 w-312 py-5 overflow-hidden">
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
            loop={true}
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
              <SwiperSlide key={idx} className="group flex items-center justify-center transition-all duration-300">
                <div className="relative rounded-2xl border border-white overflow-hidden shadow-2xl">
                  <Image
                    src={item.img}
                    alt={item.place}
                    width={420}
                    height={260}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-2 w-full flex justify-center gap-4">
                    <div className="flex gap-0.5 text-white text-[14px]">
                      <div>{item.place}</div>
                    </div>
                    <div className="opacity-0 transition-all duration-300 group-[.swiper-slide-active]:opacity-100 flex gap-0.5 items-center">
                      <div className="text-white text-[13px]">{item.point}</div>
                      <StarIcon />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default VillaSlider;