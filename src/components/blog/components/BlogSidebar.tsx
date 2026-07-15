"use client";
import BlogSearch from "./BlogSearch";
import BlogCategories from "./BlogCategories";

interface BlogSidebarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onVoiceInput: (text: string) => void;
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  categories: { id: number; name: string }[];
}

const BlogSidebar = ({
  searchQuery,
  setSearchQuery,
  onVoiceInput,
  selectedCategory,
  setSelectedCategory,
  categories
}: BlogSidebarProps) => {
  return (
    <div className="lg:col-span-1 flex flex-col gap-6">
      <BlogSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onVoiceInput={onVoiceInput}
      />
      <BlogCategories 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
    </div>
  );
};

export default BlogSidebar;