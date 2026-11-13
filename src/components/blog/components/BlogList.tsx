"use client";
import { useTranslations } from 'next-intl';
import AdvancedScrollAnimation from "@/components/common/Animation/AdvancedScrollAnimation";
import BlogCard from "./BlogCard";

interface BlogListProps {
  blogs: any[];
  loading: boolean;
  onOpenModal: (blog: any) => void;
}

const BlogList = ({ blogs, loading, onOpenModal }: BlogListProps) => {
  const t = useTranslations('Blog');
  
  if (loading) {
    return (
      <AdvancedScrollAnimation type="fade" delay={0.2}>
        <div className="text-center py-20 text-gray-400 dark:text-gray-500 font-bold">{t('loading')}</div>
      </AdvancedScrollAnimation>
    );
  }
  
  if (blogs.length === 0) {
    return (
      <AdvancedScrollAnimation type="fade" delay={0.2}>
        <div className="text-center py-20 text-gray-400 dark:text-gray-500 font-bold">{t('noArticles')}</div>
      </AdvancedScrollAnimation>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {blogs.map((blog, index) => (
        <BlogCard 
          key={blog.id}
          blog={blog}
          index={index}
          onOpen={onOpenModal}
        />
      ))}
    </div>
  );
};

export default BlogList;