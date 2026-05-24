import Accept from "@/components/landing/components/HeroSction/Icon/dashboard/Accept";
import Reeject from "@/components/landing/components/HeroSction/Icon/dashboard/Reeject";
import { toPersianNum } from "@/components/utils/FarsiNum";
import React from "react";
import ManegeHouseDrop from "./ManegeHouseDrop";

const ManegeHouse = () => {
  return (
    <div className="h-16 rounded-2xl shadow-[0_0_4px] hover:shadow-[0_0_10px] transition-shadow duration-200 flex items-center shadow-blue-200/20 py-5 px-6">
      {/* name */}
      <h6 className="h-5.5 w-27.75 text-sm text-nowrap truncate mr-1">
        هتل سراوان رانین...
      </h6>
      {/* date */}
      <span className=" h-5.5 w-23 text-[13px] text-center mr-10">
        12 مرداد 1401{" "}
      </span>
      {/* time */}
      <span className=" h-5.5 w-8 text-[13px] mr-18">
        {toPersianNum("12:33")}
      </span>
      {/* price */}
      <span className=" h-5.5 w-25 text-[13px] mr-16 text-blue-200 dark:text-blue-300">
        {toPersianNum("1,800,000")} تومان
      </span>
      {/* travelers */}
      <span className=" h-5.5 w-23 text-[13px] text-center mr-5">2 نفر</span>
      {/* reserve status */}
      <span className="h-5.5 w-5 text-[13px] mr-17">
        <Reeject />
      </span>
      {/* payment status */}
      <span className="h-5.5 w-5 text-[13px] mr-26">
        <Accept />
      </span>
      {/* more */}

      <ManegeHouseDrop/>
    </div>
  );
};

export default ManegeHouse;
