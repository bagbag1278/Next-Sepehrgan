"use client";

import {
  MapPin,
  Users,
  Banknote,
  Home,
  Tag,
  FileText,
  Bath,
  Car,
  Trees,
  Hash,
} from "lucide-react";


import CreateHouse from "@/core/api/DashboardSeller/CreateHouse";

interface Amenities {
  rooms: string;
  bathrooms: string;
  parking: string;
  yard_type: string;
  tags: string[];
}

interface StepFiveProps {
  formData: {
    title: string;
    capacity: string;
    price: string;
    transaction_type: string;
    propertyType: string;
    region: string;
    caption: string;
    location: {
      lat: number | null;
      lng: number | null;
      address: string;
    };
  };
  amenities: Amenities;
  image: string | null;
}

const transactionTypeLabel: Record<string, string> = {
  direct_purchase: "فروش",
  rental: "اجاره",
  reservation: "رزرو",
  mortgage: "رهن",
};

const propertyTypeLabel: Record<string, string> = {
  villa: "ویلا",
  apartment: "آپارتمان",
};

const regionLabel: Record<string, string> = {
  north: "شمال",
  center: "مرکز شهر",
};

const yardTypeLabel: Record<string, string> = {
  private: "اختصاصی",
  shared: "اشتراکی",
};

const StepFive = ({ formData, amenities, image }: StepFiveProps) => {

  return (
    <div className="flex flex-wrap gap-1 w-243 h-79">

      <p className="text-blue-400 dark:to-blue-200"> پیش نمایش آگهی</p>

      {/* CARD */}
      <div className="w-full h-71 rounded-3xl  
      flex gap-5 justify-around items-center shadow-sm">

        {/* image */}
        {image && (
          <div className="w-75 h-63 border border-gray-700 rounded-2xl ">
            <img
              src={image}
              alt="تصویر ملک"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        )}

        {/* Information */}
        <div className="w-160 h-63 flex flex-wrap gap-1">

          {/* title */}
          <div className="flex items-center gap-2">
            <h2 className="text-[#1E1B4B] dark:text-white font-bold text-[20px]">
              {formData.title || "—"}
            </h2>
          </div>

          {/* address */}
          <div className="w-full">
            {formData.location.address && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={15} className="text-black dark:text-white" />
                <span>{formData.location.address}</span>
              </div>
            )}
          </div>

          {/* description */}
          <div className="w-full">
            {formData.caption && (
              <div className="flex flex-col gap-1">
                <p className="text-[14px] text-[#06042580]/80 dark:text-gray-600 leading-7 rounded-2xl">
                  {formData.caption}
                </p>
              </div>
            )}
          </div>

          {/* info grid */}
          <div className="w-full ">

            <div className="w-full  flex flex-wrap gap-4">

              <div className=" flex w-full gap-1.5  ">

                <div className="flex gap-1 h-8 border border-gray-100 rounded-2xl p-3">

                  <div className="flex  items-center gap-1 text-[#1E1B4B] dark:text-blue-300  font-semibold">
                    <Users size={14} className="text-black dark:text-blue-300" />
                    <span>{formData.capacity || "—"} نفر</span>
                  </div>
                </div>

                <div className="flex gap-1 h-8 border border-gray-100 rounded-2xl p-3">
                  <div className="flex items-center gap-1 text-[#1E1B4B] dark:text-blue-300 font-semibold">
                    <Tag size={14} className="text-black dark:text-blue-300" />
                    <span>{transactionTypeLabel[formData.transaction_type] || "—"}</span>
                  </div>
                </div>

                <div className="flex gap-1 h-8 border border-gray-100 rounded-2xl p-3">
                  <div className="flex items-center gap-1 text-[#1E1B4B] dark:text-blue-300 font-semibold">
                    <Home size={14} className="text-black dark:text-blue-300 " />
                    <span>{propertyTypeLabel[formData.propertyType] || "—"}</span>
                  </div>
                </div>

                <div className="flex gap-1 h-8 border border-gray-100 rounded-2xl p-3">
                  <div className="flex items-center gap-1 text-[#1E1B4B] dark:text-blue-300 font-semibold">
                    <MapPin size={14} className="text-black dark:text-blue-300" />
                    <span>{regionLabel[formData.region] || "—"}</span>
                  </div>
                </div>

              </div>
            </div>


            <div className="w-full flex mt-2">
              {amenities.rooms && (
                <div className="flex gap-1 h-8 border border-gray-100 rounded-2xl p-3">
                  <div className="flex items-center gap-1 text-[#1E1B4B] dark:text-blue-300 font-semibold">
                    <Home size={14} className="text-black dark:text-blue-300" />
                    <div className="flex gap-1 ">{amenities.rooms}
                      <div>اتاق</div>

                    </div>
                  </div>
                </div>
              )}

              {amenities.bathrooms && (
                <div className="flex gap-1 h-8 border border-gray-100 rounded-2xl p-3">
                  {/* <span className="text-xs text-gray-400">حمام</span> */}
                  <div className="flex items-center gap-1 text-[#1E1B4B] dark:text-blue-300 font-semibold">
                    <Bath size={14} className="text-black dark:text-blue-300" />
                    <div className="flex gap-1 ">{amenities.bathrooms}
                      <div>حمام</div>
                    </div>
                  </div>
                </div>
              )}

              {amenities.parking && (
                <div className="flex gap-1 h-8 border border-gray-100 rounded-2xl p-3">
                  <div className="flex items-center gap-1 text-[#1E1B4B] dark:text-blue-300 font-semibold">
                    <Car size={14} className="text-black  dark:text-blue-300" />
                    <span>
                      {amenities.parking === "0"
                        ? "بدون پارکینگ"
                        : `${amenities.parking} پارکینگ`}
                    </span>
                  </div>
                </div>
              )}

              {amenities.yard_type && (
                <div className="flex gap-1 h-8 border border-gray-100 rounded-2xl p-3">
                  <div className="flex items-center gap-1 text-[#1E1B4B] dark:text-blue-300 font-semibold">
                    <Trees size={14} className="text-black dark:text-blue-300" />
                    <span className="text-xs text-gray-400 dark:text-blue-300">حیاط</span>
                    <span>{yardTypeLabel[amenities.yard_type] || "—"}</span>
                  </div>
                </div>
              )}
            </div>


          </div>

          <div className="w-full flex justify-between ">
            {/* tags */}
            {amenities.tags.length > 0 && (
              <div className="w-full flex flex-wrap  gap-2 mt-1">
                {amenities.tags.map((tag) => (
                  <span
                    key={tag}
                    className="h-7 px-3 rounded-full bg-[#1D9BF0]/10 text-[#1D9BF0] text-xs flex items-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className=" flex flex-wrap gap-1 border border-blue-500 px-2 rounded-2xl   ">
              <div className="flex items-center gap-1 text-blue-500 font-bold text-lg">
                <div className="flex gap-1 ">
                  {formData.price
                    ? Number(formData.price).toLocaleString("fa-IR")
                    : "—"}{" "} <span>تومان</span>
                </div>
                <Banknote size={16} />
              </div>
            </div>
          </div>




        </div>

      </div>
    </div>
  );
};

export default StepFive;