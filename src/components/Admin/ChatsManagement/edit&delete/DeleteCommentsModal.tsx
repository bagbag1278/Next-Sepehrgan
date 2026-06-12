"use client";
import { X, Trash2 } from "lucide-react";

interface DeleteCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  commentTitle?: string;
  loading?: boolean;
}

const DeleteCommentModal = ({
  isOpen,
  onClose,
  onConfirm,
  commentTitle,
  loading = false,
}: DeleteCommentModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div 
        className="bg-white dark:bg-gray-900 rounded-2xl w-[338px] mx-4 shadow-lg overflow-hidden"
        style={{ boxShadow: "0 4px 12px #0887CA4D" }}
      >
        <div className="flex justify-center pt-6">
          <div className="w-16 h-16 rounded-full  dark:bg-red-900/30 flex items-center justify-center">
            <Trash2 size={32} className="text-red-500 dark:text-red-400" />
          </div>
        </div>

        <div className="p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
            حذف کامنت
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            آیا از حذف این کامنت مطمئن هستید؟
          </p>
          
          {commentTitle && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              "{commentTitle}"
            </p>
          )}
          
          <p className="text-xs text-red-500 dark:text-red-400">
            امکان بازگشت پس از حذف وجود ندارد!
          </p>
        </div>

        <div className="flex border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-center text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            انصراف
          </button>
          <div className="w-px bg-gray-100 dark:bg-gray-800"></div>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 text-center text-white bg-red-600   font-medium hover:bg-red-500 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "در حال حذف..." : "بله"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommentModal;