// DeleteComment.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Trash2, X } from "lucide-react";

interface DeleteCommentProps {
  commentId: number;
  onDeleteSuccess: () => void;
  isReply?: boolean;
}

const DeleteComment = ({
  commentId,
  onDeleteSuccess,
  isReply = false,
}: DeleteCommentProps) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.delete(
        `http://next.genzuni.website/api/comments/${commentId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success(
          isReply ? "پاسخ با موفقیت حذف شد" : "نظر با موفقیت حذف شد"
        );
        setIsOpen(false);
        onDeleteSuccess();
      }
    } catch (error: any) {
      console.error("خطا در حذف:", error);

      if (error.response?.status === 401) {
        toast.error("نشست شما منقضی شده است. لطفاً مجدداً وارد شوید");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return;
      }

      if (error.response?.status === 403) {
        toast.error("شما اجازه حذف این نظر را ندارید");
        setIsOpen(false);
        return;
      }

      if (error.response?.status === 404) {
        toast.error("نظر مورد نظر یافت نشد");
        setIsOpen(false);
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
        className="text-[11px] text-red-500 font-bold hover:underline flex items-center gap-1"
      >
        <Trash2 size={12} />
        حذف
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white w-full max-w-[400px] p-6 rounded-[16px] shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[16px] text-red-600">حذف نظر</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-[14px] text-gray-700 text-center mb-6">
              آیا از حذف این {isReply ? "پاسخ" : "نظر"} مطمئن هستید؟
              <br />
              <span className="text-[12px] text-gray-400">
                این عمل قابل بازگشت نیست.
              </span>
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 text-[13px] font-bold text-gray-600 bg-gray-100 rounded-[12px] hover:bg-gray-200"
              >
                انصراف
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className={`flex-1 px-4 py-2 text-[13px] font-bold text-white rounded-[12px] transition-all
                  ${loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                {loading ? "در حال حذف..." : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteComment;