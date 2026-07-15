"use client";
import { useTranslations } from 'next-intl';
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

const BuildTogether = () => {
  const t = useTranslations('ContactPage');

  return (
    <AdvancedScrollAnimation type="fade" delay={0.2}>
      <h2 className="text-[16px] font-medium text-[rgb(6,4,37)] dark:text-gray-300 w-full justify-center flex relative top-10">
        {t('buildTogether')}
      </h2>
    </AdvancedScrollAnimation>
  );
};

export default BuildTogether;