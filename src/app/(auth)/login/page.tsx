"use client";
import LoginForm from "@/components/Auth/Login/LoginForm";
import CircularDropdown from "@/components/common/AuthMenu/AuthMenu";
import GoogleLogin from "@/components/common/GooleLogin/GoogleLogin";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div dir="rtl" className=" h-179.5 flex justify-between relative">
      <div className="w-180 mr-2">
        <div className="absolute right-24  top-3.5">
          <CircularDropdown />
        </div>
        <div className="absolute right-35.25">
          <Image src={"/auth/vec.png"} alt="vec" width={130} height={143} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            {" "}
            <div className=" w-44.25 h-16 mx-auto mt-25 flex gap-2 flex-col">
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
      <div className="w-[48%] h-175.25 ml-2 mt-2 rounded-br-[50px] rounded-tr-[50px] :hidden">
        <Image src={"/auth/left.png"} alt="left" width={688} height={700} />
      </div>
    </div>
  );
};

export default LoginPage;
