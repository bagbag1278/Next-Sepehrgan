"use client";
import Link from "@/components/HouseDetails/icon/icon/Link";
import Loaction from "@/components/HouseDetails/icon/icon/Loaction";
import Star from "@/components/HouseDetails/icon/icon/Star";
import CommentsSection from "@/components/HouseDetails/popular/Comment/CommentsSection";
import FleshHome from "@/components/HouseDetails/popular/FleshHome";
import Popular from "@/components/HouseDetails/popular/main/Popular";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import SwiperGalery from "@/components/HouseDetails/popular/main/Slider/SwiperGalery";
import Seller from "@/components/HouseDetails/popular/HouseRent/Seller";
import Like from "@/components/HouseDetails/popular/HouseRent/Like";
import Bread from "@/components/HouseDetails/popular/Header/Bread";
import { useParams } from "next/navigation";
import RentSimilarProperties from "@/components/HouseDetails/popular/HouseRent/RentSimilarProperties";

const MapRent = dynamic(
  () => import("@/components/HouseDetails/popular/HouseRent/MapRent"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[307px] bg-gray-100 animate-pulse rounded-2xl" />
    ),
  }
);

const MortgageRentDetails = () => {
  const params = useParams();
  const [data, setData] = useState<any>(null); 
  const [loading, setLoading] = useState(true);

  const fetchRentData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://next.genzuni.website/api/houses/${params.id}`);
      
      if (!response.ok) throw new Error("مورد یافت نشد");
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching house details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchRentData();
    }
  }, [params.id]);

  // نمایش حالت لودینگ
  if (loading) return <div className="text-center mt-20 animate-pulse">در حال دریافت اطلاعات...</div>;

  if (!data) return <div className="text-center mt-20">اطلاعاتی برای این شناسه یافت نشد.</div>;

  const locationMock = {
    lat: data.latitude || 26.5325,
    lng: data.longitude || 54.0195,
    id: data.id,
  };

  const breadcrumbItems = [
    { title: "رزرو هتل", href: "/housereserve" },
    { title: `رزرو هتل ${data.city || "نامشخص"}`, href: "/search" },
    { title: data.title },
  ];

  return (
    <div>
      <div className="w-11/12 m-auto flex flex-col items-center gap-10 mt-10 relative">
        <div className="w-full">
          <Bread items={breadcrumbItems} />
        </div>

        <div className="w-full h-102 flex">
          <div className="w-full">

            <SwiperGalery images={data.images || []} />
          </div>
        </div>

        <div className="mt-20 ">
          <div className="w-full max-w-7xl flex justify-between items-center">
            <div className="w-18 h-8 flex flex-wrap gap-1 relative max-[1300px]:left-30">
              <div className="w-8 h-8 bg-[#F5F5F5] rounded-lg flex items-center justify-center border border-blue-400">
                <Link />
              </div>
              <div className="">
                <Like />
              </div>
            </div>
            
              <div
              className="flex flex-col gap-4 -mt-8 pr-5 relative max-[1300px]:bottom-8 max-[1300px]:m-auto"
              dir="rtl"
            >
              <h2 className="text-2xl font-bold text-blue-400 flex gap-3 max-[1300px]:justify-center">
                {data.title}

                <div className="text-[14px]  w-20   font-bold text-gray-600 -mt-2 max-[1300px]">
                  <div className=" relative right-4.5 top-4 ">
                    <Star />
                  </div>

                  {data.rate}
                </div>
              </h2>

              <div className="flex items-center gap-2 text-gray-500">
                <Loaction />

                <span className="text-[14px] font-bold">{data.address}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 max-[1300px]:flex-col mt-10">
            {/* سایدبار سمت چپ */}
            <div className="flex gap-16 flex-col items-center w-full lg:w-auto">
              <div className="w-107 h-117 rounded-[40px] justify-center flex p-8 shadow-lg bg-white">
                <Seller/>
              </div>
              <div className="w-107 flex-col shadow-lg">
                <RentSimilarProperties />
              </div>
              <div className="absolute left-[-120px] bottom-[800px] transform rotate-[-10deg] min-[1600px]:hidden opacity-70 max-[1300px]:hidden">
                <FleshHome />
              </div>
            </div>

            <div className="flex-1 w-full max-w-200 h-auto rounded-2xl flex flex-col items-center gap-6 bg-[#F5F5F5D9] shadow-lg p-6 mx-auto">
              <div className="flex flex-wrap gap-10 justify-center w-full">
                
                <div className="w-full">
                   <Popular data={data} />
                </div>

                      <div
                  className="w-full flex flex-col justify-start  items-end gap-2 mt-16  top-7"
                  dir="rtl"
                >
                  <div className="flex flex-col justify-start w-full relative top-10">
                    <h2 className="text-blue-100  font-bold text-[14px] ml-12 mb-4">
                      درباره {data.title}
                    </h2>

                    <p className="text-[#060425] font-medium text-[16px] text-[#475569] font-black  mb-4">
                      {data.caption}
                    </p>
                  </div>

                  <div className="w-full max-w-[720px]">
                    <p className=" leading-8 text-justify">
                      {data.description}
                    </p>
                  </div>
                </div>

                {/* بخش نقشه */}
                <div className="w-full mt-10 flex flex-col gap-6" dir="rtl">
                  <h3 className="text-[#10088F] font-bold text-[18px]">موقعیت مکانی</h3>
                  <MapRent
                    lat={locationMock.lat}
                    lng={locationMock.lng}
                    houseId={locationMock.id}
                  />
                  <div className="w-full max-w-[710px] mt-2">
                    <h4 className="text-[#060425] font-bold text-[16px] mb-3">محل دقیق</h4>
                    <p className="text-[#475569] text-[15px] leading-8 text-justify">
                      این ملک در یکی از بهترین نقاط شهر قرار گرفته و دسترسی عالی به مراکز رفاهی دارد.
                    </p>
                  </div>
                </div>
              </div>

              {/* بخش چرا انتخاب این ملک؟ */}
              <div className="w-full" dir="rtl">
                <h3 className="font-bold text-[20px] mt-10 text-right">
                  چرا {data.title}؟
                </h3>
                <p className="font-medium text-[16px] text-gray-600 mt-5 text-right leading-8">
                  {data.whydescription || data.caption}
                </p>
              </div>

              {/* بخش نظرات */}
              <div className="w-full mt-8">
                <CommentsSection houseId={data.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageRentDetails;