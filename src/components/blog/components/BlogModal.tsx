"use client";
import { useTranslations } from 'next-intl';
import { X, User, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BlogModalProps {
  isOpen: boolean;
  blog: any | null;
  onClose: () => void;
  imgPlaceholder: string;
}

const BlogModal = ({ isOpen, blog, onClose, imgPlaceholder }: BlogModalProps) => {
  const t = useTranslations('Blog');
  
  if (!isOpen || !blog) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      <motion.div 
        className="bg-[#F5F8FA] dark:bg-gray-800 max-w-[750px] w-full rounded-[8px] rounded-tr-[40px] rounded-bl-[40px] border border-[#E8EFF3] dark:border-gray-700 overflow-hidden shadow-2xl relative z-10"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex flex-col w-full">
          <div className="w-full h-[320px] relative overflow-hidden">
            <motion.img 
              src={blog.image || imgPlaceholder} 
              alt={blog.title} 
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <button 
              onClick={onClose}
              className="absolute top-4 left-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <motion.div 
            className="p-8 flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex gap-6 items-center text-[#94A3B8] dark:text-gray-400 text-[12px] font-semibold border-b border-gray-200 dark:border-gray-700 pb-3 flex-wrap">
              <span className="flex items-center gap-1 bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-600">
                <User size={14} className="text-[#0887CA] dark:text-white" />
                {t('author')} {blog.author_id}
              </span>
              <span className="flex items-center gap-1 bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-600">
                <Calendar size={14} className="text-[#0887CA] dark:text-white" />
                {new Date(blog.created_at).toLocaleDateString("fa-IR")}
              </span>
              <span className="flex items-center gap-1 bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-600">
                <Clock size={14} className="text-[#0887CA] dark:text-white" />
                {t('readingTime')} {blog.estimated_reading_time || t('defaultReadingTime')}
              </span>
            </div>

            <h2 className="text-[#10088F] dark:text-white text-[22px] font-black leading-8">
              {blog.title}
            </h2>

            <p className="text-[#475569] dark:text-gray-300 text-[14px] leading-[26px] text-justify font-medium whitespace-pre-line">
              {blog.caption}
            </p>

            <div className="mt-4 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-[#10088F] dark:bg-gray-700 text-white px-6 py-2.5 rounded-[12px] text-[13px] font-bold hover:bg-[#0887CA] dark:hover:bg-gray-600 transition-all shadow-md"
              >
                {t('close')}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogModal;