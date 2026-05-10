"use client";

import React, { useState } from "react";
import { MessageSquare, ChevronDown, Reply } from "lucide-react";
import ProfilComment from "../../icon/icon/ProfilComment";
import StarRate from "../../icon/icon/StarRate";
import AddComment from "./AddComment";

// کامپوننت کارت نظر (شامل منطق پاسخ‌ها)
const CommentCard = ({ name, date, rate, text, replies = [] }: any) => {
  const [showReplies, setShowReplies] = useState(false);
  const [isReplyInputOpen, setIsReplyInputOpen] = useState(false);

  return (
    <div className="flex flex-col w-full mb-10  ">
      {/* کارت اصلی نظر */}
      <div className="w-162 h-28 bg-[#F5F8FA] rounded-[8px] rounded-tr-[32px] rounded-bl-[32px] p-6 border  border-[#E8EFF3] shadow-sm relative shadow-[8px_0px_20px_rgba(8,135,202,0.30)]">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center -mb-6">
            <div className="w-[52px] h-[52px] rounded-full bg-[#E2E8F0] flex items-center justify-center relative bottom-4 right-1 text-gray-500 border-2 border-white shadow-sm overflow-hidden">
              <ProfilComment />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h4 className="font-bold text-[#060425] text-[15px] relative bottom-6 right-1">
                  {name}
                </h4>
                {rate && (
                  <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border relative bottom-6 right-1 border-[#F1F5F9]">
                    <span className="text-[11px] font-bold text-[#64748B] ">
                      {rate}
                    </span>
                    <StarRate />
                  </div>
                )}
              </div>
              <span className="text-[11px] absolute left-8 top-4 text-[#94A3B8] font-medium">
                {date}
              </span>
            </div>
          </div>
        </div>

        <p className="text-[#475569] text-[13px] leading-[22px] text-right whitespace-nowrap relative bottom-6 mr-14 px-2">
          {text}
        </p>

        <div className="flex justify-start gap-8 items-center border-t border-gray-100 pt-4 relative bottom-6">
          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-[11px] text-[#94A3B8] hover:text-[#0887CA] transition-colors"
            >
              <ChevronDown
                size={14}
                className={showReplies ? "rotate-180" : ""}
              />
              مشاهده پاسخ‌ها ({replies.length})
            </button>
          )}

          <button
            onClick={() => setIsReplyInputOpen(!isReplyInputOpen)}
            className="flex items-center gap-2 text-[12px] text-[#0887CA] font-bold hover:opacity-70 transition-opacity"
          >
            <MessageSquare size={15} />
            <span>پاسخ دادن</span>
          </button>
        </div>

        {isReplyInputOpen && (
          <div className="flex gap-2 relative bottom-3 z-20">
            <input
              type="text"
              placeholder="پاسخ خود را بنویسید..."
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#0887CA]"
            />
            <button className="bg-[#0887CA] text-white px-4 py-1 rounded-lg text-xs font-bold">
              ارسال
            </button>
          </div>
        )}
      </div>
        {/* Replay */}
      {showReplies && (
        <div className="mr-3 mt-11 border-r-2 border-gray-200 pr-4 flex flex-col gap-3">
          {replies.map((reply: any) => (
            <div
              key={reply.id}
              className="w-150 h-28 bg-green-50 rounded-[8px] rounded-tr-[32px] rounded-bl-[32px] p-6 border  border-[#E8EFF3] shadow-sm relative shadow-[8px_0px_20px_rgba(8,135,202,0.30)]"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="w-[52px] h-[52px] rounded-full bg-[#E2E8F0] flex items-center justify-center absolute text-gray-500 border-2 border-white shadow-sm overflow-hidden">
                  <ProfilComment />
                </div>
                <div className="flex items-center gap-1 bg-[#0887CA0D] px-2 py-0.5 rounded-full border absolute right-35 border-[#F1F5F9]">
                  <span className="text-[11px] font-bold text-[#64748B] ">
                    {rate}
                  </span>
                  <StarRate />
                </div>
                <span className="font-bold text-[13px] text-[#10088F]">
                  {reply.name}
                </span>
                <span className="text-[10px] text-[#94A3B8]">{reply.date}</span>
              </div>
              <p className="text-[12px] text-[#475569] leading-[50px]">
                {reply.text}
              </p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CommentsSection = ({ houseId }: { houseId: any }) => {  
  
  const comments = [
    {
      id: 1,
      name: "غزال بانو",
      date: "۱۸ خرداد ۱۴۰۴",
      rate: "۴.۵",
      text: "من به تازگی از وب‌سایت رهن کده برای جستجوی یک خانه جدید استفاده کردم واقعا عالی بود .",
      replies: [
        {
          id: 101,
          rate: "۴.۵",
          name: "پشتیبانی رهن کده",
          date: "۱۹ خرداد ۱۴۰۴",
          text: "خوشحالیم که تجربه خوبی داشتید غزال عزیز.",
        },
      ],
    },
    {
      id: 2,
      name: "خانم احمدی",
      date: "۲۰ خرداد ۱۴۰۴",
      rate: "۴.۰",
      text: "امکان مقایسه قیمت‌ها خیلی به من کمک کرد.",
      replies: [],
    },
    {
      id: 3,
      name: "خانم احمدی",
      date: "۲۰ خرداد ۱۴۰۴",
      rate: "۴.۰",
      text: "امکان مقایسه قیمت‌ها خیلی به من کمک کرد.",
      replies: [],
    },
  ];

  return (
    <div className="w-full max-w-[850px] mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-10 px-2">
        <h2 className="text-[#10088F] text-[18px] font-bold relative  left-6">
          نظرات دیگر کاربران ({comments.length})
        </h2>
        <div className="relative right-8">
                  <AddComment />

        </div>
      </div>

      <div className="flex flex-col">
        {comments.map((comment) => (
          <CommentCard key={comment.id} {...comment} />
        ))}
      </div>

      <button className="flex justify-center items-center w-full mt-8 text-[14px] font-medium text-[#005EA4] hover:underline gap-2">
        <span>مشاهده نظرات بیشتر</span>
        <ChevronDown className="text-blue-300" size={16} />
      </button>
    </div>
  );
};

export default CommentsSection;
