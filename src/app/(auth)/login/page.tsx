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
    <div
      dir="rtl"
      className="min-h-screen flex flex-col md:flex-row justify-between relative bg-white "
    >
      <div className="w-full md:w-1/2 lg:w-[45%] relative z-20 bg-white flex flex-col items-center justify-center mb-20  px-4 py-8 md:py-12  ">
        <div className="absolute right-4 md:right-24 top-3.5 z-30 max-[1024]:hidden">
          <CircularDropdown />
        </div>
        <div className="absolute right-8 md:right-35.25 top-0 z-10 opacity-50 md:opacity-100 max-[1024]:hidden">
          <Image
            src={"/auth/vec.png"}
            alt="vec"
            width={100}
            height={110}
            className="md:w-[130px] md:h-[143px]"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md mx-auto mt-10 md:mt-0"
          >
            <div className="w-full h-auto mx-auto mt-10 md:mt-25 flex gap-2 flex-col">
              <h3 className="font-bold text-center text-[14px] md:text-[16px] opacity-80">
                خوش آمدید :)
              </h3>
              <h1 className="font-bold text-center text-[15px] md:text-[17px]">
                ورود به حساب کاربری
              </h1>
            </div>
            <div className="relative w-full truncate  max-w-md mx-auto mt-6 md:mt-12 px-4 md:px-0">
              <GoogleLogin />
              <LoginForm />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
  <div className="hidden md:block w-full md:w-1/2 lg:w-[55%] relative min-h-[500px] md:min-h-[600px] rounded-br-[50px] rounded-tr-[50px] overflow-hidden z-0">
  <div className="absolute  max-[764]:hidden inset-x-0 bottom-10 md:bottom-20 z-20 flex flex-col gap-3 md:gap-4 px-6 md:px-10 max-w-2xl mx-auto text-center">
    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
      وارد رهن کده شو و خونت رو پیدا کن !!!
    </h3>
    <p className="text-white/90 text-sm md:text-base lg:text-lg drop-shadow-md">
      وارد شو و با یک قدم ساده، به سوی خونه‌ای که همیشه آرزوش را داشتی، برو!
    </p>
    <span className="text-xs md:text-sm lg:text-base text-white/80 drop-shadow-md">
      صفا باشه! عشق باشه! معرفت باشه!
    </span>
  </div>

  <div className="relative  max-[764]:hidden z-0 h-full w-full">
    <ImageSlider images={slideImages} delay={5000} />
  </div>
</div>
    </div>
  );
};

export default LoginPage;
