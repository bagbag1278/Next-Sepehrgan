"use client";
import React, { useEffect, useState } from "react";
import { Search, Clock, Calendar, User, ArrowLeft, Filter, X } from "lucide-react";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  const [activeBlog, setActiveBlog] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://next.genzuni.website/api/blogs");
        const result = await response.json();
        setBlogs(result.data || []);
      } catch (error) {
        console.error("خطا دریافت بلاگ");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || blog.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 1, name: "اخبار ویلاها" },
    { id: 2, name: "آپارتمان مدرن" },
    { id: 3, name: "سرمایه‌گذاری مسکن" },
  ];

  const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJGK1u8iNK0_v9sU4GgbGYkeyZNZ75jZpuKg&s";

  const openModal = (blog: any) => {
    setActiveBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveBlog(null);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 py-12" dir="rtl">
      <div className="mb-10 px-2">
        <h1 className="text-[#10088F] text-[24px] font-bold mb-2">مقالات و وبلاگ</h1>
        <p className="text-gray-500 text-[14px]">آخرین تحلیل‌ها و آموزش‌های حوزه مسکن را اینجا بخوانید.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* سمت راست: فیلترها */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="w-full bg-[#F5F8FA] border border-[#E8EFF3] rounded-[20px] p-5 shadow-sm shadow-[4px_4px_15px_rgba(8,135,202,0.1)]">
            <h3 className="text-[#10088F] text-[15px] font-bold mb-3 flex items-center gap-2">
              <Search size={18} className="text-[#0887CA]" />
              جستجو در مقالات
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو بلاگ"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[48px] rounded-[12px] border border-[#0887CA44] bg-white px-4 text-[13px] outline-none focus:border-[#0887CA] text-[#060425] font-medium"
              />
            </div>
          </div>

          <div className="w-full bg-[#F5F8FA] border border-[#E8EFF3] rounded-[20px] p-5 shadow-sm shadow-[4px_4px_15px_rgba(8,135,202,0.1)]">
            <h3 className="text-[#10088F] text-[15px] font-bold mb-4 flex items-center gap-2">
              <Filter size={18} className="text-[#0887CA]" />
              دسته‌بندی‌ها
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-right px-4 py-2.5 rounded-[10px] text-[13px] font-bold transition-all ${
                  selectedCategory === null
                    ? "bg-[#10088F] text-white"
                    : "bg-white text-[#475569] hover:bg-gray-100"
                }`}
              >
                همه مقالات
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-right px-4 py-2.5 rounded-[10px] text-[13px] font-bold transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#10088F] text-white"
                      : "bg-white text-[#475569] hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-20 text-gray-400 font-bold">در حال دریافت مقالات...</div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-bold">هیچ مقاله‌ای یافت نشد!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {filteredBlogs.map((blog) => (
                <div 
                  key={blog.id} 
                  className="hover-3d w-full cursor-pointer"
                  onClick={() => openModal(blog)}
                >
                  <div className="w-full bg-[#F5F8FA] border border-[#E8EFF3] rounded-[8px] rounded-tr-[32px] rounded-bl-[32px] overflow-hidden shadow-sm shadow-[8px_8px_20px_rgba(8,135,202,0.15)] flex flex-col h-full">
                    <div className="w-full h-[200px] overflow-hidden relative">
                      <img src={blog.image || img} alt={blog.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#10088F] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Clock size={12} className="text-[#0887CA]" />
                        {blog.estimated_reading_time || "۵ دقیقه"}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex gap-4 items-center text-[#94A3B8] text-[11px] mb-3 font-medium">
                          <span className="flex items-center gap-1">
                            <User size={13} className="text-[#0887CA]" />
                            شناسه نویسنده: {blog.author_id}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={13} className="text-[#0887CA]" />
                            {blog.created_at ? new Date(blog.created_at).toLocaleDateString("fa-IR") : "۱۴۰۵/۰۲/۲۱"}
                          </span>
                        </div>
                        <h2 className="text-[#060425] text-[16px] font-extrabold mb-3 leading-6 hover:text-[#0887CA] transition-colors">
                          {blog.title}
                        </h2>
                        <p className="text-[#475569] text-[13px] leading-[22px] mb-6 line-clamp-2">
                          {blog.caption}
                        </p>
                      </div>
                      <div className="border-t border-gray-100 pt-4 flex justify-end">
                        <button className="flex items-center gap-1 text-[12px] text-[#0887CA] font-extrabold hover:text-[#10088F] transition-colors">
                          <span>ادامه مطلب</span>
                          <ArrowLeft size={14} className="mt-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div></div><div></div><div></div><div></div>
                  <div></div><div></div><div></div><div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= مودال جدید کاملاً تحت نظارت ری‌آکت ================= */}
      {isModalOpen && activeBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* لایه تیره پس‌زمینه (Backdrop) با قابلیت کلیک برای بستن */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={closeModal}></div>
          
          {/* بدنه اصلی مودال */}
          <div className="bg-[#F5F8FA] max-w-[750px] w-full rounded-[8px] rounded-tr-[40px] rounded-bl-[40px] border border-[#E8EFF3] overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col w-full">
              <div className="w-full h-[320px] relative">
                <img src={activeBlog.image || img} alt={activeBlog.title} className="w-full h-full object-cover" />
                <button 
                  onClick={closeModal}
                  className="absolute top-4 left-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 flex flex-col gap-5">
                <div className="flex gap-6 items-center text-[#94A3B8] text-[12px] font-semibold border-b border-gray-200 pb-3">
                  <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-100">
                    <User size={14} className="text-[#0887CA]" />
                    نویسنده: {activeBlog.author_id}
                  </span>
                  <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-100">
                    <Calendar size={14} className="text-[#0887CA]" />
                    {new Date(activeBlog.created_at).toLocaleDateString("fa-IR")}
                  </span>
                  <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-100">
                    <Clock size={14} className="text-[#0887CA]" />
                    زمان مطالعه: {activeBlog.estimated_reading_time || "۵ دقیقه"}
                  </span>
                </div>

                <h2 className="text-[#10088F] text-[22px] font-black leading-8">
                  {activeBlog.title}
                </h2>

                <p className="text-[#475569] text-[14px] leading-[26px] text-justify font-medium whitespace-pre-line">
                  {activeBlog.caption}
                </p>

                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={closeModal}
                    className="bg-[#10088F] text-white px-6 py-2.5 rounded-[12px] text-[13px] font-bold hover:bg-[#0887CA] transition-all shadow-md"
                  >
                    بستن
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Blog;