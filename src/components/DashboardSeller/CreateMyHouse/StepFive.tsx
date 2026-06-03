"use client";

import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  MapPin,
  Users,
  Banknote,
  Home,
  Tag,
  FileText,
} from "lucide-react";

interface StepFiveProps {
  formData: {
    title: string;
    capacity: string;
    price: string;
    transactionType: string;
    propertyType: string;
    region: string;
    description: string;
    location: {
      lat: number | null;
      lng: number | null;
      address: string;
    };
  };
  image: string | null;
}

const transactionTypeLabel: Record<string, string> = {
  sell: "فروش",
  rent: "اجاره",
};

const propertyTypeLabel: Record<string, string> = {
  villa: "ویلا",
  apartment: "آپارتمان",
};

const regionLabel: Record<string, string> = {
  north: "شمال",
  center: "مرکز شهر",
};

const StepFive = ({ formData, image }: StepFiveProps) => {
  return (
    <div className="flex flex-wrap gap-1 w-243 border h-79  ">

    <p className="text-blue-400 dark:to-blue-200 "> پیش نمایش آگهی</p>
    

      {/* CARD */}
      <div className="w-full h-71 rounded-3xl border border-[#4DB5FF] p-6 flex flex-col gap-5 bg-white shadow-sm">

        {/* image */}
        {image && (
          <div className="w-full h-52 rounded-2xl overflow-hidden">
            <img
              src={image}
              alt="تصویر ملک"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* title */}
        <div className="flex items-center gap-2">
          <Home size={18} className="text-[#1400B7]" />
          <h2 className="text-[#1E1B4B] font-bold text-xl">
            {formData.title || "—"}
          </h2>
        </div>

        {/* address */}
        {formData.location.address && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin size={15} className="text-[#1D9BF0]" />
            <span>{formData.location.address}</span>
          </div>
        )}

        {/* info grid */}
        <div className="grid grid-cols-3 gap-4">

          <div className="flex flex-col gap-1 border border-gray-100 rounded-2xl p-3 bg-gray-50">
            <span className="text-xs text-gray-400">ظرفیت</span>
            <div className="flex items-center gap-1 text-[#1E1B4B] font-semibold">
              <Users size={14} className="text-[#1D9BF0]" />
              <span>{formData.capacity || "—"} نفر</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 border border-gray-100 rounded-2xl p-3 bg-gray-50">
            <span className="text-xs text-gray-400">نوع معامله</span>
            <div className="flex items-center gap-1 text-[#1E1B4B] font-semibold">
              <Tag size={14} className="text-[#1D9BF0]" />
              <span>
                {transactionTypeLabel[formData.transactionType] || "—"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 border border-gray-100 rounded-2xl p-3 bg-gray-50">
            <span className="text-xs text-gray-400">نوع ملک</span>
            <div className="flex items-center gap-1 text-[#1E1B4B] font-semibold">
              <Home size={14} className="text-[#1D9BF0]" />
              <span>
                {propertyTypeLabel[formData.propertyType] || "—"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 border border-gray-100 rounded-2xl p-3 bg-gray-50">
            <span className="text-xs text-gray-400">منطقه</span>
            <div className="flex items-center gap-1 text-[#1E1B4B] font-semibold">
              <MapPin size={14} className="text-[#1D9BF0]" />
              <span>{regionLabel[formData.region] || "—"}</span>
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-1 border border-gray-100 rounded-2xl p-3 bg-gray-50">
            <span className="text-xs text-gray-400">قیمت</span>
            <div className="flex items-center gap-1 text-[#1400B7] font-bold text-lg">
              <Banknote size={16} />
              <span>
                {formData.price
                  ? Number(formData.price).toLocaleString("fa-IR")
                  : "—"}{" "}
                تومان
              </span>
            </div>
          </div>

        </div>

        {/* description */}
        {formData.description && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <FileText size={13} />
              <span>توضیحات</span>
            </div>
            <p className="text-sm text-[#1E1B4B] leading-7 border border-gray-100 rounded-2xl p-3 bg-gray-50">
              {formData.description}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default StepFive;