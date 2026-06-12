"use client";

import { toPersianNum } from "@/components/utils/FarsiNum";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Import useInView
import { DashboardSummary } from "@/core/types/buyer/IDashboardSummary";
interface DashStatusProps {
  summary: DashboardSummary;

}


const DashStatus = ({ summary }: DashStatusProps) => {
  const { ref: containerRef, inView: containerInView } = useInView({
    triggerOnce: true, // انیمیشن فقط یک بار اجرا شود
    threshold: 0.2, // وقتی 20% از کامپوننت دیده می‌شود، انیمیشن فعال شود
  });
const statCards = [
  {
    key: "allReservations",
    icon: "/FastReserve/clipboard_83422371.png",
    title: "کل رزروها",
    value: summary.bookings.bookingCount,
  },
  {
    key: "activeReservations",
    icon: "/FastReserve/calendar_50692921.png",
    title: "رزرو های فعال",
    value: summary.bookings.conformedBookings,
  },
  {
    key: "pendingReservations",
    icon: "/FastReserve/loading_62505051.png",
    title: "رزرو های انتظار",
    value: summary.bookings.pendingBookings,
  },
  {
    key: "favorites",
    icon: "/FastReserve/placeholder_112378311.png",
    title: "علاقه مندی ها",
    value: 5,
  },
];
  return (
    <div ref={containerRef} className="h-30 flex gap-5">
      {" "}
      {/* Ref را به div اصلی اضافه کنید */}
      {statCards.map((item, index) => (
        <motion.div
          key={item.key}
          className="w-27.5 h-30 rounded-2xl hover:border dark:bg-slate-600 hover:scale-105 border-blue-300/50 shadow-[0_0_4px] shadow-blue-200/20 flex items-center flex-col gap-2 justify-center"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={
            containerInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.95 }
          }
          transition={{
            duration: 0.45,
            ease: "easeOut",
            delay: containerInView ? index * 0.12 : 0,
          }}
        >
          <div>
            <Image src={item.icon} width={24} height={24} alt="" />
          </div>

          <div className="flex flex-col gap-1 h-16.5">
            <span className="text-sm text-blue-100 dark:text-blue-300">
              {item.title}
            </span>
            <h3 className="text-blue-100 dark:text-blue-300 text-[32px] font-bold text-center">
              {toPersianNum(item.value)}
            </h3>
          </div>
        </motion.div>
      ))}
      <motion.div
        className="w-27.5 h-30 hover:border dark:bg-slate-600 border-blue-300/50 rounded-2xl shadow-[0_0_4px] shadow-blue-200/20 flex items-center flex-col gap-2 justify-center"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={
          containerInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 20, scale: 0.95 }
        }
        transition={{
          duration: 0.45,
          ease: "easeOut",
          delay: containerInView ? statCards.length * 0.12 : 0,
        }}
      >
        <div>
          <Image
            src={"/FastReserve/upleft.png"}
            width={24}
            height={24}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1 h-16.5">
          <span className="text-sm text-blue-200  dark:text-blue-300">
            مشاهده همه
          </span>
          <h3 className="text-blue-100 dark:text-blue-300 font-bold text-center">
            {toPersianNum("50")}+
          </h3>
        </div>
      </motion.div>
    </div>
  );
};

export default DashStatus;
