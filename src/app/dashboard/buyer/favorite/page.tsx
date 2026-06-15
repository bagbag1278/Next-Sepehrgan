import type { Metadata } from "next";
import FavoriteContainer from "@/components/Dashboard/buyer/favorite/FavoriteContainer";
import FavoriteFilterButtun from "@/components/Dashboard/buyer/favorite/FavoriteFilterButtun";
import { getFavorites } from "@/core/api/Buyer/Favorite.api";
import { getUserInfo } from "@/core/token/auth";

export const metadata: Metadata = {
  title: "علاقه‌مندی‌ها",
  description: "لیست اقامتگاه‌های ذخیره شده در رهن کده",
  robots: {
    index: false,
    follow: false,
  },
};

const FavoritePage = async () => {
  const user = await getUserInfo();
  const favorites = await getFavorites(user!.id);

  return (
    <div>
      <div className="w-243 h-12 mx-auto mt-16 flex justify-between items-center">
        <div className="">
          لیست رزروهای ذخیره شده
          <span className="text-sm text-blue-400/60">
            {" "}
            ({favorites.totalCount})
          </span>
        </div>
        <div className="w-153.5 flex gap-4 h-12">
          <FavoriteFilterButtun />
        </div>
      </div>
      <div className="w-243 h-92 flex flex-col gap-4 mx-auto mt-5">
        <div className="h-16 rounded-2xl shadow-[0_0_8px] dark:bg-slate-700 shadow-blue-300/15 flex items-center justify-center">
          <div className="flex h-5.5 opacity-50 w-198.75 gap-37.5">
            <span className="">نام اقامتگاه</span>
            <span className="">قیمت کل</span>
            <span className=" mr-12">آدرس</span>
          </div>
        </div>
        <FavoriteContainer favorites={favorites.data} />
      </div>
    </div>
  );
};

export default FavoritePage;