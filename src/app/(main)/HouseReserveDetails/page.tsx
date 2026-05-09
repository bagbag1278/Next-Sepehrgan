import Star from "@/components/HouseReserveDetails/icon/Star";
import SwiperGalery from "@/components/HouseReserveDetails/Slider/SwiperGalery";
import React from "react";

const HouseReserveDetails = () => {
  return (
    <div>
      <div className="max-w-360 m-auto flex flex-col items-center gap-10 border mt-10">
        <div className="w-full h-102 border flex ">
          <div className="w-full">
            <SwiperGalery />
          </div>
        </div>
        <div className="mt-20">
          <div className="w-300 h-16 border flex  justify-between items-center">
            <div className="w-18 h-8 border"></div>
            <div className="text-2xl font-bold items-center">
              هتل همایون فر کیش ایران
            </div>
            <p className="text-[14px] absolute mt-4 ml-220 text-gray-600">3.5<div className="relative right-5 bottom-5 "><Star/></div></p>
          </div>
          <div className=" flex justify-between gap-4">
            <div className="flex gap-16 flex-col">
              <div className="w-107 h-117 border"></div>
              <div className="w-107 h-142 border flex-col"></div>
            </div>
            <div className="w-197 h-517  border flex flex-wrap justify-center items-center gap-1">
              <div className="flex flex-wrap gap-23 justify-center">
                <div className="w-181 h-80 border flex "></div>
                <div className="w-180 h-184 border flex "></div>
              </div>

              <div className="w-173 h-10 border flex "></div>
              <div className="w-173 h-158 border flex "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseReserveDetails;
