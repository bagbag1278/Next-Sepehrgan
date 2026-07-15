"use client";
import { useTranslations } from 'next-intl';
import { Filter } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface BlogCategoriesProps {
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  categories: { id: number; name: string }[];
}

const BlogCategories = ({ selectedCategory, setSelectedCategory, categories }: BlogCategoriesProps) => {
  const t = useTranslations('Blog');
  
  return (
    <AdvancedScrollAnimation type="slide-right" delay={0.2} duration={0.5}>
      <div className="w-full bg-[#F5F8FA] dark:bg-gray-800/50 border border-[#E8EFF3] dark:border-gray-700 rounded-[20px] p-5 shadow-sm shadow-[4px_4px_15px_rgba(8,135,202,0.1)] dark:shadow-none">
        <h3 className="text-[#10088F] dark:text-white text-[15px] font-bold mb-4 flex items-center gap-2">
          <Filter size={18} className="text-[#0887CA] dark:text-white" />
          {t('categories')}
        </h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-right px-4 py-2.5 rounded-[10px] text-[13px] font-bold transition-all ${
              selectedCategory === null
                ? "bg-[#10088F] dark:bg-gray-700 text-white"
                : "bg-white dark:bg-gray-800 text-[#475569] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {t('allArticles')}
          </button>
          
          {categories.map((cat, index) => (
            <AdvancedScrollAnimation 
              key={cat.id} 
              type="slide-right" 
              delay={0.3 + (index * 0.05)} 
              duration={0.4}
            >
              <button
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-right px-4 py-2.5 rounded-[10px] text-[13px] font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#10088F] dark:bg-gray-700 text-white"
                    : "bg-white dark:bg-gray-800 text-[#475569] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {cat.name}
              </button>
            </AdvancedScrollAnimation>
          ))}
        </div>
      </div>
    </AdvancedScrollAnimation>
  );
};

export default BlogCategories;