import Image from "next/image";
import { toPersianNum } from "../utils/FarsiNum";
import { FC } from "react";
import { House } from "@/core/api/house";

interface ProductHouseProps {
  houses: House;
}

const ProductHouse: FC<ProductHouseProps> = ({ houses }) => {
  return (
    <div dir="rtl" className="w-174.75 flex relative pr-3">
      <div
        key={houses.id}
        className=" hover:border-2 hover:border-blue-200 dark:border dark:border-blue-300 transition-opacity duration-1000 shadow shadow-blue-300/25 rounded-4xl w-161.75 h-54 flex justify-center gap-2 items-center mx-auto"
      >
        <div className="size-7.5 rounded-tr-sm text-white rounded-br-sm bg-red-100 absolute top-11.5 right-2 text-center leading-8">
          {toPersianNum("%5")}
        </div>
        {/* img */}
        <div className="w-81 h-50 rounded-3xl relative overflow-hidden">
          <Image src={"/auth/img.png"} width={324} height={200} alt="img" />
          <div className="absolute inset-0 bg-linear-to-b from-blue-400 to-transparent transition-opacity duration-300 opacity-50 hover:opacity-0"></div>
        </div>
        {/* desc */}
        <div className="w-74.75 h-50 rounded-2xl flex flex-col gap-3 items-center pt-2">
          {/* title */}
          <div className="w-70.75 h-14 flex flex-col gap-2 items-start ">
            <h2 className="max-w-62.5 h-7 w-full mr-1.5 truncate font-bold">
              {houses.title}
            </h2>
            <div className="flex h-6 w-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10Z"
                    stroke="#060425"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20 10C20 14.4183 14 22 12 22C10 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"
                    stroke="#060425"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
              <h4 className="w-full max-w-63.75 opacity-80 text-sm font-normal truncate leading-7">
                {houses.location}
              </h4>
            </div>
          </div>
          {/*  */}
          <span className="w-70.75 h-px bg-blue-400 rounded-[100px] opacity-20"></span>
          {/*  */}
          <div className="w-70.75 h-16 flex flex-col gap-4">
            <div className="h-5.5 w-18.5 flex gap-1">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 3.99565C1.61088 2.66221 2.78034 1.54669 4.15739 0.750122M14.1573 0.750122C15.5344 1.54669 16.7039 2.66221 17.5647 3.99565M9.08343 6.58346V9.91679L10.5267 10.7501M16.6574 9.41231C16.6574 13.5544 13.2995 16.9123 9.15737 16.9123C5.01523 16.9123 1.65737 13.5544 1.65737 9.41231C1.65737 5.27018 5.01523 1.91231 9.15737 1.91231C13.2995 1.91231 16.6574 5.27018 16.6574 9.41231Z"
                  stroke="#060425"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-sm opacity-90">
                {houses.capacity} <span className="text-[12px] ">شب</span>
              </div>
            </div>
            {/* count */}
            <div className="w-70.75 h-6 flex justify-center gap-6">
              {/* dis */}
              <div className="text-[13px] opacity-80 line-through decoration-red-600">
                {toPersianNum(houses.price)}تومان
              </div>
              {/*  */}
              <div className="h-6.25 flex justify-center">
                <span className="text-blue-300 text-[15px] font-bold opacity-100">
                  {toPersianNum(houses.discounted_price)} تومان
                </span>
                <span className="text-[11px] opacity-70 leading-7">/هرشب</span>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="border border-blue-300 w-70.75 h-8 rounded-xl cursor-pointer text-sm text-blue-300/50 hover:text-white justify-center hover:bg-blue-300 dark:bg-white transition-colors duration-200 flex flex-col items-center">
            بررسی و رزرو
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHouse;
