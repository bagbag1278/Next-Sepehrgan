"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import axios from "axios";
import { toast } from "react-hot-toast";
import { X, MessageCircle, Star, Sparkles } from "lucide-react";

interface AddCommentProps {
  houseId: any;
  parentCommentId?: any;
onReplySubmitted: () => void,
  isReply?: boolean;
}

const AddComment = ({
  houseId,
  parentCommentId = null,
  onReplySubmitted,
  isReply = false,
}: AddCommentProps) => {
  const t = useTranslations('AddComment');
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isReply);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://188.121.111.8:3003/api";

  useEffect(() => {
    if (textareaRef.current && isReply && isOpen) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [caption, isReply, isOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const getToken = () => localStorage.getItem("accessToken");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      toast.error(t('loginRequired'));
      return;
    }

    if (!caption.trim()) {
      toast.error(isReply ? t('replyRequired') : t('commentRequired'));
      return;
    }

    try {
      setLoading(true);

      const requestBody: any = {
        house_id: Number(houseId),
        title: isReply ? t('replyTitle') : (title.trim() || t('defaultTitle')),
        caption: caption.trim(),
        rating: isReply ? 5 : Number(rating),
        parent_comment_id: parentCommentId ? Number(parentCommentId) : null,
      };

      const response = await axios.post(`${API_BASE_URL}/comments`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(isReply ? t('replySuccess') : t('commentSuccess'));

        setTitle("");
        setCaption("");
        setRating(5);

        if (isReply) {
          setIsOpen(false);
        } else {
          setIsModalOpen(false);
        }

        onReplySubmitted();
      } else {
        toast.error(t('error'));
      }
    } catch (error: any) {
      console.error("Error submitting comment:", error);

      if (error.response?.status === 401) {
        toast.error(t('sessionExpired'));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return;
      }

      if (error.response?.status === 403) {
        toast.error(t('noPermission'));
        return;
      }

      const errorMsg = error.response?.data?.message || t('error');
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (isReply && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-[11px] text-[#0887CA] dark:text-blue-400 whitespace-nowrap font-bold hover:underline transition-all duration-300 flex items-center gap-1"
      >
        <MessageCircle size={12} />
        {t('reply')}
      </button>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center  pb-3">
       
        {isReply && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {!isReply && (
        <div className="relative">
          <input
            type="text"
            placeholder={t('titlePlaceholder')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl text-gray-700 dark:text-white border border-[#0887CAB2] dark:border-blue-500 bg-white dark:bg-gray-800 outline-none text-[13px] focus:border-[#0887CA] focus:ring-2 focus:ring-[#0887CA]/30 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
      )}

      <div className="relative">
        <textarea
          ref={textareaRef}
          placeholder={isReply ? t('replyPlaceholder') : t('commentPlaceholder')}
          value={caption}
          onChange={handleCaptionChange}
          className="w-full p-3 rounded-xl text-gray-700 dark:text-white border border-[#0887CAB2] dark:border-blue-500 bg-white dark:bg-gray-800 outline-none text-[13px] resize-none focus:border-[#0887CA] focus:ring-2 focus:ring-[#0887CA]/30 transition-all overflow-hidden placeholder:text-gray-400 dark:placeholder:text-gray-500"
          rows={isReply ? 3 : 4}
          required
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        {!isReply ? (
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-[#F1F5F9] dark:border-gray-700 shadow-sm">
            <span className="text-[11px] font-bold text-[#64748B] dark:text-gray-400">
              {t('rating')}:
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  onMouseEnter={() => setHoveredRating(num)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-all hover:scale-110 focus:outline-none"
                >
                  <Star
                    size={16}
                    className={`${
                      num <= (hoveredRating || rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300 dark:text-gray-600 fill-gray-200 dark:fill-gray-700"
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
            <span className="text-[12px] font-bold text-yellow-500 mr-1">
              {rating}
            </span>
          </div>
        ) : (
          <div />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2 text-[12px] font-bold text-white rounded-xl transition-all duration-300 shadow-md flex items-center gap-2
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#10088F] to-[#0887CA] hover:from-[#0d0775] hover:to-[#0670a8] hover:shadow-lg transform hover:scale-[1.02]"
            }`}
        >
          {loading ? (
            <>
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t('sending')}
            </>
          ) : (
            isReply ? t('sendReply') : t('sendComment')
          )}
        </button>
      </div>
    </form>
  );

  if (isReply) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div className="relative bg-white dark:bg-gray-800 w-full max-w-[500px] max-h-[90vh] overflow-y-auto p-6 rounded-[8px] rounded-tr-[32px] rounded-bl-[32px] shadow-2xl border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-200">
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 text-[#005EA4] dark:text-blue-600 border border-[#10088F] dark:border-blue-500 text-[13px] font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
      >
        <Sparkles size={16} />
        {t('addComment')}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 w-full max-w-[500px] bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-out">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-[18px] text-[#10088F] dark:text-white flex items-center gap-2">
                  <Sparkles size={18} />
                  {t('newComment')}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">{formContent}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddComment;