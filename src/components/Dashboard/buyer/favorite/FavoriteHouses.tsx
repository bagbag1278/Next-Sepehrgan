"use client";

import { toPersianNum } from "@/components/utils/FarsiNum";
import Image from "next/image";
import FavoriteDrop from "./FavoriteDrop";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

interface FavoriteHouse {
  id: number;
  title: string;
  address: string;
  photos: string[] | null;
  rate: string;
  price: string;
}

interface FavoriteHousesProps {
  house: FavoriteHouse;

  favoriteId: number;
}

const FavoriteHouses = ({ house, favoriteId }: FavoriteHousesProps) => {
  return (
    <div className="h-16 py-2 px-6 rounded-2xl dark:bg-slate-600 shadow-[0_0_4px] hover:dark:shadow-slate-700 hover:shadow-[0_0_10px] shadow-blue-200/20 transition-all duration-200">
      <div className="flex items-center">
        <div className="w-20 h-12 rounded-lg overflow-hidden">
          <Image
            src={house.photos?.[0] ?? "/FastReserve/img.png"}
            width={80}
            height={64}
            alt={house.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-35.25 mr-3 text-nowrap truncate text-sm">
          {house.title}
        </div>

        <span className="text-blue-300 text-nowrap font-bold mr-10">
          {digitsEnToFa(addCommas(house.price))} تومان
        </span>

        <div className="w-68.25 text-sm text-center text-nowrap truncate mr-14">
          {house.address}
        </div>

        <FavoriteDrop favoriteId={favoriteId} />
      </div>
    </div>
  );
};

export default FavoriteHouses;
