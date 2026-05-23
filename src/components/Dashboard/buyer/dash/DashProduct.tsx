import Accept from "@/components/landing/components/HeroSction/Icon/dashboard/Accept";
import Reeject from "@/components/landing/components/HeroSction/Icon/dashboard/Reeject";


import { toPersianNum } from "@/components/utils/FarsiNum";
import Image from "next/image";
import React from "react";

const DashProduct = () => {
  return (
    <div className="flex rounded-2xl items-center py-1 px-4 shadow-[0_0_4px] shadow-blue-200/20 h-14">
      <div className="size-12 rounded-lg">
        <Image
          src={"/FastReserve/Rectangle41.png"}
          width={48}
          height={48}
          alt=""
        />
      </div>
      {/* name */}
      <span className="h-5.5 w-23 mr-2 text-[13px] truncate">
        هتل سراوان را...
      </span>
      {/* date */}
      <span className=" h-5.5 w-23 text-[13px] text-center mr-4">
        12 مرداد 1401{" "}
      </span>
      {/* time */}
      <span className=" h-5.5 w-8 text-[13px] mr-12">
        {toPersianNum("12:33")}
      </span>
      {/* price */}
      <span className=" h-5.5 w-25 text-[13px] mr-12 text-blue-200 dark:text-blue-300">
        {toPersianNum("1,800,000")} تومان
      </span>
      {/* status */}
      <span className="h-5.5 w-5 text-[13px] mr-10">
        <Reeject/>
      </span>
    </div>
  );
};

export default DashProduct;
