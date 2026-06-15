import Image from "next/image";
import { toPersianNum } from "../utils/FarsiNum";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ProductHouseProps {
  houses: any;
  onCompare?: (house: any) => void;
  isInCompare?: boolean;
}

const ProductHouse = ({
  houses,
  onCompare,
  isInCompare,
}: ProductHouseProps) => {
  const t = useTranslations("ProductHouse");

  return (
    <div dir="rtl" className="w-full px-2 sm:px-3 md:px-4 ">
      <div
        key={houses.id}
        className="hover:border-2  w-167 h-60 max-[780px]:h-auto hover:border-blue-200 dark:hover:border-blue-400 transition-all duration-300 shadow shadow-blue-300/25 hover:shadow-lg rounded-2xl sm:rounded-3xl md:rounded-4xl flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4 items-center bg-white dark:bg-gray-900 overflow-hidden"
      >
        <div className="w-full sm:w-81 h-48 sm:h-50 rounded-2xl sm:rounded-3xl relative overflow-hidden mt-2 sm:mt-0">
          <div className="absolute -top-3 right-2 left-2 flex items-center justify-between z-10">
            <div className="flex gap-1 items-center  py-0.5 rounded-full">
              <span className="text-white text-xs sm:text-sm leading-16">
                {toPersianNum(houses.rate)}
              </span>
              <svg
                width="16"
                height="15"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-5 sm:h-5"
              >
                <path
                  d="M10.1901 1.02872C10.3735 0.657094 10.9034 0.657094 11.0868 1.02872L13.7549 6.43491C13.8277 6.58248 13.9685 6.68477 14.1314 6.70843L20.0975 7.57535C20.5076 7.63495 20.6713 8.13893 20.3746 8.4282L16.0575 12.6363C15.9396 12.7512 15.8858 12.9167 15.9137 13.0789L16.9328 19.0209C17.0028 19.4293 16.5741 19.7408 16.2073 19.548L10.8711 16.7425C10.7254 16.666 10.5514 16.666 10.4057 16.7425L5.06952 19.548C4.7027 19.7408 4.27399 19.4293 4.34404 19.0209L5.36317 13.0789C5.39099 12.9167 5.33722 12.7512 5.21937 12.6363L0.902273 8.4282C0.605514 8.13893 0.769269 7.63495 1.17938 7.57535L7.14547 6.70843C7.30832 6.68477 7.4491 6.58248 7.52194 6.43491L10.1901 1.02872Z"
                  stroke="#F5F5F5"
                  strokeWidth="1.5"
                  fill="#F5F5F5"
                />
              </svg>
            </div>
            <div className="bg-black/30 p-1.5 rounded-full">
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-3 sm:h-3"
              >
                <path
                  d="M10.6495 10.6495L1.45711 1.45711M0.75 9.23528V1.75C0.75 1.19772 1.19772 0.75 1.75 0.75H9.23528"
                  stroke="#F5F5F5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <Image
            src={"/auth/img.png"}
            width={324}
            height={200}
            alt="img"
            className="dark:opacity-90 w-full h-full object-cover"
            unoptimized
          />

          <div className="absolute inset-0 bg-linear-to-b from-blue-400 to-transparent transition-opacity duration-300 opacity-50 hover:opacity-0"></div>
        </div>

        <div className="w-full sm:w-74.75 p-3 sm:p-0 sm:pt-2 flex flex-col gap-2 sm:gap-3 items-center">
          <div className="w-full px-2 sm:px-0 sm:w-70.75 flex flex-col gap-1 sm:gap-2">
            <h2 className="w-full truncate font-bold dark:text-white text-sm sm:text-base">
              {houses.title}
            </h2>

            <div className="flex items-start gap-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-5 sm:h-5 flex-shrink-0 mt-0.5"
              >
                <g opacity="0.8">
                  <path
                    d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10Z"
                    stroke="#060425"
                    className="dark:stroke-gray-400"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20 10C20 14.4183 14 22 12 22C10 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"
                    stroke="#060425"
                    className="dark:stroke-gray-400"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
              <h4 className="flex-1 opacity-80 text-xs sm:text-sm font-normal truncate dark:text-gray-400">
                {houses.location}
              </h4>
            </div>
          </div>

          <span className="w-full px-2 sm:px-0 sm:w-70.75 h-px bg-blue-400 rounded-[100px] opacity-20"></span>

          <div className="w-full px-2 sm:px-0 sm:w-70.75 flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <svg
                width="16"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-4.5 sm:h-4.5"
              >
                <path
                  d="M0.75 3.99565C1.61088 2.66221 2.78034 1.54669 4.15739 0.750122M14.1573 0.750122C15.5344 1.54669 16.7039 2.66221 17.5647 3.99565M9.08343 6.58346V9.91679L10.5267 10.7501M16.6574 9.41231C16.6574 13.5544 13.2995 16.9123 9.15737 16.9123C5.01523 16.9123 1.65737 13.5544 1.65737 9.41231C1.65737 5.27018 5.01523 1.91231 9.15737 1.91231C13.2995 1.91231 16.6574 5.27018 16.6574 9.41231Z"
                  stroke="#060425"
                  className="dark:stroke-gray-400"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-xs sm:text-sm opacity-90 dark:text-gray-300">
                {houses.capacity} <span className="text-[10px] sm:text-xs">{t("night")}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="text-[10px] sm:text-[12px] opacity-80 line-through decoration-red-600 dark:text-gray-500">
                {digitsEnToFa(addCommas(houses.price))} {t("toman")}
              </div>
              <div className="flex items-center flex-wrap gap-1">
                <span className="text-blue-300 text-xs sm:text-sm font-bold opacity-100 dark:text-blue-300">
                  {digitsEnToFa(addCommas(houses.discounted_price))} {t("toman")}
                </span>
                <span className="text-[10px] sm:text-[11px] opacity-70 dark:text-gray-500">
                  / {t("perNight")}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full px-2 sm:px-0 sm:w-70.75 flex gap-2 pb-3 sm:pb-0">
            <Link
              href={`/housereserve/HouseReserveDetails/${houses.id}`}
              className="flex-1"
            >
              <div className="w-full border h-8 sm:h-9 rounded-xl cursor-pointer text-white hover:text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center text-xs sm:text-sm">
                {t("viewAndBook")}
              </div>
            </Link>

            {onCompare && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCompare(houses);
                }}
                disabled={isInCompare}
                className={`w-24 h-8 whitespace-nowrap sm:h-9 rounded-xl transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-medium ${
                  isInCompare
                    ? "bg-green-500 text-white cursor-not-allowed hover:bg-green-600 shadow-md"
                    : "bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow-md"
                }`}
              >
                {isInCompare ? (
                  <div className="flex items-center gap-1">
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span>{t("added")}</span>
                  </div>
                ) : (
                  t("compare")
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHouse;