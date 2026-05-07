"use client"; // components/ImageSlider.tsx
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // ماژول‌های مورد نیاز

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"; // استایل‌های دایره‌ها
import Image from "next/image";

// Define type for slide images if you have them in an array
interface SlideImage {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: SlideImage[];
  delay?: number; // Optional: delay in milliseconds, defaults to 5000
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, delay = 5000 }) => {
  // Ensure Swiper modules are loaded correctly in Next.js environment
  useEffect(() => {
    const importSwiperModules = async () => {
      await import("swiper/css/pagination");
      await import("swiper/css");
      // Swiper core styles might also need dynamic import if not globally injected
    };
    importSwiperModules();
  }, []);

  return (
    <div className="">
      {" "}
      {/* Tailwind classes for sizing */}
      <Swiper
        modules={[Autoplay, Pagination]} // اضافه کردن ماژول‌ها
        spaceBetween={0} // فاصله بین اسلایدها (اگر نمی‌خواهید صفر باشد، مقدار دهید)
        slidesPerView={1} // نمایش ۱ اسلاید در هر زمان
        loop={true} // چرخش بی‌نهایت
        pagination={{
          clickable: true, // امکان کلیک روی دایره‌ها
        }}
        autoplay={{
          delay: delay,
          disableOnInteraction: false, // فعال نگه داشتن autoplay بعد از تعامل کاربر
        }}
        className="mySwiper" // یک کلاس دلخواه برای استایل‌دهی بیشتر با Tailwind
      >
        {images.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image
              src={slide.src}
              alt={slide.alt}
              width={688}
              height={700}
              
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
