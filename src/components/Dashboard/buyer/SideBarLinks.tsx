"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion"; 
import {
  LuLayoutDashboard,
  LuUsers,
  LuFileCheck2,
  LuHeart,
  LuMessageSquareText,
  LuBell,
} from "react-icons/lu";

const SideBarLinks = () => {
  const pathname = usePathname();

  const links = [
    { name: "داشبورد", href: "/dashboard/buyer", icon: <LuLayoutDashboard /> },
    { name: "اطلاعات کاربری", href: "/dashboard/buyer/buyerinfo", icon: <LuUsers /> },
    { name: "مدیریت رزرو ها", href: "/dashboard/buyer/manegereserve", icon: <LuFileCheck2 /> },
    { name: "علاقه مندی ها", href: "/dashboard/buyer/favorite", icon: <LuHeart /> },
    { name: "پرداخت ها", href: "/dashboard/buyer/payment", icon: <LuMessageSquareText /> },
    { name: "اعلان ها", href: "/dashboard/buyer/notification", icon: <LuBell /> },
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };


  const itemVariants = {
    hidden: { opacity: 0, x: +20 }, 
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div 
      className="w-full flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <motion.div key={link.name} variants={itemVariants}>
            <Link
              href={link.href}
              className={`flex items-center gap-2 text-[15px] transition-opacity rounded-xl ${
                isActive
                  ? "text-white bg-blue-200 h-10 pr-4"
                  : "text-blue-400 dark:text-white h-6 opacity-70 hover:opacity-100"
              }`}
            >
              {React.cloneElement(link.icon, {
                className: isActive ? "text-white" : "text-blue-400 dark:text-white",
                size: 24,
              })}
              <h5>{link.name}</h5>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SideBarLinks;
