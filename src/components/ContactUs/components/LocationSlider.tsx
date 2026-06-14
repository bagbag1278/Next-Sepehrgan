"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslations } from 'next-intl';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import Vila from "@/app/(main)/contactus/icon/Vila";

const locations = [
  { id: 1, titleKey: "property1", locationKey: "location1" },
  { id: 2, titleKey: "property2", locationKey: "location2" },
  { id: 3, titleKey: "property3", locationKey: "location3" },
  { id: 4, titleKey: "property4", locationKey: "location4" },
  { id: 5, titleKey: "property5", locationKey: "location5" },
];

const LocationSlider = () => {
  const t = useTranslations('LocationSlider');
  const swiperInstanceRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.slideTo(2, 0);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full relative py-10 overflow-hidden">
      <h2 className="text-center text-[#060425] dark:text-blue-200 font-bold text-xl mb-8">
        {t('title')}
      </h2>

      <div className="w-full px-4 md:px-8">
        <Swiper
          onSwiper={(swiper) => {
            swiperInstanceRef.current = swiper;
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          initialSlide={2}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          modules={[EffectCoverflow, Navigation]}
          className="w-full"
        >
          {locations.map((item) => (
            <SwiperSlide 
              key={item.id} 
              className="!w-[230px]"
            >
              {({ isActive }) => (
                <div
                  className={`relative rounded-[30px] overflow-hidden transition-all duration-500 w-full h-[220px] 
                    ${isActive ? "scale-110 z-10" : "scale-90 opacity-60 blur-[1px]"}`}
                >
                  <Vila />
                  <div className="flex flex-col text-white justify-center absolute bottom-10 left-0 right-0 pl-4">
                    <h3 className="font-bold text-lg flex justify-center">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-xs text-gray-300 flex justify-center">
                      {t(item.locationKey)}
                    </p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    <div className="relative bottom-36 left-26  ">
            <div className="w-full   justify-center flex absolute">
              <div className="z-20  h-9 bg-white  opacity-90 dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-all">
                   <button className="next-btn ">
            <ChevronRight size={20} className="text-blue-900" />
          </button>
              </div>
          <div className=" relative top-10 left-9 z-20  opacity-90  bg-white dark:bg-gray-800 p-2 h-9 rounded-full shadow-md hover:bg-white transition-all">
              <button className="prev-btn ">
            <ChevronLeft size={20} className="text-blue-900" />
          </button>
          </div>
        
        </div>
        </div>
    </div>
  );
};

export default LocationSlider;