// components/EditComment.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Edit2, X, Star } from "lucide-react";
import { error } from "console";

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
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [caption, setCaption] = useState(currentText);
  const [rating, setRating] = useState(currentRating);
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem("accessToken");
  if (!token) {
    toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
    return;
  }

  try {
    setLoading(true);

    const requestBody: any = {
      caption: caption,
    };

    if (!isReply) {
      requestBody.title = title.trim() || "نظر کاربر";
      requestBody.rating = Number(rating);
    }

    // ✅ لاگ با console.log (نه console.error)
    console.log("📤 در حال ارسال درخواست ویرایش...");
    console.log("Comment ID:", commentId);
    console.log("Request Body:", requestBody);

    const response = await axios.put(
      `http://next.genzuni.website/api/comments/${commentId}`,
      requestBody,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    if (response.status === 200 || response.status === 201) {
      toast.success(isReply ? "پاسخ با موفقیت ویرایش شد" : "نظر با موفقیت ویرایش شد");
      setIsOpen(false);
      onEditSuccess();
    }
  } catch (error: any) {
    // ✅ اینجا از console.log استفاده کن
    console.log("❌ خطا در ویرایش:");
    console.log("Error object:", error);
    console.log("Error status:", error.response?.status);
    console.log("Error message:", error.response?.data?.message);
    console.log("Error data:", error.response?.data);

    if (error.response?.status === 401) {
      toast.error("نشست شما منقضی شده است. لطفاً مجدداً وارد شوید");
      localStorage.removeItem("accessToken");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    if (error.response?.status === 403) {
      toast.error("شما اجازه ویرایش این نظر را ندارید");
      return;
    }

    if (error.response?.status === 404) {
      toast.error("نظر مورد نظر یافت نشد");
      return;
    }

    const errorMsg = error.response?.data?.message || "خطایی در سیستم رخ داد";
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[11px] text-[#0887CA] font-bold hover:underline flex items-center gap-1"
      >
        <Edit2 size={12} />
        ویرایش
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white w-full max-w-[500px] max-h-[90vh] overflow-y-auto p-6 rounded-[8px] rounded-tr-[32px] rounded-bl-[32px] shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-bold text-[16px] text-[#10088F]">
                {isReply ? "ویرایش پاسخ" : "ویرایش نظر"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isReply && (
                <input
                  type="text"
                  placeholder="عنوان نظر"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-[12px] border border-[#E2E8F0] bg-white outline-none text-[13px] focus:border-[#0887CA] transition-all"
                  required
                />
              )}

              <textarea
                placeholder={
                  isReply
                    ? "متن پاسخ خود را بنویسید..."
                    : "متن نظر خود را بنویسید..."
                }
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-3 rounded-[12px] border border-[#E2E8F0] bg-white outline-none text-[13px] resize-none focus:border-[#0887CA] transition-all"
                rows={5}
                required
              />

              {!isReply && (
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#F1F5F9] w-fit">
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
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-[12px] font-bold text-yellow-500 mr-1">
                    {rating}
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 text-[12px] font-bold text-gray-600 bg-gray-100 rounded-[12px] hover:bg-gray-200 transition-all"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-5 py-2 text-[12px] font-bold text-white rounded-[12px] transition-all shadow-md
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#10088F] hover:bg-[#0887CA]"
                    }`}
                >
                  {loading ? "در حال ویرایش..." : "ویرایش"}
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
