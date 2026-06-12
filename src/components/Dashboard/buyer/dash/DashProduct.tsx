import Accept from "@/components/landing/components/HeroSction/Icon/dashboard/Accept";
import Reeject from "@/components/landing/components/HeroSction/Icon/dashboard/Reeject";
import Decline from "@/components/landing/components/HeroSction/Icon/dashboard/Decline";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import Image from "next/image";
import React from "react";
import { Booking } from "@/core/types/buyer/IBooking";
import jalaali from "jalaali-js";

interface DashProductProps {
  booking: Booking;
}

const toJalali = (dateStr: string) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  const { jy, jm, jd } = jalaali.toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  const monthNames = [
    "فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور",
    "مهر","آبان","آذر","دی","بهمن","اسفند",
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

const DashProduct = ({ booking }: DashProductProps) => {
  return (
    <div className="flex rounded-2xl dark:bg-slate-600 shadow-[0_0_4px] hover:dark:shadow-slate-700 hover:shadow-[0_0_10px] transition-shadow duration-200 items-center py-1 px-4 shadow-blue-200/20 h-14">
      <div className="size-12 rounded-lg">
        <Image src={"/FastReserve/Rectangle41.png"} width={48} height={48} alt="" />
      </div>
      {/* name */}
      <span className="h-5.5 w-23 mr-2 text-[13px] truncate">
        {booking.house.title}
      </span>
      {/* date */}
      <span className="h-5.5 w-23 text-[13px] text-center mr-4">
        {toJalali(booking.created_at)}
      </span>
      {/* time */}
      <span className="h-5.5 w-8 text-[13px] mr-12">
        {toTime(booking.created_at)}
      </span>
      {/* price */}
      <span className="h-5.5 w-25 text-[13px] mr-12 text-nowrap text-blue-200 dark:text-blue-300">
        {digitsEnToFa(addCommas(Math.round(Number(booking.house.price)).toString()))} تومان
      </span>
      {/* status */}
      <span className="h-5.5 w-5 text-[13px] mr-10">
        {booking.status === "confirmed" && <Accept />}
        {booking.status === "pending" && <Decline />}
        {booking.status === "canceled" && <Reeject />}
      </span>
    </div>
  );
};

export default DashProduct;