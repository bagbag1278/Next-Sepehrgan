import FavoriteFilterButtun from "@/components/Dashboard/buyer/favorite/FavoriteFilterButtun";
import FavoriteSearch from "@/components/Dashboard/buyer/favorite/FavoriteSearch";
import React from "react";

const FavoritePage = () => {
  return (
    <div>
      <div className="w-243 h-12 mx-auto mt-16 flex justify-between items-center">
        <div className="">
          لیست رزروهای ذخیره شده
          <span className="text-sm text-blue-400/60">( 25 )</span>
        </div>
        <div className="w-153.5 flex gap-4 h-12">
          <FavoriteSearch/>
          <FavoriteFilterButtun/>
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;
