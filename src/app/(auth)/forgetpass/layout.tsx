"use client";

import ImageSlider from "@/components/Auth/ImgSlider/ImageSlider";
import CircularDropdown from "@/components/common/AuthMenu/AuthMenu";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import React, { FC, ReactNode } from "react";

interface IChildren {
  children: ReactNode;
}

const ForgetPassLayout: FC<IChildren> = ({ children }) => {
  const t = useTranslations('Auth');
  
  const slideImages = [
    { src: "/auth/home1.png", alt: "Slide 1 Description" },
    { src: "/auth/home2.png", alt: "Slide 2 Description" },
    { src: "/auth/home1.png", alt: "Slide 3 Description" },
    { src: "/auth/home2.png", alt: "Slide 4 Description" },
  ];

  return (
    <div dir="rtl" className="min-h-screen flex flex-col md:flex-row justify-between relative transition-colors duration-300">
      
      <div className="hidden md:block w-full md:w-1/2 lg:w-[55%] relative min-h-[500px] md:min-h-[600px] rounded-br-[50px] rounded-tr-[50px]  z-0">
        <div className="absolute inset-x-0 bottom-10 md:bottom-20 z-20 flex flex-col gap-3 md:gap-4 px-6 md:px-10 max-w-2xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
            {t('heroTitle')}
          </h3>
          <p className="text-white/90 text-sm md:text-base lg:text-lg drop-shadow-md">
            {t('heroSubtitle')}
          </p>
          <span className="text-xs md:text-sm lg:text-base text-white/80 drop-shadow-md">
            {t('heroFooter')}
          </span>
        </div>
        <div className="relative z-0 h-full w-full">
          <ImageSlider images={slideImages} delay={5000} />
        </div>
      </div>

      {/* سمت چپ - فرم */}
      <div className="w-full md:w-1/2 lg:w-[45%] relative z-20  flex flex-col items-center justify-center px-4 py-8 md:py-12 transition-colors duration-300">
        
        <div className="absolute left-4 md:left-24 top-3.5 z-30">
          <CircularDropdown />
        </div>
        
        <div className="absolute left-46 top-0 mt-2 z-10 opacity-50 md:opacity-100">
          <Image
            src={"/auth/vec2.png"}
            alt="vec"
            width={130}
            height={143}
            className="md:w-[130px] md:h-[143px] dark:opacity-50"
            priority
          />
        </div>

        <div className="w-full max-w-md mx-auto mt-10 md:mt-20">
          <div className="w-full mx-auto flex gap-2 flex-col mb-8">
            <h3 className="font-bold text-center text-[14px] md:text-[16px] opacity-80 dark:text-gray-400">
              {t('welcome')}
            </h3>
            <h1 className="font-bold text-center text-[15px] md:text-[17px] dark:text-white">
              {t('forgotPasswordTitle')}
            </h1>
          </div>
          
          <div className="max-w-107.5 w-full mx-auto relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassLayout;