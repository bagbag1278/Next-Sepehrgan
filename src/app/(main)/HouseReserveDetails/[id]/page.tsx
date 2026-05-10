"use client";
import Foarward from "@/components/HouseReserveDetails/icon/icon/Foarward";
import Link from "@/components/HouseReserveDetails/icon/icon/Link";
import Loaction from "@/components/HouseReserveDetails/icon/icon/Loaction";
import Star from "@/components/HouseReserveDetails/icon/icon/Star";
import Bread from "@/components/HouseReserveDetails/popular/Header/Bread";
import CommentsSection from "@/components/HouseReserveDetails/popular/Comment/CommentsSection";
import FleshHome from "@/components/HouseReserveDetails/popular/FleshHome";
import Popular from "@/components/HouseReserveDetails/popular/main/Popular";
import Reserve from "@/components/HouseReserveDetails/popular/Reserve";

import React, { useState } from "react";
import SwiperGalery from "@/components/HouseReserveDetails/popular/main/Slider/SwiperGalery";
import SimilarProperties from "@/components/HouseReserveDetails/popular/main/SimilarProperties";

const Detail = {
  id: 1,
  title: " هتل همایون‌فر کیش ایران",
  address: "هرمزگان، جزیره کیش، میدان پردیس، جنب بازار پردیس ۲",
  rating: 4.8,
  whydescription:"  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است گرها و متون بلکه روزنامه و مجله در ست...لورم ایپسوم متن ساختگی با تولید سادگی نامف...لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است گرها و متون بلکه روزنامه و مجله ست...لورم ایپسوم متن ساختگی با تولید سادگی نامف...لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت.....",
  description:
    "هتل همایون‌فر یکی از مجلل‌ترین هتل‌های ۵ ستاره در قلب جزیره کیش است. این هتل با دسترسی عالی به مراکز خرید و ساحل نیلگون خلیج فارس، تجربه‌ای فراموش‌نشدنی را برای مسافران رقم می‌زند. از امکانات ویژه این هتل می‌توان به استخر روباز، رستوران بین‌المللی و ویو ابدی دریا اشاره کرد.",
  images: [
    {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    },
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600",
    },
    {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600",
    },
    {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    },
  ],
};

const HouseReserveDetails = () => {
  const [data, setData] = useState<any>(Detail);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="w-11/12 m-auto flex flex-col items-center gap-10 mt-10 relative">
        <div className="w-full h-102 flex">
          <div className="w-full">
            <SwiperGalery images={data.images} />
          </div>
        </div>

        <div className="mt-20 ">
          <div className="w-300 h-16   flex  justify-between items-center">
            <div className="w-18 h-8  flex flex-wrap gap-1 relative  max-[1300px]:left-30">
              <div className="w-8 h-8 bg-[#F5F5F5] rounded-lg flex items-center justify-center  border border-blue-400">
                <Link />
              </div>
              <div className="w-8 h-8 bg-[#F5F5F5] rounded-lg flex items-center justify-center  border border-blue-400">
                <Foarward />{" "}
              </div>
            </div>
            <div
              className="flex flex-col gap-4 -mt-8 pr-5 relative max-[1300px]:bottom-8 max-[1300px]:m-auto"
              dir="rtl"
            >
              <h2 className="text-2xl font-bold text-blue-400 flex max-[1300px]:justify-center">
                {data.title}
                <div className="text-[14px] absolute mr-73 font-bold text-gray-600 -mt-2 max-[1300px]:mr-78">
                  <div className=" relative right-7 top-4 ">
                    <Star />
                  </div>
                  {data.rating}
                </div>
              </h2>

              <div className="flex items-center gap-2 text-gray-500">
                <Loaction />
                <span className="text-[14px] font-bold">{data.address}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 max-[1300px]:flex-col">
            <div className="flex gap-16 flex-col items-center w-full lg:w-auto">
              <div className="w-107 h-117 rounded-[40px] p-8 shadow-lg">
                <Reserve />
              </div>
              <div className="w-107 h-142 flex-col bg-[#F5F5F5] shadow-lg">
                <SimilarProperties />
              </div>
              <div className="absolute left-[-120px] bottom-[800px] transform rotate-[-10deg] min-[1600px]:hiddenc opacity-70 max-[1300px]:hidden">
                <FleshHome />
              </div>
            </div>

            <div className="flex-1 w-full max-w-200 h-auto rounded-2xl flex flex-col items-center gap-6 bg-[#F5F5F5D9] shadow-lg p-6 mx-auto">
              <div className="flex flex-wrap gap-10 justify-center ">
                <div className="w-181 h-80 flex">
                  <Popular />
                </div>
                <div className="w-full border  flex flex-col items-end gap-2 mt-16 relative top-7" dir="rtl">
                  <div className="relative left-119 top-4">
                        <h2 className="text-blue-100  font-bold text-[14px] ml-12 mb-4">
                    درباره {data.title}
                  </h2>

                  <h1 className="text-[#060425] font-black  text-[20px] mb-4">
                    {data.title}
                  </h1>
                  </div>
              

                  <div className="w-full max-w-[720px]">
                    <p className="font-medium text-[16px] text-[#475569] leading-8 text-justify">
                      {data.description}
                    </p>
                  </div>
                </div>

                <div
                  className="w-full flex mt-5 gap-2 justify-center"
                  dir="rtl"
                >
                  <div className="w-1/3 flex flex-col gap-2">
                    <img
                      src={data.images[1].url}
                      className="rounded-lg h-43 object-cover shadow-sm"
                    />
                    <img
                      src={data.images[2].url}
                      className="rounded-lg h-43 object-cover shadow-sm"
                    />
                  </div>
                  <img
                    src={data.images[0].url}
                    className="w-[384px] h-88 rounded-lg object-cover shadow-sm"
                  />
                </div>
              </div>
              <div className="">
                <h3 className="flex justify-end font-bold text-[20px] mt-10">
                  چرا{data.title}
                </h3>
                <p
                  dir="rtl"
                  className="font-medium text-[16px] text-gray-600 mt-5"
                >
                {data.whydescription}
                </p>
              </div>
              <div className="w-173 mt-8">
                <CommentsSection houseId={data.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseReserveDetails;
