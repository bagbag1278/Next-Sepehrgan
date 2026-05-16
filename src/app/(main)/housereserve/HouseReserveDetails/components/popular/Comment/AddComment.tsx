"use client";
import React, { useState } from "react";
import { Mail, MessageSquare } from "lucide-react";
import axios from "axios";

const AddComment = ({ houseId, parentCommentId = null, onCommentSubmitted, isReply = false }: any) => {
  const [formData, setFormData] = useState({ title: "", email: "", caption: "" });
  const [loading, setLoading] = useState(false);

  const modalId = parentCommentId ? `reply_modal_${parentCommentId}` : "comment_modal";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!houseId) return alert("خطا: آیدی ملک یافت نشد.");
    
    setLoading(true);
    try {
      await axios.post("http://next.genzuni.website/api/comments", {
        title: formData.title || (isReply ? "پاسخ" : "نظر جدید"),
        email: formData.email,
        caption: formData.caption,
        house_id: Number(houseId),
        parent_comment_id: parentCommentId,
      });

      alert("با موفقیت ثبت شد!");
      (document.getElementById(modalId) as HTMLDialogElement).close();
      setFormData({ title: "", email: "", caption: "" });
      if (onCommentSubmitted) onCommentSubmitted();
    } catch (error) {
      alert("خطا در ارسال اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isReply ? (
        <button
          onClick={() => (document.getElementById(modalId) as HTMLDialogElement).showModal()}
          className="flex items-center gap-2 text-[12px] text-[#0887CA] font-bold hover:opacity-70 transition-opacity"
        >
          <MessageSquare size={15} />
          <span>پاسخ دادن</span>
        </button>
      ) : (
        <button
          onClick={() => (document.getElementById(modalId) as HTMLDialogElement).showModal()}
          className="text-[#005EA4] border-2 border-[#005EA4] px-5 py-2 rounded-[14px] text-[13px] font-extrabold hover:bg-[#005EA4] hover:text-white transition-all"
        >
          افزودن نظر
        </button>
      )}

      <dialog id={modalId} className="modal backdrop-blur-sm">
        <div className="modal-box max-w-[670px] bg-[#F5F5F5] p-10 rounded-[40px] border-none shadow-2xl relative">
          <h3 className="text-[#10088F] text-[16px] font-bold mb-4 text-right">
            {isReply ? "ثبت پاسخ به این نظر" : "ثبت نظر جدید"}
          </h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" dir="rtl">
            <input
              type="text"
              required
              placeholder="نام و نام خانوادگی"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-[65px] rounded-[24px] border-2 border-[#0887CA66] bg-transparent px-6 outline-none focus:border-[#0887CA] text-[#0887CA] font-bold"
            />
            
            <div className="relative">
              <input
                type="email"
                required
                placeholder="ایمیل"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-[65px] rounded-[24px] border-2 border-[#0887CA66] bg-transparent px-6 pr-12 outline-none focus:border-[#0887CA] text-[#0887CA] font-bold"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0887CA99]" size={22} />
            </div>

            <textarea
              placeholder={isReply ? "پاسخ شما" : "پیام شما"}
              required
              rows={5}
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              className="w-full rounded-[24px] border-2 border-[#0887CA66] bg-transparent p-6 outline-none focus:border-[#0887CA] text-[#0887CA] font-bold resize-none"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[75px] bg-[#10088F] text-white rounded-[24px] font-bold text-[20px] shadow-lg disabled:bg-gray-400"
            >
              {loading ? "در حال ارسال..." : isReply ? "ارسال پاسخ" : "ارسال نظر"}
            </button>
          </form>

          <button 
            type="button"
            onClick={() => (document.getElementById(modalId) as HTMLDialogElement).close()}
            className="absolute top-4 left-4 text-gray-400 font-bold"
          >✕</button>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/30"><button>بستن</button></form>
      </dialog>
    </div>
  );
};

export default AddComment;