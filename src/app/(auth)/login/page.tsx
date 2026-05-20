"use client";
import ImageSlider from "@/components/Auth/ImgSlider/ImageSlider";
import LoginForm from "@/components/Auth/Login/LoginForm";
import CircularDropdown from "@/components/common/AuthMenu/AuthMenu";
import GoogleLogin from "@/components/common/GooleLogin/GoogleLogin";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  const slideImages = [
    { src: "/auth/left.png", alt: "Slide 1 Description" },
    { src: "/auth/left.png", alt: "Slide 2 Description" },
    { src: "/auth/left.png", alt: "Slide 3 Description" },
    { src: "/auth/left.png", alt: "Slide 4 Description" },
  ];
  
  return (
    <div dir="rtl" className="h-179.5 flex justify-between relative">
      <div className="w-180 mr-2 relative z-20 bg-white">
        <div className="absolute right-24 top-3.5 z-30">
          <CircularDropdown />
        </div>
        <div className="absolute right-35.25 z-10">
          <Image src={"/auth/vec.png"} alt="vec" width={130} height={143} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-44.25 h-16 mx-auto mt-25 flex gap-2 flex-col">
              <h3 className="font-bold text-center text-[16px] opacity-80">
                خوش آمدید :)
              </h3>
              <h1 className="font-bold text-center text-[17px]">
                ورود به حساب کاربری
              </h1>
            </div>
            <div className="relative w-107.5 h-100.5 mx-auto mt-12">
              <GoogleLogin />
              <LoginForm />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-[48%] relative h-175.25 ml-2 mt-2 rounded-br-[50px] rounded-tr-[50px] hidden md:block overflow-hidden z-0">
        <div className="text-white w-96.5 h-33.5 absolute right-37.5 top-109 z-10 flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            وارد رهن کده شو و خونت رو پیدا کن !!!
          </h3>
          <p className="text-white/85 text-center">
            وارد شو و با یک قدم ساده، به سوی خونه‌ای که همیشه آرزوش را داشتی،
            برو!
          </p>
          <span className="text-[14px] text-white/85 text-center">
            صفا باشه! عشق باشه! معرفت باشه!
          </span>
        </div>
        <div className="relative z-0">
          <ImageSlider images={slideImages} delay={5000} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;