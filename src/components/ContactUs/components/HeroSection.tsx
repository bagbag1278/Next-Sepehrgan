"use client";
import { useTranslations } from 'next-intl';
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import TallerFleshBlue from '@/app/(main)/contactus/icon/FleshBlue/TallerFleshBlue';
import FleshBlueLeft from '@/app/(main)/contactus/icon/FleshBlue/FleshBlueLeft';
import FleshBlueRight from '@/app/(main)/contactus/icon/FleshBlue/FleshBlueRight';


const HeroSection = () => {
  const t = useTranslations('ContactPage');

  return (
    <section className="text-center pt-16 pb-10 relative">
      <AdvancedScrollAnimation type="fade" delay={0.1}>
        <h1 className="text-2xl md:text-3xl font-black dark:text-white text-[rgb(6,4,37)]">
          {t('heroTitle')}
        </h1>
      </AdvancedScrollAnimation>
      

      
      <AdvancedScrollAnimation type="slide-up" delay={0.2}>
        <p className="text-gray-500 text-sm mt-4 max-w-lg mx-auto leading-relaxed dark:text-gray-300">
          {t('heroSubtitle')}
        </p>
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="scale" delay={0.3}>
        <div className="mt-6 flex justify-center">
          <button className="bg-[#F5F5F5] dark:bg-gray-800 shadow-[8px_0px_20px_rgba(8,135,202,0.30)] border-gray-200 w-35 h-12 text-blue-100 dark:text-[#28A5E6] font-bold cursor-pointer text-[18px] rounded-2xl">
            {t('registerButton')}
          </button>
        </div>
      </AdvancedScrollAnimation>
      
      <img src="/arrow-curve.png" className="absolute top-10 left-1/4 w-32 hidden md:block" alt="" />
    </section>
  );
};

export default HeroSection;