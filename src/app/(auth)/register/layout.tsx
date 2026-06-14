
"use client";

import ImageSlider from "@/components/Auth/ImgSlider/ImageSlider";
import CircularDropdown from "@/components/common/AuthMenu/AuthMenu";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import React, { FC, ReactNode } from "react";
interface IChildren {
  children: ReactNode;
}
const RegisterLayout: FC<IChildren> = ({ children }) => {
  const t = useTranslations('Auth');
  
  const slideImages = [
    { src: "/auth/home1.png", alt: "Slide 1 Description" },
    { src: "/auth/home2.png", alt: "Slide 2 Description" },
    { src: "/auth/home1.png", alt: "Slide 3 Description" },
    { src: "/auth/home2.png", alt: "Slide 4 Description" },
  ];

  return (
    <div dir="rtl" className="min-h-screen flex flex-col lg:flex-row justify-center transition-colors gap-15 duration-300">
      
      {/* سمت راست - اسلایدر */}
      <div className="hidden lg:block w-full lg:w-1/2 xl:w-2/4 relative min-h-125 lg:min-h-150  z-0">
        
        <div className="absolute inset-x-0 bottom-8 md:bottom-12 lg:bottom-16 z-20 flex flex-col gap-3 md:gap-4 px-6 md:px-10 max-w-2xl mx-auto text-center">
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
      <div className="w-full lg:w-1/2 xl:w-112.5 relative z-20 flex flex-col items-center justify-center px-4 py-8 md:py-12 transition-colors duration-300">
          <div className="">
               <div className="absolute left-1 top-3.5 z-30 hidden lg:block">
          <CircularDropdown />
        </div>
        
        <div className="absolute left-24 mt-5 top-0 z-10  hidden lg:block">
          <Image 
            src={"/auth/vec2.png"} 
            alt="vec" 
            width={100} 
            height={110} 
            className="md:w-32.5 md:h-35.75 dark:opacity-50" 
            priority
          />
        </div>
          </div>
     

        <div className="w-full max-w-md mx-auto mt-16 md:mt-24 lg:mt-40">
          <div className="w-full h-auto mx-auto flex gap-2 flex-col mb-6 md:mb-8">
            <h3 className="font-bold text-center text-[14px] md:text-[16px] opacity-80 dark:text-gray-400">
              {t('welcome')}
            </h3>
            <h1 className="font-bold text-center text-[15px] md:text-[17px] dark:text-white">
              {t('registerTitle')}
            </h1>
          </div>

          <div className="w-full mx-auto relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLayout;
