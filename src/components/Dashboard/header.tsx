"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const links = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/housereserve", label: "رزرو سریع" },
  { href: "/mortgage", label: "رهن و اجاره" },
  { href: "/blog", label: "وبلاگ" },
  { href: "/contactus", label: "درباره ما" },
];

const DashboardHeader = () => {
  return (
    <div className="h-6.25 flex gap-6 text-[15px]">
      {links.map((link, index) => (
        <motion.div
          key={link.href}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }} 
        >
          <Link
            href={link.href}
            className="hover:text-blue-200 hover:font-bold transition-all duration-150"
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardHeader;
