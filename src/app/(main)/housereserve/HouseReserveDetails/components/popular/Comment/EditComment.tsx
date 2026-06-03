"use client";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import axios from "axios";
import { toast } from "react-hot-toast";
import { Edit2, X, Star } from "lucide-react";

interface EditCommentProps {
  commentId: number;
  currentText: string;
  currentTitle?: string;
  currentRating?: number;
  isReply?: boolean;
  onEditSuccess: () => void;
}

const EditComment = ({
  commentId,
  currentText,
  currentTitle = "",
  currentRating = 5,
  isReply = false,
  onEditSuccess,
}: EditCommentProps) => {
  const t = useTranslations('EditComment');
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [caption, setCaption] = useState(currentText);
  const [rating, setRating] = useState(currentRating);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error(t('loginRequired'));
      return;
    }

    try {
      setLoading(true);
      const requestBody: any = { caption: caption };
      if (!isReply) {
        requestBody.title = title.trim() || t('defaultTitle');
        requestBody.rating = Number(rating);
      }

      const response = await axios.put(`/api/comments/${commentId}`, requestBody, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(isReply ? t('replyEdited') : t('commentEdited'));
        setIsOpen(false);
        onEditSuccess();
      }
    } catch (error: any) {
      console.log("Error:", error);
      if (error.response?.status === 401) {
        toast.error(t('sessionExpired'));
        localStorage.removeItem("accessToken");
        setTimeout(() => window.location.href = "/login", 1500);
        return;
      }
      if (error.response?.status === 403) {
        toast.error(t('noPermission'));
        return;
      }
      if (error.response?.status === 404) {
        toast.error(t('notFound'));
        return;
      }
      toast.error(error.response?.data?.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[11px] text-[#0887CA] dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
      >
        <Edit2 size={12} />
        {t('edit')}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white dark:bg-gray-800 w-full max-w-[500px] max-h-[90vh] overflow-y-auto p-6 rounded-[8px] rounded-tr-[32px] rounded-bl-[32px] shadow-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3 mb-4">
              <h3 className="font-bold text-[16px] text-[#10088F] dark:text-blue-400">
                {isReply ? t('editReply') : t('editComment')}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isReply && (
                <input
                  type="text"
                  placeholder={t('titlePlaceholder')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-[12px] border border-[#E2E8F0] dark:border-gray-600 bg-white dark:bg-gray-700 outline-none text-[13px] focus:border-[#0887CA] transition-all"
                  required
                />
              )}

              <textarea
                placeholder={isReply ? t('replyPlaceholder') : t('commentPlaceholder')}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-3 rounded-[12px] border border-[#E2E8F0] dark:border-gray-600 bg-white dark:bg-gray-700 outline-none text-[13px] resize-none focus:border-[#0887CA] transition-all"
                rows={5}
                required
              />

              {!isReply && (
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-1.5 rounded-full border border-[#F1F5F9] dark:border-gray-600 w-fit">
                  <span className="text-[11px] font-bold text-[#64748B] dark:text-gray-400">{t('rating')}:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button key={num} type="button" onClick={() => setRating(num)} className="transition-all hover:scale-110">
                        <Star size={16} className={`${num <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} />
                      </button>
                    ))}
                  </div>
                  <span className="text-[12px] font-bold text-yellow-500 mr-1">{rating}</span>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-5 py-2 text-[12px] font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-[12px] hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                  {t('cancel')}
                </button>
                <button type="submit" disabled={loading} className={`px-5 py-2 text-[12px] font-bold text-white rounded-[12px] transition-all shadow-md
                  ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#10088F] dark:bg-blue-600 hover:bg-[#0887CA] dark:hover:bg-blue-700"}`}>
                  {loading ? t('saving') : t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditComment;