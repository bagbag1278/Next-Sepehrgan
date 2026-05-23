"use client";

import { toPersianNum } from "@/components/utils/FarsiNum";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const statCards = [
  {
    key: "allReservations",
    icon: "/FastReserve/clipboard_83422371.png",
    title: "کل رزروها",
    value: 5,
  },
  {
    key: "activeReservations",
    icon: "/FastReserve/calendar_50692921.png",
    title: "رزرو های فعال",
    value: 5,
  },
  {
    key: "pendingReservations",
    icon: "/FastReserve/loading_62505051.png",
    title: "رزرو های انتظار",
    value: 5,
  },
  {
    key: "favorites",
    icon: "/FastReserve/placeholder_112378311.png",
    title: "علاقه مندی ها",
    value: 5,
  },
];

const DashStatus = () => {
  return (
    <div className="h-30 flex gap-5">
      {statCards.map((item, index) => (
        <motion.div
          key={item.key}
          className="w-27.5 h-30 rounded-2xl hover:border border-blue-300/50 shadow-[0_0_4px] shadow-blue-200/20 flex items-center flex-col gap-2 justify-center"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
            delay: index * 0.12,
          }}
        >
          <div>
            <Image src={item.icon} width={24} height={24} alt="" />
          </div>

          <div className="flex flex-col gap-1 h-16.5">
            <span className="text-sm text-blue-100">{item.title}</span>
            <h3 className="text-blue-100 text-[32px] font-bold text-center">
              {toPersianNum(item.value)}
            </h3>
          </div>
        </motion.div>
      ))}

      {/* 5 */}
      <motion.div
        className="w-27.5 h-30 hover:border border-blue-300/50 rounded-2xl shadow-[0_0_4px] shadow-blue-200/20 flex items-center flex-col gap-2 justify-center"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
          delay: statCards.length * 0.12,
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
          <span className="text-sm text-blue-200">مشاهده همه</span>
          <h3 className="text-blue-100 font-bold text-center">
            {toPersianNum("50")}+
          </h3>
        </div>
      </motion.div>
    </div>
  );
};

export default DashStatus;
