"use client";

import { X, User, Home, Star, Calendar, MessageSquare } from "lucide-react";

interface DetailCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: any;
}

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString("fa-IR");
  } catch {
    return "نامشخص";
  }
};

const DetailCommentModal = ({ isOpen, onClose, comment }: DetailCommentModalProps) => {
  if (!isOpen || !comment) return null;

  const fullName = `${comment.user?.firstName || ""} ${comment.user?.lastName || ""}`.trim() || "کاربر ناشناس";
  const rate = Number(comment.rating);

  return (
    <>
      <div className="fixed inset-0 h-full bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className=" bg-indigo-600 p-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare size={24} />
              <h2 className="text-xl font-bold">جزئیات کامنت</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
              <X size={20} />
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-1">شناسه: #{comment.id}</p>
        </div>

        <div className="p-6 space-y-4">
          {/* User Info */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-lg">
                {comment.user?.firstName?.charAt(0) || "ک"}
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{fullName}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={12} />
                  <span>{formatDate(comment.created_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* House Info */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
            <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
              <Home size={16} className="text-blue-600" />
              اطلاعات هتل
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">نام هتل:</span>
                <span className="font-medium text-gray-800 dark:text-white">{comment.house?.title || "نامشخص"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">آدرس:</span>
                <span className="font-medium text-gray-800 dark:text-white text-left">{comment.house?.address || "نامشخص"}</span>
              </div>
            </div>
          </div>

          {/* Comment Content */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
            <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
              <MessageSquare size={16} className="text-blue-600" />
              محتوای کامنت
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">عنوان:</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{comment.title || "بدون عنوان"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">متن کامنت:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.caption}</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-500 text-sm">امتیاز:</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className={star <= rate ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="font-bold text-blue-600">{comment.rating} / ۵</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 dark:border-gray-700 p-5 bg-gray-50/50">
          <button onClick={onClose} className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all">
            بستن
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailCommentModal;