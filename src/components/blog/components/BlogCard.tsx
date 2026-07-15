"use client";
import { useTranslations } from 'next-intl';
import { Clock, Calendar, User, ArrowLeft } from "lucide-react";
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";

interface BlogCardProps {
  blog: any;
  index: number;
  onOpen: (blog: any) => void;
  imgPlaceholder: string;
}

const BlogCard = ({ blog, index, onOpen, imgPlaceholder }: BlogCardProps) => {
  const t = useTranslations('Blog');
  
  return (
    <AdvancedScrollAnimation
      key={blog.id}
      type="slide-up"
      delay={0.1 + (index * 0.05)}
      duration={0.5}
      threshold={0.2}
    >
      <div 
        className="hover-3d w-full cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        onClick={() => onOpen(blog)}
      >
        <div className="w-full bg-[#F5F8FA] dark:bg-gray-800/50 border border-[#E8EFF3] dark:border-gray-700 rounded-[8px] rounded-tr-[32px] rounded-bl-[32px] overflow-hidden shadow-sm shadow-[8px_8px_20px_rgba(8,135,202,0.15)] dark:shadow-none flex flex-col h-full">
          <div className="w-full h-[200px] overflow-hidden relative">
            <img 
              src={blog.image || imgPlaceholder} 
              alt={blog.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <span className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-[#10088F] dark:text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Clock size={12} className="text-[#0887CA] dark:text-white" />
              {blog.estimated_reading_time || t('defaultReadingTime')}
            </span>
          </div>

          <div className="p-6 flex flex-col flex-1 justify-between">
            <div>
              <div className="flex gap-4 items-center text-[#94A3B8] dark:text-gray-500 text-[11px] mb-3 font-medium">
                <span className="flex items-center gap-1">
                  <User size={13} className="text-[#0887CA] dark:text-white" />
                  {t('authorId')} {blog.author_id}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-[#0887CA] dark:text-white" />
                  {blog.created_at ? new Date(blog.created_at).toLocaleDateString("fa-IR") : "۱۴۰۵/۰۲/۲۱"}
                </span>
              </div>
              <h2 className="text-[#060425] dark:text-white text-[16px] font-extrabold mb-3 leading-6 hover:text-[#0887CA] dark:hover:text-white transition-colors">
                {blog.title}
              </h2>
              <p className="text-[#475569] dark:text-gray-400 text-[13px] leading-[22px] mb-6 line-clamp-2">
                {blog.caption}
              </p>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-end">
              <button className="flex items-center gap-1 text-[12px] text-[#0887CA] dark:text-white font-extrabold hover:text-[#10088F] dark:hover:text-gray-300 transition-colors">
                <span>{t('readMore')}</span>
                <ArrowLeft size={14} className="mt-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdvancedScrollAnimation>
  );
};

export default BlogCard;