"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import Vila from "./icon/Vila";

const locations = [
  { id: 1, title: "املاکی غزال بانو", location: "مازندران، ساری، دودانگه..." },
  { id: 2, title: "ویلا مدرن خزر", location: "گیلان، رشت، انزلی..." },
  { id: 3, title: "عمارت رویال", location: "تهران، لواسان..." },
  { id: 4, title: "کلبه درختی", location: "سوادکوه، مازندران..." },
  { id: 5, title: "کلبه درختی", location: "سوادکوه، مازندران..." },
  { id: 6, title: "کلبه درختی", location: "سوادکوه، مازندران..." },
    { id: 7 , title: "کلبه درختی", location: "سوادکوه، مازندران..." ,  },

];
 
const SliderImages = "data:image/jpeg;base64,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"

const LocationSlider = () => {
  return (
    <>
      <div className="w-full py-10 relative group   ">
        <h2 className="text-center text-[#060425] font-bold text-xl mb-8">
          املاکی های ما در سراسر جهان
        </h2>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3.5,
            slideShadows: false,
          }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          modules={[EffectCoverflow, Navigation]}
          className="w-[220px] max-w-5xl relative "
        >
          {locations.map((item) => (
            <SwiperSlide key={item.id} className="w-[300px]  sm:w-[350px]">
              {({ isActive }) => (
                <div
                  className={`relative rounded-[30px] overflow-hidden transition-all duration-500  h-[220px] 
                ${isActive ? "scale-110 z-10" : "scale-90 opacity-60 blur-[1px]"}`}
                >
                    <Vila/>
                    <div className="flex flex-col text-white justify-center relative bottom-21 pl-4 ">
                       <h3 className="font-bold text-lg flex justify-center ">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 flex justify-center ">
                    {item.location}
                  </p>
                    </div>
                 
                </div>
              )}
            </SwiperSlide>
          ))} 
        </Swiper>
        <div className="relative bottom-36 left-26  ">
            <div className="w-full   justify-center flex absolute">
              <div className="z-20  h-9 bg-white p-2 rounded-full shadow-md hover:bg-white transition-all">
                   <button className="next-btn ">
            <ChevronRight size={20} className="text-blue-900" />
          </button>
              </div>
          <div className=" relative top-10 left-9 z-20 bg-white p-2 h-9 rounded-full shadow-md hover:bg-white transition-all">
              <button className="prev-btn ">
            <ChevronLeft size={20} className="text-blue-900" />
          </button>
          </div>
        
        </div>
        </div>
      
      </div>
    </>
  );
};

export default LocationSlider;
