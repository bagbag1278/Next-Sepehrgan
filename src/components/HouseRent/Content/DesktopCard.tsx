"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { addCommas } from "@persian-tools/persian-tools";
import RoomIcon from "./Icon/RoomIcon";
import MasterIcon from "./Icon/MasterIcon";
import CarIcon from "./Icon/CarIcon";
import TreeIcon from "./Icon/TreeIcon";
import { MapPin } from "lucide-react";
// import LocationIcon from "./Icon/LocationIcon";

interface DesktopCardProps {
  house: {
    id: number | string;
    title?: string;
    address?: string;
    imageUrl?: string;
    rooms?: number;
    bathrooms?: number;
    parking?: number;
    capacity?: number;
    price?: number;
    isInvalid?: boolean;
  };
  isInvalid?: boolean;
}

const DesktopCard = ({ house, isInvalid = false }: DesktopCardProps) => {
  const t = useTranslations("RealEstate");
  
  const defaultIMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR24p63ZARXy6pMmpnlZTAWJL09khwUKwTLWA&s";

  return (
    <div className="hover-3d group">
      <div
        className={`
        shadow-2xl border border-gray-200 dark:border-gray-700 rounded-4xl w-153 h-54 flex flex-wrap items-center my-2 justify-around transition-all duration-300 ease-in-out
        bg-white dark:bg-gray-800
        ${isInvalid ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900 grayscale" : "hover:shadow-lg hover:scale-105 cursor-pointer"}
      `}
      >
        {/* بخش تصویر */}
        <div className="w-61.25 h-50 flex-shrink-0">
          <img
            src={defaultIMG}
            alt={house.title || t("defaultTitle")}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className="relative w-79.5 h-39 gap-1">
          <div className="h-19 border-b border-gray-200 dark:border-gray-700 px-3 pt-2 overflow-hidden">
            <div className={`text-[17px] mb-2 font-bold truncate ${isInvalid ? "text-gray-500 dark:text-gray-500" : "text-gray-800 dark:text-white"}`}>
              {house.title || t("defaultTitle")}
            </div>
            <div className="flex items-center gap-1 text-[13px]">
              <MapPin size={16} className="text-gray-500 dark:text-gray-500 flex-shrink-0" />
              <span className={`truncate ${isInvalid ? "text-gray-500 dark:text-gray-500" : "text-gray-600 dark:text-gray-400"}`}>
                {house.address || t("noAddress")}
              </span>
            </div>
          </div>

          <div className="relative bottom-0 left-0 right-0 py-2 ">
            <div className="flex justify-between text-[11px] text-gray-700 dark:text-gray-300 mb-2">
  <div className="flex items-center gap-1 rounded-2xl  whitespace-nowrap">
    <RoomIcon />
    <span>{house.rooms || 0} {t("rooms")}</span>
  </div>
  <div className="flex items-center gap-1  px-2 py-1 whitespace-nowrap">
    <MasterIcon/>
    <span>{house.bathrooms || 0} {t("bathrooms")}</span>
  </div>
  <div className="flex items-center gap-1  px-2 py-1 whitespace-nowrap">
    <CarIcon />
    <span>{house.parking !== undefined ? house.parking : 0} {t("parking")}</span>
  </div>
  <div className="flex items-center gap-1  px-2 py-1 whitespace-nowrap">
    <TreeIcon  />
    <span>{t("capacity")} {house.capacity !== undefined ? house.capacity : t("unknown")}</span>
  </div>
</div>

            <div className="w-full mt-2 flex items-center flex-row-reverse justify-between gap-2">
              <Link
                href={`houserent/MortgageRentDetails/${house.id}`}
                className="flex items-center justify-center rounded-lg border border-blue-500 dark:border-blue-500 w-25 h-8 hover:border-blue-600 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex-shrink-0"
              >
                <p className="text-[13px] text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-300 whitespace-nowrap">
                  {t("viewDetails")}
                </p>
              </Link>
              <div className={`flex gap-1 text-[15px] font-bold flex-wrap justify-end ${isInvalid ? "text-red-500 dark:text-red-500" : "text-blue-600 dark:text-blue-300"}`}>
                {house.price ? (
                  <>
                    <span className="whitespace-nowrap">{addCommas(house.price)}</span>
                    <span className="whitespace-nowrap">{t("currency")}</span>
                  </>
                ) : (
                  <span className="whitespace-nowrap text-gray-500 dark:text-gray-500">{t("priceUnknown")}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div></div><div></div><div></div><div></div>
      <div></div><div></div><div></div><div></div>
    </div>
  );
};

export default DesktopCard;