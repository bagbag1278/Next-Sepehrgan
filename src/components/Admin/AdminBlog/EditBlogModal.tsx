"use client";

import { useState, useEffect } from "react";
import { X, Loader2, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { BlogPost } from "../../../app/admin/AdminBlog/page";

interface EditBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  post: BlogPost | null;
  loading: boolean;
}

const EditBlogModal = ({ isOpen, onClose, onSave, post, loading }: EditBlogModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    estimated_reading_time: "",
    category_id: 1,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        caption: post.caption,
        estimated_reading_time: post.estimated_reading_time,
        category_id: post.category_id,
      });
    }
  }, [post]);

  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error("عنوان پست الزامی است");
      return;
    }
    if (!formData.caption) {
      toast.error("متن پست الزامی است");
      return;
    }

    await onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 h-full backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#066A9E] px-6 py-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText size={22} />
              <h2 className="text-xl font-bold">ویرایش پست</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X size={20} className="text-white" />
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-1">شناسه پست: #{post?.id}</p>
        </div>

        <div className="p-6 space-y-5">
          {/* عنوان */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              عنوان پست
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white"
              placeholder="عنوان پست را وارد کنید"
            />
          </div>

          {/* متن پست */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              متن پست
            </label>
            <textarea
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              rows={8}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all resize-none text-gray-800 dark:text-white"
              placeholder="متن اصلی پست را وارد کنید..."
            />
          </div>

          {/* زمان مطالعه */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              زمان مطالعه
            </label>
            <input
              type="text"
              value={formData.estimated_reading_time}
              onChange={(e) => setFormData({ ...formData, estimated_reading_time: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none transition-all text-gray-800 dark:text-white"
              placeholder="مثال: 5 دقیقه"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">زمان تقریبی مطالعه این پست</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 dark:border-gray-700 p-5 bg-gray-50/50 dark:bg-gray-800/50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-2xl bg-[#0887CA] hover:bg-[#0778B3] text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBlogModal;   