"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import BlogHeader from "./components/BlogHeader";
import BlogSidebar from "./components/BlogSidebar";
import BlogList from "./components/BlogList";
import BlogModal from "./components/BlogModal";

const BlogClient = () => {
  const t = useTranslations('Blog');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [activeBlog, setActiveBlog] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imgPlaceholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJGK1u8iNK0_v9sU4GgbGYkeyZNZ75jZpuKg&s";

  const categories = [
    { id: 1, name: t('villaNews') },
    { id: 2, name: t('modernApartment') },
    { id: 3, name: t('housingInvestment') },
  ];

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://188.121.104.25:3003/api/blogs");
      const result = await response.json();
      setBlogs(result.data || []);
    } catch (error) {
      console.error(t('errorFetching'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleVoiceInput = (text: string) => {
    setSearchQuery(text);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || blog.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openModal = (blog: any) => {
    setActiveBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveBlog(null);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 py-12 min-h-screen" dir="rtl">
      <BlogHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <BlogSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onVoiceInput={handleVoiceInput}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        
        <div className="lg:col-span-3">
          <BlogList 
            blogs={filteredBlogs}
            loading={loading}
            onOpenModal={openModal}
            imgPlaceholder={imgPlaceholder}
          />
        </div>
      </div>

      <BlogModal 
        isOpen={isModalOpen}
        blog={activeBlog}
        onClose={closeModal}
        imgPlaceholder={imgPlaceholder}
      />
    </div>
  );
};

export default BlogClient;