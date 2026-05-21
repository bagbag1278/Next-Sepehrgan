"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import MountainsSun from "../../Icon/ThirdContainer/mountainsSun";
import StarIcon from "../../Icon/FirstContainer/StarIcon";
import Imagevilla from "../../Icon/VillasSlider/Imagevilla";
import Image2 from "../../Icon/VillasSlider/Image2";
import Image4 from "../../Icon/VillasSlider/Image4";


function VillaSlider() {
  const swiperRef = useRef<any>(null);

  const items = [
    { img: <Imagevilla />, ponit: "5", place: "ویلای مشهد" },
    { img: <Image2 />, ponit: "4.5", place: "ویلای اصفهان" },
    { img: < Imagevilla />, ponit: "4.2", place: "ویلای گهردشت" },
    { img: <Image4 />, ponit: "4.6", place: "ویلای ساری" },
    { img: <Image2 />, ponit: "2.5", place: "ویلای مشهد" },
    { img: <Imagevilla />, ponit: "4.2", place: "ویلای تهران" },
    { img: <Image2 />, ponit: "4.5", place: "ویلای مشهد" },
    { img: <Image4 />, ponit: "3.5", place: "ویلای اصفهان" },
  ];

  return (
    <div className="w-full hidden lg:flex justify-center overflow-x-hidden">
      <div className="flex flex-wrap justify-center h-100 w-312 overflow-x-hidden">
        <div className="w-79 h-15 flex justify-center flex-wrap">
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
              <SwiperSlide
                key={idx}
                className="group flex items-center justify-cente transition-all duration-300"
              >

                <div className="relative flex justify-center rounded-2xl overflow-hidden shadow-2xl">
                  {/* Image  */}
                  <div
                    className="h-65 w-107.5 "
                  >
                    {item.img}


                  </div>
                      <div className="absolute bottom-6 w-full flex justify-center  gap-4 ">
                        <div className=" flex gap-0.5 text-white text-[14px] group-[.swiper-slide-active]: ">
                          <div>{item.place} </div>
                        </div>
                        {/* Star and point  */}
                        <div className="opacity-0 transition-all w-0 duration-300 group-[.swiper-slide-active]:w-auto group-[.swiper-slide-active]:opacity-100 flex gap-0.5 items-center">
                          <div className="text-white text-[13px]">
                            {item.ponit}
                          </div>
                          <StarIcon />
                        </div>
                      </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div >
  );
}

export default VillaSlider;
