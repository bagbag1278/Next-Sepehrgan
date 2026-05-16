import ImageSlider from "@/components/Auth/ImgSlider/ImageSlider";
import CircularDropdown from "@/components/common/AuthMenu/AuthMenu";
import Image from "next/image";
import React, { FC, ReactNode } from "react";
interface IChildren {
  children: ReactNode;
}
const ForgetPassLayout: FC<IChildren> = ({ children }) => {
  const slideImages = [
    { src: "/auth/home1.png", alt: "Slide 1 Description" },
    { src: "/auth/home2.png", alt: "Slide 2 Description" },
    { src: "/auth/home1.png", alt: "Slide 3 Description" },
    { src: "/auth/home2.png", alt: "Slide 4 Description" },
  ];

  return (
    <div dir="rtl" className="h-179.5 flex justify-center relative">
      <div className="w-2/4 h-175.25 mr-2 mt-2 relative">
        <div className="text-white w-96.5 h-33.5 absolute right-37.5 top-109 z-20 flex flex-col gap-4">
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
        <ImageSlider images={slideImages} delay={5000} />
      </div>
      <div dir="ltr" className="w-180 ml-2">
        <div className="absolute left-24 top-3.5">
          <CircularDropdown />
        </div>
        <div className="absolute left-36">
          <Image src={"/auth/vec2.png"} alt="vec" width={130} height={143} />
        </div>
        <div className=" w-44.25 h-16 mx-auto mt-40 flex gap-2 flex-col">
          <h3 className="font-bold text-center text-[16px] opacity-80">
            خوش آمدید :)
          </h3>
          <h1 className="font-bold text-center text-[17px]">
            فراموشی رمزعبور
          </h1>
        </div>
        <div className="max-w-107.5 w-full mx-auto mt-12 relative ">{children}</div>
      </div>
    </div>
  );
};

export default ForgetPassLayout;
