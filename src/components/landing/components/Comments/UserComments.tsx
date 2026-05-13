"use client";

import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import CommentsIcon from "../../Icon/Comments/CommentsIcon";
import Image from "next/image";
import ClockIcon from "../../Icon/Comments/ClockIcon";
import LikeIcon from "../../Icon/Comments/LikeIcon";

const FocusCarousel = () => {
  const items = useMemo(
    () => [
      { key: "1", Profile:  "2" , name: "آیتم1", content: "1", date: "1404/03/16" },
      { key: "2", Profile: "2", name: "آیتم 8", content: "2", date: "1404/03/16" },
      { key: "3", Profile: "3", name: "آیتم 16", content: "3", date: "1404/03/16" },
      { key: "4", Profile: "4", name: "آیتم 2", content: "1fvbgfklvdfvkmgb .xv,d.zfvgmkb. nmcvx/mlvk.bjnmvxc,zd/vk.bjnmvx,dcsd/fvmkbjn xmv,c,fvطزیسنترلربثشصپبقلفهتذبنیپبمثلقهشخذ", date: "1404/03/16" },
      { key: "5", Profile: "5", name: "آیتم 1", content: "5", date: "1404/03/16" },
      { key: "6", Profile: "6", name: "آیتم 2", content: "6", date: "1404/03/16" },
      { key: "7", Profile: "7", name: "آیتم 4", content: "7", date: "1404/03/16" },
      { key: "8", Profile: "8", name: "آیتم 78", content: "8", date: "1404/03/16" },
    ],
    []
  );

  // index اسلایدی که الان باید اکتیو باشد (focuseRight)
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className=" flex ">
      <div className="w-355 flex justify-between border border-white  ">

        {/* ////// */}
        <div className='w-70 lg:w-82 h-88 hidden lg:flex items-center ml-4 lg:items-end  '>
          <div className='flex flex-wrap justify-center h-56 lg:h-77  w-90 '>
            <div className=' flex flex-wrap justify-center h-14 ' >
              <div className='flex w-76 h-7 items-center  justify-between gap-1 '>
                <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse  scale-x-[-1] '>
                  <CommentsIcon />
                </div>
                <div className=' h-5.5 dark:text-[#28A5E6] text-[13px] text-blue-200 '>برترین نظرات شما،صدای شما راهنمای ما</div>
                <div className='w-6.75 h-6.5 flex gap-0.5 items-center flex-row-reverse '>
                  <CommentsIcon />
                </div>
              </div>
              <div className=' dark:text-[#F5F5F5] text-[20px] font-bold text-blue-400 '>نظرات بازدید کنندگان</div>
            </div>
            <div className='hidden lg:flex lg:w-82  lg:h-17 text-center text-blue-400 dark:text-[#F5F5F5D9] '>
              نظرات شما، نه تنها صدای ما هستند، بلکه راهنمایی برای دیگران در انتخاب بهترین تجربیات سفر هستند!
            </div>
            <button className='w-30 h-10 hover:border-2 rounded-xl border border-green-100 cursor-pointer ' >
              <p className='text-green-100 text-[14px] '>مشاهده همه</p>
            </button>
          </div>
        </div>
        {/* ////// */}

        <div className="relative w-300 border border-white  h-100  overflow-hidden ">
          <div
            className="absolute right-0 top-0 w-76.25 h-93.75 bg-green-100 rounded-bl-[5px] rounded-tr-[5px] rounded-tl-[50px] rounded-br-[50px] "

          >
          </div>

          <Swiper
            modules={[Navigation, A11y]}
            dir="rtl"
            loop={true}
            centeredSlides={false}
            slidesPerView={4}
            spaceBetween={10}
            watchSlidesProgress={true}
            navigation={{
              nextEl: ".carousel-next",
              prevEl: ".carousel-prev",
            }}
            onSwiper={(swiper) => {
              setActiveIndex(swiper.realIndex ?? 0);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex ?? 0);
            }}
          >

            {/* map ++++++ */}
            {items.map((item, idx) => {
              const focused = idx === activeIndex;

              return (
                <SwiperSlide key={item.key}>
                  <div className="flex items-center justify-center mt-8 mr-20 border border-[#005EA480]">
                    <div
                      className={[
                        "transition-all duration-300 flex items-center justify-center",
                        focused ? "scale-[1.08]" : "scale-100",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          // ⬅️ حفظ ابعاد اصلی
                          "rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-center",
                          focused ? "w-70 h-77.5 ml-2.5" : "w-55 h-60",
                        ].join(" ")}
                      >

                        {focused ? (
                          <div className="flex flex-col items-center justify-between text-center w-full h-full p-5">
                            {/* profile */}
                            <div className="w-20 h-20 rounded-full p-0.75 border border-[#BAE9D3] bg-white">
                              {/* <img
                                src={item.Profile}
                                alt={item.name}
                                className="w-full h-full rounded-full object-cover"
                              /> */}
                              <div>
                                {item.Profile}
                              </div>
                            </div>

                              {/* name */}
                            <p className="mt-3 text-lg font-bold text-[#0A1133]">
                              {item.name}
                            </p>

                            <p
                              className="mt-2 text-ellipsis line-clamp-4 w-66 h-27.75 text-center text-[14px]  leading-7 text-[#1B1E36] px-2"
                            >
                              {item.content}
                            </p>

                            <div className="mt-auto w-full flex justify-between items-center px-2">
                              <span className="text-[#A9A9A9] text-xs flex items-center gap-1">
                                <ClockIcon />
                                {item.date}
                              </span>

                              <div className=" cursor-pointer" >

                                <LikeIcon />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center px-4">
                            <div className="w-16 h-16 rounded-full p-0.5 border border-[#D1F3E2] mt-3">
                              {/* <Image
                                src={item.Profile}
                                alt={item.name}
                                className="w-full h-full rounded-full object-cover"
                              /> */}
                              <div>
                                {item.Profile}
                              </div>
                            </div>
                            <p className="mt-4 text-base font-bold text-[#0A1133]">
                              {item.name}
                            </p>
                            <p className="mt-2 text-sm text-[#1B1E36] leading-6">
                              {item.content.slice(0, 45)}...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}



          </Swiper>

          <div className="absolute right-0 top-38 z-50 mt-4 flex justify-end">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="carousel-prev h-10 w-10 rounded-full border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center"
                aria-label="اسکرول به چپ"
              >
                ‹
              </button>

              <button
                type="button"
                className="carousel-next h-10 w-10 rounded-full border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center"
                aria-label="اسکرول به راست"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusCarousel;
