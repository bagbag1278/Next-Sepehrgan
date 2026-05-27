"use client";
import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";

interface EditCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; caption: string; rating: string }) => void;
  initialData: { title: string; caption: string; rating: string };
  loading?: boolean;
}

const EditCommentModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  loading = false,
}: EditCommentModalProps) => {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    if (isOpen) {
      setForm(initialData);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const renderStarsInput = (rating: string) => {
    const rate = Number(rating);
    return (
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setForm({ ...form, rating: star.toString() })}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              size={28}
              className={star <= rate ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}
            />
          </button>
        ))}
        <span className="text-sm text-gray-500 mr-2">({form.rating} / ۵)</span>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      return;
    }
    if (!form.caption.trim()) {
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full mx-4 shadow-lg overflow-hidden"
        style={{ boxShadow: "0 4px 12px #0887CA4D" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">ویرایش کامنت</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            type="button"
          >
            <X size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">عنوان</label>
            <input
              type="text"
              placeholder="عنوان کامنت"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">متن کامنت</label>
            <textarea
              placeholder="متن کامنت"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">امتیاز</label>
            {renderStarsInput(form.rating)}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCommentModal;