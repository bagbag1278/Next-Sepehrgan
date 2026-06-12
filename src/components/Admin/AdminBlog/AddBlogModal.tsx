"use client";

import { useState } from "react";
import { X, Loader2, FileText } from "lucide-react";
import toast from "react-hot-toast";

interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  loading: boolean;
}

const AddBlogModal = ({ isOpen, onClose, onSave, loading }: AddBlogModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    estimated_reading_time: "",
    category_id: 1,
  });

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
    setFormData({
      title: "",
      caption: "",
      estimated_reading_time: "",
      category_id: 1,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-hidden">
        <div className="sticky top-0 bg-gradient-to-r from-[#0887CA] to-[#066A9E] p-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText size={24} />
              <h2 className="text-xl font-bold">پست جدید</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* عنوان */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">عنوان پست</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none"
              placeholder="عنوان پست..."
            />
          </div>

          {/* متن پست */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">متن پست</label>
            <textarea
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none resize-none"
              placeholder="متن اصلی پست..."
            />
          </div>

          {/* زمان مطالعه */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">زمان مطالعه</label>
            <input
              type="text"
              value={formData.estimated_reading_time}
              onChange={(e) => setFormData({ ...formData, estimated_reading_time: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#0887CA] focus:ring-1 focus:ring-[#0887CA] outline-none"
              placeholder="مثال: 5 دقیقه"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 p-5 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-[#0887CA] hover:bg-[#0778B3] text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
            {loading ? "در حال ذخیره..." : "ایجاد پست"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBlogModal;