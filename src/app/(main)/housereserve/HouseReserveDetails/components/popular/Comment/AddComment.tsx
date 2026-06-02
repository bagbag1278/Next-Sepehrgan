"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { X, MessageCircle, Plus, Link } from "lucide-react";
import { Star } from "lucide-react";

interface AddCommentProps {
  houseId: any;
  parentCommentId?: any;
  onReplySubmitted: () => void;
  isReply?: boolean;
}

const AddComment = ({
  houseId,
  parentCommentId = null,
  onReplySubmitted,
  isReply = false,
}: AddCommentProps) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isReply);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
console.log("houseId:", houseId);
console.log("parentCommentId:", parentCommentId);
console.log("isReply:", isReply);
  const token = localStorage.getItem("accessToken");
  if (!token) {
    toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
    return;
  }

  try {
    setLoading(true);

    const requestBody: any = {
      house_id: Number(houseId),
      title: isReply ? "پاسخ" : title.trim() || "نظر کاربر",
      caption: caption,
      rating: isReply ? 5 : Number(rating),
      parent_comment_id: parentCommentId ? Number(parentCommentId) : null,
    };

    if (!isReply) {
      requestBody.rating = String(rating);
    }

    const response = await axios.post(
      "http://next.genzuni.website/api/comments",
      requestBody,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      toast.success(
        isReply ? "پاسخ شما با موفقیت ثبت شد" : "نظر شما با موفقیت ثبت شد"
      );

      setTitle("");
      setCaption("");
      setRating(5);

      if (isReply) {
        setIsOpen(false);
      } else {
        setIsModalOpen(false);
      }

      onReplySubmitted();
    }
  } catch (error: any) {
    console.error("خطا در ثبت:", error);

    if (error.response?.status === 401) {
      toast.error("نشست شما منقضی شده است. لطفاً مجدداً وارد شوید");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    const errorMsg = error.response?.data?.message || "خطایی در سیستم رخ داد";
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};
  if (isReply && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-[11px] text-[#0887CA] whitespace-nowrap font-bold hover:underline"
      >
        پاسخ دادن
      </button>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
        <h3 className="font-bold text-[14px] text-[#10088F]">
          {isReply ? `ثبت پاسخ به نظر #${parentCommentId}` : "نظر جدید"}
     
        </h3>
        {isReply && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {!isReply && (
        <input
          type="text"
          placeholder="عنوان نظر شما (مثال: عالی، خوب...)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-[12px] text-[#0887CAB2] border border-[#0887CAB2] bg-white outline-none text-[13px] focus:border-[#0887CA] transition-all"
          required
        />
      )}

      <textarea
        ref={textareaRef}
        placeholder={isReply ? "پاسخ خود را بنویسید..." : "متن نظر شما..."}
        value={caption}
        onChange={handleCaptionChange}
        className="w-full p-3 rounded-[12px] text-[#0887CAB2] border border-[#0887CAB2] outline-none text-[13px] resize-none focus:border-[#0887CA] transition-all overflow-hidden"
        rows={isReply ? 3 : 4}
        required
      />

      <div className="flex justify-between items-center mt-1">
        {!isReply ? (

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#F1F5F9]">
            <span className="text-[11px] font-bold text-[#64748B]">
              امتیاز:
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className="transition-all hover:scale-110"
                >
                  <Star
                    size={16}
                    className={`${
                      num <= rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300 fill-gray-200"
                    } transition-colors`}
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
          className={`px-5 py-2 text-[12px] font-bold text-white rounded-[12px] transition-all shadow-md
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#10088F] hover:bg-[#0887CA] hover:shadow-[0px_4px_12px_rgba(8,135,202,0.3)]"
            }`}
        >
          {loading ? "در حال ارسال..." : isReply ? "ارسال پاسخ" : "ارسال نظر"}
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
        <div className="relative bg-white w-full max-w-[500px] max-h-[90vh] overflow-y-auto p-6 rounded-[8px] rounded-tr-[32px] rounded-bl-[32px] shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex w-30 h-10 items-center gap-2 px-8 whitespace-nowrap py-2 relative left-6 max-[888]:left-0 text-[#005EA4] border border-[#10088F]  text-[13px] font-bold rounded-[12px] hover:bg- transition-all shadow-md hover:shadow-lg"
        >
          افزودن نظر
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 w-full max-w-[500px] bg-white shadow-2xl transform transition-transform duration-300 ease-out animate-slide-in-right">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="font-bold text-[18px] text-[#10088F]">
                  ثبت نظر جدید
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
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
