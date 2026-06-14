import Accept from "@/components/landing/components/HeroSction/Icon/dashboard/Accept";
import Reeject from "@/components/landing/components/HeroSction/Icon/dashboard/Reeject";
import { toPersianNum } from "@/components/utils/FarsiNum";
import React from "react";
import ManegeHouseDrop from "./ManegeHouseDrop";
import { Booking } from "@/core/types/buyer/IBooking";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import Decline from "@/components/landing/components/HeroSction/Icon/dashboard/Decline";
import jalaali from "jalaali-js";
interface ManegeHouseProps {
  booking: Booking;
}
const ManegeHouse = ({ booking }: ManegeHouseProps) => {
  const toJalali = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    const { jy, jm, jd } = jalaali.toJalaali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );
    const monthNames = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    return `${digitsEnToFa(jd.toString())} ${monthNames[jm - 1]} ${digitsEnToFa(jy.toString())}`;
  };
  const toTime = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    return digitsEnToFa(`${h}:${m}`);
  };
  return (
    <div className="h-16 rounded-2xl relative dark:bg-slate-600 shadow-[0_0_4px] hover:dark:shadow-slate-700 hover:shadow-[0_0_10px] transition-shadow duration-200 flex items-center shadow-blue-200/20 py-5 px-6">
      {/* name */}
      <h6 className="h-5.5 w-27.75 text-sm text-nowrap absolute right-6 ">
        {booking.house.title}
      </h6>
      {/* date */}
      <span className=" h-5.5 w-23 text-nowrap text-[13px] text-center absolute right-[188px]">
        {toJalali(booking.created_at)}
      </span>
      {/* time */}
      <span className=" h-5.5 w-8 text-[13px] absolute right-[340px]">
        {toTime(booking.created_at)}
      </span>
      {/* price */}
      <span className=" h-5.5 w-25 text-[13px] text-nowrap text-blue-200 absolute right-[436px] dark:text-blue-300">
        {digitsEnToFa(addCommas(booking.house.price))} تومان
      </span>
      {/* travelers */}
      <span className=" h-5.5 w-23 text-[13px] text-center absolute right-[588px]">
        {digitsEnToFa(booking.traveler_details.length.toString())}نفر
      </span>
      {/* reserve status */}
      <span className="h-5.5 w-20 text-[13px] text-center absolute right-[724px]">
        {booking.status === "pending" && <Decline />}

        {booking.status === "confirmed" && <Accept />}

        {booking.status === "canceled" && <Reeject />}
      </span>
      {/* payment status */}
      <span className="h-5.5 w-5 text-[13px] absolute right-[843px]">
        <Decline />
      </span>
      {/* more */}
      <div className="relative">
        <ManegeHouseDrop booking={booking} />
      </div>
    </div>
  );
};

export default ManegeHouse;
