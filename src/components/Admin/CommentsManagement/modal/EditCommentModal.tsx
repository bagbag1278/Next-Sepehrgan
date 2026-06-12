"use client";

import { useState, useEffect } from "react";
import { X, Star, Loader2 } from "lucide-react";

interface EditCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  comment: any;
  loading?: boolean;
}

const EditCommentModal = ({ isOpen, onClose, onSave, comment, loading = false }: EditCommentModalProps) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState("5");

  useEffect(() => {
    if (comment) {
      setTitle(comment.title || "");
      setCaption(comment.caption || "");
      setRating(comment.rating || "5");
    }
  }, [comment]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim()) {
      return;
    }
    await onSave({ title, caption, rating });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 h-full backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="  p-5 text-blue-500 ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">ویرایش کامنت</h2>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
              <X size={20} />
            </button>
          </div>
          <p className="text-blue-500 text-sm mt-1">شناسه: #{comment?.id}</p>
        </div>

        <div className="p-6 space-y-4">
          {/* عنوان */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">عنوان</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 rounded-xl focus:border-blue-300 focus:ring-1 focus:ring-blue-300 outline-none transition-all"
            />
          </div>

          {/* متن کامنت */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">متن کامنت</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 rounded-xl focus:border-blue-300 focus:ring-1 focus:ring-blue-300 outline-none transition-all resize-none"
            />
          </div>

          {/* امتیاز */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">امتیاز</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star.toString())}
                  className="p-1 focus:outline-none"
                >
                  <Star size={28} className={star <= Number(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                </button>
              ))}
              <span className="mr-2 text-sm text-gray-500">{rating} از ۵</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-5 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl border border-[#ED053F] text-[#ED053F]   transition-all">
            بستن
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-2xl bg-[#060425] text-white font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCommentModal;