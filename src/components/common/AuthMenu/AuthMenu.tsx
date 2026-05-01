"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../DarkMode/ThemeToggle";

const MenuItem = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.2 }}
    className="px-2 py-2 text-sm text-gray-700 flex justify-center drop-shadow drop-shadow-green-100/25 bg-white cursor-pointer rounded-full "
    role="menuitem"
  >
    {children}
  </motion.div>
);

const CircularDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9, // شروع با مقیاس کمی کوچکتر
      y: 10, // کمی به سمت بالا شروع کند
    },
    visible: {
      opacity: 1,
      scale: 1, // مقیاس کامل
      y: 0, // بدون جابجایی عمودی
      transition: {
        duration: 0.3,
        ease: "easeOut", // افکت نرم در انتها
        staggerChildren: 0.1, // تاخیر بین انیمیشن آیتم‌های فرزند
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 10,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="relative inline-block w-24 h-24 justify-center items-center">
      {" "}
      <motion.button
        onClick={toggleMenu}
        whileTap={{ scale: 1.1 }}
        className="w-10 h-10 rounded-full bg-[#F5F5F5] drop-shadow backdrop-blur-xs drop-shadow-blue-100/35 flex justify-center items-center focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <Image src={"/auth/exit.png"} width={8} height={8} alt="big" />
        ) : (
          <Image src={"/auth/big.svg"} width={16} height={12} alt="big" />
        )}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-12 rounded-[100px] flex flex-col gap-2 bg-blue-300/20 p-2"
            role="menu"
          >
            <MenuItem>
              <Link href={"/"}>
                <Image
                  src={"/auth/Icon.png"}
                  width={18}
                  height={20}
                  alt="home"
                />
              </Link>
            </MenuItem>
            <MenuItem>
              <ThemeToggle />
            </MenuItem>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircularDropdown;
