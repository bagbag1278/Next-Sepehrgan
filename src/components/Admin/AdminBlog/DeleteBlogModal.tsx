"use client";

import { X, AlertTriangle, Loader2, Trash2 } from "lucide-react";

interface DeleteBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  postTitle?: string;
  loading: boolean;
}

const DeleteBlogModal = ({ isOpen, onClose, onConfirm, postTitle, loading }: DeleteBlogModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 h-full bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-hidden">
        <div className="bg-rose-600 p-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trash2 size={22} />
              <h2 className="text-xl font-bold">حذف پست</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} className="text-red-50" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">آیا از حذف این پست اطمینان دارید؟</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            پست
            <span className="font-bold text-gray-700 dark:text-gray-300 mx-1">"{postTitle || "بدون عنوان"}"</span>
            حذف خواهد شد.
          </p>
          <p className="text-gray-400 text-xs mt-2">این عملیات قابل بازگشت نیست.</p>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 p-5 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            انصراف
          </button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
            {loading ? "در حال حذف..." : "حذف کن"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteBlogModal;