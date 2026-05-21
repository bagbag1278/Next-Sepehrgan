// RegisterLayout.tsx
import ImageSlider from "@/components/Auth/ImgSlider/ImageSlider";
import CircularDropdown from "@/components/common/AuthMenu/AuthMenu";
import Image from "next/image";
import React, { FC, ReactNode } from "react";

interface IChildren {
  children: ReactNode;
}

const RegisterLayout: FC<IChildren> = ({ children }) => {
  const slideImages = [
    { src: "/auth/home1.png", alt: "Slide 1 Description" },
    { src: "/auth/home2.png", alt: "Slide 2 Description" },
    { src: "/auth/home1.png", alt: "Slide 3 Description" },
    { src: "/auth/home2.png", alt: "Slide 4 Description" },
  ];

  return (
    <div dir="rtl" className="min-h-screen flex flex-col lg:flex-row justify-center bg-white">
      <div className="max-[1024]:hidden  w-full lg:w-1/2 xl:w-2/4 relative min-h-[500px] lg:min-h-[600px] z-0">
        
        <div className="absolute inset-x-0 bottom-8 md:bottom-12 lg:bottom-16 z-20 flex flex-col gap-3 md:gap-4 px-6 md:px-10 max-w-2xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
            وارد رهن کده شو و خونت رو پیدا کن !!!
          </h3>
          <p className="text-white/90 text-sm md:text-base lg:text-lg drop-shadow-md">
            وارد شو و با یک قدم ساده، به سوی خونه‌ای که همیشه آرزوش را داشتی،
            برو!
          </p>
          <span className="text-xs md:text-sm lg:text-base text-white/80 drop-shadow-md">
            صفا باشه! عشق باشه! معرفت باشه!
          </span>
        </div>

        <div className="relative z-0 h-full w-full rounded-tr-[30px] md:rounded-tr-[40px] lg:rounded-tr-[50px] rounded-br-[30px] md:rounded-br-[40px] lg:rounded-br-[50px] overflow-hidden">
          <ImageSlider images={slideImages} delay={5000} />
        </div>
      </div>

      <div className="w-full lg:w-1/2 xl:w-[450px] relative z-20 bg-white flex flex-col items-center justify-center px-4 py-8 md:py-12 ">
        <div className="absolute left-4 md:left-8 lg:left-24 top-3.5 z-30 max-[1024]:hidden">
          <CircularDropdown />
        </div>
        <div className="absolute left-8 md:left-12 lg:left-36 top-0 z-10 opacity-50 md:opacity-100 max-[1024]:hidden">
          <Image src={"/auth/vec2.png"} alt="vec" width={100} height={110} className="md:w-[130px] md:h-[143px]" />
        </div>

        <div className="w-full max-w-md mx-auto mt-16 md:mt-24 lg:mt-40">
          <div className="w-full h-auto mx-auto flex gap-2 flex-col mb-6 md:mb-8">
            <h3 className="font-bold text-center text-[14px] md:text-[16px] opacity-80">
              خوش آمدید :)
            </h3>
            <h1 className="font-bold text-center text-[15px] md:text-[17px]">
              ایجاد حساب کاربری
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