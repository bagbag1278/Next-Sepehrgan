"use client";
import { useTranslations } from 'next-intl';
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

const BlogHeader = () => {
  const t = useTranslations('Blog');
  
  return (
    <AdvancedScrollAnimation type="fade" delay={0.1}>
      <div className="mb-10 px-2">
        <h1 className="text-[#10088F] dark:text-white text-[24px] font-bold mb-2">{t('title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-[14px]">{t('subtitle')}</p>
      </div>
    </AdvancedScrollAnimation>
  );
};

export default BlogHeader;